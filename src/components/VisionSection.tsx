"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./VisionSection.module.css";
import clsx from "clsx";

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.visionSection}>
      <div className={styles.container}>
        <span className={clsx(styles.eyebrow, isVisible && styles.visible)}>Our thesis</span>
        
        <h2 className={clsx(styles.statement, isVisible && styles.visible)} style={{ transitionDelay: '100ms' }}>
          Most people manage their life in fragments.<br />
          We&apos;re building the connective layer.
        </h2>
        
        <p className={clsx(styles.body, isVisible && styles.visible)} style={{ transitionDelay: '200ms' }}>
          Work. Money. Health. Investing. Every tool lives in a silo. Infirow is the platform that brings them together — and learns from you.
        </p>

        <div className={clsx(styles.pillRow, isVisible && styles.visible)} style={{ transitionDelay: '300ms' }}>
          <div className={styles.statPill}>2 Products</div>
          <div className={styles.statPill}>Launching 2026</div>
          <div className={styles.statPill}>Built for professionals</div>
        </div>
      </div>
    </section>
  );
}
