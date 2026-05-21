"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Environment } from "@react-three/drei";
import clsx from "clsx";
import styles from "./Security.module.css";

const GridGlobe = dynamic(() => import("@/components/three/GridGlobe"), { ssr: false });

export default function SecurityPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div className={styles.heroSection}>
        <div className={styles.bgGlow} />
        
        <div className={styles.container}>
          <div className={clsx(styles.leftContent, mounted && styles.visible)}>
            <div className="tech-accent" style={{ marginBottom: '16px' }}>SYS.SEC // ENCRYPTED</div>
            <h1 className={styles.headline}>
              Bank-grade security. <br />
              <span className="gradient-text">Zero compromises.</span>
            </h1>
            <p className={styles.subheadline}>
              Your data and funds are protected by state-of-the-art encryption, biometric authentication, 
              and distributed infrastructure. We don't take risks with your wealth.
            </p>
          </div>

          <div className={clsx(styles.rightContent, mounted && styles.visible)}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              <GridGlobe />
            </Canvas>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '120px auto', padding: '0 48px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '40px', textAlign: 'center' }}>Infrastructure</h2>
        
        <div className={clsx(styles.scanlineWrapper)} style={{ padding: '2px' }}>
          <div className={styles.scanline} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '40px' }}>
              <div className="tech-accent" style={{ marginBottom: '16px' }}>SEC.01 // ENCRYPTION</div>
              <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>AES-256 Encryption</h3>
              <p style={{ color: 'var(--text-muted)' }}>All user data is encrypted at rest and in transit using military-grade AES-256 protocols.</p>
            </div>
            
            <div className="glass-card glow-border-wrapper" style={{ padding: '40px' }}>
              <div className="tech-accent" style={{ marginBottom: '16px' }}>SEC.02 // AUTHENTICATION</div>
              <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Biometric Locks</h3>
              <p style={{ color: 'var(--text-muted)' }}>Multi-factor authentication natively integrated with FaceID and TouchID hardware enclaves.</p>
            </div>

            <div className="glass-card" style={{ padding: '40px' }}>
              <div className="tech-accent" style={{ marginBottom: '16px' }}>SEC.03 // ISOLATION</div>
              <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Air-gapped Cold Storage</h3>
              <p style={{ color: 'var(--text-muted)' }}>95% of digital assets are stored offline in geographically distributed vaults.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
