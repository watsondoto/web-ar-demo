export function createPortal() {
  const group = new THREE.Group();

  const geometry = new THREE.RingGeometry(0.6, 0.8, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
  });

  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.5;

  group.add(ring);

  function animate() {
    ring.rotation.z += 0.02;
    requestAnimationFrame(animate);
  }
  animate();

  return group;
}
