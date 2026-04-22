'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Phone, Zap, 
  ShieldCheck, ArrowRight, CheckCircle2,
  AlertCircle, Sparkles
} from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../ui/ToastContext';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import SectionHero from '../ui/SectionHero';
import { mockSelfCare } from '@/lib/data';
import { typo } from '@/lib/typography';
import Card from '@/components/ui/Card';

export default function Wellbeing() {
  const [enabled, setEnabled] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { showToast } = useToast();

  const moods = [
    { emoji: '✨', label: 'Radiant', color: 'var(--sage)', gradient: 'radial-gradient(circle at 30% 30%, var(--sage-light), var(--sage))' },
    { emoji: '😊', label: 'Good', color: 'var(--sky-blue)', gradient: 'radial-gradient(circle at 30% 30%, var(--sky-blue-light), var(--sky-blue))' },
    { emoji: '😐', label: 'Okay', color: 'var(--cream-dark)', gradient: 'radial-gradient(circle at 30% 30%, var(--cream), var(--cream-dark))' },
    { emoji: '😔', label: 'Low', color: 'var(--mauve-light)', gradient: 'radial-gradient(circle at 30% 30%, var(--mauve-light), var(--mauve))' },
    { emoji: '🤯', label: 'Overwhelmed', color: 'var(--terracotta-light)', gradient: 'radial-gradient(circle at 30% 30%, var(--terracotta-light), var(--terracotta))' },
  ];

  if (!enabled) {
    return (
      <div className="fade-in-up">
        <TabContent>
          <motion.div variants={tabViewVariants.item} className="flex flex-col items-center text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream)] text-[var(--text-muted)]">
              <ShieldCheck size={32} />
            </div>
            <h2 className={typo.pageHeroBold}>Wellbeing Suite is Private</h2>
            <p className={`${typo.bodyMuted} mx-auto mt-2 max-w-xs`}>
              Your emotional data is never shared. You can enable this feature to track your mood and access resources.
            </p>
            <div className="mt-6">
              <Button onClick={() => setEnabled(true)}>
                Enable Wellbeing Features
              </Button>
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
          featured={true}
          icon={<Heart size={32} />}
          title="Wellbeing Suite"
          subtitle="How are you, Sarah? This is your private space. Only you can see this."
          accentColor="var(--terracotta)"
        />
      </motion.div>

      {/* Mood Selector - Refined Mood Orbs */}
      <motion.div variants={tabViewVariants.item}>
        <Card elevation="elevated" className="mb-6 overflow-hidden" bodyClassName="p-6">
          <p className={`${typo.subheading} mb-6 text-center font-semibold text-[var(--text-secondary)]`}>
            How are you feeling right now?
          </p>
          <div className="flex justify-between gap-3">
            {moods.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.1, translateY: -4 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    setSelectedMood(m.label);
                    showToast(`Checked in as ${m.label}. You're doing great, mum! 🌸`, 'success');
                  }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-[var(--radius-full)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blush)] sm:h-16 sm:w-16 ${
                    selectedMood === m.label 
                      ? 'shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] ring-4 ring-white' 
                      : 'border-2 border-[var(--cream-dark)] opacity-70 grayscale-[30%] hover:opacity-100 hover:grayscale-0'
                  }`}
                  style={{
                    background: m.gradient,
                  }}
                >
                  {selectedMood === m.label && (
                    <motion.div 
                      layoutId="orb-glow"
                      className="absolute -inset-2 z-[-1] rounded-full blur-md"
                      style={{ background: m.color, opacity: 0.4 }}
                    />
                  )}
                  <span className="text-2xl sm:text-3xl">{m.emoji}</span>
                  {m.label === 'Radiant' && (
                    <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
                  )}
                </motion.button>
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 ${selectedMood === m.label ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div variants={tabViewVariants.item}>
        <div className="relative mb-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[var(--sage)] to-[var(--sage-dark)]" />
          <div className="flex gap-4">
            <AlertCircle size={24} color="var(--sage)" className="shrink-0" />
            <div>
              <h4 className={typo.heading}>Wellbeing Insight</h4>
              <p className={`mt-1 ${typo.bodyMuted} leading-relaxed`}>
                You&apos;ve reported feeling <strong>Overwhelmed</strong> twice this week. Remember, it&apos;s okay to ask for help. Would you like to check out the sleep group?
              </p>
              <button
                type="button"
                className="mt-3 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-sm font-bold text-[var(--sage-dark)] hover:text-[var(--terracotta)] transition-colors"
              >
                Explore Support Groups <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Crisis Support */}
      <motion.div variants={tabViewVariants.item}>
        <div className="mb-6 flex items-center justify-between overflow-hidden rounded-[var(--radius-lg)] bg-[var(--terracotta-light)] p-5 shadow-sm">
          <div>
            <h4 className="text-lg font-bold text-[var(--terracotta)]">Need to talk?</h4>
            <p className="mt-0.5 text-xs font-semibold leading-relaxed text-[var(--terracotta)] opacity-80">
              Immediate support for postpartum mental health.
            </p>
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-none bg-[var(--terracotta)] px-4 py-3 text-sm font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Phone size={14} /> Talk to Someone
          </button>
        </div>
      </motion.div>

      {/* Self Care Goals */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <div className="mb-4 flex items-center justify-between px-1">
          <h3 className={`flex items-center gap-2 ${typo.heading}`}>
            <Sparkles size={18} className="text-[var(--sage)]" /> Today&apos;s Self-Care
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sage-light)] px-3 py-1 text-xs font-bold text-[var(--sage-dark)] shadow-sm">
            <Zap size={12} className="fill-[var(--sage)]" /> 5 Day Streak!
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {mockSelfCare.map((goal) => (
            <motion.div
              key={goal.id}
              whileTap={{ x: 4 }}
            >
              <Card 
                elevation={goal.completed ? 'resting' : 'elevated'}
                className={`transition-all duration-300 ${goal.completed ? 'opacity-70' : ''}`}
                bodyClassName="p-4 flex items-center justify-between"
              >
                <span className={`${typo.body} ${goal.completed ? 'line-through text-[var(--text-muted)]' : ''}`}>{goal.label}</span>
                {goal.completed ? (
                  <CheckCircle2 size={24} className="text-[var(--sage)]" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-[var(--cream-dark)]" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings Link */}
      <motion.div variants={tabViewVariants.item} className="mt-8 border-t border-dashed border-[var(--cream-dark)] p-6 text-center">
        <button 
          type="button"
          onClick={() => setEnabled(false)}
          className={`${typo.caption} cursor-pointer border-none bg-transparent font-medium text-[var(--text-muted)] underline decoration-[var(--cream-dark)] underline-offset-4 transition-colors hover:text-[var(--terracotta)]`}
        >
          Disable wellbeing check-ins in settings
        </button>
      </motion.div>
      </TabContent>
    </div>
  );
}
