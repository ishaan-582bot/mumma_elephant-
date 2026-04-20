'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, Clock, Camera, Mail, 
  ArrowRight, Heart, Star, 
  ChevronRight, CalendarDays as CalendarIcon, Sparkles, Plus, Lock,
  Calendar, Lightbulb, Baby,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Toast from '../ui/Toast';
import {
  mockJourneyEvents,
  mockHistoricalMemories,
  mockLegacyLetters,
  mockGrowthComparison,
  type JourneyEventIconKind,
} from '@/lib/data';
import { typo } from '@/lib/typography';
import TabContent from '@/components/ui/TabContent';

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
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as any });

  return (
    <div className="fade-in-up">
      <TabContent>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Hero recap */}
      <div className="mb-6 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--lavender)] bg-[var(--bg-card)] p-6 text-center shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-full)] bg-[var(--cream)] text-[var(--sky-blue)] shadow-[var(--shadow-sm)]">
          <History size={32} />
        </div>
        <h2 className={typo.pageHeroBold}>Your Motherhood Story</h2>
        <p className={`mt-1 ${typo.bodyMuted}`}>
          10 months of growth, 154 lives touched, and 1 beautiful journey.
        </p>
      </div>

      {/* This Day Last Year */}
      <div style={{ marginBottom: 30 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
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
            <div className={`relative flex h-44 items-center justify-center bg-[var(--cream)] italic ${typo.caption}`}>
              <Camera size={40} style={{ opacity: 0.2 }} />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4))',
                zIndex: 1
              }} />
              <span className="absolute bottom-3 left-4 z-[2] text-xs font-bold text-white">{mem.date}</span>
            </div>
            <div style={{ padding: '16px' }}>
              <p className={typo.body}>
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
        <h3 className={`mb-5 flex items-center gap-2 ${typo.heading}`}>
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
                <JourneyTimelineIcon kind={evt.icon} />
                <div>
                  <div className={`${typo.subheading} text-[var(--text-primary)]`}>{evt.title}</div>
                  <div className={`mt-0.5 ${typo.caption}`}>
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
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Sparkles size={18} color="var(--sage)" /> Then vs Now
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid var(--cream-dark)', textAlign: 'center' }}>
            <div style={{ height: 100, background: 'var(--cream)', borderRadius: 'var(--radius-md)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Camera size={24} style={{ opacity: 0.1 }} />
            </div>
            <div className={`${typo.fieldValue}`}>{mockGrowthComparison.then.date}</div>
            <div className={`mt-0.5 ${typo.caption}`}>{mockGrowthComparison.then.weight}kg • {mockGrowthComparison.then.height}cm</div>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '12px', border: '1px solid var(--sage-light)', textAlign: 'center' }}>
            <div style={{ height: 100, background: 'var(--sage-light)', borderRadius: 'var(--radius-md)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Camera size={24} style={{ opacity: 0.1 }} />
            </div>
            <div className={`${typo.fieldValue}`}>{mockGrowthComparison.now.date}</div>
            <div className={`mt-0.5 ${typo.caption}`}>{mockGrowthComparison.now.weight}kg • {mockGrowthComparison.now.height}cm</div>
          </div>
        </div>
      </div>

      {/* Legacy Letters */}
      <div style={{ marginBottom: 30 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Mail size={18} color="var(--sky-blue)" /> Letters to Future You
        </h3>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--sky-blue-light)', padding: '16px' }}>
          {mockLegacyLetters.map((letter: any) => (
            <div key={letter.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div className={typo.fieldValue}>To {letter.to}</div>
                <div className={`mt-0.5 ${typo.caption}`}>
                  Unlocks on {new Date(letter.unlockDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <div style={{ color: 'var(--sky-blue)', opacity: 0.4 }}><Lock size={20} /></div>
            </div>
          ))}
          <button 
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border-none bg-[var(--sky-blue-light)] py-3 text-sm font-semibold text-[var(--sky-blue-dark)]"
            onClick={() => setToast({ show: true, message: 'Your letter has been safely stored for the future.', type: 'success' })}
            style={{ cursor: 'pointer' }}
          >
            <Plus size={16} /> Write a New Letter
          </button>
        </div>
      </div>
      </TabContent>
    </div>
  );
}
