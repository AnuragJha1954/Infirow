"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductsSection.module.css";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { 
  Calculator, Bot, Target, Wallet, PiggyBank, Receipt, 
  Landmark, Shield, HeartPulse, Lock, TrendingUp, Activity, 
  BellRing, SlidersHorizontal, Database
} from "lucide-react";

const CandlestickChart = dynamic(() => import("./three/CandlestickChart"), { ssr: false });

export default function ProductsSection() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const simplifiFeatures = [
    { icon: <Calculator size={18} />, label: "EMI Optimizer" },
    { icon: <Bot size={18} />, label: "AI Assistant" },
    { icon: <Target size={18} />, label: "Wealth Score" },
    { icon: <Wallet size={18} />, label: "Smart Budget" },
    { icon: <PiggyBank size={18} />, label: "Goal Savings" },
    { icon: <Receipt size={18} />, label: "Subs Tracker" },
    { icon: <Landmark size={18} />, label: "Tax Assistant" },
    { icon: <Shield size={18} />, label: "Credit Monitor" },
    { icon: <HeartPulse size={18} />, label: "Emergency Fund" },
  ];

  const tradingFeatures = [
    { icon: <Database size={16} />, label: "OI Data Monitoring" },
    { icon: <Activity size={16} />, label: "Real-Time Charts" },
    { icon: <TrendingUp size={16} />, label: "Pattern Recognition" },
    { icon: <BellRing size={16} />, label: "Signal Alerts" },
    { icon: <SlidersHorizontal size={16} />, label: "Strategy Builder" },
    { icon: <Database size={16} />, label: "Backtesting Engine" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section ref={sectionRef} className={styles.productsSection}>
      <div className={styles.titleArea}>
        <span className={clsx(styles.eyebrow, isVisible && styles.visible)}>The ecosystem</span>
        <h2 className={clsx(styles.heading, isVisible && styles.visible)} style={{ transitionDelay: '100ms' }}>
          Two products. One vision.
        </h2>
      </div>

      <div className={styles.cardsContainer}>
        {/* CARD 1: Simplifi */}
        <div 
          className={clsx("glass-card", styles.productCard, styles.cardLeft, isVisible && styles.visible)} 
          style={{ transitionDelay: '200ms' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated Glow Border background */}
          <div className={styles.cardGlowBg} />
          
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className="tech-accent" style={{marginBottom: '8px'}}>SYS.01 // ACTIVE</div>
              <h3 className={styles.simplifiWordmark}>simplifi</h3>
              <p className={styles.cardSubtitle}>Personal Finance, Reimagined</p>
            </div>
            <div className={styles.divider} />
            
            <div className={styles.featureGrid}>
              {simplifiFeatures.map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feat.icon}</div>
                  <span className={styles.featureLabel}>{feat.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <p className={styles.footerText}>20+ features for complete financial wellness</p>
              <a href="#" className={styles.footerLink}>Get early access &rarr;</a>
            </div>
          </div>
          
          <div className={styles.cardVisualLeft}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneInner}>
                <div className={styles.mockupHeader}>Wealth Score</div>
                <div className={styles.mockupCircle}>840</div>
                <div className={styles.mockupBar} />
                <div className={styles.mockupBar} style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Trading Platform */}
        <div 
          className={clsx("glass-card", styles.productCard, styles.cardRight, isVisible && styles.visible)} 
          style={{ transitionDelay: '400ms' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated Glow Border background */}
          <div className={styles.cardGlowBg} />

          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className="tech-accent" style={{marginBottom: '8px', color: 'var(--text-muted)'}}>SYS.02 // ENCRYPTED</div>
              <h3 className={styles.tradingWordmark}>? Codename: [redacted]</h3>
              <p className={styles.cardSubtitle}>Algorithmic Trading, Simplified</p>
            </div>
            <div className={styles.divider} />
            
            <div className={styles.featurePills}>
              {tradingFeatures.map((feat, i) => (
                <div key={i} className={styles.featurePillLocked}>
                  <Lock size={12} className={styles.lockIcon} />
                  {feat.label}
                </div>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <p className={styles.footerText}>Launching Q3 2026</p>
              <a href="#" className={styles.footerLink}>Join waitlist &rarr;</a>
            </div>
          </div>

          <div className={styles.cardVisualRight}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <CandlestickChart />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
