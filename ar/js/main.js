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

    loader.load(getModelUrl(model), (gltf) => {
      const model = gltf.scene;
      model.rotation.x = Math.PI / 2;
      model.scale.setScalar(20);
      markerRoot.add(model);
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
