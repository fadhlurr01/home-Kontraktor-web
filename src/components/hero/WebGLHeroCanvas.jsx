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

  const createIBeam = (length = 10, flangeWidth = 3, flangeThickness = 0.35, webThickness = 0.35) => {
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
    topFlange.position.y = flangeWidth / 2 - flangeThickness / 2;
    group.add(topFlange);

    // Bottom Flange
    const bottomFlangeGeo = new THREE.BoxGeometry(flangeWidth, flangeThickness, length);
    const bottomFlange = new THREE.Mesh(bottomFlangeGeo, material);
    bottomFlange.position.y = -(flangeWidth / 2 - flangeThickness / 2);
    group.add(bottomFlange);

    // Web
    const webHeight = flangeWidth - flangeThickness * 2;
    const webGeo = new THREE.BoxGeometry(webThickness, webHeight, length);
    const web = new THREE.Mesh(webGeo, material);
    group.add(web);

    // Wireframe edges
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(flangeWidth, flangeWidth, length));
    const line = new THREE.LineSegments(edges, wireframeMat);
    group.add(line);

    return group;
  };

  const buildModeModel = (mode, structureGroup) => {
    while (structureGroup.children.length > 0) {
      const obj = structureGroup.children[0];
      structureGroup.remove(obj);
    }

    if (mode === 'all') {
      const beam1 = createIBeam(14, 2.5);
      beam1.rotation.set(0.3, 0.4, 0.1);
      beam1.position.set(0, 1, 0);
      structureGroup.add(beam1);

      const beam2 = createIBeam(12, 2.0);
      beam2.rotation.set(-0.4, 0.8, -0.2);
      beam2.position.set(-2, -3, 2);
      structureGroup.add(beam2);

      const gridHelper = new THREE.GridHelper(24, 24, 0x00E5FF, 0x1A253A);
      gridHelper.position.y = -6;
      structureGroup.add(gridHelper);

      const cageGeo = new THREE.BoxGeometry(10, 12, 10);
      const cageEdges = new THREE.EdgesGeometry(cageGeo);
      const cageLine = new THREE.LineSegments(
        cageEdges,
        new THREE.LineBasicMaterial({ color: 0xFF8800, transparent: true, opacity: 0.6 })
      );
      cageLine.position.set(2, 0, -2);
      structureGroup.add(cageLine);
    } else if (mode === 'interior') {
      const roomGeo = new THREE.BoxGeometry(12, 8, 12);
      const roomEdges = new THREE.EdgesGeometry(roomGeo);
      const roomLine = new THREE.LineSegments(
        roomEdges,
        new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.7 })
      );
      structureGroup.add(roomLine);

      const tableGeo = new THREE.BoxGeometry(5, 2.5, 3);
      const tableEdges = new THREE.EdgesGeometry(tableGeo);
      const tableLine = new THREE.LineSegments(
        tableEdges,
        new THREE.LineBasicMaterial({ color: 0xFF8800, transparent: true, opacity: 0.85 })
      );
      tableLine.position.y = -2.5;
      structureGroup.add(tableLine);

      const wallGeo = new THREE.BoxGeometry(0.3, 6, 8);
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x1E273A,
        transparent: true,
        opacity: 0.8,
        roughness: 0.3
      });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.position.set(-3, -0.5, 0);
      structureGroup.add(wallMesh);
    } else if (mode === 'arch') {
      const floors = 6;
      for (let i = 0; i < floors; i++) {
        const size = 9 - i * 0.8;
        const geo = new THREE.BoxGeometry(size, 1.8, size);
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: i % 2 === 0 ? 0x00E5FF : 0xFF8800,
            transparent: true,
            opacity: 0.8
          })
        );
        line.position.y = i * 2.2 - 5;
        line.rotation.y = i * 0.15;
        structureGroup.add(line);
      }
    } else if (mode === 'civil') {
      const trussLength = 16;
      const beamMain = createIBeam(trussLength, 2.8);
      beamMain.position.set(0, 0, 0);
      structureGroup.add(beamMain);

      const beamCross = createIBeam(10, 2.2);
      beamCross.rotation.y = Math.PI / 2;
      beamCross.position.set(0, 3, 0);
      structureGroup.add(beamCross);

      const cableMat = new THREE.LineBasicMaterial({
        color: 0x00E5FF,
        transparent: true,
        opacity: 0.75
      });
      for (let i = -6; i <= 6; i += 3) {
        const points = [new THREE.Vector3(0, 6, 0), new THREE.Vector3(i, -1, 4)];
        const cableGeo = new THREE.BufferGeometry().setFromPoints(points);
        const cable = new THREE.Line(cableGeo, cableMat);
        structureGroup.add(cable);
      }
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
    scene.fog = new THREE.FogExp2(0x07090D, 0.002);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 28);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLightAmber = new THREE.DirectionalLight(0xFF8800, 2.5);
    dirLightAmber.position.set(20, 30, 20);
    scene.add(dirLightAmber);

    const dirLightCyan = new THREE.DirectionalLight(0x00E5FF, 2.0);
    dirLightCyan.position.set(-20, -10, 15);
    scene.add(dirLightCyan);

    const structureGroup = new THREE.Group();
    structureGroupRef.current = structureGroup;
    scene.add(structureGroup);

    buildModeModel(activeMode, structureGroup);

    // Particles
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 250 : 800;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00E5FF,
      size: 0.18,
      transparent: true,
      opacity: 0.6,
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
      targetRotationRef.current.y = x * 1.5;
      targetRotationRef.current.x = y * 0.8;
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
          currentRotationRef.current.x + Math.sin(elapsedTime * 0.5) * 0.04;
        structureGroup.rotation.y = currentRotationRef.current.y + elapsedTime * 0.08;
        structureGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.3;
      }

      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.03;
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
