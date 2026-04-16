'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Eye, EyeOff, Lock, Globe, 
  ArrowRight, Download, Trash2, ShieldCheck, 
  History, Settings2, ShieldAlert
} from 'lucide-react';
import Badge from '../ui/Badge';
import Toast from '../ui/Toast';
import BottomSheet from '../ui/BottomSheet';
import { mockPrivacyLogs } from '@/lib/data';

export default function PrivacySafety() {
  const [activePreset, setActivePreset] = useState<'Maximum' | 'Community' | 'Open' | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as any });

  const stats = [
    { label: 'Private Items', value: 12, icon: <Lock size={16} />, color: 'var(--mauve)' },
    { label: 'Connections Only', value: 5, icon: <ShieldCheck size={16} />, color: 'var(--sage)' },
    { label: 'Visible to All', value: 2, icon: <Globe size={16} />, color: 'var(--sky-blue)' },
  ];

  const applyPreset = (preset: 'Maximum' | 'Community' | 'Open') => {
    setActivePreset(preset);
    const messages = {
      Maximum: 'Maximum Privacy applied: Everything is now private 🔒',
      Community: 'Community Sharing applied: Moments shared with mums 🌸',
      Open: 'Open Book applied: Profile visible to community ✨'
    };
    setToast({ show: true, message: messages[preset], type: 'success' });
  };

  return (
    <div className="fade-in-up" style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Hero Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--sky-blue-light), var(--lavender-light))',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 20px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{ 
          width: 56, height: 56, borderRadius: 'var(--radius-full)', 
          background: 'white', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: 'var(--sky-blue)' 
        }}>
          <Shield size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Privacy & Safety</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            You are in total control of your data, mum.
          </p>
        </div>
      </div>

      {/* Visual Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 10px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            border: `1px solid var(--cream-dark)`,
          }}>
            <div style={{ color: stat.color, marginBottom: 6, display: 'flex', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Presets */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} color="var(--mauve)" /> Privacy Presets
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'Maximum', label: 'Maximum Privacy', desc: 'Hide everything from everyone but you.', icon: <Lock size={18} /> },
            { id: 'Community', label: 'Community Sharing', desc: 'Share posts with mums, keep info private.', icon: <ShieldCheck size={18} /> },
            { id: 'Open', label: 'Open Book', desc: 'Most content visible to the community.', icon: <Globe size={18} /> },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id as any)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: activePreset === preset.id ? 'var(--blush-light)' : 'var(--bg-card)',
                border: activePreset === preset.id ? '2px solid var(--blush)' : '2px solid var(--cream-dark)',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ color: activePreset === preset.id ? 'var(--blush-dark)' : 'var(--text-muted)' }}>
                {preset.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{preset.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{preset.desc}</div>
              </div>
              <ArrowRight size={16} color="var(--cream-dark)" />
            </button>
          ))}
        </div>
      </div>

        <div style={{ 
          background: 'linear-gradient(135deg, var(--sage-light), var(--sky-blue-light))', 
          borderRadius: 'var(--radius-lg)', 
          padding: '16px',
          marginBottom: 24,
          border: '1px solid rgba(74, 107, 58, 0.1)'
        }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={16} color="var(--sage-dark)" /> Your Safe Space
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
            Your <strong>Emotional Wellbeing</strong> data and <strong>Safe Vault</strong> entries are never shared. They are encrypted and only visible to you.
          </p>
        </div>

        {/* Compliance Tools */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={18} color="var(--terracotta)" /> Your Data Rights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={() => setToast({ show: true, message: 'We are preparing your data package. Check your email soon! 📥', type: 'info' })}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '2px solid var(--cream-dark)',
              textAlign: 'center',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Download size={20} color="var(--sage)" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Download Data</div>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '2px solid var(--cream-dark)',
              textAlign: 'center',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Trash2 size={20} color="var(--terracotta)" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Delete Account</div>
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <History size={18} color="var(--sky-blue)" /> Recent Privacy Changes
        </h3>
        <div style={{ 
          background: 'var(--bg-card)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '8px 4px',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {mockPrivacyLogs.map((log: any) => (
            <div key={log.id} style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--cream-dark)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{log.action}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{log.details}</div>
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>{log.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation */}
      <BottomSheet isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Delete Your Account">
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 'var(--radius-full)', 
            background: 'var(--terracotta-light)', color: 'var(--terracotta)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Trash2 size={32} />
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Are you absolutely sure?</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 24 }}>
            This will permanently remove all your posts, messages, and child milestones. Your shared tips will remain visible anonymously to help other mums, unless you choose to delete them individually.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                flex: 1, padding: '14px', borderRadius: 'var(--radius-md)',
                background: 'var(--cream-dark)', border: 'none',
                fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Keep My Account
            </button>
            <button
              onClick={() => { setShowDeleteConfirm(false); setToast({ show: true, message: 'Account scheduled for deletion. We\'ll miss you, mum. 🐘💔', type: 'error' }); }}
              style={{
                flex: 1, padding: '14px', borderRadius: 'var(--radius-md)',
                background: 'var(--terracotta)', border: 'none',
                fontWeight: 700, color: 'white', cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
