'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, Clock, Camera, Mail, 
  ArrowRight, Heart, Star, 
  CalendarDays as CalendarIcon, Sparkles, Plus, Lock,
  Calendar, Lightbulb, Baby,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { useToast } from '../ui/ToastContext';
import {
  mockJourneyEvents,
  mockHistoricalMemories,
  mockLegacyLetters,
  mockGrowthComparison,
  type JourneyEventIconKind,
} from '@/lib/data';
import { typo } from '@/lib/typography';
import TabContent, { tabViewVariants } from '@/components/ui/TabContent';
import SectionHero from '@/components/ui/SectionHero';
import Card from '@/components/ui/Card';

function JourneyTimelineIcon({ kind }: { kind: JourneyEventIconKind }) {
  const iconColor = 'var(--mauve)';
  const common = { size: 20 as const, strokeWidth: 2 as const, className: 'shrink-0', color: iconColor };
  switch (kind) {
    case 'calendar': return <Calendar {...common} />;
    case 'lightbulb': return <Lightbulb {...common} />;
    case 'baby': return <Baby {...common} />;
    case 'heart': return <Heart {...common} />;
    default: return null;
  }
}

export default function Journey() {
  const { showToast } = useToast();
  return (
    <div className="fade-in-up">
      <TabContent>
      {/* Hero recap */}
      <motion.div variants={tabViewVariants.item}>
        <SectionHero
          featured={true}
          icon={<History size={32} />}
          title="Your Motherhood Story"
          subtitle="10 months of growth, 154 lives touched, and 1 beautiful journey."
          accentColor="var(--lavender)"
        />
      </motion.div>

      {/* This Day Last Year */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <Clock size={18} className="text-[var(--terracotta)]" /> This Day Last Year
        </h3>
        {mockHistoricalMemories.map((mem) => (
          <motion.div
            key={mem.id}
            whileHover={{ y: -6, scale: 1.01 }}
            className="transition-all duration-300"
          >
            <Card 
              elevation="featured" 
              className="group relative h-full overflow-hidden border-2 border-[var(--blush-light)]" 
              bodyClassName="p-0 bg-gradient-to-br from-[var(--cream)] to-white"
            >
              <div className="absolute top-3 right-3 z-[3] rounded-full bg-white/80 p-1.5 text-[var(--terracotta)] shadow-sm backdrop-blur-sm">
                <Sparkles size={14} />
              </div>
              <div className={`relative flex h-48 items-center justify-center bg-[var(--cream-dark)] italic ${typo.caption}`}>
                <Camera size={40} className="opacity-10" />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute bottom-4 left-5 z-[2] flex items-center gap-1.5 text-xs font-bold text-white">
                  <Calendar size={12} /> {mem.date}
                </span>
              </div>
              <div className="p-6">
                <p className={`${typo.body} leading-relaxed italic text-[var(--text-primary)]/90`}>
                  &quot;{mem.caption}&quot;
                </p>
                <div className="mt-4 flex gap-2">
                  <Badge label="Nursery Prep" variant="cream" size="sm" />
                  <Badge label="Pregnancy Days" variant="sage" size="sm" />
                </div>
              </div>
              {/* Nostalgic Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[var(--terracotta)]/5 opacity-40 group-hover:opacity-20 transition-opacity" />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-5 flex items-center gap-2`}>
          <Star size={18} className="text-[var(--mauve)]" /> Key Moments
        </h3>
        <div className="ml-2.5 border-l-2 border-dashed border-[var(--cream-dark)] pl-5">
          {mockJourneyEvents.map((evt: any, i: number) => (
            <motion.div key={evt.id} 
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, ease: 'easeOut' }}
              className="relative mb-6"
            >
              <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-[3px] border-[var(--mauve)] bg-white shadow-sm" />
              <div className="flex items-center gap-3">
                <JourneyTimelineIcon kind={evt.icon} />
                <div>
                  <div className={`${typo.subheading} text-[var(--text-primary)]`}>{evt.title}</div>
                  <div className={`${typo.caption} mt-0.5`}>
                    {new Date(evt.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Then vs Now */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <Sparkles size={18} className="text-[var(--sage)]" /> Then vs Now
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Card elevation="resting" bodyClassName="p-3 text-center">
            <div className="mb-2.5 flex h-[100px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--cream)] shadow-inner">
               <Camera size={24} className="opacity-10" />
            </div>
            <div className={typo.fieldValue}>{mockGrowthComparison.then.date}</div>
            <div className={`${typo.caption} mt-0.5`}>{mockGrowthComparison.then.weight}kg • {mockGrowthComparison.then.height}cm</div>
          </Card>
          <Card elevation="elevated" bodyClassName="p-3 text-center border-2 border-[var(--sage-light)] overflow-hidden">
            <div className="mb-2.5 flex h-[100px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--sage-light)] shadow-inner">
               <Camera size={24} className="opacity-10" />
            </div>
            <div className={typo.fieldValue}>{mockGrowthComparison.now.date}</div>
            <div className={`${typo.caption} mt-0.5`}>{mockGrowthComparison.now.weight}kg • {mockGrowthComparison.now.height}cm</div>
          </Card>
        </div>
      </motion.div>

      {/* Legacy Letters */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <Mail size={18} className="text-[var(--sky-blue)]" /> Letters to Future You
        </h3>
        <Card elevation="featured" bodyClassName="p-5">
          <div className="flex flex-col gap-4">
            {mockLegacyLetters.map((letter: any) => (
              <div key={letter.id} className="flex items-center justify-between border-b border-dashed border-[var(--cream-dark)] pb-3 last:border-none last:pb-0">
                <div>
                  <div className={typo.fieldValue}>To {letter.to}</div>
                  <div className={`${typo.caption} mt-0.5`}>
                    Unlocks on {new Date(letter.unlockDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className="text-[var(--sky-blue)] opacity-40"><Lock size={20} /></div>
              </div>
            ))}
          </div>
          <button 
            type="button"
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border-none bg-gradient-to-r from-[var(--sky-blue-light)] to-[var(--sky-blue)] py-3.5 text-sm font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            onClick={() => showToast('Your letter has been safely stored for the future.', 'success')}
          >
            <Plus size={16} /> Write a New Letter
          </button>
        </Card>
      </motion.div>
      </TabContent>
    </div>
  );
}
