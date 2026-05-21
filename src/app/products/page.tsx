import React from "react";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const AbstractCubesScene = dynamic(() => import("@/components/three/AbstractCubesScene"), { ssr: false });

export const metadata = {
  title: "Products | Infirow",
  description: "Explore the Infirow ecosystem: Simplifi and our advanced Algorithmic Trading platform.",
};

export default function ProductsPage() {
  return (
    <main style={{ paddingTop: '100px', overflowX: 'hidden' }}>
      <div style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', width: '100%', position: 'relative', zIndex: 10 }}>
          <div className="tech-accent" style={{ marginBottom: '16px' }}>ECOSYSTEM // OVERVIEW</div>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '24px' }}>
            Tools that work as hard as <span className="gradient-text">you do.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.7 }}>
            At Infirow, we don't just build apps. We build compounding engines for your wealth, time, and attention. 
            Discover the platforms powering the next generation of high-performers.
          </p>
        </div>

        {/* 3D Hero Render */}
        <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', width: '800px', height: '800px', zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
          <AbstractCubesScene />
        </div>
      </div>

      <ProductsSection />
      
      {/* Expanded Bento Grids to make it more attractive */}
      <div style={{ maxWidth: '1200px', margin: '120px auto', padding: '0 48px' }}>
        <div className="tech-accent" style={{ marginBottom: '16px' }}>DEEP DIVE // SIMPLIFI</div>
        <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '40px' }}>Automate your net worth.</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '120px' }}>
          <div className="glass-card" style={{ padding: '40px', gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>AI-Driven Categorization</h3>
            <p style={{ color: 'var(--text-muted)' }}>Never manually tag a transaction again. Simplifi learns your spending habits and automatically categorizes every swipe with 99.9% accuracy.</p>
          </div>
          <div className="glass-card glow-border-wrapper" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Cashflow Forecasting</h3>
            <p style={{ color: 'var(--text-muted)' }}>See your bank balance 6 months into the future based on recurring subscriptions and historical burn rates.</p>
          </div>
        </div>

        <div className="tech-accent" style={{ marginBottom: '16px' }}>DEEP DIVE // ALGO TRADING</div>
        <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '40px' }}>Execute without emotion.</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="glass-card glow-border-wrapper" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Visual Backtesting</h3>
            <p style={{ color: 'var(--text-muted)' }}>Drag and drop conditions to build strategies. Test them against 10 years of historical tick data in milliseconds.</p>
          </div>
          <div className="glass-card" style={{ padding: '40px', gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Sub-millisecond Execution</h3>
            <p style={{ color: 'var(--text-muted)' }}>Hosted directly on exchange cross-connects. When your trigger hits, we execute before the retail market even updates the order book.</p>
          </div>
        </div>
      </div>

      <div style={{ height: '100px' }} />
      <Footer />
    </main>
  );
}
