import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Blog | Infirow",
  description: "Insights, updates, and thoughts from the Infirow team.",
};

export default function BlogPage() {
  const posts = [
    { slug: "architecture-of-simplifi", title: "The Architecture of Simplifi", date: "May 12, 2026", category: "Engineering" },
    { slug: "abandoning-tailwind-for-vanilla-css", title: "Why we abandoned Tailwind for Vanilla CSS", date: "April 28, 2026", category: "Design" },
    { slug: "announcing-infirow-beta", title: "Announcing Infirow Beta", date: "March 15, 2026", category: "Company" },
    { slug: "high-frequency-data-react", title: "High-Frequency Data in React", date: "February 04, 2026", category: "Engineering" },
  ];

  return (
    <main style={{ paddingTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', marginBottom: '80px' }}>
        <div className="tech-accent" style={{ marginBottom: '16px' }}>KNOWLEDGE // BASE</div>
        <h1 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 200, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '24px' }}>
          Insights & <span className="gradient-text">Updates.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.7 }}>
          Deep dives into our engineering process, design philosophy, and thoughts on the future of wealth management.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', marginBottom: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {posts.map((post, idx) => (
            <Link key={idx} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tech-accent">{post.category}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{post.date}</span>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 300, marginTop: 'auto', color: 'var(--text-primary)' }}>{post.title}</h2>
                <div style={{ color: 'var(--accent-purple-light)', fontSize: '14px', marginTop: '16px' }}>Read article &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
