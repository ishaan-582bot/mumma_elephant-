'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Heart, Award, History, 
  MessageCircle, ArrowRight, Share2, Star, 
  MessageSquareHeart, Smile
} from 'lucide-react';
import Badge from '../ui/Badge';
import Toast from '../ui/Toast';
import { 
  mockConnections, mockBadges, mockGratitude, mockCommunityTimeline 
} from '@/lib/data';

export default function Community() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as any });

  const sendHug = (name: string) => {
    setToast({ 
      show: true, 
      message: `A heart-warming hug sent to ${name}! ❤️✨`, 
      type: 'success' 
    });
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
        background: 'linear-gradient(135deg, var(--blush-light), var(--mauve-light))',
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
          alignItems: 'center', justifyContent: 'center', color: 'var(--mauve)' 
        }}>
          <Users size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>My Support Circle</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            You haven&apos;t helped just 1 child grow, you&apos;ve helped 154 mums too. 🌸
          </p>
        </div>
      </div>

      {/* Connection Grid */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Heart size={18} color="var(--terracotta)" /> Trusted Connections
        </h3>
        <div style={{ 
          display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 0 16px',
          scrollSnapType: 'x mandatory'
        }}>
          {mockConnections.map((conn: any) => (
            <motion.div
              key={conn.id}
              whileHover={{ y: -4 }}
              style={{
                scrollSnapAlign: 'start', flexShrink: 0, width: 140,
                background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                padding: '16px 12px', textAlign: 'center', boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--cream-dark)'
              }}
            >
              <div style={{ 
                width: 48, height: 48, borderRadius: 'var(--radius-full)', 
                background: 'var(--cream)', margin: '0 auto 10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20
              }}>
                {conn.avatar ? <img src={conn.avatar} alt={conn.name} /> : '👤'}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{conn.name}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 12 }}>{conn.role}</div>
              <button 
                onClick={() => sendHug(conn.name)}
                style={{
                  width: '100%', padding: '6px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--blush-light)', border: 'none',
                  color: 'var(--terracotta)', fontSize: '0.7rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                }}
              >
                <Heart size={12} fill="var(--terracotta)" /> Send Hug
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gratitude Board */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageSquareHeart size={18} color="var(--mauve)" /> Gratitude Board
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockGratitude.map((msg: any) => (
            <div key={msg.id} style={{
              background: 'white', borderRadius: 'var(--radius-lg)', padding: '16px',
              border: '1px dashed var(--mauve-light)', position: 'relative'
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                {msg.text}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--mauve-dark)' }}>— {msg.from}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{msg.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Award size={18} color="var(--sky-blue)" /> Community Badges
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {mockBadges.map((badge: any) => (
            <div key={badge.id} style={{
              background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px',
              textAlign: 'center', border: `1px solid var(--cream-dark)`,
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{badge.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>{badge.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <History size={18} color="var(--sage-dark)" /> Your Journey
        </h3>
        <div style={{ padding: '4px 0 20px 20px', borderLeft: '2px solid var(--cream-dark)', marginLeft: 10 }}>
          {mockCommunityTimeline.map((item: any, i: number) => (
            <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
              <div style={{ 
                position: 'absolute', left: -27, top: 4, width: 12, height: 12, 
                borderRadius: 'var(--radius-full)', background: 'var(--sage)', border: '2px solid white' 
              }} />
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.action}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Influence Card */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        style={{ 
          background: 'linear-gradient(135deg, var(--sky-blue), var(--sky-blue-dark))',
          borderRadius: 'var(--radius-xl)', padding: '24px', textAlign: 'center', color: 'white',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <Smile size={48} style={{ opacity: 0.5, marginBottom: 12 }} />
        <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your Wisdom Matters</h4>
        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 8, lineHeight: 1.5 }}>
          You&apos;ve touched the lives of <strong>154 mothers</strong> across 4 support groups this year. Keep sharing, mum!
        </p>
        <button style={{
          marginTop: 20, padding: '10px 24px', borderRadius: 'var(--radius-full)',
          background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
          color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
        }}>
          Invite a Friend
        </button>
      </motion.div>
    </div>
  );
}
