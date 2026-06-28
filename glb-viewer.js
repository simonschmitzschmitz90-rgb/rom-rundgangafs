function makeGlbViewer(containerId, modelUrl) {
  const container = document.getElementById(containerId);
  if (!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const loadingNotice = document.createElement('div');
  loadingNotice.className = 'viewer-loading';
  loadingNotice.textContent = 'Lade 3D-Modell …';
  container.appendChild(loadingNotice);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x6f5842, 2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);

  const pivot = new THREE.Group();
  scene.add(pivot);
  let cameraDistance = 5;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let pinchDistance = 0;

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function setDistance(distance) {
    cameraDistance = Math.max(1.2, Math.min(20, distance));
    camera.position.set(0, cameraDistance * 0.35, cameraDistance);
    camera.lookAt(0, 0, 0);
  }

  container.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a, button')) return;
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    container.setPointerCapture(event.pointerId);
  });
  container.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    pivot.rotation.y += (event.clientX - lastX) * 0.01;
    pivot.rotation.x = Math.max(-0.5, Math.min(0.5, pivot.rotation.x + (event.clientY - lastY) * 0.005));
    lastX = event.clientX;
    lastY = event.clientY;
  });
  container.addEventListener('pointerup', () => { dragging = false; });
  container.addEventListener('pointercancel', () => { dragging = false; });
  container.addEventListener('wheel', (event) => {
    event.preventDefault();
    setDistance(cameraDistance * (1 + event.deltaY * 0.001));
  }, { passive: false });
  container.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 2) return;
    const dx = event.touches[0].clientX - event.touches[1].clientX;
    const dy = event.touches[0].clientY - event.touches[1].clientY;
    const distance = Math.hypot(dx, dy);
    if (pinchDistance) setDistance(cameraDistance * pinchDistance / distance);
    pinchDistance = distance;
  }, { passive: true });
  container.addEventListener('touchend', () => { pinchDistance = 0; });

  const loader = new THREE.GLTFLoader();
  loader.load(modelUrl, (gltf) => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);
    pivot.add(model);
    const largestSide = Math.max(size.x, size.y, size.z);
    setDistance(largestSide / (2 * Math.tan(THREE.Math.degToRad(camera.fov / 2))) * 1.35);
    loadingNotice.remove();
  }, undefined, () => {
    loadingNotice.textContent = 'Das 3D-Modell konnte nicht geladen werden.';
  });

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  setDistance(cameraDistance);
  render();
}
