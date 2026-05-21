import React from "react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Infirow",
  description: "Infirow Terms of Service",
};

export default function TermsPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', marginBottom: '80px' }}>
        <div className="tech-accent" style={{ marginBottom: '16px' }}>LEGAL // 02</div>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '40px' }}>
          Terms of <span className="gradient-text">Service.</span>
        </h1>
        
        <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '24px' }}>Last updated: May 2026</p>
          
          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: '24px' }}>
            By accessing or using the Infirow ecosystem, including our websites, mobile applications, and API services, you agree to be bound by these Terms of Service.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>2. Use of Algorithmic Trading Tools</h2>
          <p style={{ marginBottom: '24px' }}>
            Our algorithmic trading platforms are provided "as-is". Infirow is a technology provider, not a financial advisor. You are solely responsible for any financial losses incurred while using our automated trading infrastructure. Past performance is not indicative of future results.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>3. User Conduct</h2>
          <p style={{ marginBottom: '24px' }}>
            You agree not to exploit, reverse engineer, or attempt to break the cryptographic security measures protecting our zero-knowledge architecture. Any malicious activity will result in immediate termination of your account.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 300, marginTop: '40px', marginBottom: '16px' }}>4. Modifications</h2>
          <p style={{ marginBottom: '24px' }}>
            We reserve the right to modify these terms at any time. We will notify you of any significant changes via the email address associated with your account.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
