"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });

      if (res.ok) {
        router.push("/admin/waitlist");
      } else {
        setStatus("error");
        setPassword("");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D0C14', color: '#F0EFF8' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '48px', backgroundColor: '#12111E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', margin: '0 auto 24px', backgroundColor: 'rgba(166, 124, 197, 0.1)', border: '1px solid rgba(166, 124, 197, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A67CC5' }}>
          <Lock size={20} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '8px' }}>Admin Login</h1>
        <p style={{ color: '#8C8AA8', fontSize: '14px', marginBottom: '32px' }}>Enter the secure access key to continue.</p>

        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === "loading"}
            style={{ 
              width: '100%', 
              padding: '14px 20px', 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              border: status === "error" ? '1px solid #ff6b6b' : '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              color: '#F0EFF8', 
              fontSize: '15px',
              outline: 'none',
              marginBottom: '16px'
            }}
          />
          {status === "error" && (
            <p style={{ color: '#ff6b6b', fontSize: '12px', textAlign: 'left', marginTop: '-8px', marginBottom: '16px' }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button 
            type="submit" 
            disabled={status === "loading"}
            style={{ 
              width: '100%', 
              padding: '14px 20px', 
              background: 'linear-gradient(135deg, #7B5EA7 0%, #A67CC5 100%)', 
              border: 'none', 
              borderRadius: '12px', 
              color: '#FFF', 
              fontSize: '15px', 
              fontWeight: 500,
              cursor: status === "loading" ? 'default' : 'pointer',
              opacity: status === "loading" ? 0.7 : 1
            }}
          >
            {status === "loading" ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
