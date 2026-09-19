import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Scan, Compass, ZoomIn, ZoomOut, Move3d, FileCode2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const layers = {
  rebar: {
    title: 'Layer 01: Struktur Beton Bertulang & Pembesian Rebar',
    desc: 'Kolom baja tulangan ulir D19-D25 dengan sengkang D10-100mm, mutu beton ready-mix K-350 slump 12±2 cm tahan gempa zona 4.',
    standard: 'STANDAR: SNI 2847:2019 & SNI 1729:2020 (Beton Struktural & Baja Gedung)'
  },
  mep: {
    title: 'Layer 02: Instalasi Plumbing MEP & Cable Tray Elektrikal',
    desc: 'Jalur pipa PPR PN-10 air bersih, ducting HVAC central galvanized spiral, serta kabel FRC tahan api 3 jam untuk proteksi gedung.',
    standard: 'STANDAR: NFPA 13 & SNI 03-6575 (Tata Kelola Mekanikal-Elektrikal)'
  },
  finishing: {
    title: 'Layer 03: Fasad Arsitektural Kaca & Travertine Finishing',
    desc: 'Dinding curtain wall double glazing 12mm Low-E kedap suara, panel louvers sunshade aerofoil komposit, dan kanopi entrance.',
    standard: 'STANDAR: Green Building Council Indonesia & ISO 9001:2015'
  },
  all: {
    title: 'Layer 04: Full Integrated Multi-Discipline BIM 3D Model',
    desc: 'Model koordinasi federasi BIM terintegrasi mencakup Arsitektur, Struktur, dan MEP dengan clash detection LOD 350 siap tender.',
    standard: 'STANDAR: ISO 19650 (Building Information Modelling)'
  }
};

export default function BimViewer() {
  const { openModal } = useApp();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('rebar');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [activePin, setActivePin] = useState(null);

  // Three.js instances ref
  const viewerStateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    modelGroup: null,
    structureGroup: null,
    rebarGroup: null,
    mepGroup: null,
    facadeGroup: null,
    materials: {},
    distance: 28,
    targetDistance: 28,
    azimuth: 0.78,
    elevation: 0.58,
    targetAzimuth: 0.78,
    targetElevation: 0.58,
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    hoverDelta: { x: 0, y: 0 },
    hotspots: [
      { id: 'bim-pin-1', layer: 'rebar', pos: new THREE.Vector3(-5.5, 4.8, 5.5) },
      { id: 'bim-pin-2', layer: 'rebar', pos: new THREE.Vector3(0, 8.8, 0) },
      { id: 'bim-pin-3', layer: 'mep', pos: new THREE.Vector3(2.4, 8.15, 0) }
    ]
  });

  const [pinPositions, setPinPositions] = useState({
    'bim-pin-1': { x: 32, y: 38, visible: true },
    'bim-pin-2': { x: 58, y: 54, visible: true },
    'bim-pin-3': { x: 74, y: 28, visible: false }
  });

  const currentSpec = layers[activeLayer] || layers.rebar;

  const createWFBeam = (length, depth = 0.5, width = 0.32, flangeT = 0.05, webT = 0.04, materials) => {
    const beam = new THREE.Group();
    const topGeo = new THREE.BoxGeometry(width, flangeT, length);
    const botGeo = new THREE.BoxGeometry(width, flangeT, length);
    const webGeo = new THREE.BoxGeometry(webT, depth - flangeT * 2, length);

    const top = new THREE.Mesh(topGeo, materials.steelWF);
    top.position.y = depth / 2 - flangeT / 2;
    const bot = new THREE.Mesh(botGeo, materials.steelWF);
    bot.position.y = -depth / 2 + flangeT / 2;
    const web = new THREE.Mesh(webGeo, materials.steelWF);

    beam.add(top);
    beam.add(bot);
    beam.add(web);

    const plateGeo = new THREE.BoxGeometry(width + 0.04, depth + 0.04, 0.08);
    const plate1 = new THREE.Mesh(plateGeo, materials.steelWFHighlight);
    plate1.position.z = length / 2;
    const plate2 = new THREE.Mesh(plateGeo, materials.steelWFHighlight);
    plate2.position.z = -length / 2;
    beam.add(plate1);
    beam.add(plate2);

    return beam;
  };

  // Switch layers in Three.js model
  useEffect(() => {
    const s = viewerStateRef.current;
    if (!s.structureGroup || !s.rebarGroup || !s.mepGroup || !s.facadeGroup) return;

    if (activeLayer === 'rebar') {
      s.structureGroup.visible = true;
      s.rebarGroup.visible = true;
      s.mepGroup.visible = false;
      s.facadeGroup.visible = false;
      setStructureMaterials('translucent');
    } else if (activeLayer === 'mep') {
      s.structureGroup.visible = true;
      s.rebarGroup.visible = false;
      s.mepGroup.visible = true;
      s.facadeGroup.visible = false;
      setStructureMaterials('ghost');
    } else if (activeLayer === 'finishing') {
      s.structureGroup.visible = true;
      s.rebarGroup.visible = false;
      s.mepGroup.visible = false;
      s.facadeGroup.visible = true;
      setStructureMaterials('solid');
    } else if (activeLayer === 'all') {
      s.structureGroup.visible = true;
      s.rebarGroup.visible = true;
      s.mepGroup.visible = true;
      s.facadeGroup.visible = true;
      setStructureMaterials('translucent');
    }
  }, [activeLayer]);

  const setStructureMaterials = (mode) => {
    const s = viewerStateRef.current;
    const mat =
      mode === 'ghost'
        ? s.materials.concreteGhost
        : mode === 'solid'
        ? s.materials.concreteSolid
        : s.materials.concreteTranslucent;

    if (s.structureGroup) {
      s.structureGroup.traverse((child) => {
        if (
          child.isMesh &&
          (child.name === 'columnConcrete' ||
            child.name === 'floorSlab' ||
            child.name === 'coreWall')
        ) {
          child.material = mat;
        }
      });
    }
  };

  // Wireframe toggle effect
  useEffect(() => {
    const s = viewerStateRef.current;
    if (!s.materials) return;
    Object.values(s.materials).forEach((m) => {
      if (m.wireframe !== undefined && !m.isLineBasicMaterial) {
        m.wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a11, 0.012);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 150);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLightSun = new THREE.DirectionalLight(0xfff3e0, 1.8);
    dirLightSun.position.set(30, 45, 25);
    scene.add(dirLightSun);

    const dirLightCyanFill = new THREE.DirectionalLight(0x00e5ff, 1.2);
    dirLightCyanFill.position.set(-25, 20, -20);
    scene.add(dirLightCyanFill);

    const dirLightWarmRim = new THREE.DirectionalLight(0xff9800, 1.0);
    dirLightWarmRim.position.set(20, -10, -25);
    scene.add(dirLightWarmRim);

    // Materials
    const materials = {
      concreteSolid: new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.85,
        metalness: 0.1
      }),
      concreteTranslucent: new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.6,
        metalness: 0.2,
        transparent: true,
        opacity: 0.35
      }),
      concreteGhost: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0.12
      }),
      rebarSteel: new THREE.MeshStandardMaterial({
        color: 0xff7a00,
        roughness: 0.25,
        metalness: 0.9,
        emissive: 0xdd5700,
        emissiveIntensity: 0.2
      }),
      steelWF: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.85
      }),
      steelWFHighlight: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.3,
        metalness: 0.9
      }),
      hvacDuct: new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        roughness: 0.25,
        metalness: 0.9
      }),
      firePipe: new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.7
      }),
      waterPipe: new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        roughness: 0.25,
        metalness: 0.8
      }),
      cableTray: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.35,
        metalness: 0.85
      }),
      facadeGlass: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.08,
        metalness: 0.2,
        transparent: true,
        opacity: 0.38
      }),
      facadeMullion: new THREE.MeshStandardMaterial({
        color: 0x0b0f17,
        roughness: 0.35,
        metalness: 0.9
      }),
      facadeLouver: new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.5,
        metalness: 0.35
      }),
      edgeLine: new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.45
      })
    };

    const modelGroup = new THREE.Group();
    modelGroup.position.set(0, -3.5, 0);
    scene.add(modelGroup);

    const datumGroup = new THREE.Group();
    const structureGroup = new THREE.Group();
    const rebarGroup = new THREE.Group();
    const mepGroup = new THREE.Group();
    const facadeGroup = new THREE.Group();

    modelGroup.add(datumGroup);
    modelGroup.add(structureGroup);
    modelGroup.add(rebarGroup);
    modelGroup.add(mepGroup);
    modelGroup.add(facadeGroup);

    // Build Datum
    const grid = new THREE.GridHelper(26, 26, 0x00e5ff, 0x1e293b);
    datumGroup.add(grid);

    const footingGeo = new THREE.BoxGeometry(2.4, 0.8, 2.4);
    const colPositions = [
      [-5.5, -5.5],
      [0, -5.5],
      [5.5, -5.5],
      [-5.5, 5.5],
      [0, 5.5],
      [5.5, 5.5]
    ];

    colPositions.forEach(([x, z]) => {
      const pad = new THREE.Mesh(footingGeo, materials.concreteSolid);
      pad.position.set(x, 0.4, z);
      datumGroup.add(pad);

      const edges = new THREE.EdgesGeometry(footingGeo);
      const line = new THREE.LineSegments(edges, materials.edgeLine);
      pad.add(line);
    });

    // Build Structure & Rebar
    const totalHeight = 12.6;
    const colSize = 0.9;

    colPositions.forEach(([cx, cz]) => {
      const colGeo = new THREE.BoxGeometry(colSize, totalHeight, colSize);
      const colMesh = new THREE.Mesh(colGeo, materials.concreteTranslucent);
      colMesh.position.set(cx, totalHeight / 2 + 0.8, cz);
      colMesh.name = 'columnConcrete';
      structureGroup.add(colMesh);

      const edgeLine = new THREE.LineSegments(
        new THREE.EdgesGeometry(colGeo),
        materials.edgeLine
      );
      colMesh.add(edgeLine);

      const rebarCage = new THREE.Group();
      rebarCage.position.set(cx, totalHeight / 2 + 0.8, cz);
      const barGeo = new THREE.CylinderGeometry(0.032, 0.032, totalHeight, 8);

      const barOffsets = [
        [-0.32, -0.32],
        [0, -0.32],
        [0.32, -0.32],
        [-0.32, 0.32],
        [0, 0.32],
        [0.32, 0.32],
        [-0.32, 0],
        [0.32, 0]
      ];

      barOffsets.forEach(([bx, bz]) => {
        const bar = new THREE.Mesh(barGeo, materials.rebarSteel);
        bar.position.set(bx, 0, bz);
        rebarCage.add(bar);
      });

      const stirrupGeo = new THREE.BoxGeometry(0.72, 0.025, 0.72);
      const stirrupEdges = new THREE.EdgesGeometry(stirrupGeo);
      for (let y = -totalHeight / 2 + 0.4; y <= totalHeight / 2 - 0.4; y += 0.65) {
        const stirrupLine = new THREE.LineSegments(
          stirrupEdges,
          new THREE.LineBasicMaterial({ color: 0xfbbf24 })
        );
        stirrupLine.position.set(0, y, 0);
        rebarCage.add(stirrupLine);
      }
      rebarGroup.add(rebarCage);
    });

    const floorLevels = [4.8, 8.8, 12.8];
    floorLevels.forEach((fy) => {
      const slabGeo = new THREE.BoxGeometry(13.6, 0.28, 13.6);
      const slabMesh = new THREE.Mesh(slabGeo, materials.concreteTranslucent);
      slabMesh.position.set(0, fy, 0);
      slabMesh.name = 'floorSlab';
      structureGroup.add(slabMesh);

      const wiremesh = new THREE.GridHelper(13, 16, 0xff7a00, 0xea580c);
      wiremesh.position.set(0, fy + 0.15, 0);
      rebarGroup.add(wiremesh);

      [-5.5, 5.5].forEach((bz) => {
        const beamX = createWFBeam(11.0, 0.5, 0.32, 0.05, 0.04, materials);
        beamX.rotation.y = Math.PI / 2;
        beamX.position.set(0, fy - 0.3, bz);
        structureGroup.add(beamX);
      });

      [-5.5, 0, 5.5].forEach((bx) => {
        const beamZ = createWFBeam(11.0, 0.5, 0.32, 0.05, 0.04, materials);
        beamZ.position.set(bx, fy - 0.3, 0);
        structureGroup.add(beamZ);
      });
    });

    const coreGeo = new THREE.BoxGeometry(3.6, totalHeight, 3.6);
    const coreMesh = new THREE.Mesh(coreGeo, materials.concreteTranslucent);
    coreMesh.position.set(0, totalHeight / 2 + 0.8, 0);
    coreMesh.name = 'coreWall';
    structureGroup.add(coreMesh);

    // Build MEP
    [4.8, 8.8].forEach((fy) => {
      const mainDuctGeo = new THREE.BoxGeometry(1.2, 0.55, 10.5);
      const mainDuct = new THREE.Mesh(mainDuctGeo, materials.hvacDuct);
      mainDuct.position.set(2.4, fy - 0.65, 0);
      mepGroup.add(mainDuct);

      const firePipeGeo = new THREE.CylinderGeometry(0.05, 0.05, 10.8, 8);
      const fireMain = new THREE.Mesh(firePipeGeo, materials.firePipe);
      fireMain.position.set(-2.8, fy - 0.75, 0);
      mepGroup.add(fireMain);

      const waterPipeGeo = new THREE.CylinderGeometry(0.065, 0.065, 11.2, 8);
      const waterPipe = new THREE.Mesh(waterPipeGeo, materials.waterPipe);
      waterPipe.position.set(-3.2, fy - 0.6, 0);
      mepGroup.add(waterPipe);

      const trayGeo = new THREE.BoxGeometry(0.65, 0.12, 10.5);
      const cableTray = new THREE.Mesh(trayGeo, materials.cableTray);
      cableTray.position.set(-1.8, fy - 0.6, 0);
      mepGroup.add(cableTray);
    });

    // Build Facade
    const midY = totalHeight / 2 + 0.8;
    const glassFront = new THREE.Mesh(
      new THREE.BoxGeometry(13.4, totalHeight, 0.08),
      materials.facadeGlass
    );
    glassFront.position.set(0, midY, 6.7);
    facadeGroup.add(glassFront);

    for (let x = -6.7; x <= 6.7; x += 2.23) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, totalHeight, 0.22),
        materials.facadeMullion
      );
      mullion.position.set(x, midY, 6.75);
      facadeGroup.add(mullion);
    }

    // Save state
    const s = viewerStateRef.current;
    s.scene = scene;
    s.camera = camera;
    s.renderer = renderer;
    s.modelGroup = modelGroup;
    s.structureGroup = structureGroup;
    s.rebarGroup = rebarGroup;
    s.mepGroup = mepGroup;
    s.facadeGroup = facadeGroup;
    s.materials = materials;

    // Initial layer
    mepGroup.visible = false;
    facadeGroup.visible = false;

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isAutoRotate && !s.isDragging) {
        s.targetAzimuth += 0.0035;
      }

      // Camera Lerp
      s.azimuth += (s.targetAzimuth - s.azimuth) * 0.08;
      s.elevation += (s.targetElevation - s.elevation) * 0.08;
      s.distance += (s.targetDistance - s.distance) * 0.08;

      const curAzimuth = s.azimuth + s.hoverDelta.x;
      const curElevation = s.elevation + s.hoverDelta.y;

      camera.position.x = s.distance * Math.sin(curAzimuth) * Math.cos(curElevation);
      camera.position.y = s.distance * Math.sin(curElevation);
      camera.position.z = s.distance * Math.cos(curAzimuth) * Math.cos(curElevation);
      camera.lookAt(0, 3.5, 0);

      // Track Hotspots
      const newPositions = {};
      s.hotspots.forEach((h) => {
        const wp = h.pos.clone().applyMatrix4(modelGroup.matrixWorld);
        wp.project(camera);
        if (wp.z < 1.0) {
          const px = ((wp.x + 1) / 2) * 100;
          const py = ((-wp.y + 1) / 2) * 100;
          newPositions[h.id] = {
            x: px,
            y: py,
            visible: px >= 4 && px <= 96 && py >= 4 && py <= 96
          };
        } else {
          newPositions[h.id] = { x: 0, y: 0, visible: false };
        }
      });
      setPinPositions(newPositions);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isAutoRotate]);

  // Pointer drag Orbiting
  const handlePointerDown = (e) => {
    const s = viewerStateRef.current;
    s.isDragging = true;
    s.prevMouse = {
      x: e.clientX || (e.touches && e.touches[0].clientX),
      y: e.clientY || (e.touches && e.touches[0].clientY)
    };
  };

  const handlePointerMove = (e) => {
    const s = viewerStateRef.current;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    if (s.isDragging) {
      const deltaX = clientX - s.prevMouse.x;
      const deltaY = clientY - s.prevMouse.y;
      s.targetAzimuth -= deltaX * 0.008;
      s.targetElevation = Math.max(0.1, Math.min(Math.PI / 2.1, s.targetElevation + deltaY * 0.008));
      s.prevMouse = { x: clientX, y: clientY };
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((clientY - rect.top) / rect.height) * 2 - 1;
      s.hoverDelta.x = normX * 0.15;
      s.hoverDelta.y = normY * 0.1;
    }
  };

  const handlePointerUp = () => {
    viewerStateRef.current.isDragging = false;
  };

  const handleWheel = (e) => {
    const s = viewerStateRef.current;
    s.targetDistance = Math.max(16, Math.min(42, s.targetDistance + e.deltaY * 0.03));
  };

  const handleResetCamera = () => {
    const s = viewerStateRef.current;
    s.targetAzimuth = 0.78;
    s.targetElevation = 0.58;
    s.targetDistance = 28;
  };

  const handleZoom = (amount) => {
    const s = viewerStateRef.current;
    s.targetDistance = Math.max(16, Math.min(42, s.targetDistance + amount));
  };

  return (
    <div>
      {/* Layer Switcher Bar */}
      <div className="bim-toolbar-header">
        <div className="bim-layer-selector">
          <button
            type="button"
            className={`bim-layer-btn ${activeLayer === 'rebar' ? 'active' : ''}`}
            onClick={() => setActiveLayer('rebar')}
          >
            🧱 01: Struktur Beton & Rebar
          </button>
          <button
            type="button"
            className={`bim-layer-btn ${activeLayer === 'mep' ? 'active' : ''}`}
            onClick={() => setActiveLayer('mep')}
          >
            ⚡ 02: Instalasi MEP Plumbing
          </button>
          <button
            type="button"
            className={`bim-layer-btn ${activeLayer === 'finishing' ? 'active' : ''}`}
            onClick={() => setActiveLayer('finishing')}
          >
            🏢 03: Fasad Arsitektural
          </button>
          <button
            type="button"
            className={`bim-layer-btn ${activeLayer === 'all' ? 'active' : ''}`}
            onClick={() => setActiveLayer('all')}
          >
            🌐 04: Full Integrated BIM
          </button>
        </div>
      </div>

      {/* 3D Viewport Container */}
      <div
        ref={containerRef}
        className="bim-viewer-container"
        id="bim-viewer-container"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
      >
        <canvas ref={canvasRef} id="bim-3d-canvas" className="bim-3d-canvas" />

        {/* HUD Status Badge */}
        <div className="bim-hud-badge">
          <span className="bim-pulse-dot"></span>
          <span id="bim-hud-layer-text">
            BIM LOD 350 •{' '}
            {activeLayer === 'rebar'
              ? 'STRUKTUR BETON & REBAR'
              : activeLayer === 'mep'
              ? 'MEKANIKAL, ELEKTRIKAL & PLUMBING'
              : activeLayer === 'finishing'
              ? 'FASAD ARSITEKTUR & KACA'
              : 'FULL MULTI-DISIPLIN BIM MODEL'}
          </span>
        </div>

        {/* Viewport 3D Toolbar */}
        <div className="bim-controls-bar">
          <button
            type="button"
            className={`bim-ctrl-btn ${isAutoRotate ? 'active' : ''}`}
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title="Putar Otomatis (Auto Rotate)"
          >
            <RotateCw style={{ width: 16, height: 16 }} />
          </button>
          <button
            type="button"
            className={`bim-ctrl-btn ${isWireframe ? 'active' : ''}`}
            onClick={() => setIsWireframe(!isWireframe)}
            title="Mode Rangka / Wireframe X-Ray"
          >
            <Scan style={{ width: 16, height: 16 }} />
          </button>
          <button
            type="button"
            className="bim-ctrl-btn"
            onClick={handleResetCamera}
            title="Reset Sudut Isometrik"
          >
            <Compass style={{ width: 16, height: 16 }} />
          </button>
          <button
            type="button"
            className="bim-ctrl-btn"
            onClick={() => handleZoom(-4)}
            title="Perbesar (Zoom In)"
          >
            <ZoomIn style={{ width: 16, height: 16 }} />
          </button>
          <button
            type="button"
            className="bim-ctrl-btn"
            onClick={() => handleZoom(4)}
            title="Perkecil (Zoom Out)"
          >
            <ZoomOut style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="bim-interaction-hint">
          <Move3d style={{ width: 16, height: 16 }} />
          <span>Arahkan kursor / drag mouse untuk memutar 3D BIM • Scroll untuk zoom</span>
        </div>

        {/* Hotspot Pins */}
        {pinPositions['bim-pin-1']?.visible && (
          <button
            type="button"
            className={`bim-hotspot-pin ${activePin === 1 ? 'active' : ''}`}
            style={{
              top: `${pinPositions['bim-pin-1'].y.toFixed(1)}%`,
              left: `${pinPositions['bim-pin-1'].x.toFixed(1)}%`
            }}
            onClick={() => setActivePin(1)}
          >
            01
          </button>
        )}
        {pinPositions['bim-pin-2']?.visible && (
          <button
            type="button"
            className={`bim-hotspot-pin ${activePin === 2 ? 'active' : ''}`}
            style={{
              top: `${pinPositions['bim-pin-2'].y.toFixed(1)}%`,
              left: `${pinPositions['bim-pin-2'].x.toFixed(1)}%`
            }}
            onClick={() => setActivePin(2)}
          >
            02
          </button>
        )}
        {pinPositions['bim-pin-3']?.visible && (
          <button
            type="button"
            className={`bim-hotspot-pin ${activePin === 3 ? 'active' : ''}`}
            style={{
              top: `${pinPositions['bim-pin-3'].y.toFixed(1)}%`,
              left: `${pinPositions['bim-pin-3'].x.toFixed(1)}%`
            }}
            onClick={() => setActivePin(3)}
          >
            03
          </button>
        )}
      </div>

      {/* Hotspot Spec Information Box */}
      <div
        style={{
          marginTop: '1.25rem',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            {activePin === 1
              ? 'Pin 01: Sambungan Kolom Baja WF & Tulangan Rebar D25'
              : activePin === 2
              ? 'Pin 02: Plat Lantai Composite Bondek & Wiremesh M8'
              : activePin === 3
              ? 'Pin 03: Jalur Main Ducting HVAC & Pipa Hydrant NFPA'
              : currentSpec.title}
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginTop: '0.25rem'
            }}
          >
            {activePin === 1
              ? 'Profil baja Wide Flange ASTM A36 dengan sambungan plat simpul tebal 16mm dan pembesian rebar ulir Grade 60 (SNI).'
              : activePin === 2
              ? 'Pengecoran plat lantai composite deck bondek galvanis tebal 0.75mm dengan wiremesh M8 dua lapis mutu K-350.'
              : activePin === 3
              ? 'Ducting galvanized spiral 0.8mm dengan insulasi glasswool 25mm serta pipa hydrant red pipe ASTM A53 Schedule 40.'
              : currentSpec.desc}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-cyan)',
              marginTop: '0.4rem'
            }}
          >
            {activePin === 1
              ? 'STANDAR: SNI 1729:2020 & SNI 2847:2019 (Spesifikasi Gedung Baja & Beton)'
              : activePin === 2
              ? 'STANDAR: SNI 2847:2019 (Persyaratan Beton Struktural)'
              : activePin === 3
              ? 'STANDAR: NFPA 13 & SNI 03-6575 (Tata Kelola MEP Gedung)'
              : currentSpec.standard}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => openModal('spec', 'nusantarakokoh')}
        >
          <FileCode2 style={{ width: 16, height: 16 }} />
          <span>Inspect Dokumen CAD</span>
        </button>
      </div>
    </div>
  );
}
