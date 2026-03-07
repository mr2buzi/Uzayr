import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroSceneProps = {
  variant?: "hero" | "mini";
};

export default function HeroScene({ variant = "hero" }: HeroSceneProps) {
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
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, variant === "hero" ? 8 : 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(
      variant === "hero" ? 1.8 : 1.15,
      variant === "hero" ? 1 : 0,
    );
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff8a52,
      emissive: 0x442012,
      metalness: 0.25,
      roughness: 0.18,
      transparent: true,
      opacity: variant === "hero" ? 0.9 : 0.78,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    const shellGeometry = new THREE.IcosahedronGeometry(
      variant === "hero" ? 1.28 : 0.82,
      variant === "hero" ? 3 : 2,
    );
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffd8b6,
      emissive: 0x3b190d,
      metalness: 0.08,
      roughness: 0.36,
      transparent: true,
      opacity: variant === "hero" ? 0.16 : 0.12,
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    group.add(shellMesh);

    const haloGeometry = new THREE.TorusGeometry(
      variant === "hero" ? 2.45 : 1.7,
      variant === "hero" ? 0.03 : 0.025,
      12,
      180,
    );
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd2b0,
      transparent: true,
      opacity: 0.45,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2.5;
    group.add(halo);

    const secondaryHaloGeometry = new THREE.TorusGeometry(
      variant === "hero" ? 1.95 : 1.25,
      0.02,
      10,
      120,
    );
    const secondaryHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7a49,
      transparent: true,
      opacity: 0.38,
    });
    const secondaryHalo = new THREE.Mesh(
      secondaryHaloGeometry,
      secondaryHaloMaterial,
    );
    secondaryHalo.rotation.set(Math.PI / 3.2, 0.25, Math.PI / 7);
    group.add(secondaryHalo);

    const orbitCurve = new THREE.CatmullRomCurve3(
      Array.from({ length: 7 }, (_, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = (variant === "hero" ? 2.55 : 1.7) + Math.sin(index * 1.1) * 0.18;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(index * 0.9) * (variant === "hero" ? 0.55 : 0.35),
          Math.sin(angle) * radius,
        );
      }),
      true,
    );
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
      orbitCurve.getPoints(180),
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0xffc8a6,
      transparent: true,
      opacity: 0.32,
    });
    const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    scene.add(orbit);

    const pointsGeometry = new THREE.BufferGeometry();
    const pointCount = variant === "hero" ? 220 : 120;
    const positions = new Float32Array(pointCount * 3);

    for (let index = 0; index < pointCount; index += 1) {
      const radius = (variant === "hero" ? 2.8 : 1.9) + Math.random() * (variant === "hero" ? 1.8 : 1.1);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (variant === "hero" ? 3.6 : 2.1);
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = height;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xfff2e5,
      size: variant === "hero" ? 0.045 : 0.035,
      transparent: true,
      opacity: 0.75,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffc49a, 1.2);
    directional.position.set(4, 3, 5);
    const rim = new THREE.DirectionalLight(0xff6c48, 0.9);
    rim.position.set(-3, -2, 4);
    scene.add(ambient, directional, rim);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) {
        return;
      }
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let frameId = 0;
    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    if (!prefersReducedMotion) {
      mount.addEventListener("pointermove", handlePointerMove);
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        group.rotation.y = elapsed * (variant === "hero" ? 0.28 : 0.34);
        group.rotation.x = Math.sin(elapsed * 0.4) * (variant === "hero" ? 0.18 : 0.12);
        group.position.x = pointer.x * (variant === "hero" ? 0.28 : 0.18);
        group.position.y = pointer.y * -0.18;
        shellMesh.rotation.y = -elapsed * 0.18;
        shellMesh.rotation.z = elapsed * 0.12;
        halo.rotation.z = elapsed * 0.22;
        secondaryHalo.rotation.y = elapsed * -0.3;
        secondaryHalo.rotation.z = elapsed * 0.18;
        orbit.rotation.y = elapsed * 0.12;
        orbit.rotation.x = Math.sin(elapsed * 0.18) * 0.15;
        points.rotation.y = elapsed * 0.06;
        points.rotation.x = Math.cos(elapsed * 0.15) * 0.08;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeChild(renderer.domElement);
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      secondaryHaloGeometry.dispose();
      secondaryHaloMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div
      className={`hero-scene ${variant === "mini" ? "hero-scene--mini" : ""}`}
      ref={mountRef}
      aria-hidden="true"
    />
  );
}
