"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useTheme } from "./ThemeProvider";
import { Menu } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = theme === "dark" ? "/Logos/Dark Logo.png" : "/Logos/Logo.png";

  return (
    <nav className={clsx(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.logoContainer}>
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Infirow" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.navLinks}>
        <Link href="/products" className={styles.navLink}>Products</Link>
        <Link href="/company" className={styles.navLink}>Company</Link>
        <Link href="/security" className={styles.navLink}>Security</Link>
        <Link href="/blog" className={styles.navLink}>Blog</Link>
      </div>

      <div className={styles.rightSection}>
        <button 
          className={styles.themeToggle} 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        />
        <button 
          className={styles.ctaButton}
          onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Early Access
        </button>
        <button className={styles.hamburger} aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
