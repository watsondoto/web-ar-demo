import { initAR } from './ar.js';
import { createPortal } from './portal.js';
import { createParticles } from './particles.js';

let scene, camera, renderer;

async function start() {
  const ar = await initAR();
  scene = ar.scene;
  camera = ar.camera;
  renderer = ar.renderer;

  const portal = createPortal();
  ar.marker.add(portal);

  const particles = createParticles();
  portal.add(particles);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

start();
