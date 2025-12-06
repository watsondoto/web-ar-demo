export async function initAR() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const arSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
    sourceWidth: 1280,
    sourceHeight: 720,
    displayWidth: window.innerWidth,
    displayHeight: window.innerHeight
  });

  await arSource.init(() => {
    window.addEventListener('resize', () => {
      arSource.onResize();
      arSource.copySizeTo(renderer.domElement);
      camera.aspect = renderer.domElement.width / renderer.domElement.height;
      camera.updateProjectionMatrix();
    });
  });

  const arContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/camera_para.dat',
    detectionMode: 'mono'
  });

  await arContext.init(() => {
    camera.projectionMatrix.copy(arContext.getProjectionMatrix());
  });

  const marker = new THREE.Group();
  scene.add(marker);

  new THREEx.ArMarkerControls(arContext, marker, {
    type: 'pattern',
    patternUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/patt.hiro'
  });

  // Render loop
  function update() {
    if (arSource.ready) arContext.update(arSource.domElement);
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  update();

  return { scene, camera, renderer, marker };
}
