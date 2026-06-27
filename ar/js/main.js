import "../third_party/three.js/three.js";
import "../third_party/three.js/loaders/GLTFLoader.js";
import "../third_party/jsartoolkit5/js/artoolkit.three.js";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const debug = false;
const repoMediaBase = "https://media.githubusercontent.com/media/simonschmitzschmitz90-rgb/rom-rundgangafs/main/ar/models/";

function getModelUrl(model) {
  if (location.hostname.endsWith("github.io")) {
    return `${repoMediaBase}${model}.glb`;
  }
  return `./models/${model}.glb`;
}

let arScene;
let arController;
let arCamera;
let markerRoot;
let loadingText;

function resize() {
  if (!arController) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    return;
  }
  const videoAspect = arController.videoHeight / arController.videoWidth;
  const windowAspect = window.innerHeight / window.innerWidth;
  if (window.innerHeight / window.innerWidth > 1) {
    renderer.domElement.style.transform = "rotate(-90deg)";
  } else {
    renderer.domElement.style.transform = "none";
  }
  if (windowAspect < videoAspect) {
    const w = window.innerWidth;
    const h = window.innerWidth * videoAspect;
    renderer.setSize(w, h);
    renderer.domElement.style.marginLeft = "0";
    renderer.domElement.style.marginTop = `-${(h - window.innerHeight) / 2}px`;
  } else {
    const w = window.innerHeight / videoAspect;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.domElement.style.marginTop = "0";
    renderer.domElement.style.marginLeft = `-${(w - window.innerWidth) / 2}px`;
  }
}

window.addEventListener("resize", resize);

let raf;
function tick(time) {
  arScene.process();
  arScene.renderOn(renderer);
  raf = requestAnimationFrame(tick);
}

function makeTestCube() {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 0.2),
    new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      opacity: 1,
      transparent: true,
      depthTest: false,
    }),
  );
  cube.name = "TestCube";
  cube.renderOrder = 5;
  cube.matrixAutoUpdate = false;
  return cube;
}

function makeFloatingText(message) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(255, 250, 240, 0.94)";
  context.strokeStyle = "rgba(90, 58, 34, 0.45)";
  context.lineWidth = 10;
  roundRect(context, 28, 36, canvas.width - 56, canvas.height - 72, 52);
  context.fill();
  context.stroke();

  context.fillStyle = "#4d321f";
  context.font = "700 58px Arial, Helvetica, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(message, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.name = "LoadingText";
  sprite.position.set(0, 0, 8);
  sprite.scale.set(12, 3, 1);
  sprite.renderOrder = 10;
  return sprite;
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

async function init() {
  const name = "mapRoot";
  const path = "data/multi-barcode.dat";
  arController.loadMultiMarker(path, async (marker, markerNum) => {
    markerRoot = arController.createThreeMultiMarker(marker);
    arScene.scene.add(markerRoot);

    if (debug === true) {
      for (let i = 0; i < markerNum; i++) {
        markerRoot.markers[i] = makeTestCube(i + 1);
        markerRoot.add(markerRoot.markers[i]);
      }
    }

    const baseLight = new THREE.AmbientLight(0xffffff);
    markerRoot.add(baseLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1.2);
    hemiLight.position.set(0, 500, 500);
    markerRoot.add(hemiLight);

    const loader = new THREE.GLTFLoader();

    const url = new URL(location.href);
    const model = url.searchParams.get("model");
    loadingText = makeFloatingText("3D-Modell wird geladen …");
    markerRoot.add(loadingText);

    loader.load(getModelUrl(model), (gltf) => {
      const model = gltf.scene;
      model.rotation.x = Math.PI / 2;
      model.scale.setScalar(20);
      markerRoot.add(model);
      if (loadingText) {
        markerRoot.remove(loadingText);
        loadingText.material.map.dispose();
        loadingText.material.dispose();
        loadingText = null;
      }
    }, undefined, () => {
      if (loadingText) {
        markerRoot.remove(loadingText);
        loadingText.material.map.dispose();
        loadingText.material.dispose();
      }
      loadingText = makeFloatingText("3D-Modell konnte nicht geladen werden");
      markerRoot.add(loadingText);
    });
  });

  resize();
  tick();
}

window.addEventListener("orientationchange", () => {
  window.cancelAnimationFrame(raf);
  renderer.setSize(window.innerWidth, window.innerHeight);
  getUserMedia();
});

function getUserMedia() {
  ARController.getUserMediaThreeScene({
    maxARVideoSize: 1280,
    // maxARVideoSize: 640,
    cameraParam: "data/camera_para-iphone.dat",
    onSuccess: async (scene, controller, camera) => {
      console.log("Success:");
      arScene = scene;
      arController = controller;
      arCamera = camera;
      arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
      init();
    },
    onError: (err) => {
      console.dir(err);
    },
  });
}

getUserMedia();
