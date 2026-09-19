import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLHeroCanvas({ activeMode = 'all' }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const structureGroupRef = useRef(null);
  const particleSystemRef = useRef(null);
  const targetRotationRef = useRef({ x: 0.15, y: -0.2 });
  const currentRotationRef = useRef({ x: 0.15, y: -0.2 });
  const reqAnimRef = useRef(null);

  const buildModeModel = (mode, structureGroup) => {
    while (structureGroup.children.length > 0) {
      const obj = structureGroup.children[0];
      structureGroup.remove(obj);
    }

    // Modern architectural materials (Clean White, Electric Cyan, Royal Blue, Steel - NO ORANGE)
    const cyanWireMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.75
    });

    const whiteWireMat = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.85
    });

    const blueWireMat = new THREE.LineBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.65
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0F2B5C,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.45,
      reflectivity: 0.9
    });

    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      metalness: 0.8,
      roughness: 0.25
    });

    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x2563EB,
      metalness: 0.85,
      roughness: 0.2
    });

    // Helper: Create box with highlighted edges
    const createArchBox = (w, h, d, mainMat, wireMat) => {
      const g = new THREE.Group();
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mainMat);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), wireMat);
      g.add(mesh);
      g.add(edges);
      return g;
    };

    if (mode === 'all') {
      // 1. MODERN PARAMETRIC HIGH-RISE TOWER
      const floors = 8;
      const baseWidth = 10;
      const baseDepth = 10;
      const floorHeight = 1.6;

      // Central core
      const core = createArchBox(3.5, floors * floorHeight + 2, 3.5, slabMat, cyanWireMat);
      core.position.y = (floors * floorHeight) / 2 - 4.5;
      structureGroup.add(core);

      // Tiered cantilevered floor slabs
      for (let i = 0; i < floors; i++) {
        const factor = 1 - (i * 0.05);
        const w = baseWidth * factor + Math.sin(i * 0.8) * 0.6;
        const d = baseDepth * factor + Math.cos(i * 0.8) * 0.6;
        const y = i * floorHeight - 4;

        // Slab
        const slab = createArchBox(w, 0.25, d, slabMat, i % 2 === 0 ? cyanWireMat : whiteWireMat);
        slab.position.set(0, y, 0);
        structureGroup.add(slab);

        // Glass curtain perimeter
        if (i < floors - 1) {
          const glass = createArchBox(w - 0.2, floorHeight - 0.25, d - 0.2, glassMat, blueWireMat);
          glass.position.set(0, y + floorHeight / 2, 0);
          structureGroup.add(glass);
        }

        // Corner structural columns
        const colRadius = 0.15;
        const cx = (w / 2) - 0.4;
        const cz = (d / 2) - 0.4;
        const colGeo = new THREE.CylinderGeometry(colRadius, colRadius, floorHeight, 8);
        [-cx, cx].forEach(posX => {
          [-cz, cz].forEach(posZ => {
            const colMesh = new THREE.Mesh(colGeo, columnMat);
            colMesh.position.set(posX, y + floorHeight / 2, posZ);
            structureGroup.add(colMesh);
          });
        });
      }

      // Rooftop Pergola & Architectural Crown
      const crown = createArchBox(8, 0.4, 8, slabMat, cyanWireMat);
      crown.position.y = floors * floorHeight - 3.8;
      structureGroup.add(crown);

      // Base CAD Grid
      const grid = new THREE.GridHelper(26, 26, 0x00E5FF, 0x1E3A8A);
      grid.position.y = -4.5;
      structureGroup.add(grid);

    } else if (mode === 'interior') {
      // 2. LUXURY RESIDENTIAL INTERIOR MEZZANINE
      const roomW = 14;
      const roomH = 9;
      const roomD = 12;

      // Outer room frame wireframe
      const roomEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(roomW, roomH, roomD)),
        whiteWireMat
      );
      roomEdges.position.y = 0;
      structureGroup.add(roomEdges);

      // Mezzanine upper floor
      const mez = createArchBox(roomW * 0.55, 0.35, roomD * 0.9, slabMat, cyanWireMat);
      mez.position.set(-roomW * 0.2, 0.8, 0);
      structureGroup.add(mez);

      // Mezzanine Glass Balustrade
      const balustrade = createArchBox(roomW * 0.55, 1.2, 0.1, glassMat, cyanWireMat);
      balustrade.position.set(-roomW * 0.2, 1.5, (roomD * 0.9) / 2);
      structureGroup.add(balustrade);

      // Floating stairs cantilever
      for (let i = 0; i < 7; i++) {
        const step = createArchBox(2.2, 0.15, 0.7, slabMat, whiteWireMat);
        step.position.set(roomW * 0.15 + (i * 0.1), -3.2 + (i * 0.6), -roomD * 0.3 + (i * 0.8));
        structureGroup.add(step);
      }

      // Feature Wall with Accents
      const featureWall = createArchBox(0.4, roomH * 0.8, roomD * 0.7, slabMat, blueWireMat);
      featureWall.position.set(-roomW / 2 + 0.3, 0, 0);
      structureGroup.add(featureWall);

      // Modern Lounge Block & Minimalist Table
      const lounge = createArchBox(5, 0.9, 2.8, slabMat, cyanWireMat);
      lounge.position.set(0.5, -3.8, 0.5);
      structureGroup.add(lounge);

      const table = createArchBox(3, 0.45, 1.8, glassMat, whiteWireMat);
      table.position.set(0.5, -3.2, 0.5);
      structureGroup.add(table);

      // Floor grid
      const grid = new THREE.GridHelper(20, 20, 0x00E5FF, 0x1E3A8A);
      grid.position.y = -4.5;
      structureGroup.add(grid);

    } else if (mode === 'arch') {
      // 3. PARAMETRIC TWISTING BIRO ARSITEKTUR TOWER
      const floors = 10;
      const initialSize = 10;
      const floorH = 1.4;

      for (let i = 0; i < floors; i++) {
        const size = initialSize - (i * 0.5);
        const rotY = (i * 0.18); // Elegant twisting curve
        const y = i * floorH - 6;

        const gFloor = createArchBox(size, 0.28, size, slabMat, i % 2 === 0 ? cyanWireMat : whiteWireMat);
        gFloor.position.y = y;
        gFloor.rotation.y = rotY;
        structureGroup.add(gFloor);

        if (i < floors - 1) {
          const gGlass = createArchBox(size - 0.3, floorH - 0.28, size - 0.3, glassMat, blueWireMat);
          gGlass.position.y = y + floorH / 2;
          gGlass.rotation.y = rotY + 0.09;
          structureGroup.add(gGlass);
        }
      }

      // Continuous diagrid structural helix lines
      const diagridPoints1 = [];
      const diagridPoints2 = [];
      for (let i = 0; i <= floors; i++) {
        const size = (initialSize - (i * 0.5)) / 2;
        const rot = i * 0.18;
        const y = i * floorH - 6;
        diagridPoints1.push(new THREE.Vector3(Math.cos(rot) * size, y, Math.sin(rot) * size));
        diagridPoints2.push(new THREE.Vector3(Math.cos(rot + Math.PI) * size, y, Math.sin(rot + Math.PI) * size));
      }
      const spine1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(diagridPoints1), cyanWireMat);
      const spine2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(diagridPoints2), whiteWireMat);
      structureGroup.add(spine1);
      structureGroup.add(spine2);

      const grid = new THREE.GridHelper(24, 24, 0x00E5FF, 0x1E3A8A);
      grid.position.y = -6.5;
      structureGroup.add(grid);

    } else if (mode === 'civil') {
      // 4. HEAVY EPC SPATIAL TRUSS & CANTILEVER BRIDGE
      const trussLen = 22;
      const bridgeW = 6;

      // Double I-Beams Longitudinal
      [-bridgeW / 2, bridgeW / 2].forEach(posX => {
        const beam = createArchBox(0.6, 1.4, trussLen, slabMat, cyanWireMat);
        beam.position.set(posX, -1.5, 0);
        structureGroup.add(beam);
      });

      // Deck Slab
      const deck = createArchBox(bridgeW + 1, 0.4, trussLen, slabMat, whiteWireMat);
      deck.position.set(0, -1, 0);
      structureGroup.add(deck);

      // Heavy Pylon Tower
      const pylonH = 14;
      const pylon1 = createArchBox(0.9, pylonH, 0.9, columnMat, cyanWireMat);
      pylon1.position.set(-bridgeW / 2, pylonH / 2 - 2, -trussLen * 0.2);
      const pylon2 = createArchBox(0.9, pylonH, 0.9, columnMat, cyanWireMat);
      pylon2.position.set(bridgeW / 2, pylonH / 2 - 2, -trussLen * 0.2);
      structureGroup.add(pylon1);
      structureGroup.add(pylon2);

      // Top Cross Beam
      const crossBeam = createArchBox(bridgeW + 1.8, 0.8, 0.9, slabMat, whiteWireMat);
      crossBeam.position.set(0, pylonH - 2, -trussLen * 0.2);
      structureGroup.add(crossBeam);

      // Stay Cables (Fan Pattern)
      const cableMat = new THREE.LineBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8
      });

      for (let z = -trussLen / 2 + 1; z <= trussLen / 2 - 1; z += 2.5) {
        if (Math.abs(z - (-trussLen * 0.2)) > 1) {
          [-bridgeW / 2, bridgeW / 2].forEach(posX => {
            const pts = [
              new THREE.Vector3(posX, pylonH - 2.5, -trussLen * 0.2),
              new THREE.Vector3(posX, -0.8, z)
            ];
            const cable = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), cableMat);
            structureGroup.add(cable);
          });
        }
      }

      // Foundation Piers
      [-bridgeW / 2, bridgeW / 2].forEach(posX => {
        const pier = createArchBox(1.8, 5, 2.2, slabMat, cyanWireMat);
        pier.position.set(posX, -4, -trussLen * 0.2);
        structureGroup.add(pier);
      });

      const grid = new THREE.GridHelper(26, 26, 0x00E5FF, 0x1E3A8A);
      grid.position.y = -6.5;
      structureGroup.add(grid);
    }
  };

  // Re-build 3D model when activeMode changes
  useEffect(() => {
    if (structureGroupRef.current) {
      buildModeModel(activeMode, structureGroupRef.current);
    }
  }, [activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const width = parent.clientWidth || 600;
    const height = parent.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A1020, 0.003);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 26);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Crisp Modern Lighting (No Orange!)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLightWhite = new THREE.DirectionalLight(0xFFFFFF, 2.8);
    dirLightWhite.position.set(20, 35, 25);
    scene.add(dirLightWhite);

    const dirLightCyan = new THREE.DirectionalLight(0x00E5FF, 2.5);
    dirLightCyan.position.set(-20, -10, 15);
    scene.add(dirLightCyan);

    const dirLightBlue = new THREE.DirectionalLight(0x1A5AF0, 2.0);
    dirLightBlue.position.set(0, 20, -20);
    scene.add(dirLightBlue);

    const structureGroup = new THREE.Group();
    structureGroupRef.current = structureGroup;
    scene.add(structureGroup);

    buildModeModel(activeMode, structureGroup);

    // Floating Architectural Micro-Particles
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 300 : 900;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 45;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00E5FF,
      size: 0.16,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(pGeo, pMat);
    particleSystemRef.current = particleSystem;
    scene.add(particleSystem);

    const clock = new THREE.Clock();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationRef.current.y = x * 1.4;
      targetRotationRef.current.x = y * 0.7;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      if (structureGroup) {
        structureGroup.rotation.x =
          currentRotationRef.current.x + Math.sin(elapsedTime * 0.4) * 0.03;
        structureGroup.rotation.y = currentRotationRef.current.y + elapsedTime * 0.09;
        structureGroup.position.y = Math.sin(elapsedTime * 0.7) * 0.25;
      }

      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.025;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqAnimRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-webgl-canvas"
      className="hero-webgl-canvas"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
