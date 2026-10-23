import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050816, 1);
    mount.appendChild(renderer.domElement);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Random colors between purple and cyan
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.57; colors[i * 3 + 1] = 0.37; colors[i * 3 + 2] = 1.0; // purple
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.0;  colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1.0; // cyan
      } else {
        colors[i * 3] = 1.0;  colors[i * 3 + 1] = 1.0;  colors[i * 3 + 2] = 1.0; // white
      }

      sizes[i] = Math.random() * 3 + 0.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.015,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Nebula rings
    const createRing = (radius, color, opacity, rotX, rotY) => {
      const geo = new THREE.TorusGeometry(radius, 0.005, 16, 200);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      scene.add(ring);
      return ring;
    };

    const ring1 = createRing(1.5, 0x915eff, 0.15, 1, 0.3);
    const ring2 = createRing(2.0, 0x00d9ff, 0.1, 0.5, 1.0);
    const ring3 = createRing(1.0, 0xff6b6b, 0.08, 0.8, 0.5);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let frameId;
    let time = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.003;

      stars.rotation.y = time * 0.05 + mouseX * 0.3;
      stars.rotation.x = mouseY * 0.3;

      ring1.rotation.z = time * 0.3;
      ring2.rotation.z = -time * 0.2;
      ring3.rotation.z = time * 0.15;
      ring1.rotation.x = 1 + mouseY * 0.2;
      ring2.rotation.y = 1 + mouseX * 0.2;

      // Pulsating opacity
      ring1.material.opacity = 0.1 + Math.sin(time * 2) * 0.05;
      ring2.material.opacity = 0.08 + Math.cos(time * 1.5) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ParticleBackground;
