"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HowWeThinkSection.module.css";
import clsx from "clsx";
import { DollarSign, LineChart, Activity, Target, BookOpen, Compass } from "lucide-react";

export default function HowWeThinkSection() {
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

  const bentoItems = [
    { icon: <DollarSign size={48} strokeWidth={1} />, title: "Finance", desc: "Automated wealth building and seamless cash flow." },
    { icon: <LineChart size={48} strokeWidth={1} />, title: "Investing", desc: "Algorithmic strategies, simplified for everyone." },
    { icon: <Activity size={48} strokeWidth={1} />, title: "Performance", desc: "Track habits, optimize your daily routine." },
    { icon: <Target size={48} strokeWidth={1} />, title: "Goals", desc: "Set milestones and let the system guide you." },
    { icon: <BookOpen size={48} strokeWidth={1} />, title: "Learning", desc: "Continuous compounding of knowledge." },
    { icon: <Compass size={48} strokeWidth={1} />, title: "Life Decisions", desc: "Data-driven clarity for your biggest moves." },
  ];

  return (
    <section ref={sectionRef} className={styles.howWeThinkSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={clsx(styles.eyebrow, isVisible && styles.visible)}>How Infirow Thinks</span>
          <h2 className={clsx(styles.heading, isVisible && styles.visible)} style={{ transitionDelay: '100ms' }}>
            A holistic approach to optimization.
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          {bentoItems.map((item, i) => (
            <div 
              key={i} 
              className={clsx("glass-card", styles.bentoCard, isVisible && styles.visible)}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
