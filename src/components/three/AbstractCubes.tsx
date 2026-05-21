"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useTheme } from "@/components/ThemeProvider";

export default function AbstractCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);
  const cube3Ref = useRef<THREE.Mesh>(null);

  const { theme } = useTheme();
  const isLight = theme === "light";

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.05;
    }
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x += delta * 0.1;
      cube1Ref.current.rotation.y += delta * 0.15;
    }
    if (cube2Ref.current) {
      cube2Ref.current.rotation.x -= delta * 0.15;
      cube2Ref.current.rotation.z += delta * 0.1;
    }
    if (cube3Ref.current) {
      cube3Ref.current.rotation.y += delta * 0.2;
      cube3Ref.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef}>
        {/* Large Central Cube */}
        <mesh ref={cube1Ref} scale={1.5}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshTransmissionMaterial
            backside={true}
            samples={2}
            thickness={1}
            chromaticAberration={0.05}
            distortion={0.2}
            distortionScale={0.5}
            color={isLight ? "#7B5EA7" : "#A67CC5"}
            attenuationColor={isLight ? "#1A1828" : "#4A3F7A"}
            attenuationDistance={3}
            transparent
            opacity={isLight ? 0.9 : 0.8}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        
        {/* Small Orbiting Cube 1 */}
        <mesh ref={cube2Ref} position={[1.2, 0.8, -0.5]} scale={0.4}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial 
            color={isLight ? "#1A1828" : "#F0EFF8"}
            emissive={isLight ? "#7B5EA7" : "#4A3F7A"}
            emissiveIntensity={isLight ? 0.2 : 0.5}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
          />
        </mesh>

        {/* Small Orbiting Cube 2 */}
        <mesh ref={cube3Ref} position={[-1, -1, 0.8]} scale={0.6}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshTransmissionMaterial
            backside={false}
            samples={2}
            thickness={0.2}
            chromaticAberration={0.02}
            color={isLight ? "#C4A0E0" : "#7B5EA7"}
            attenuationColor={isLight ? "#1A1828" : "#1A1828"}
            attenuationDistance={1}
            transparent
            opacity={isLight ? 0.95 : 0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}
