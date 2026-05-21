import React from "react";
import Footer from "@/components/Footer";
import VisionSection from "@/components/VisionSection";
import dynamic from "next/dynamic";

const FloatingRingsScene = dynamic(() => import("@/components/three/FloatingRingsScene"), { ssr: false });

export const metadata = {
  title: "Company | Infirow",
  description: "Learn about the mission, values, and team behind Infirow.",
};

export default function CompanyPage() {
  return (
    <main style={{ paddingTop: '120px', overflowX: 'hidden' }}>
      <div style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
          <div className="tech-accent" style={{ marginBottom: '16px' }}>MANIFESTO // INFIROW</div>
          <h1 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 200, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '24px' }}>
            We refuse to <span className="gradient-text">settle.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1.7, margin: '0 auto', maxWidth: '600px' }}>
            Infirow was born out of frustration with fragmented tools, slow interfaces, and uninspired design. 
            We are a collective of engineers, quants, and designers building the ultimate operating system for your life and wealth.
          </p>
        </div>

        {/* 3D Hero Render */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
          <FloatingRingsScene />
        </div>
      </div>

      <VisionSection />

      <div style={{ maxWidth: '1200px', margin: '120px auto', padding: '0 48px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '40px', textAlign: 'center' }}>Our Core Principles</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '40px' }}>
            <div className="tech-accent" style={{ marginBottom: '16px' }}>01 // SPEED</div>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Zero latency thinking.</h3>
            <p style={{ color: 'var(--text-muted)' }}>If a tool slows you down, it's broken. We obsess over milliseconds so you can stay in flow.</p>
          </div>
          
          <div className="glass-card glow-border-wrapper" style={{ padding: '40px' }}>
            <div className="tech-accent" style={{ marginBottom: '16px' }}>02 // PRECISION</div>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Pixel-perfect engineering.</h3>
            <p style={{ color: 'var(--text-muted)' }}>From our UI down to our trading algorithms, we believe in mathematical precision.</p>
          </div>

          <div className="glass-card" style={{ padding: '40px' }}>
            <div className="tech-accent" style={{ marginBottom: '16px' }}>03 // BEAUTY</div>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Aesthetics matter.</h3>
            <p style={{ color: 'var(--text-muted)' }}>Beautiful software inspires better work. We don't compromise on design.</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
