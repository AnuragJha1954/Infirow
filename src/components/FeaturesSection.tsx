"use client";

import React, { useEffect, useRef } from "react";
import styles from "./FeaturesSection.module.css";
import clsx from "clsx";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.3 }
    );

    const blocks = containerRef.current?.querySelectorAll(`.${styles.featureBlock}`);
    blocks?.forEach(block => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      tag: "EMI & Loans",
      title: "Stop overpaying. Start optimizing.",
      body: "Our EMI Optimizer analyzes your existing loans and suggests prepayment strategies to save you thousands in interest.",
      visualType: "emi",
      layout: "left"
    },
    {
      tag: "AI Assistant",
      title: "Your money has a brain now.",
      body: "Ask questions, get insights, and manage your finances with an intelligent assistant that understands your goals.",
      visualType: "chat",
      layout: "right"
    },
    {
      tag: "Wealth Tracking",
      title: "Know your score. Grow your wealth.",
      body: "Track all your assets in one place and get a unified Wealth Score that updates in real-time as you progress.",
      visualType: "score",
      layout: "left"
    },
    {
      tag: "Family Finance",
      title: "Built for the whole family.",
      body: "Share budgets, track family expenses, and manage allowances for children — all from a single dashboard.",
      visualType: "family",
      layout: "right"
    }
  ];

  return (
    <section className={styles.featuresSection} ref={containerRef}>
      {features.map((feat, i) => (
        <div key={i} className={clsx(styles.featureBlock, feat.layout === "right" && styles.reverseLayout)}>
          <div className={styles.textContent}>
            <span className="tag-pill">{feat.tag}</span>
            <h2 className={styles.heading}>{feat.title}</h2>
            <p className={styles.body}>{feat.body}</p>
          </div>
          
          <div className={styles.visualContent}>
            <div className={clsx("glass-card", styles.visualCard, styles[`visual-${feat.visualType}`])}>
              {/* Visual placeholders for CSS animations */}
              {feat.visualType === 'emi' && (
                <div className={styles.emiMockup}>
                  <div className={styles.barContainer}>
                    <div className={styles.barRed} style={{height: '80%'}}></div>
                    <div className={styles.barGreen} style={{height: '40%'}}></div>
                  </div>
                  <div className={styles.savingText}>₹1.2L Saved</div>
                </div>
              )}
              {feat.visualType === 'chat' && (
                <div className={styles.chatMockup}>
                  <div className={styles.chatBubbleUser}>How much did I spend on food?</div>
                  <div className={styles.chatBubbleAI}>You spent ₹12,400 on dining out this month, which is 15% above your budget.</div>
                </div>
              )}
              {feat.visualType === 'score' && (
                <div className={styles.scoreMockup}>
                  <svg viewBox="0 0 100 100" className={styles.scoreDial}>
                    <circle cx="50" cy="50" r="40" stroke="var(--border-color)" strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="var(--accent-purple-light)" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="60" className={styles.scoreProgress} />
                  </svg>
                  <div className={styles.scoreValue}>Excellent</div>
                </div>
              )}
              {feat.visualType === 'family' && (
                <div className={styles.familyMockup}>
                  <div className={styles.avatarRow}>
                    <div className={styles.avatar}>A</div>
                    <div className={styles.avatar}>S</div>
                    <div className={styles.avatar}>K</div>
                  </div>
                  <div className={styles.budgetRow}>
                    <div className={styles.budgetFill} style={{width: '70%'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
