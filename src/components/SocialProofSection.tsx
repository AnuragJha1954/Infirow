"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./SocialProofSection.module.css";

export default function SocialProofSection() {
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const targetCount = 4200;

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * targetCount));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetCount);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationFrame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [targetCount]);

  return (
    <section ref={sectionRef} className={styles.socialProofSection}>
      <div className={styles.container}>
        <div className={styles.counter}>{count.toLocaleString()}+</div>
        <p className={styles.mutedText}>Professionals, investors, and optimizers — waiting</p>
        
        <div className={styles.avatarCluster}>
          <div className={styles.avatar} style={{ zIndex: 3, backgroundColor: '#4A3F7A' }}></div>
          <div className={styles.avatar} style={{ zIndex: 2, backgroundColor: '#7B5EA7', marginLeft: '-16px' }}></div>
          <div className={styles.avatar} style={{ zIndex: 1, backgroundColor: '#A67CC5', marginLeft: '-16px' }}></div>
          <span className={styles.clusterText}>+4,200 already joined</span>
        </div>

        <button 
          className="pill-button"
          onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Reserve your spot
        </button>
      </div>
    </section>
  );
}
