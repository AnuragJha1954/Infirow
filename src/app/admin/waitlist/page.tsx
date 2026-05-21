import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { Users, Mail, Clock } from "lucide-react";
import { sql } from "@vercel/postgres";

import WaitlistTable from "./WaitlistTable";

// Force Next.js to not cache this page so it always shows the latest waitlist
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Waitlist Dashboard",
};

export default async function AdminWaitlistPage() {
  let emails: string[] = [];
  
  try {
    const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (dbUrl) {
      await sql`CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
      const result = await sql`SELECT email FROM waitlist ORDER BY id ASC;`;
      emails = result.rows.map(r => r.email);
    } else {
      const filePath = path.join(process.cwd(), "waitlist.json");
      const fileData = await fs.readFile(filePath, "utf-8");
      emails = JSON.parse(fileData);
    }
  } catch (error) {
    // If the file doesn't exist or DB fails, emails remains []
    console.error("Failed to fetch emails:", error);
  }

  return (
    <main style={{ minHeight: '100vh', padding: '120px 48px', backgroundColor: '#0D0C14', color: '#F0EFF8' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div>
            <div className="tech-accent" style={{ marginBottom: '16px' }}>INTERNAL // SECURE</div>
            <h1 style={{ fontSize: '48px', fontWeight: 200, letterSpacing: '-1px', margin: 0 }}>
              Waitlist <span style={{ color: 'var(--accent-purple-light)' }}>Dashboard</span>
            </h1>
          </div>
          <Link href="/" style={{ padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', color: '#F0EFF8', textDecoration: 'none', fontSize: '14px', transition: 'background-color 0.2s' }}>
            &larr; Back to Site
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '64px' }}>
          <div style={{ backgroundColor: '#12111E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8C8AA8', marginBottom: '16px' }}>
              <Users size={20} />
              <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Signups</span>
            </div>
            <div style={{ fontSize: '48px', fontWeight: 200 }}>{emails.length}</div>
          </div>
          
          <div style={{ backgroundColor: '#12111E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8C8AA8', marginBottom: '16px' }}>
              <Mail size={20} />
              <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Latest Cohort</span>
            </div>
            <div style={{ fontSize: '48px', fontWeight: 200 }}>Beta 1</div>
          </div>
          
          <div style={{ backgroundColor: '#12111E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8C8AA8', marginBottom: '16px' }}>
              <Clock size={20} />
              <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</span>
            </div>
            <div style={{ fontSize: '48px', fontWeight: 200, color: '#4CAF50' }}>Live</div>
          </div>
        </div>

        {/* Interactive Data Table */}
        <WaitlistTable initialEmails={emails} />

      </div>
    </main>
  );
}
