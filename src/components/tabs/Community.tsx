'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Heart, Award, History,
  ArrowRight, MessageSquareHeart, Sparkles
} from 'lucide-react';
import { useToast } from '../ui/ToastContext';
import {
  mockConnections, mockBadges, mockGratitude, mockCommunityTimeline
} from '@/lib/data';
import { typo } from '@/lib/typography';
import Card from '@/components/ui/Card';
import TabContent, { tabViewVariants } from '@/components/ui/TabContent';
import SectionHero from '@/components/ui/SectionHero';
import Badge from '@/components/ui/Badge';

export default function Community() {
  const { showToast } = useToast();

  const sendHug = (name: string) => {
    showToast(`A heart-warming hug sent to ${name}! ❤️`, 'success');
  };

  return (
    <div className="fade-in-up">
      <TabContent>
        {/* Hero */}
        <motion.div variants={tabViewVariants.item}>
          <SectionHero
            icon={<Users size={28} />}
            title="My Support Circle"
            subtitle="You haven't helped just 1 child grow, you've helped 154 mums too."
            accentColor="var(--blush)"
          />
        </motion.div>

        {/* Connections */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <Heart size={17} className="text-[var(--terracotta)]" /> Trusted Connections
          </h3>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
            {mockConnections.map((conn: any) => (
              <motion.div
                key={conn.id}
                whileTap={{ scale: 0.97 }}
                className="min-w-[132px] snap-start"
              >
                <Card elevation="resting" bodyClassName="px-3 py-4 flex flex-col items-center text-center" hover>
                  <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream-deep)] shadow-inner overflow-hidden">
                    {conn.avatar ? <img src={conn.avatar} alt={conn.name} className="h-full w-full object-cover" /> : '👤'}
                  </div>
                  <div className={typo.fieldValue}>{conn.name}</div>
                  <div className={`mb-3 ${typo.caption}`}>{conn.role}</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendHug(conn.name)}
                    className="w-full cursor-pointer rounded-[var(--radius-sm)] bg-gradient-to-r from-[var(--blush-soft)] to-[var(--blush-soft)] py-1.5 text-xs font-bold text-[var(--terracotta)] transition-all duration-150 hover:from-[var(--blush)] hover:to-[var(--blush)] hover:text-white active:scale-[0.98]"
                  >
                    <Heart size={11} className="mr-1 inline-block" fill="currentColor" /> Hug
                  </motion.button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gratitude Board */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <MessageSquareHeart size={17} className="text-[var(--mauve)]" /> Gratitude Board
          </h3>
          <div className="flex flex-col gap-3">
            {mockGratitude.map((msg: any) => (
              <motion.div
                key={msg.id}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Card elevation="featured" bodyClassName="p-5" hover>
                  <div className="flex items-start gap-1 mb-3">
                    <span className="text-2xl text-[var(--blush)] opacity-40">&ldquo;</span>
                  </div>
                  <p className={`italic ${typo.body} leading-relaxed`}>
                    {msg.text}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border-light)] pt-3">
                    <span className={`font-semibold text-[var(--mauve-deep)] ${typo.caption}`}>— {msg.from}</span>
                    <Badge label={msg.date} variant="cream" size="sm" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <Award size={17} className="text-[var(--sky-blue)]" /> Community Badges
          </h3>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {mockBadges.map((badge: any) => (
              <motion.div
                key={badge.id}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Card elevation="elevated" bodyClassName="p-4 text-center" hover>
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
            <History size={17} className="text-[var(--sage-deep)]" /> Your Journey
          </h3>
          <div className="ml-3 border-l-2 border-[var(--border)] pb-5 pl-7">
            {mockCommunityTimeline.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative mb-5 last:mb-0"
              >
                <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[var(--sage)] shadow-sm" />
                <div className={typo.body}>{item.action}</div>
                <div className={`mt-0.5 ${typo.caption}`}>{item.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          variants={tabViewVariants.item}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-featured)' }}
          className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--blush-soft)]/30 p-6 text-center shadow-[var(--shadow-elevated)]"
        >
          <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[var(--blush)] to-[var(--terracotta)]" />
          <Sparkles size={40} className="mx-auto mb-3 text-[var(--sky-blue)] opacity-50" />
          <h4 className={typo.pageHeroBold}>Your Wisdom Matters</h4>
          <p className={`mt-2 ${typo.body}`}>
            You've touched the lives of <strong>154 mothers</strong> across 4 support groups this year. Keep sharing, mum!
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="mt-5 cursor-pointer rounded-full border border-[var(--border)] bg-gradient-to-r from-[var(--blush-soft)] to-[var(--cream)] px-6 py-2.5 text-sm font-bold text-[var(--terracotta)] transition-all duration-150 hover:from-[var(--blush)] hover:to-[var(--terracotta-soft)] hover:text-white active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            Invite a Friend
          </motion.button>
        </motion.div>
      </TabContent>
    </div>
  );
}
