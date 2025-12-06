export async function initAR() {
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const arSource = new THREEx.ArToolkitSource({ sourceType: 'webcam' });
  await arSource.init(() => {
    window.addEventListener('resize', () => {
      arSource.onResize();
      arSource.copySizeTo(renderer.domElement);
    });
  });

  const arContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/camera_para.dat',
    detectionMode: 'mono'
  });

  await arContext.init();

  const marker = new THREE.Group();
  scene.add(marker);

  new THREEx.ArMarkerControls(arContext, marker, {
    type: 'pattern',
    patternUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/patt.hiro'
  });

  return { scene, camera, renderer, marker };
}
