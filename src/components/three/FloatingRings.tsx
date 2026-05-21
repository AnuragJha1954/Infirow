"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { useTheme } from "@/components/ThemeProvider";

export default function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useFrame((state, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.05;
      ring1.current.rotation.y += delta * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.15;
      ring2.current.rotation.z += delta * 0.05;
    }
    if (ring3.current) {
      ring3.current.rotation.x -= delta * 0.1;
      ring3.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group>
        {/* Outer Ring */}
        <mesh ref={ring1} scale={2}>
          <torusGeometry args={[1, 0.02, 16, 64]} />
          <meshBasicMaterial color={isLight ? "#7B5EA7" : "#A67CC5"} transparent opacity={isLight ? 0.8 : 0.6} />
        </mesh>
        
        {/* Middle Ring */}
        <mesh ref={ring2} scale={1.5}>
          <torusGeometry args={[1, 0.04, 16, 64]} />
          <meshBasicMaterial color={isLight ? "#4A3F7A" : "#7B5EA7"} transparent opacity={0.8} />
        </mesh>
        
        {/* Inner Ring */}
        <mesh ref={ring3} scale={1}>
          <torusGeometry args={[1, 0.08, 16, 64]} />
          <meshBasicMaterial color={isLight ? "#1A1828" : "#4A3F7A"} transparent opacity={1} />
        </mesh>
        
        {/* Core Sphere */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#FFFFFF" emissive={isLight ? "#7B5EA7" : "#A67CC5"} emissiveIntensity={isLight ? 0.2 : 0.5} />
        </mesh>
      </group>
    </Float>
  );
}
