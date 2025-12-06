export function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const count = 500;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({ size: 0.05, color: 0xff00ff });

  const particles = new THREE.Points(geometry, material);
  particles.position.y = 0.5;

  return particles;
}
