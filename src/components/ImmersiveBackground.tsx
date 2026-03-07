import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ImmersiveBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const glowGeometry = new THREE.PlaneGeometry(8, 8, 1, 1);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7a49,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const glows = Array.from({ length: 3 }, (_, index) => {
      const mesh = new THREE.Mesh(glowGeometry, glowMaterial.clone());
      mesh.position.set(
        index === 0 ? -5 : index === 1 ? 5.5 : 0.4,
        index === 0 ? 3 : index === 1 ? -2.8 : 8.5,
        index === 2 ? -5 : -2,
      );
      mesh.scale.setScalar(index === 2 ? 1.6 : 1.2);
      root.add(mesh);
      return mesh;
    });

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xffc4a4,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });

    const rings = Array.from({ length: 4 }, (_, index) => {
      const curve = new THREE.EllipseCurve(
        0,
        0,
        2.8 + index * 0.9,
        1.45 + index * 0.42,
        0,
        Math.PI * 2,
        false,
        0,
      );
      const points = curve.getPoints(120).map((point) =>
        new THREE.Vector3(point.x, point.y, 0),
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineLoop(geometry, ringMaterial.clone());
      line.rotation.set(index * 0.35, index * 0.24, index * 0.18);
      line.position.set(
        index % 2 === 0 ? -4.5 : 4.8,
        index < 2 ? -2.5 : 5.5,
        -index * 1.6,
      );
      root.add(line);
      return line;
    });

    const pointsGeometry = new THREE.BufferGeometry();
    const pointCount = 900;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const colorA = new THREE.Color(0xffe2ca);
    const colorB = new THREE.Color(0xff7048);

    for (let index = 0; index < pointCount; index += 1) {
      const spread = 20;
      positions[index * 3] = (Math.random() - 0.5) * spread;
      positions[index * 3 + 1] = (Math.random() - 0.5) * spread * 0.85;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 16;

      const mixed = colorA.clone().lerp(colorB, Math.random() * 0.65);
      colors[index * 3] = mixed.r;
      colors[index * 3 + 1] = mixed.g;
      colors[index * 3 + 2] = mixed.b;
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    pointsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.55,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(pointsGeometry, pointsMaterial);
    root.add(stars);

    const strandMaterial = new THREE.LineBasicMaterial({
      color: 0xff9d63,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const strands = Array.from({ length: 3 }, (_, index) => {
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 7 }, (_, pointIndex) => {
          const t = pointIndex / 6;
          return new THREE.Vector3(
            -8 + t * 16,
            Math.sin(t * Math.PI * 2 + index * 0.9) * (1.2 + index * 0.5),
            -5 + index * 2 + Math.cos(t * Math.PI * 2) * 1.2,
          );
        }),
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(180),
      );
      const line = new THREE.Line(geometry, strandMaterial.clone());
      line.position.y = index * 3 - 4;
      line.rotation.z = index * 0.25;
      root.add(line);
      return line;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const rim = new THREE.DirectionalLight(0xffa36f, 1.2);
    rim.position.set(4, 4, 5);
    scene.add(rim);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const pointer = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        root.rotation.y = elapsed * 0.03 + pointer.x * 0.08;
        root.rotation.x = pointer.y * -0.04;
        root.position.x = pointer.x * 0.45;
        root.position.y = pointer.y * -0.35;
        stars.rotation.y = elapsed * 0.012;
        stars.rotation.x = Math.sin(elapsed * 0.1) * 0.06;
        glows.forEach((glow, index) => {
          glow.rotation.z = elapsed * (0.04 + index * 0.02);
          glow.material.opacity = 0.05 + Math.sin(elapsed * 0.8 + index) * 0.018;
        });
        rings.forEach((ring, index) => {
          ring.rotation.z += 0.0007 + index * 0.00015;
          ring.rotation.x = Math.sin(elapsed * 0.25 + index) * 0.22;
        });
        strands.forEach((strand, index) => {
          strand.position.x = Math.sin(elapsed * 0.22 + index) * 0.9;
          strand.rotation.y = Math.cos(elapsed * 0.18 + index) * 0.18;
        });
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      mount.removeChild(renderer.domElement);
      glowGeometry.dispose();
      glows.forEach((glow) => {
        (glow.material as THREE.Material).dispose();
      });
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      strands.forEach((strand) => {
        strand.geometry.dispose();
        (strand.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div className="immersive-background" ref={mountRef} aria-hidden="true" />;
}
