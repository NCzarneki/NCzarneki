/* Hero particle cloud — organic blue glow (Three.js) */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const visual = document.querySelector('.hero-visual');
  if (!canvas || !visual || typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visual.classList.add('is-ready');
    return;
  }

  const COUNT = 9000;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 5.5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const base = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = Math.PI * 2 * u;
    const phi = Math.acos(2 * v - 1);
    let r = Math.cbrt(Math.random());

    const warp =
      0.65 +
      0.35 * Math.sin(theta * 4) * Math.cos(phi * 3) +
      0.2 * Math.sin(phi * 6 + theta * 2);
    r *= warp;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.75;
    const z = r * Math.cos(phi) * 0.9;

    const scale = 2.4;
    const px = x * scale;
    const py = y * scale;
    const pz = z * scale;

    const i3 = i * 3;
    positions[i3] = px;
    positions[i3 + 1] = py;
    positions[i3 + 2] = pz;
    base[i3] = px;
    base[i3 + 1] = py;
    base[i3 + 2] = pz;

    const dist = Math.sqrt(x * x + y * y + z * z);
    const t = Math.min(1, dist / 1.1);
    colors[i3] = 0.15 + t * 0.25;
    colors[i3 + 1] = 0.45 + (1 - t) * 0.35;
    colors[i3 + 2] = 0.95 + (1 - t) * 0.05;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function layoutBlob() {
    const mobile = window.innerWidth < 768;
    points.position.x = mobile ? 0.4 : 2.2;
    points.position.y = mobile ? -0.2 : 0;
    points.scale.setScalar(mobile ? 0.85 : 1);
  }

  function resize() {
    const w = visual.clientWidth;
    const h = visual.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    layoutBlob();
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  resize();
  requestAnimationFrame(() => visual.classList.add('is-ready'));

  const posAttr = geometry.attributes.position;
  let time = 0;
  let paused = false;

  function tick() {
    if (paused) return;
    requestAnimationFrame(tick);
    time += 0.004;

    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    points.rotation.y = time * 0.35 + mouse.x * 0.25;
    points.rotation.x = mouse.y * 0.15;
    points.rotation.z = Math.sin(time * 0.5) * 0.08;

    const arr = posAttr.array;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const bx = base[i3];
      const by = base[i3 + 1];
      const bz = base[i3 + 2];
      const n =
        Math.sin(time * 2 + bx * 1.8) * 0.03 +
        Math.cos(time * 1.5 + by * 2.2) * 0.03;
      arr[i3] = bx + bx * n;
      arr[i3 + 1] = by + by * n;
      arr[i3 + 2] = bz + bz * n;
    }
    posAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) tick();
  });

  tick();
})();
