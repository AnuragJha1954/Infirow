"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line, Float } from "@react-three/drei";
import { useTheme } from "@/components/ThemeProvider";

export default function GridGlobe() {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.075;
      meshRef.current.rotation.x += delta * 0.025;
    }
  });

  // Create latitude lines
  const latitudes = useMemo(() => {
    const lines = [];
    for (let i = 1; i < 8; i++) {
      const phi = (Math.PI * i) / 8;
      const radius = Math.sin(phi) * 1.5;
      const y = Math.cos(phi) * 1.5;
      
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
      }
      lines.push(points);
    }
    return lines;
  }, []);

  // Create longitude lines
  const longitudes = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 16; i++) {
      const theta = (Math.PI * i) / 8;
      
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        const radius = Math.sin(phi) * 1.5;
        const y = Math.cos(phi) * 1.5;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
      }
      lines.push(points);
    }
    return lines;
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef}>
        {/* Core Glow */}
        <mesh>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial color={isLight ? "#C4A0E0" : "#4A3F7A"} transparent opacity={isLight ? 0.3 : 0.4} />
        </mesh>
        
        {latitudes.map((points, idx) => (
          <Line key={`lat-${idx}`} points={points} color={isLight ? "#7B5EA7" : "#A67CC5"} lineWidth={1} transparent opacity={isLight ? 0.4 : 0.3} />
        ))}
        {longitudes.map((points, idx) => (
          <Line key={`long-${idx}`} points={points} color={isLight ? "#7B5EA7" : "#A67CC5"} lineWidth={1} transparent opacity={isLight ? 0.4 : 0.3} />
        ))}
      </group>
    </Float>
  );
}
