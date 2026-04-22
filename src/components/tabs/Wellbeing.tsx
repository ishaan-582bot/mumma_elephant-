'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Phone, Zap,
  ShieldCheck, ArrowRight, CheckCircle2,
  AlertCircle, Sparkles, TrendingUp
} from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../ui/ToastContext';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import SectionHero from '../ui/SectionHero';
import { mockSelfCare } from '@/lib/data';
import { typo } from '@/lib/typography';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function Wellbeing() {
  const [enabled, setEnabled] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { showToast } = useToast();

  const moods = [
    { emoji: '\u2728', label: 'Radiant', color: 'var(--sage)', gradient: 'radial-gradient(circle at 30% 30%, var(--sage-soft), var(--sage))' },
    { emoji: '\u{1F60A}', label: 'Good', color: 'var(--sky-blue)', gradient: 'radial-gradient(circle at 30% 30%, var(--sky-blue-soft), var(--sky-blue))' },
    { emoji: '\u{1F610}', label: 'Okay', color: 'var(--cream-deep)', gradient: 'radial-gradient(circle at 30% 30%, var(--cream), var(--cream-deep))' },
    { emoji: '\u{1F614}', label: 'Low', color: 'var(--mauve-soft)', gradient: 'radial-gradient(circle at 30% 30%, var(--mauve-soft), var(--mauve))' },
    { emoji: '\u{1F92F}', label: 'Overwhelmed', color: 'var(--terracotta-soft)', gradient: 'radial-gradient(circle at 30% 30%, var(--terracotta-soft), var(--terracotta))' },
  ];

  if (!enabled) {
    return (
      <div className="fade-in-up">
        <TabContent>
          <motion.div variants={tabViewVariants.item} className="flex flex-col items-center text-center py-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream-deep)] text-[var(--text-muted)]"
            >
              <ShieldCheck size={32} />
            </motion.div>
            <h2 className={typo.pageHeroBold}>Wellbeing Suite is Private</h2>
            <p className={`${typo.bodyMuted} mx-auto mt-2 max-w-xs`}>
              Your emotional data is never shared. You can enable this feature to track your mood and access resources.
            </p>
            <div className="mt-6">
              <Button onClick={() => setEnabled(true)}>Enable Wellbeing Features</Button>
            </div>
          </motion.div>
        </TabContent>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <TabContent>
        {/* Header */}
        <motion.div variants={tabViewVariants.item}>
          <SectionHero
            featured
            icon={<Heart size={28} />}
            title="Wellbeing Suite"
            subtitle="How are you, Sarah? This is your private space. Only you can see this."
            accentColor="var(--terracotta)"
          />
        </motion.div>

        {/* Mood Selector */}
        <motion.div variants={tabViewVariants.item}>
          <Card elevation="elevated" className="mb-6 overflow-hidden" bodyClassName="p-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp size={15} className="text-[var(--blush)]" />
              <p className={`${typo.subheading} text-center font-semibold text-[var(--text-secondary)]`}>
                How are you feeling right now?
              </p>
            </div>
            <div className="flex justify-between gap-2 sm:gap-3">
              {moods.map((m) => (
                <div key={m.label} className="flex flex-1 flex-col items-center gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.12, translateY: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedMood(m.label);
                      showToast(`Checked in as ${m.label}. You're doing great, mum!`, 'success');
                    }}
                    className={`relative flex h-14 w-14 items-center justify-center rounded-[var(--radius-full)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blush)] sm:h-16 sm:w-16 ${
                      selectedMood === m.label
                        ? 'shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] ring-[3px] ring-white'
                        : 'border-2 border-[var(--border)] opacity-65 grayscale-[25%] hover:opacity-100 hover:grayscale-0'
                    }`}
                    style={{ background: m.gradient }}
                  >
                    <AnimatePresence>
                      {selectedMood === m.label && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="absolute -inset-2 z-[-1] rounded-full blur-lg"
                          style={{ background: m.color, opacity: 0.35 }}
                        />
                      )}
                    </AnimatePresence>
                    <span className="text-2xl sm:text-3xl drop-shadow-sm">{m.emoji}</span>
                    {m.label === 'Radiant' && (
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1"
                      >
                        <Sparkles size={12} className="text-yellow-400" />
                      </motion.div>
                    )}
                  </motion.button>
                  <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 text-center leading-tight ${selectedMood === m.label ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div variants={tabViewVariants.item}>
          <div className="relative mb-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-elevated)]">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[var(--sage)] to-[var(--sage-deep)]" />
            <div className="flex gap-4">
              <AlertCircle size={22} className="shrink-0 text-[var(--sage)]" />
              <div>
                <h4 className={typo.heading}>Wellbeing Insight</h4>
                <p className={`mt-1 ${typo.bodyMuted} leading-relaxed`}>
                  You've reported feeling <strong>Overwhelmed</strong> twice this week. Remember, it's okay to ask for help. Would you like to check out the sleep group?
                </p>
                <button
                  type="button"
                  className="mt-3 flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-sm font-bold text-[var(--sage-deep)] hover:text-[var(--terracotta)] transition-colors"
                >
                  Explore Support Groups <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Crisis Support */}
        <motion.div variants={tabViewVariants.item}>
          <div className="mb-6 flex items-center justify-between overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--terracotta-soft)] to-[var(--peach-soft)] p-5 shadow-sm">
            <div>
              <h4 className="text-lg font-bold text-[var(--terracotta-deep)]">Need to talk?</h4>
              <p className="mt-0.5 text-xs font-semibold leading-relaxed text-[var(--terracotta)] opacity-80">
                Immediate support for postpartum mental health.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-none bg-gradient-to-r from-[var(--terracotta)] to-[var(--terracotta-deep)] px-4 py-3 text-sm font-bold text-white transition-all shadow-md hover:shadow-lg"
            >
              <Phone size={14} /> Talk
            </motion.button>
          </div>
        </motion.div>

        {/* Self Care Goals */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <div className="mb-4 flex items-center justify-between px-1">
            <h3 className={`flex items-center gap-2 ${typo.heading}`}>
              <Sparkles size={17} className="text-[var(--sage)]" /> Today's Self-Care
            </h3>
            <Badge label="5 Day Streak!" variant="sage" size="sm" dot />
          </div>
          <div className="flex flex-col gap-3">
            {mockSelfCare.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileTap={{ x: 4 }}
              >
                <Card
                  elevation={goal.completed ? 'resting' : 'elevated'}
                  className={`transition-all duration-300 ${goal.completed ? 'opacity-60' : ''}`}
                  bodyClassName="p-4 flex items-center justify-between"
                  hover={!goal.completed}
                >
                  <span className={`${typo.body} ${goal.completed ? 'line-through text-[var(--text-muted)]' : ''}`}>{goal.label}</span>
                  {goal.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <CheckCircle2 size={24} className="text-[var(--sage)]" />
                    </motion.div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-[var(--border)] transition-colors hover:border-[var(--blush)]" />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings Link */}
        <motion.div variants={tabViewVariants.item} className="mt-8 border-t border-dashed border-[var(--border-light)] p-6 text-center">
          <button
            type="button"
            onClick={() => setEnabled(false)}
            className={`${typo.caption} cursor-pointer border-none bg-transparent font-medium text-[var(--text-muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--terracotta)]`}
          >
            Disable wellbeing check-ins in settings
          </button>
        </motion.div>
      </TabContent>
    </div>
  );
}
