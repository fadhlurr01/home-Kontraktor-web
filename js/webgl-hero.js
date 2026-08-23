/* ==========================================================================
   CONTRACTOR.HUB - 3D Structural Canvas (WebGL / Three.js)
   Visuals: Floating Steel I-Beams, Scaffolding Wireframes, Particle Physics
   ========================================================================== */

class StructuralCanvasHero {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    this.structureGroup = null;
    this.particleSystem = null;
    this.currentMode = 'all';

    this.targetRotation = { x: 0.15, y: -0.2 };
    this.currentRotation = { x: 0.15, y: -0.2 };
    this.mouse = { x: 0, y: 0 };
    this.isHovered = false;

    this.init();
  }

  init() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x07090D, 0.002);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 5, 28);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const dirLightAmber = new THREE.DirectionalLight(0xFF8800, 2.5);
    dirLightAmber.position.set(20, 30, 20);
    this.scene.add(dirLightAmber);

    const dirLightCyan = new THREE.DirectionalLight(0x00E5FF, 2.0);
    dirLightCyan.position.set(-20, -10, 15);
    this.scene.add(dirLightCyan);

    // Root Group
    this.structureGroup = new THREE.Group();
    this.scene.add(this.structureGroup);

    // Build Initial 3D Model & Particles
    this.buildModeModel('all');
    this.createScaffoldingParticles();

    // Event Listeners
    this.bindEvents();

    // Animation Loop
    this.animate();
  }

  createIBeam(length = 10, flangeWidth = 3, flangeThickness = 0.35, webThickness = 0.35) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: 0x2A3245,
      metalness: 0.85,
      roughness: 0.25
    });

    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.4
    });

    // Top Flange
    const topFlangeGeo = new THREE.BoxGeometry(flangeWidth, flangeThickness, length);
    const topFlange = new THREE.Mesh(topFlangeGeo, material);
    topFlange.position.y = (flangeWidth / 2) - (flangeThickness / 2);
    group.add(topFlange);

    // Bottom Flange
    const bottomFlangeGeo = new THREE.BoxGeometry(flangeWidth, flangeThickness, length);
    const bottomFlange = new THREE.Mesh(bottomFlangeGeo, material);
    bottomFlange.position.y = -((flangeWidth / 2) - (flangeThickness / 2));
    group.add(bottomFlange);

    // Web
    const webHeight = flangeWidth - (flangeThickness * 2);
    const webGeo = new THREE.BoxGeometry(webThickness, webHeight, length);
    const web = new THREE.Mesh(webGeo, material);
    group.add(web);

    // Wireframe edges
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(flangeWidth, flangeWidth, length));
    const line = new THREE.LineSegments(edges, wireframeMat);
    group.add(line);

    return group;
  }

  buildModeModel(mode) {
    this.currentMode = mode;

    // Clear old structures
    while (this.structureGroup.children.length > 0) {
      const obj = this.structureGroup.children[0];
      this.structureGroup.remove(obj);
    }

    if (mode === 'all') {
      // Combined I-Beam Pavilion + Scaffolding
      const beam1 = this.createIBeam(14, 2.5);
      beam1.rotation.set(0.3, 0.4, 0.1);
      beam1.position.set(0, 1, 0);
      this.structureGroup.add(beam1);

      const beam2 = this.createIBeam(12, 2.0);
      beam2.rotation.set(-0.4, 0.8, -0.2);
      beam2.position.set(-2, -3, 2);
      this.structureGroup.add(beam2);

      // Floor grid
      const gridHelper = new THREE.GridHelper(24, 24, 0x00E5FF, 0x1A253A);
      gridHelper.position.y = -6;
      this.structureGroup.add(gridHelper);

      // Wireframe building cage
      const cageGeo = new THREE.BoxGeometry(10, 12, 10);
      const cageEdges = new THREE.EdgesGeometry(cageGeo);
      const cageLine = new THREE.LineSegments(cageEdges, new THREE.LineBasicMaterial({ color: 0xFF8800, transparent: true, opacity: 0.6 }));
      cageLine.position.set(2, 0, -2);
      this.structureGroup.add(cageLine);

    } else if (mode === 'interior') {
      // Luxury Minimalist Interior Pavilion
      const roomGeo = new THREE.BoxGeometry(12, 8, 12);
      const roomEdges = new THREE.EdgesGeometry(roomGeo);
      const roomLine = new THREE.LineSegments(roomEdges, new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.7 }));
      this.structureGroup.add(roomLine);

      // Furniture wireframe placeholder
      const tableGeo = new THREE.BoxGeometry(5, 2.5, 3);
      const tableEdges = new THREE.EdgesGeometry(tableGeo);
      const tableLine = new THREE.LineSegments(tableEdges, new THREE.LineBasicMaterial({ color: 0xFF8800, transparent: true, opacity: 0.85 }));
      tableLine.position.y = -2.5;
      this.structureGroup.add(tableLine);

      // Wall divider
      const wallGeo = new THREE.BoxGeometry(0.3, 6, 8);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x1E273A, transparent: true, opacity: 0.8, roughness: 0.3 });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.position.set(-3, -0.5, 0);
      this.structureGroup.add(wallMesh);

    } else if (mode === 'arch') {
      // Parametric Architectural Tower Scaffolding
      const floors = 6;
      for (let i = 0; i < floors; i++) {
        const size = 9 - (i * 0.8);
        const geo = new THREE.BoxGeometry(size, 1.8, size);
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? 0x00E5FF : 0xFF8800,
          transparent: true,
          opacity: 0.8
        }));
        line.position.y = (i * 2.2) - 5;
        line.rotation.y = i * 0.15;
        this.structureGroup.add(line);
      }

    } else if (mode === 'civil') {
      // Heavy Steel Truss Cantilever
      const trussLength = 16;
      const beamMain = this.createIBeam(trussLength, 2.8);
      beamMain.position.set(0, 0, 0);
      this.structureGroup.add(beamMain);

      const beamCross = this.createIBeam(10, 2.2);
      beamCross.rotation.y = Math.PI / 2;
      beamCross.position.set(0, 3, 0);
      this.structureGroup.add(beamCross);

      // Cable stays
      const cableMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.75 });
      for (let i = -6; i <= 6; i += 3) {
        const points = [
          new THREE.Vector3(0, 6, 0),
          new THREE.Vector3(i, -1, 4)
        ];
        const cableGeo = new THREE.BufferGeometry().setFromPoints(points);
        const cable = new THREE.Line(cableGeo, cableMat);
        this.structureGroup.add(cable);
      }
    }
  }

  createScaffoldingParticles() {
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 250 : 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00E5FF,
      size: 0.18,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  bindEvents() {
    // Window Resize
    window.addEventListener('resize', () => {
      const width = this.canvas.parentElement.clientWidth;
      const height = this.canvas.parentElement.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.targetRotation.y = x * 1.5;
      this.targetRotation.x = y * 0.8;
    });

    // Gyroscope on mobile
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          this.targetRotation.y = (e.gamma / 45) * 0.8;
          this.targetRotation.x = ((e.beta - 45) / 45) * 0.5;
        }
      });
    }

    // Dynamic Filter Pills Integration
    const filterPills = document.querySelectorAll('.hero-filter-box .filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const mode = pill.getAttribute('data-mode') || 'all';
        this.buildModeModel(mode);

        const modeIndicator = document.getElementById('canvas-active-mode');
        if (modeIndicator) {
          const modeLabels = {
            all: 'STRUCTURAL SYNTHESIS v2.6',
            interior: 'INTERIOR FIT-OUT WIREFRAME',
            arch: 'PARAMETRIC TOWER SCAFFOLD',
            civil: 'STEEL TRUSS & CANTILEVER'
          };
          modeIndicator.textContent = modeLabels[mode] || 'STRUCTURAL CAD';
        }
      });
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Kinetic spring damping for rotation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

    if (this.structureGroup) {
      this.structureGroup.rotation.x = this.currentRotation.x + Math.sin(elapsedTime * 0.5) * 0.04;
      this.structureGroup.rotation.y = this.currentRotation.y + elapsedTime * 0.08;
      this.structureGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.3;
    }

    if (this.particleSystem) {
      this.particleSystem.rotation.y = elapsedTime * 0.03;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization helper
document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    window.hero3D = new StructuralCanvasHero('hero-webgl-canvas');
  }
});
