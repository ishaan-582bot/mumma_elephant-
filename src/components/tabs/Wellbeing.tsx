'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Phone, Moon, Sun, 
  Smile, Frown, Meh, Zap, 
  ShieldCheck, ArrowRight, CheckCircle2,
  AlertCircle, Sparkles
} from 'lucide-react';
import Badge from '../ui/Badge';
import Toast from '../ui/Toast';
import { mockMoods, mockSelfCare } from '@/lib/data';

export default function Wellbeing() {
  const [enabled, setEnabled] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as any });

  const moods = [
    { emoji: '✨', label: 'Radiant', color: 'var(--sage)' },
    { emoji: '😊', label: 'Good', color: 'var(--sky-blue)' },
    { emoji: '😐', label: 'Okay', color: 'var(--cream-dark)' },
    { emoji: '😔', label: 'Low', color: 'var(--mauve-light)' },
    { emoji: '🤯', label: 'Overwhelmed', color: 'var(--terracotta-light)' },
  ];

  if (!enabled) {
    return (
      <div className="fade-in-up" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', background: 'var(--cream)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          <ShieldCheck size={32} />
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Wellbeing Suite is Private</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 8, maxWidth: 300, margin: '8px auto 24px' }}>
          Your emotional data is never shared. You can enable this feature to track your mood and access resources.
        </p>
        <button 
          onClick={() => setEnabled(true)}
          style={{
            padding: '12px 32px', borderRadius: 'var(--radius-full)',
            background: 'var(--sage)', color: 'white', fontWeight: 700,
            border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-md)'
          }}
        >
          Enable Wellbeing Features
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in-up" style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          How are you, Sarah? <Heart size={20} fill="var(--terracotta)" color="var(--terracotta)" />
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          This is your private space. Only you can see this.
        </p>
      </div>

      {/* Mood Selector */}
      <div style={{ 
        background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', padding: '24px 20px',
        border: '1px solid var(--cream-dark)', boxShadow: 'var(--shadow-sm)', marginBottom: 24
      }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20, textAlign: 'center' }}>
          How are you feeling right now?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {moods.map((m) => (
            <motion.button
              key={m.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedMood(m.label);
                setToast({ show: true, message: `Checked in as ${m.label}. You're doing great, mum! 🌸`, type: 'success' });
              }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                background: selectedMood === m.label ? m.color : 'transparent',
                border: selectedMood === m.label ? 'none' : '1px solid var(--cream-dark)',
                borderRadius: 'var(--radius-lg)', padding: '12px 4px', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: selectedMood === m.label ? 'white' : 'var(--text-muted)' }}>{m.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--mauve-light), var(--sky-blue-light))',
        borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 24,
        display: 'flex', gap: 16, border: '1px solid rgba(138, 107, 138, 0.1)'
      }}>
        <AlertCircle size={24} color="var(--mauve)" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Wellbeing Insight</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
            You&apos;ve reported feeling <strong>Overwhelmed</strong> twice this week. Remember, it&apos;s okay to ask for help. Would you like to check out the sleep group?
          </p>
          <button style={{ 
            marginTop: 12, fontSize: '0.75rem', fontWeight: 700, color: 'var(--mauve)',
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4
          }}>
            Explore Support Groups <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Crisis Support */}
      <div style={{ 
        background: 'var(--terracotta-light)', borderRadius: 'var(--radius-lg)', padding: '20px',
        marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--terracotta)' }}>Need to talk?</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--terracotta)', opacity: 0.8, marginTop: 2 }}>
            Immediate support for postpartum mental health.
          </p>
        </div>
        <button style={{
          padding: '10px 16px', borderRadius: 'var(--radius-full)',
          background: 'var(--terracotta)', color: 'white', fontWeight: 700,
          border: 'none', cursor: 'pointer', fontSize: '0.8rem',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Phone size={14} /> Talk to Someone
        </button>
      </div>

      {/* Self Care Goals */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} color="var(--sage)" /> Today&apos;s Self-Care
          </h3>
          <span style={{ fontSize: '0.7rem', color: 'var(--sage-dark)', fontWeight: 700 }}>
            <Zap size={12} fill="var(--sage)" style={{ display: 'inline', marginRight: 4 }} /> 5 Day Streak!
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockSelfCare.map((goal) => (
            <motion.div
              key={goal.id}
              whileTap={{ x: 4 }}
              style={{
                background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '14px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: goal.completed ? '1px solid var(--sage-light)' : '1px solid var(--cream-dark)',
                opacity: goal.completed ? 0.7 : 1
              }}
            >
              <span style={{ 
                fontSize: '0.85rem', color: 'var(--text-primary)', 
                textDecoration: goal.completed ? 'line-through' : 'none' 
              }}>{goal.label}</span>
              {goal.completed ? (
                <CheckCircle2 size={20} color="var(--sage)" />
              ) : (
                <div style={{ width: 20, height: 20, borderRadius: 'var(--radius-full)', border: '2px solid var(--cream-dark)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings Link */}
      <div style={{ textAlign: 'center', marginTop: 32, padding: '16px', borderTop: '1px dashed var(--cream-dark)' }}>
        <button 
          onClick={() => setEnabled(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Disable wellbeing check-ins in settings
        </button>
      </div>
    </div>
  );
}
