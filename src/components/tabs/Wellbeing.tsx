'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Phone, Moon, Sun, 
  Smile, Frown, Meh, Zap, 
  ShieldCheck, ArrowRight, CheckCircle2,
  AlertCircle, Sparkles
} from 'lucide-react';
import Badge from '../ui/Badge';
import { useToast } from '../ui/ToastContext';
import TabContent from '../ui/TabContent';
import SectionHero from '../ui/SectionHero';
import { mockMoods, mockSelfCare } from '@/lib/data';
import { typo } from '@/lib/typography';

export default function Wellbeing() {
  const [enabled, setEnabled] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { showToast } = useToast();

  const moods = [
    { emoji: '✨', label: 'Radiant', color: 'var(--sage)' },
    { emoji: '😊', label: 'Good', color: 'var(--sky-blue)' },
    { emoji: '😐', label: 'Okay', color: 'var(--cream-dark)' },
    { emoji: '😔', label: 'Low', color: 'var(--mauve-light)' },
    { emoji: '🤯', label: 'Overwhelmed', color: 'var(--terracotta-light)' },
  ];

  if (!enabled) {
    return (
      <div className="fade-in-up">
        <TabContent>
        <div style={{ textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', background: 'var(--cream)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          <ShieldCheck size={32} />
        </div>
        <h2 className={typo.pageHeroBold}>Wellbeing Suite is Private</h2>
        <p className={`mx-auto mt-2 max-w-xs ${typo.bodyMuted}`}>
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
        </TabContent>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <TabContent>

      {/* Header */}
      <SectionHero
        icon={<Heart size={32} />}
        title="Wellbeing Suite"
        subtitle="How are you, Sarah? This is your private space. Only you can see this."
        accentColor="var(--terracotta)"
      />

      {/* Mood Selector */}
      <div style={{ 
        background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', padding: '24px',
        border: '1px solid var(--cream-dark)', boxShadow: 'var(--shadow-sm)', marginBottom: 24
      }}>
        <p className={`mb-5 text-center ${typo.subheading}`}>
          How are you feeling right now?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {moods.map((m) => (
            <motion.button
              key={m.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedMood(m.label);
                showToast(`Checked in as ${m.label}. You're doing great, mum! 🌸`, 'success');
              }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                background: selectedMood === m.label ? m.color : 'transparent',
                border: selectedMood === m.label ? 'none' : '1px solid var(--cream-dark)',
                borderRadius: 'var(--radius-lg)', padding: '12px 4px', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className={`text-xs font-semibold uppercase tracking-wider ${selectedMood === m.label ? 'text-white' : 'text-[var(--text-muted)]'}`}>{m.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mb-6 flex gap-4 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--sage)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]">
        <AlertCircle size={24} color="var(--sage)" className="shrink-0" />
        <div>
          <h4 className={typo.heading}>Wellbeing Insight</h4>
          <p className={`mt-1 ${typo.bodyMuted}`}>
            You&apos;ve reported feeling <strong>Overwhelmed</strong> twice this week. Remember, it&apos;s okay to ask for help. Would you like to check out the sleep group?
          </p>
          <button
            type="button"
            className="mt-3 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-sm font-semibold text-[var(--sage-dark)]"
          >
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
          <h4 className={`text-lg font-bold text-[var(--terracotta)]`}>Need to talk?</h4>
          <p className="mt-0.5 text-xs font-medium leading-relaxed text-[var(--terracotta)] opacity-80">
            Immediate support for postpartum mental health.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border-none bg-[var(--terracotta)] px-4 py-2.5 text-sm font-semibold text-white"
          style={{ cursor: 'pointer' }}
        >
          <Phone size={14} /> Talk to Someone
        </button>
      </div>

      {/* Self Care Goals */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className={`flex items-center gap-2 ${typo.heading}`}>
            <Sparkles size={18} color="var(--sage)" /> Today&apos;s Self-Care
          </h3>
          <span className="text-xs font-semibold text-[var(--sage-dark)]">
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
              <span className={`${typo.body} ${goal.completed ? 'line-through' : ''}`}>{goal.label}</span>
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
          type="button"
          onClick={() => setEnabled(false)}
          className={`border-none bg-transparent underline ${typo.caption}`}
          style={{ cursor: 'pointer' }}
        >
          Disable wellbeing check-ins in settings
        </button>
      </div>
      </TabContent>
    </div>
  );
}
