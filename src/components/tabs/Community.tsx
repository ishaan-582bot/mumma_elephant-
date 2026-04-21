'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Award, History, 
  MessageCircle, ArrowRight, Star, 
  MessageSquareHeart, Smile
} from 'lucide-react';
import Badge from '../ui/Badge';
import { useToast } from '../ui/ToastContext';
import { 
  mockConnections, mockBadges, mockGratitude, mockCommunityTimeline 
} from '@/lib/data';
import { typo } from '@/lib/typography';
import Card from '@/components/ui/Card';
import TabContent from '@/components/ui/TabContent';
import SectionHero from '@/components/ui/SectionHero';

export default function Community() {
  const { showToast } = useToast();

  const sendHug = (name: string) => {
    showToast(`A heart-warming hug sent to ${name}! ❤️✨`, 'success');
  };

  return (
    <div className="fade-in-up">
      <TabContent>

      {/* Hero Header */}
      <SectionHero
        icon={<Users size={32} />}
        title="My Support Circle"
        subtitle="You haven't helped just 1 child grow, you've helped 154 mums too. 🌸"
        accentColor="var(--blush)"
      />

      {/* Connection Grid */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Heart size={18} color="var(--terracotta)" /> Trusted Connections
        </h3>
        <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {mockConnections.map((conn: any, i: number) => (
            <motion.div
              key={conn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ease: 'easeOut' }}
              whileTap={{ scale: 0.98 }}
              className="min-w-[140px] transition-all duration-150 hover:-translate-y-1"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Card 
                bodyClassName="px-3 py-4 flex flex-col items-center text-center"
              >
                <div style={{ 
                  width: 48, height: 48, borderRadius: 'var(--radius-full)', 
                  background: 'var(--cream)', marginBottom: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20
                }}>
                  {conn.avatar ? <img src={conn.avatar} alt={conn.name} className="h-full w-full rounded-full object-cover" /> : '👤'}
                </div>
                <div className={typo.fieldValue}>{conn.name}</div>
                <div className={`mb-3 ${typo.caption}`}>{conn.role}</div>
                <button 
                  onClick={() => sendHug(conn.name)}
                  className="w-full cursor-pointer rounded-[var(--radius-sm)] border-none bg-[var(--blush-light)] py-1.5 text-xs font-bold text-[var(--terracotta)] transition-all duration-150 hover:bg-[var(--blush)] hover:text-white active:scale-[0.98]"
                  style={{ fontFamily: 'inherit' }}
                >
                  <Heart size={12} className="mr-1 inline-block" fill="currentColor" /> Send Hug
                </button>
              </Card>
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
          {mockGratitude.map((msg: any, i: number) => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ease: 'easeOut' }}
              style={{
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Award size={18} color="var(--sky-blue)" /> Community Badges
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {mockBadges.map((badge: any, i: number) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-lg)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px',
                textAlign: 'center', border: `1px solid var(--cream-dark)`,
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</div>
              <div className={typo.fieldValue}>{badge.label}</div>
              <div className={`mt-1 ${typo.caption}`}>{badge.desc}</div>
            </motion.div>
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

      {/* 
        Influence Card 
        NOTE: Deviates from Card.tsx structure to allow specific left-border gradient styling
        that Card.tsx doesn't natively support without complex class merging.
      */}
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
          className="mt-5 cursor-pointer rounded-full border border-[var(--cream-dark)] bg-[var(--blush-light)] px-6 py-2.5 text-sm font-semibold text-[var(--terracotta)] transition-all duration-150 hover:border-[var(--blush)] hover:bg-[var(--blush)] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blush)]"
        >
          Invite a Friend
        </button>
      </motion.div>
      </TabContent>
    </div>
  );
}
