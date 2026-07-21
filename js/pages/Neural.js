const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
const ORBIT_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js';

export function renderNeural() {
  const page = document.createElement('div');
  page.style.cssText = 'position:fixed;inset:0;z-index:0;background:#030308;';

  // Canvas container — always visible, Three.js renders into it
  const canvas = document.createElement('div');
  canvas.style.cssText = 'position:absolute;inset:0;z-index:1;';
  page.appendChild(canvas);

  // HUD panels — inside page, high z-index
  page.innerHTML += `
    <div style="position:absolute;z-index:10;top:clamp(76px,10vh,30px);left:clamp(12px,4vw,30px);width:clamp(180px,22vw,260px);background:rgba(5,5,15,0.85);border:1px solid rgba(0,242,254,0.2);padding:clamp(12px,2vw,20px);border-radius:12px;backdrop-filter:blur(10px);pointer-events:auto;">
      <div style="font-size:clamp(0.9rem,1.8vw,1.3rem);font-weight:800;letter-spacing:2px;color:#fff;">CORTEX ENGINE</div>
      <div style="font-size:clamp(0.55rem,0.9vw,0.7rem);color:#00f2fe;letter-spacing:2px;margin:0 0 12px 0;">Neural Core v4.0.26</div>
      <div class="nr"><span>STATUS:</span><span id="sv" style="color:#00f2fe;">BOOTING</span></div>
      <div class="nr"><span>LOAD:</span><span id="lv">--</span></div>
      <div class="nr"><span>LATENCY:</span><span id="ltv">--</span></div>
      <div class="nr"><span>NODES:</span><span id="nv" style="color:#9b51e0;">--</span></div>
      <button id="spk" style="width:100%;margin-top:10px;padding:8px;background:transparent;border:1px solid #00f2fe;color:#00f2fe;border-radius:6px;cursor:pointer;font-size:clamp(0.6rem,0.9vw,0.75rem);display:none;">INJECT SPIKE</button>
    </div>
    <div style="position:absolute;z-index:10;top:clamp(76px,10vh,30px);right:clamp(12px,4vw,30px);width:clamp(140px,18vw,220px);background:rgba(5,5,15,0.85);border:1px solid rgba(0,242,254,0.2);padding:clamp(12px,2vw,20px);border-radius:12px;backdrop-filter:blur(10px);pointer-events:none;">
      <div style="font-size:clamp(0.55rem,0.9vw,0.7rem);color:#00f2fe;letter-spacing:2px;margin-bottom:8px;">TELEMETRY</div>
      <div class="nr"><span>VEC_X:</span><span id="vx">--</span></div>
      <div class="nr"><span>VEC_Y:</span><span id="vy">--</span></div>
      <div class="nr"><span>BANDWIDTH:</span><span id="bw" style="color:#9b51e0;">--</span></div>
    </div>
    <style>
      .nr{display:flex;justify-content:space-between;margin-bottom:4px;font-size:clamp(0.6rem,0.9vw,0.75rem);border-bottom:1px dashed rgba(255,255,255,0.08);padding-bottom:3px;font-family:Inter,sans-serif;}
      .nr span:first-child{color:#8a99ad;}
      .nr span:last-child{color:#00f2fe;font-weight:bold;}
      #spk:hover{background:#00f2fe;color:#030308;box-shadow:0 0 15px #00f2fe;}
    </style>
  `;

  // Load Three.js asynchronously (same pattern as Brain3D)
  requestAnimationFrame(async () => {
    try {
      const THREE = await import(THREE_URL);
      const { OrbitControls } = await import(ORBIT_URL);
      if (!THREE.WebGLRenderer) throw new Error('Three.js load incomplete');

      // HUD ready
      document.getElementById('sv').textContent = 'NOMINAL';
      document.getElementById('nv').textContent = '350';
      document.getElementById('spk').style.display = 'block';

      initNeural(canvas, THREE, OrbitControls);
    } catch (e) {
      document.getElementById('sv').textContent = 'ERROR';
      document.getElementById('sv').style.color = '#ff3366';
      canvas.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;color:#ff3366;font-family:Inter,sans-serif;font-size:16px;gap:8px;"><span style="font-size:32px;">⚠</span><span>Neural Engine Error</span><span style="font-size:13px;opacity:0.6;">${e.message}</span></div>`;
    }
  });

  return page;
}

function initNeural(container, THREE, OrbitControls) {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;

  const TELEM = {
    engineLoad: 42, synapticLatency: 1.24, activeNodes: 350,
    isSpiking: false, spikeEnergy: 0, bandwidth: 84.2, cieConnected: false,
  };

  // Poll CIE telemetry every 3 seconds
  let lastTelemetryFetch = 0;
  async function fetchTelemetry() {
    try {
      const r = await fetch('/api/cie/status');
      const data = await r.json();
      TELEM.engineLoad = data.engineLoad || 42;
      TELEM.synapticLatency = data.synapticLatency || 1.24;
      TELEM.bandwidth = data.bandwidth || 84.2;
      TELEM.cieConnected = data.connected || false;
      const sv = document.getElementById('sv');
      if (sv) sv.textContent = data.connected ? 'CIE LIVE' : 'SIMULATED';
      if (sv) sv.style.color = data.connected ? '#00ff9c' : '#ffd700';
    } catch {}
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030308);

  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
  camera.position.set(0, 2.5, 5.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 12;
  controls.minDistance = 3;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.3;

  // Generate geometry
  const nodeCount = 350;
  const nodePositions = [];
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
    x *= 1.8; y *= 1.8; z *= 1.8;
    nodePositions.push(x, y, z);
    baseCoords.push(x, y, z);
  }

  const lineIndices = [];
  const maxDist = 0.65;
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = nodePositions[i*3] - nodePositions[j*3];
      const dy = nodePositions[i*3+1] - nodePositions[j*3+1];
      const dz = nodePositions[i*3+2] - nodePositions[j*3+2];
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < maxDist) lineIndices.push(i, j);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));

  const colors = [];
  const c1 = new THREE.Color('#00f2fe');
  const c2 = new THREE.Color('#9b51e0');
  for (let i = 0; i < nodeCount; i++) {
    const c = nodePositions[i * 3] > 0 ? c2 : c1;
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const nodeMat = new THREE.PointsMaterial({
    size: 0.06, vertexColors: true, transparent: true,
    opacity: 0.9, blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(geo, nodeMat));

  const wireMat = new THREE.LineBasicMaterial({
    color: 0x00f2fe, transparent: true, opacity: 0.08,
  });
  scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.9, 16, 8)), wireMat));

  geo.setIndex(lineIndices);
  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true,
    opacity: 0.25, blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.LineSegments(geo, lineMat));

  const clock = new THREE.Clock();
  let animId;

  function updateUI(time) {
    if (!TELEM.isSpiking) {
      TELEM.engineLoad = 40 + Math.sin(time * 0.5) * 5 + Math.cos(time * 2) * 2;
      TELEM.synapticLatency = 1.1 + Math.sin(time * 0.8) * 0.15;
      TELEM.bandwidth = 80 + Math.sin(time) * 4;
    } else {
      TELEM.spikeEnergy *= 0.94;
      if (TELEM.spikeEnergy < 0.01) { TELEM.isSpiking = false; }
    }
    const s = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    s('lv', TELEM.engineLoad.toFixed(1) + '%');
    s('ltv', TELEM.synapticLatency.toFixed(2) + 'ms');
    s('bw', TELEM.bandwidth.toFixed(1) + ' GB/s');
    s('vx', camera.position.x.toFixed(2));
    s('vy', camera.position.y.toFixed(2));
  }

  document.getElementById('spk')?.addEventListener('click', () => {
    TELEM.isSpiking = true; TELEM.spikeEnergy = 1.0;
    TELEM.engineLoad = 98.4; TELEM.synapticLatency = 0.41; TELEM.bandwidth = 189.7;
    const el = document.getElementById('sv'); if (el) { el.textContent = 'SPIKE'; el.style.color = '#ff3366'; }
    setTimeout(() => {
      const el2 = document.getElementById('sv');
      if (el2) { el2.textContent = 'NOMINAL'; el2.style.color = '#00f2fe'; }
    }, 2000);
  });

  function animate() {
    if (!container.isConnected) { cancelAnimationFrame(animId); return; }
    animId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    const pos = geo.attributes.position.array;
    const speedMod = TELEM.engineLoad / 40.0;
    const waveOff = time * (TELEM.isSpiking ? 5.0 : 1.5);

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      const bx = baseCoords[idx], by = baseCoords[idx+1], bz = baseCoords[idx+2];
      const wave = Math.sin(bz * 2.0 + waveOff) * 0.04 * speedMod;
      pos[idx] = bx + wave * (bx * 0.3);
      pos[idx + 1] = by + Math.cos(bx * 2.0 + waveOff) * 0.03 * speedMod;
      pos[idx + 2] = bz;
      if (TELEM.isSpiking) {
        pos[idx] += bx * TELEM.spikeEnergy * 0.2;
        pos[idx + 1] += by * TELEM.spikeEnergy * 0.2;
        pos[idx + 2] += bz * TELEM.spikeEnergy * 0.2;
      }
    }
    geo.attributes.position.needsUpdate = true;
    lineMat.opacity = 0.15 + (TELEM.engineLoad / 200.0);
    // Fetch live CIE telemetry every 3 seconds
    if (Date.now() - lastTelemetryFetch > 3000) {
      lastTelemetryFetch = Date.now();
      fetchTelemetry();
    }
    controls.update();
    updateUI(time);
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
