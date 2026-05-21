import React from "react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Infirow",
  description: "Infirow Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', marginBottom: '80px' }}>
        <div className="tech-accent" style={{ marginBottom: '16px' }}>LEGAL // 01</div>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '40px' }}>
          Privacy <span className="gradient-text">Policy.</span>
        </h1>
        
        <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '24px' }}>Last updated: May 2026</p>
          
          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>1. Introduction</h2>
          <p style={{ marginBottom: '24px' }}>
            At Infirow, we believe your financial data belongs strictly to you. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our applications (Simplifi and our trading platforms).
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>2. Data We Collect</h2>
          <p style={{ marginBottom: '24px' }}>
            We only collect the absolute minimum data required to provide our services. This includes basic account information, transaction telemetry strictly for algorithm optimization, and secure hashes of biometric keys.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>3. Zero-Knowledge Architecture</h2>
          <p style={{ marginBottom: '24px' }}>
            Our systems are built on zero-knowledge proofs. We cannot read your specific financial transactions, nor can we access your algorithmic trading strategies. Everything is encrypted on-device before ever hitting our servers.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>4. Third-Party Sharing</h2>
          <p style={{ marginBottom: '24px' }}>
            We do not sell your data. Period. We only share data with third-party service providers (like bank API aggregators) when explicitly authorized by you to facilitate core functionality.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
