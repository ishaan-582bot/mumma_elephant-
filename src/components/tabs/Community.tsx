'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Award, History, 
  ArrowRight, MessageSquareHeart, Smile
} from 'lucide-react';
import { useToast } from '../ui/ToastContext';
import { 
  mockConnections, mockBadges, mockGratitude, mockCommunityTimeline 
} from '@/lib/data';
import { typo } from '@/lib/typography';
import Card from '@/components/ui/Card';
import TabContent, { tabViewVariants } from '@/components/ui/TabContent';
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
      <motion.div variants={tabViewVariants.item}>
        <SectionHero
          icon={<Users size={32} />}
          title="My Support Circle"
          subtitle="You haven't helped just 1 child grow, you've helped 154 mums too. 🌸"
          accentColor="var(--blush)"
        />
      </motion.div>

      {/* Connection Grid */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <Heart size={18} className="text-[var(--terracotta)]" /> Trusted Connections
        </h3>
        <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {mockConnections.map((conn: any) => (
            <motion.div
              key={conn.id}
              whileTap={{ scale: 0.98 }}
              className="min-w-[140px] snap-start transition-all duration-150 hover:-translate-y-1"
            >
              <Card 
                elevation="resting"
                bodyClassName="px-3 py-4 flex flex-col items-center text-center"
              >
                <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream)] text-xl shadow-inner overflow-hidden">
                  {conn.avatar ? <img src={conn.avatar} alt={conn.name} className="h-full w-full object-cover" /> : '👤'}
                </div>
                <div className={typo.fieldValue}>{conn.name}</div>
                <div className={`mb-3 ${typo.caption}`}>{conn.role}</div>
                <button 
                  onClick={() => sendHug(conn.name)}
                  className="w-full cursor-pointer rounded-[var(--radius-sm)] border-none bg-[var(--blush-light)] py-1.5 text-xs font-bold text-[var(--terracotta)] transition-all duration-150 hover:bg-[var(--blush)] hover:text-white active:scale-[0.98]"
                >
                  <Heart size={12} className="mr-1 inline-block" fill="currentColor" /> Send Hug
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gratitude Board */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <MessageSquareHeart size={18} className="text-[var(--mauve)]" /> Gratitude Board
        </h3>
        <div className="flex flex-col gap-3">
          {mockGratitude.map((msg: any) => (
            <div key={msg.id}>
              <Card elevation="featured" bodyClassName="p-4 bg-gradient-to-br from-white to-[var(--bg-card-hover)]">
                <p className={`italic ${typo.body}`}>
                  &quot;{msg.text}&quot;
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`font-semibold text-[var(--mauve-dark)] ${typo.caption}`}>— {msg.from}</span>
                  <span className={typo.caption}>{msg.date}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <Award size={18} className="text-[var(--sky-blue)]" /> Community Badges
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {mockBadges.map((badge: any) => (
            <motion.div
              key={badge.id}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              <Card elevation="elevated" bodyClassName="p-4 text-center h-full">
                <div className="mb-2 text-3xl">{badge.icon}</div>
                <div className={typo.fieldValue}>{badge.label}</div>
                <div className={`mt-1 ${typo.caption}`}>{badge.desc}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <History size={18} className="text-[var(--sage-dark)]" /> Your Journey
        </h3>
        <div className="ml-2.5 border-l-2 border-[var(--cream-dark)] pb-5 pl-7">
          {mockCommunityTimeline.map((item: any, i: number) => (
            <div key={i} className="relative mb-5 last:mb-0">
              <div className="absolute -left-[35px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[var(--sage)] shadow-sm" />
              <div className={typo.body}>{item.action}</div>
              <div className={`mt-0.5 ${typo.caption}`}>{item.date}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={tabViewVariants.item}
        whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-lg)' }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--cream-dark)] bg-[var(--bg-card)] p-6 text-center shadow-[var(--shadow-md)] transition-all duration-200"
      >
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[var(--blush)] to-[var(--terracotta)]" />
        <Smile size={48} className="mx-auto mb-3 text-[var(--sky-blue)] opacity-60" />
        <h4 className={typo.pageHeroBold}>Your Wisdom Matters</h4>
        <p className={`mt-2 ${typo.body}`}>
          You&apos;ve touched the lives of <strong>154 mothers</strong> across 4 support groups this year. Keep sharing, mum!
        </p>
        <button
          type="button"
          className="mt-5 cursor-pointer rounded-full border border-[var(--cream-dark)] bg-gradient-to-r from-[var(--blush-light)] to-[var(--cream)] px-6 py-2.5 text-sm font-bold text-[var(--terracotta)] transition-all duration-150 hover:from-[var(--blush)] hover:to-[var(--terracotta-light)] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blush)] shadow-sm hover:shadow-md"
        >
          Invite a Friend
        </button>
      </motion.div>
      </TabContent>
    </div>
  );
}
