"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import clsx from "clsx";
import { Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

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

  const logoSrc = theme === "dark" ? "/Logos/Dark Logo.png" : "/Logos/Logo.png";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <footer id="waitlist" ref={sectionRef} className={styles.footerSection}>
      <div className={styles.orbGlow} />
      
      <div className={clsx(styles.ctaContainer, isVisible && styles.visible)}>
        <span className={styles.eyebrow}>Ready?</span>
        <h2 className={styles.heading}>Join the future of living well.</h2>
        <p className={styles.subheading}>Be the first to access Simplifi and shape what comes next.</p>

        {status === "success" ? (
          <div style={{ padding: '24px', background: 'rgba(166, 124, 197, 0.1)', border: '1px solid var(--accent-purple-mid)', borderRadius: '16px', marginBottom: '24px' }}>
            <h3 style={{ color: 'var(--accent-purple-bright)', marginBottom: '8px' }}>You're on the list!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Keep an eye on your inbox for the welcome email.</p>
          </div>
        ) : (
          <form className={styles.formRow} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="email@you.com" 
              className={styles.inputField} 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button type="submit" className="pill-button" disabled={status === "loading"}>
              {status === "loading" ? "Joining..." : "Get Early Access \u2192"}
            </button>
          </form>
        )}
        {status === "error" && <p style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '16px' }}>Something went wrong. Please try again.</p>}
        <p className={styles.spamNotice}>No spam. Just product updates and launch news.</p>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerLeft}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href="/">
            <img src={logoSrc} alt="Infirow" className={styles.footerLogo} />
          </Link>
          <span className={styles.copyright}>&copy; 2026 Infirow Technologies</span>
        </div>

        <div className={styles.footerCenter}>
          <Link href="/products">Products</Link>
          <Link href="/company">Company</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <div className={styles.footerRight}>
          <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
