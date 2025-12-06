let scene, camera, renderer;
let arSource, arContext, markerRoot;
let portal;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    1000 // Far plane
  );
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Camera source
  arSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam'
  });

  arSource.init(() => {
    onResize();
    document.getElementById("loading").innerText = "Scan HIRO marker";
  });

  window.addEventListener('resize', onResize);

  // AR Context
  arContext = new THREEx.ArToolkitContext({
    cameraParametersUrl:
      'https://raw.githack.com/AR-js-org/AR.js/master/data/camera_para.dat',
    detectionMode: 'mono'
  });

  arContext.init(() => {
    camera.projectionMatrix.copy(arContext.getProjectionMatrix());
  });

  // Marker
  markerRoot = new THREE.Group();
  scene.add(markerRoot);

  new THREEx.ArMarkerControls(arContext, markerRoot, {
    type: 'pattern',
    patternUrl:
      'https://raw.githack.com/AR-js-org/AR.js/master/data/patt.hiro'
  });

  createPortal();
}

function createPortal() {
  const ringGeo = new THREE.RingGeometry(0.6, 0.8, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
  });
  portal = new THREE.Mesh(ringGeo, ringMat);
  portal.rotation.x = Math.PI / 2;
  portal.position.y = 0.5;

  markerRoot.add(portal);
}

function onResize() {
  arSource.onResize();
  arSource.copySizeTo(renderer.domElement);
  if (arContext.arController) {
    arSource.copySizeTo(arContext.arController.canvas);
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (arSource.ready !== false) {
    arContext.update(arSource.domElement);
  }

  if (portal) {
    portal.rotation.z += 0.02;
  }

  renderer.render(scene, camera);
}
