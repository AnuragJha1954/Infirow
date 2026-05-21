"use client";

import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Environment } from "@react-three/drei";
import clsx from "clsx";

const InfinitySymbol = dynamic(() => import("./three/InfinitySymbol"), { ssr: false });

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Background glow */}
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={clsx("tag-pill", styles.tagAnim, mounted && styles.visible)}>
            Now in Early Access
          </div>

          <h1 className={styles.headline}>
            <span className={styles.wordLine}>
              <span className={clsx(styles.word, mounted && styles.visible)} style={{ transitionDelay: '0ms' }}>Your</span>{" "}
              <span className={clsx(styles.word, mounted && styles.visible)} style={{ transitionDelay: '80ms' }}>entire</span>{" "}
              <span className={clsx(styles.word, mounted && styles.visible)} style={{ transitionDelay: '160ms' }}>life,</span>
            </span>
            <br />
            <span className={styles.wordLine}>
              <span className={clsx(styles.word, mounted && styles.visible)} style={{ transitionDelay: '240ms' }}>optimized.</span>
            </span>
            <br />
            <span className={styles.wordLine}>
              <span className={clsx(styles.word, "gradient-text", mounted && styles.visible)} style={{ transitionDelay: '320ms' }}>
                Infinitely.
              </span>
            </span>
          </h1>

          <p className={clsx(styles.subheadline, mounted && styles.visible)}>
            Infirow brings together smart finance, intelligent investing, and performance tools — built for people who refuse to settle.
          </p>

          <div className={clsx(styles.ctaRow, mounted && styles.visible)}>
            <button 
              className="pill-button"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Early Access &rarr;
            </button>
            <button 
              className="ghost-button"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              See what we&apos;re building
            </button>
            <p className={styles.ctaHint}>Free during beta &middot; No credit card needed</p>
          </div>
        </div>

        <div className={clsx(styles.rightContent, mounted && styles.visible)}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="city" />
            <InfinitySymbol />
          </Canvas>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.chevron} />
      </div>
    </section>
  );
}
