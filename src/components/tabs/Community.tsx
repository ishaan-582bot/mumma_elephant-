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
import { typo } from '@/lib/typography';
import { FIELD_LABEL_CLASSNAME } from '@/components/ui/FieldLabel';
import TabContent from '@/components/ui/TabContent';

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
    <div className="fade-in-up">
      <TabContent>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Hero Header */}
      <div className="mb-5 flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--blush)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream)] text-[var(--mauve)]">
          <Users size={32} />
        </div>
        <div>
          <h2 className={typo.pageHeroBold}>My Support Circle</h2>
          <p className={`mt-0.5 ${typo.bodyMuted}`}>
            You haven&apos;t helped just 1 child grow, you&apos;ve helped 154 mums too. 🌸
          </p>
        </div>
      </div>

      {/* Connection Grid */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Heart size={18} color="var(--terracotta)" /> Trusted Connections
        </h3>
        <div style={{ 
          display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 0 16px',
          scrollSnapType: 'x mandatory'
        }}>
          {mockConnections.map((conn: any) => (
            <motion.div
              key={conn.id}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
              style={{
                scrollSnapAlign: 'start', flexShrink: 0, width: 140,
                background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                padding: '16px 12px', textAlign: 'center', boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--cream-dark)',
                transition: 'box-shadow 0.2s ease',
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
              <div className={typo.fieldValue}>{conn.name}</div>
              <div className={`mb-3 ${typo.caption}`}>{conn.role}</div>
              <button 
                onClick={() => sendHug(conn.name)}
                className={FIELD_LABEL_CLASSNAME}
                style={{
                  width: '100%', padding: '6px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--blush-light)', border: 'none',
                  color: 'var(--terracotta)',
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
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <MessageSquareHeart size={18} color="var(--mauve)" /> Gratitude Board
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockGratitude.map((msg: any) => (
            <div key={msg.id} style={{
              background: 'white', borderRadius: 'var(--radius-lg)', padding: '16px',
              border: '1px dashed var(--mauve-light)', position: 'relative'
            }}>
              <p className={`italic ${typo.body}`}>
                {msg.text}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className={`font-semibold text-[var(--mauve-dark)] ${typo.caption}`}>— {msg.from}</span>
                <span className={typo.caption}>{msg.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Award size={18} color="var(--sky-blue)" /> Community Badges
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {mockBadges.map((badge: any) => (
            <div
              key={badge.id}
              style={{
                background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px',
                textAlign: 'center', border: `1px solid var(--cream-dark)`,
                boxShadow: 'var(--shadow-md)',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</div>
              <div className={typo.fieldValue}>{badge.label}</div>
              <div className={`mt-1 ${typo.caption}`}>{badge.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <History size={18} color="var(--sage-dark)" /> Your Journey
        </h3>
        <div style={{ padding: '4px 0 20px 20px', borderLeft: '2px solid var(--cream-dark)', marginLeft: 10 }}>
          {mockCommunityTimeline.map((item: any, i: number) => (
            <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
              <div style={{ 
                position: 'absolute', left: -27, top: 4, width: 12, height: 12, 
                borderRadius: 'var(--radius-full)', background: 'var(--sage)', border: '2px solid white' 
              }} />
              <div className={typo.body}>{item.action}</div>
              <div className={`mt-0.5 ${typo.caption}`}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Influence Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="rounded-[var(--radius-xl)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--blush)] bg-[var(--bg-card)] p-6 text-center shadow-[var(--shadow-md)]"
      >
        <Smile size={48} className="mx-auto mb-3 text-[var(--sky-blue)] opacity-60" />
        <h4 className={typo.pageHeroBold}>Your Wisdom Matters</h4>
        <p className={`mt-2 ${typo.body}`}>
          You&apos;ve touched the lives of <strong>154 mothers</strong> across 4 support groups this year. Keep sharing, mum!
        </p>
        <button
          type="button"
          className="mt-5 cursor-pointer rounded-full border border-[var(--cream-dark)] bg-[var(--blush-light)] px-6 py-2.5 text-sm font-semibold text-[var(--terracotta)] transition-colors hover:bg-[var(--cream)]"
        >
          Invite a Friend
        </button>
      </motion.div>
      </TabContent>
    </div>
  );
}
