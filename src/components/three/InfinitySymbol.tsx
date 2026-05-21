"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float, Points, PointMaterial } from "@react-three/drei";

import { useTheme } from "@/components/ThemeProvider";

export default function InfinitySymbol() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  // Parallax logic
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation: faster Y-axis
      meshRef.current.rotation.y += delta * 1.2;
    }
    
    if (groupRef.current) {
      // Mouse parallax
      const x = (state.pointer.x * 20) / 100;
      const y = (state.pointer.y * 20) / 100;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0} floatIntensity={2} floatingRange={[-0.12, 0.12]}>
        <mesh ref={meshRef} scale={1.2}>
          <torusKnotGeometry args={[1, 0.3, 64, 16, 1, 2]} />
          {/* A glossy, semi-transparent glass that shifts color based on theme */}
          <MeshTransmissionMaterial
            backside={false}
            samples={2}
            thickness={0.5}
            chromaticAberration={0.02}
            distortion={0.05}
            distortionScale={0.1}
            color={isLight ? "#7B5EA7" : "#A67CC5"}
            attenuationColor={isLight ? "#1A1828" : "#4A3F7A"}
            attenuationDistance={2}
            transparent
            opacity={isLight ? 0.9 : 0.85}
            roughness={isLight ? 0.3 : 0.2}
            metalness={0.1}
          />
        </mesh>
      </Float>
      <ParticleField isLight={isLight} />
    </group>
  );
}

function ParticleField({ isLight }: { isLight: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 80;

  const positions = useMemo(() => {
    const p = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Random position in a sphere
      const r = 3 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isLight ? "#7B5EA7" : "#A67CC5"}
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isLight ? 0.6 : 0.4}
      />
    </Points>
  );
}
