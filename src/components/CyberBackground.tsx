import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000510, 0.001); // Deep cyber space fog, slightly less dense to see further

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.z = 0;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Create Code / Tech Symbol Texture Atlas ---
    // We create a canvas with 4 cells horizontally: '0', '1', '< />', '{}'
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 80px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Cell 0: '0'
      ctx.fillText('0', 64, 64);
      // Cell 1: '1'
      ctx.fillText('1', 192, 64);
      // Cell 2: '<>'
      ctx.fillText('<>', 320, 64);
      // Cell 3: '{}'
      ctx.fillText('{}', 448, 64);
    }
    const codeTexture = new THREE.CanvasTexture(canvas);

    // --- Particle Tunnel (Quantum Data Vortex) ---
    const particleCount = 6000; // Slightly reduced count for larger, readable text
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const symbolIndices = new Float32Array(particleCount);

    const colorPrimary = new THREE.Color(0x00ff41); // Matrix Green
    const colorAccent = new THREE.Color(0x00f0ff);  // Sci-fi Cyan
    const colorDark = new THREE.Color(0x0a4a22);    // Deeper green

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical distribution
      const radius = 15 + Math.random() * 85; // Tunnel radius
      const theta = Math.random() * Math.PI * 2;
      
      // DISTRIBUTE PERFECTLY across the active Z range to avoid gaps!
      // Active range is from +100 down to -1900 (Total 2000)
      const z = 100 - Math.random() * 2000; 

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = z;

      // Mix colors for a hacker/sci-fi vibe
      const mix = Math.random();
      const mixedColor = mix > 0.85 ? colorAccent : mix > 0.4 ? colorPrimary : colorDark;
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // Make them slightly larger so we can read the symbols
      sizes[i] = Math.random() * 4 + 1.5;

      // Assign a random symbol index (0 to 3)
      symbolIndices[i] = Math.floor(Math.random() * 4);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('symbolIndex', new THREE.BufferAttribute(symbolIndices, 1));

    // Custom shader material for glowing code particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        codeMap: { value: codeTexture }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float symbolIndex;
        
        varying vec3 vColor;
        varying float vSymbolIndex;
        
        void main() {
          vColor = color;
          vSymbolIndex = symbolIndex;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Scale based on distance
          gl_PointSize = size * (600.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D codeMap;
        
        varying vec3 vColor;
        varying float vSymbolIndex;
        
        void main() {
          // Calculate UVs for the specific cell in the 1x4 atlas
          // gl_PointCoord is 0..1 for the point sprite
          vec2 uv = vec2((gl_PointCoord.x + vSymbolIndex) * 0.25, 1.0 - gl_PointCoord.y);
          
          vec4 texColor = texture2D(codeMap, uv);
          
          // Use texture alpha for shape, and multiply by color
          // We boost the brightness slightly
          gl_FragColor = vec4(vColor * 1.5, texColor.a * 0.8);
          
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // --- The "AI Core" (A giant glowing geometry at the end of the tunnel) ---
    const coreGeometry = new THREE.IcosahedronGeometry(80, 2); // Higher detail
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff41,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const aiCore = new THREE.Mesh(coreGeometry, coreMaterial);
    aiCore.position.z = -1800; // Far end of the tunnel (visible range)
    scene.add(aiCore);

    // --- Abstract Geometric Wireframes (Data Nodes) ---
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.OctahedronGeometry(Math.random() * 3 + 1.5, 0);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff41,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < 30; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const radius = 10 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      node.position.x = Math.cos(theta) * radius;
      node.position.y = Math.sin(theta) * radius;
      // Also distribute properly to avoid gaps
      node.position.z = 100 - Math.random() * 2000;
      
      node.rotation.x = Math.random() * Math.PI;
      node.rotation.y = Math.random() * Math.PI;
      
      scene.add(node);
      nodes.push(node);
    }

    // --- Mouse Tracking for Parallax ---
    let mouseX = 0;
    let mouseY = 0;

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update particle uniforms
      particleMaterial.uniforms.time.value = elapsedTime;

      // Move particles towards camera (Hyperspeed effect - SLOWED DOWN)
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += 1.2; // Slowed down from 5 to 1.2 for better visualization
        
        // Loop particles back smoothly
        if (positions[i * 3 + 2] > 100) {
          positions[i * 3 + 2] -= 2000;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Rotate the entire tunnel much slower
      particleSystem.rotation.z = elapsedTime * 0.02; // Slowed down from 0.1

      // Animate Abstract Nodes (Slowed down)
      nodes.forEach((node) => {
        node.position.z += 1.8; // Move slightly faster than particles
        if (node.position.z > 100) {
          node.position.z -= 2000;
        }
        node.rotation.x += 0.005;
        node.rotation.y += 0.01;
      });

      // Rotate and Pulse AI Core
      aiCore.rotation.x += 0.003;
      aiCore.rotation.y += 0.005;
      aiCore.rotation.z -= 0.002;
      const coreScale = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      aiCore.scale.set(coreScale, coreScale, coreScale);

      // Camera sway + Interactive Mouse Parallax
      const targetX = Math.sin(elapsedTime * 0.2) * 3 + mouseX * 25;
      const targetY = Math.cos(elapsedTime * 0.15) * 3 + mouseY * 25;
      
      // Smooth interpolation for camera movement
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      
      // Always look towards the distant core
      camera.lookAt(0, 0, -1800);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Event Handlers ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to +1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      // Invert Y axis
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 bg-[#000510]"
      style={{ overflow: 'hidden', pointerEvents: 'none' }}
    />
  );
};

export default CyberBackground;
