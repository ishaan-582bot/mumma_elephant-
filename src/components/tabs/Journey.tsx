'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, Clock, Camera, Mail, 
  ArrowRight, Heart, Star, 
  ChevronRight, CalendarDays as CalendarIcon, Sparkles, Plus, Lock
} from 'lucide-react';
import Badge from '../ui/Badge';
import Toast from '../ui/Toast';
import { 
  mockJourneyEvents, mockHistoricalMemories, 
  mockLegacyLetters, mockGrowthComparison 
} from '@/lib/data';

export default function Journey() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as any });

  return (
    <div className="fade-in-up" style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Hero recap */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--sky-blue-light), var(--lavender-light))',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 20px',
        marginBottom: 24,
        textAlign: 'center',
        border: '1px solid var(--cream-dark)'
      }}>
        <div style={{ 
          width: 64, height: 64, borderRadius: 'var(--radius-full)', 
          background: 'white', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: 'var(--sky-blue)',
          margin: '0 auto 16px', boxShadow: 'var(--shadow-sm)'
        }}>
          <History size={32} />
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Your Motherhood Story</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          10 months of growth, 154 lives touched, and 1 beautiful journey. 🐘✨
        </p>
      </div>

      {/* This Day Last Year */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={18} color="var(--terracotta)" /> This Day Last Year
        </h3>
        {mockHistoricalMemories.map((mem) => (
          <motion.div
            key={mem.id}
            whileHover={{ y: -4 }}
            style={{
              background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              boxShadow: 'var(--shadow-md)', border: '1px solid var(--cream-dark)',
              position: 'relative'
            }}
          >
            <div style={{ 
              height: 180, background: 'var(--cream)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
              fontSize: '0.8rem', fontStyle: 'italic', position: 'relative'
            }}>
              <Camera size={40} style={{ opacity: 0.2 }} />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4))',
                zIndex: 1
              }} />
              <span style={{ position: 'absolute', bottom: 12, left: 16, color: 'white', fontWeight: 700, zIndex: 2 }}>{mem.date}</span>
            </div>
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                &quot;{mem.caption}&quot;
              </p>
              <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
                <Badge label="Nursery Prep" variant="cream" size="sm" />
                <Badge label="Pregnancy Days" variant="sage" size="sm" />
              </div>
            </div>
            {/* Nostalgic Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'rgba(215, 189, 215, 0.05)' }} />
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Star size={18} color="var(--mauve)" /> Key Moments
        </h3>
        <div style={{ paddingLeft: 20, borderLeft: '2px dashed var(--cream-dark)', marginLeft: 10 }}>
          {mockJourneyEvents.map((evt: any) => (
            <div key={evt.id} style={{ position: 'relative', marginBottom: 24 }}>
              <div style={{ 
                position: 'absolute', left: -26, top: 4, width: 12, height: 12, 
                borderRadius: 'var(--radius-full)', background: 'white', border: '3px solid var(--mauve)' 
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.2rem' }}>{evt.icon}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{evt.title}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {new Date(evt.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Then vs Now */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color="var(--sage)" /> Then vs Now
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid var(--cream-dark)', textAlign: 'center' }}>
            <div style={{ height: 100, background: 'var(--cream)', borderRadius: 'var(--radius-md)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Camera size={24} style={{ opacity: 0.1 }} />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{mockGrowthComparison.then.date}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>{mockGrowthComparison.then.weight}kg • {mockGrowthComparison.then.height}cm</div>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid var(--sage-light)', textAlign: 'center' }}>
            <div style={{ height: 100, background: 'var(--sage-light)', borderRadius: 'var(--radius-md)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Camera size={24} style={{ opacity: 0.1 }} />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{mockGrowthComparison.now.date}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>{mockGrowthComparison.now.weight}kg • {mockGrowthComparison.now.height}cm</div>
          </div>
        </div>
      </div>

      {/* Legacy Letters */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Mail size={18} color="var(--sky-blue)" /> Letters to Future You
        </h3>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--sky-blue-light)', padding: '16px' }}>
          {mockLegacyLetters.map((letter: any) => (
            <div key={letter.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>To {letter.to}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Unlocks on {new Date(letter.unlockDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <div style={{ color: 'var(--sky-blue)', opacity: 0.4 }}><Lock size={20} /></div>
            </div>
          ))}
          <button 
            onClick={() => setToast({ show: true, message: 'Your letter has been safely stored for the future! ✉️✨', type: 'success' })}
            style={{
              width: '100%', marginTop: 16, padding: '12px', borderRadius: 'var(--radius-md)',
              background: 'var(--sky-blue-light)', border: 'none', color: 'var(--sky-blue-dark)',
              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
          >
            <Plus size={16} /> Write a New Letter
          </button>
        </div>
      </div>
    </div>
  );
}
