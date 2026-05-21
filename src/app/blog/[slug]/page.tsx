import React from "react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "../blogData";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts[params.slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: "Post Not Found | Infirow",
    };
  }

  return {
    title: `${post.title} | Infirow Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Infirow Team"],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <main style={{ paddingTop: '120px' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', marginBottom: '120px' }}>
        <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '40px', fontSize: '14px' }}>
          &larr; Back to all posts
        </Link>
        
        <header style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
            <span className="tech-accent">{post.category}</span>
            <time dateTime={new Date(post.date).toISOString()} style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {post.date}
            </time>
          </div>
          
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 200, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-primary)' }}>
            {post.title}
          </h1>
          
          <p style={{ fontSize: '20px', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300 }}>
            {post.description}
          </p>
        </header>

        {/* Using dangerouslySetInnerHTML because we hardcoded raw HTML content for speed and formatting */}
        <section 
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
      </article>
      
      <Footer />
    </main>
  );
}
