"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import FloatingRings from "./FloatingRings";

export default function FloatingRingsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <FloatingRings />
    </Canvas>
  );
}
