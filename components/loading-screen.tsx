import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

type LogoModelProps = {
  startSpin?: boolean;
  spins?: number;
  onSpinsComplete?: () => void;
};

const LogoModel: React.FC<LogoModelProps> = React.memo(function LogoModelComponent({ startSpin = false, spins = 4, onSpinsComplete }: LogoModelProps) {
  const { scene } = useGLTF("/logo.glb");
  const ref = useRef<THREE.Group>(null);
  const accumulated = useRef(0);
  const finished = useRef(false);

  // Center the model geometry so it sits at the origin
  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene as THREE.Object3D);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    // scale to a reasonable size if it's huge or tiny
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const desired = 2.2; // how big we want the model roughly
      const scale = desired / maxDim;
      scene.scale.setScalar(scale);
    }

    // make materials double-sided (helps if model looks hollow)
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => (m.side = THREE.DoubleSide));
        } else {
          child.material.side = THREE.DoubleSide;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // If we should perform the spinning sequence
    if (startSpin && !finished.current) {
      // spin speed: full rotation per ~2s (slower, more elegant)
      const spinSpeed = (Math.PI * 2) / 2;
      const step = spinSpeed * delta;
      ref.current.rotation.y += step;
      accumulated.current += step;

      if (accumulated.current >= spins * Math.PI * 2) {
        finished.current = true;
        if (onSpinsComplete) onSpinsComplete();
      }
    } else {
      // idle gentle motion while waiting (very slow)
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
  });

  return <primitive ref={ref} object={scene} />;
});

LogoModel.displayName = 'LogoModel';

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    // Preload model immediately
    useGLTF.preload("/logo.glb");
    
    // Safety: fade out after 2.5 seconds max
    const timer = setTimeout(() => setFadeOut(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-center h-full pt-20">
        <Canvas style={{ height: "100%" }} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={2} />

          <directionalLight position={[5, 5, 5]} intensity={3} />
          <directionalLight position={[-5, 2, 2]} intensity={2} />

          <Environment preset="studio" />

          <LogoModel
            startSpin={spinning}
            spins={5}
            onSpinsComplete={() => {
              // fade out instantly once spins complete
              setFadeOut(true);
            }}
          />
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/logo.glb");