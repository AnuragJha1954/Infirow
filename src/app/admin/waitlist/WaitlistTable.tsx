"use client";

import React, { useState } from "react";
import { Edit2, Trash2, Check, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WaitlistTable({ initialEmails }: { initialEmails: string[] }) {
  const [emails, setEmails] = useState<string[]>(initialEmails);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  const handleAdd = async () => {
    if (!newValue) return;
    const res = await fetch("/api/admin/crud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newValue }),
    });
    if (res.ok) {
      const data = await res.json();
      setEmails(data.waitlist);
      setIsAdding(false);
      setNewValue("");
    }
  };

  const handleSaveEdit = async (oldEmail: string) => {
    if (!editValue || editValue === oldEmail) {
      setEditingIndex(null);
      return;
    }
    const res = await fetch("/api/admin/crud", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldEmail, newEmail: editValue }),
    });
    if (res.ok) {
      const data = await res.json();
      setEmails(data.waitlist);
      setEditingIndex(null);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email}?`)) return;
    const res = await fetch("/api/admin/crud", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      const data = await res.json();
      setEmails(data.waitlist);
    }
  };

  return (
    <div style={{ backgroundColor: '#12111E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 300, margin: 0 }}>Registered Users</h2>
          <span style={{ fontSize: '14px', color: '#8C8AA8' }}>Showing {emails.length} entries</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsAdding(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'rgba(166, 124, 197, 0.1)', border: '1px solid rgba(166, 124, 197, 0.2)', borderRadius: '9999px', color: '#C4A0E0', fontSize: '14px', cursor: 'pointer' }}
          >
            <Plus size={16} /> Add User
          </button>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', color: '#8C8AA8', fontSize: '14px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <th style={{ padding: '24px 32px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8AA8', fontWeight: 400 }}>#</th>
            <th style={{ padding: '24px 32px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8AA8', fontWeight: 400 }}>Email Address</th>
            <th style={{ padding: '24px 32px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8AA8', fontWeight: 400 }}>Status</th>
            <th style={{ padding: '24px 32px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8AA8', fontWeight: 400, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
              <td style={{ padding: '24px 32px', color: '#8C8AA8', fontSize: '14px' }}>*</td>
              <td style={{ padding: '16px 32px' }}>
                <input 
                  type="email" 
                  value={newValue} 
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="New email..."
                  autoFocus
                  style={{ width: '100%', padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(166, 124, 197, 0.4)', borderRadius: '8px', color: '#F0EFF8', outline: 'none' }}
                />
              </td>
              <td style={{ padding: '24px 32px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(166, 124, 197, 0.1)', color: '#C4A0E0', fontSize: '12px', fontWeight: 500 }}>
                  Draft
                </span>
              </td>
              <td style={{ padding: '16px 32px', textAlign: 'right' }}>
                <button onClick={handleAdd} style={{ background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer', marginRight: '16px' }}><Check size={18} /></button>
                <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><X size={18} /></button>
              </td>
            </tr>
          )}

          {emails.length === 0 && !isAdding ? (
            <tr>
              <td colSpan={4} style={{ padding: '64px', textAlign: 'center', color: '#8C8AA8' }}>
                No users have joined the waitlist yet.
              </td>
            </tr>
          ) : (
            emails.map((email, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '24px 32px', color: '#8C8AA8', fontSize: '14px' }}>{idx + 1}</td>
                
                <td style={{ padding: editingIndex === idx ? '16px 32px' : '24px 32px', fontSize: '15px' }}>
                  {editingIndex === idx ? (
                    <input 
                      type="email" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(166, 124, 197, 0.4)', borderRadius: '8px', color: '#F0EFF8', outline: 'none' }}
                    />
                  ) : (
                    email
                  )}
                </td>
                
                <td style={{ padding: '24px 32px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(166, 124, 197, 0.1)', color: '#C4A0E0', fontSize: '12px', fontWeight: 500 }}>
                    Waitlisted
                  </span>
                </td>
                
                <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                  {editingIndex === idx ? (
                    <>
                      <button onClick={() => handleSaveEdit(email)} style={{ background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer', marginRight: '16px' }}><Check size={18} /></button>
                      <button onClick={() => setEditingIndex(null)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><X size={18} /></button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => { setEditingIndex(idx); setEditValue(email); }} 
                        style={{ background: 'none', border: 'none', color: '#8C8AA8', cursor: 'pointer', marginRight: '16px' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(email)} 
                        style={{ background: 'none', border: 'none', color: '#8C8AA8', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
