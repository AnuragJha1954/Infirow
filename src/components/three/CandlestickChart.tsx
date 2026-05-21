"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function CandlestickChart() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const candles = [
    { x: -1.5, y: 0.5, height: 1.2, wick: 2.0, color: "#4A3F7A" }, // muted purple-red
    { x: -0.5, y: 0.8, height: 1.5, wick: 2.5, color: "#7B5EA7" }, // muted purple-green
    { x: 0.5, y: 0.2, height: 0.8, wick: 1.8, color: "#4A3F7A" },
    { x: 1.5, y: 1.2, height: 2.0, wick: 3.0, color: "#7B5EA7" },
  ];

  return (
    <group ref={groupRef} scale={0.8}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {candles.map((c, i) => (
          <group key={i} position={[c.x, c.y, 0]}>
            {/* Wick */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, c.wick, 8]} />
              <meshStandardMaterial color={c.color} roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.3, c.height, 0.3]} />
              <meshStandardMaterial color={c.color} roughness={0.3} metalness={0.8} transparent opacity={0.8} />
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
}
