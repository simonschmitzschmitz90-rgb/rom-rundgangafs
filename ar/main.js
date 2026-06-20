const loader = new THREE.GLTFLoader();

const onRenderFcts = [];

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setClearColor(new THREE.Color("lightgrey"), 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.Camera();
scene.add(camera);

const baseLight = new THREE.AmbientLight(0xffffff);
scene.add(baseLight);

const arToolkitSource = new THREEx.ArToolkitSource({
  sourceType: "webcam",
});

arToolkitSource.init(function () {
  setTimeout(onResize, 0);
});

function onResize() {
  arToolkitSource.onResizeElement();
  arToolkitSource.copyElementSizeTo(renderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
  }
}

const arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl:
    THREEx.ArToolkitContext.baseURL + "/data/data/camera_para.dat",
  detectionMode: "mono",
  maxDetectionRate: 30,
  canvasWidth: 80 * 3,
  canvasHeight: 60 * 3,
});

arToolkitContext.init(function () {
  console.log("arToolkitContext");

  camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  onResize();
});

function render() {
  onResize();
  if (arToolkitSource.ready) {
    arToolkitContext.update(arToolkitSource.domElement);
  }
  renderer.render(scene, camera);
  onRenderFcts.forEach((onRenderFct) => onRenderFct());
  requestAnimationFrame(render);
}

function addMesh(modelName) {
  const modelUrl = `/rom-rundgangafs/ar/models/${modelName}.glb`;
  const markerRoot = new THREE.Group();
  scene.add(markerRoot);
  const marker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type: "pattern",
    patternUrl: "/rom-rundgangafs/ar/lib/ar.js/data/data/patt.kanji",
  });

  const smoothedMarkerRoot = new THREE.Group();
  scene.add(smoothedMarkerRoot);
  const smoothedMarkerControls = new THREEx.ArSmoothedControls(
    smoothedMarkerRoot,
    {
      lerpPosition: 0.4,
      lerpQuaternion: 0.3,
      lerpScale: 1,
    },
  );
  onRenderFcts.push(function () {
    smoothedMarkerControls.update(markerRoot);
  });

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1.2);
  hemiLight.position.set(0, 50, 50);
  smoothedMarkerRoot.add(hemiLight);

  loader.load(modelUrl, (gltf) => {
    const model = gltf.scene;
    smoothedMarkerRoot.add(model);
  });
}

render();
