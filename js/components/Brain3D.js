const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
const ORBIT_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js';

export async function createBrain3D(container) {
  if (!container || container.clientWidth === 0) {
    for (let i = 0; i < 10; i++) {
      await new Promise(r => requestAnimationFrame(r));
      if (container?.clientWidth > 0) break;
    }
    if (!container || container.clientWidth === 0) return;
  }

  try {
    const THREE = await import(THREE_URL);
    const { OrbitControls } = await import(ORBIT_URL);
    initScene(container, THREE, OrbitControls);
  } catch (e) {
    container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-tertiary);font-size:48px;">🧠</div>`;
  }
}

function initScene(container, THREE, OrbitControls) {
  const w = container.clientWidth;
  const h = container.clientHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.25);

  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.set(2.5, 1.5, 4);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 4;
  controls.target.set(0, 0, 0);

  // Low-poly neural geometry — smaller scale for feature box
  const nodeCount = 180;
  const positions = [];
  const baseCoords = [];

  for (let i = 0; i < nodeCount; i++) {
    const u = Math.random(), v = Math.random();
    const theta = u * 2 * Math.PI;
    const phi = Math.acos(2 * v - 1);
    let x = Math.sin(phi) * Math.sin(theta);
    let y = Math.cos(phi);
    let z = Math.sin(phi) * Math.cos(theta);
    y *= 0.65; z *= 1.3; x *= 0.85;
    const side = x >= 0 ? 1 : -1;
    if (Math.abs(x) < 0.2 && y > -0.1) x *= 0.4;
    else { x += side * 0.08 * Math.sin(z * 3); y += 0.05 * Math.cos(z * 5); }
    x *= 1.4; y *= 1.4; z *= 1.4;
    positions.push(x, y, z);
    baseCoords.push(x, y, z);
  }

  // Connection lines
  const indices = [];
  const maxDist = 0.7;
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = positions[i*3] - positions[j*3];
      const dy = positions[i*3+1] - positions[j*3+1];
      const dz = positions[i*3+2] - positions[j*3+2];
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < maxDist) indices.push(i, j);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  // Hemisphere colors
  const colors = [];
  const c1 = new THREE.Color('#00ff9c');
  const c2 = new THREE.Color('#00d4ff');
  for (let i = 0; i < nodeCount; i++) {
    const c = positions[i * 3] > 0 ? c2 : c1;
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Nodes
  const nodeMat = new THREE.PointsMaterial({
    size: 0.06, vertexColors: true, transparent: true,
    opacity: 0.85, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, nodeMat);
  scene.add(points);

  // Lines
  geo.setIndex(indices);
  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true,
    opacity: 0.15, blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(geo, lineMat);
  scene.add(lines);

  // Glow ring
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x00ff9c), transparent: true,
    opacity: 0.04, side: 2, wireframe: true,
  });
  const ring = new THREE.Mesh(new THREE.SphereGeometry(1.6, 24, 12), ringMat);
  ring.scale.set(1, 0.2, 1);
  scene.add(ring);

  const clock = new THREE.Clock();
  let animId;

  function animate() {
    animId = requestAnimationFrame(animate);
    if (!container.isConnected) { cancelAnimationFrame(animId); return; }

    const time = clock.getElapsedTime();
    const pos = geo.attributes.position.array;
    const wave = Math.sin(time) * 0.02;

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      pos[idx] = baseCoords[idx] + Math.sin(baseCoords[idx+2] * 2 + time) * 0.03;
      pos[idx + 1] = baseCoords[idx + 1] + Math.cos(baseCoords[idx] * 2 + time) * 0.02;
      pos[idx + 2] = baseCoords[idx + 2];
    }
    geo.attributes.position.needsUpdate = true;

    ring.material.opacity = 0.03 + Math.sin(time * 0.5) * 0.015;
    ring.rotation.x = Math.sin(time * 0.1) * 0.1;

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  const ro = new ResizeObserver(() => {
    const cw = container.clientWidth, ch = container.clientHeight;
    if (cw > 0 && ch > 0) {
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    }
  });
  ro.observe(container);
}
