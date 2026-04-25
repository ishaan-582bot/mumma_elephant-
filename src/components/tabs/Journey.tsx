'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  History, Lock, TrendingUp, ArrowRight,
  Star, BookHeart, Sprout
} from 'lucide-react';
import { useToast } from '../ui/ToastContext';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import SectionHero from '../ui/SectionHero';
import { typo } from '@/lib/typography';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const MEMORIES = [
  {
    id: 'm1', title: 'Emma, remember this', date: 'Feb 14, 2026', body: 'On the night you were born, the moon was full and the room smelled of lavender. You were so small, your father\'s hand covered your entire back. He cried. I smiled. That was the moment I understood what unconditional love truly meant. Never forget how wanted you were, how loved you are, and how strong you will become. - Mum', locked: true,
  },
  {
    id: 'm2', title: 'The Memory Wall', date: '2024 — 2026', body: 'A scrapbook of photos showing Sarah\'s first trimester bump, the nursery being painted, the baby shower, and the first family photo with Emma in the hospital.', locked: true,
  },
];

const ANNIVERSARIES = [
  { id: 'a1', label: '120 Days as a Mum', date: 'Feb 14, 2026', achieved: true },
  { id: 'a2', label: 'First Smile Anniversary', date: 'Mar 20, 2026', achieved: true },
  { id: 'a3', label: 'First Steps Anniversary', date: 'Upcoming', achieved: false },
  { id: 'a4', label: 'First Word Anniversary', date: 'Upcoming', achieved: false },
  { id: 'a5', label: 'Emma\'s First Birthday', date: 'Upcoming', achieved: false },
];

export default function Journey() {
  const { showToast } = useToast();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [showLetter, setShowLetter] = useState<string | null>(null);
  const [isWritingLetter, setIsWritingLetter] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  return (
    <div className="fade-in-up">
      <TabContent>
        {/* Hero */}
        <motion.div variants={tabViewVariants.item}>
          <SectionHero
            icon={<History size={28} />}
            title="The Journey"
            subtitle="You've come so far, Sarah. Look at everything you've already achieved."
            accentColor="var(--mauve)"
          />
        </motion.div>

        {/* Growth Tracker */}
        <motion.div variants={tabViewVariants.item}>
          <Card title="Growth Comparison" description="Baby vs. You &mdash; tracked in real-time" className="mb-6" elevation="featured" hover>
            <div className="flex flex-col gap-2">
              {[
                { emoji: '\u{1F476}', label: 'Baby', stat: '15 lbs', day: '120 days', bg: 'var(--blush-soft)', bar: 'var(--blush)' },
                { emoji: '\u{1F469}', label: 'Mum', stat: '+8 lbs gained', day: '120 days postpartum', bg: 'var(--mauve-soft)', bar: 'var(--mauve)' },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5"
                  style={{ background: row.bg }}
                >
                  <span className="text-xl">{row.emoji}</span>
                  <span className={`flex-1 font-bold ${typo.body}`}>{row.label}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: i === 0 ? '75%' : '40%' }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: row.bar }}
                        />
                      </div>
                      <span className={`shrink-0 font-semibold ${typo.caption}`}>{row.stat}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 ${typo.caption}`}>{row.day}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Milestones */}
        <motion.div variants={tabViewVariants.item} className="mb-6">
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className={`flex items-center gap-2 ${typo.heading}`}>
              <Star size={17} className="text-[var(--blush)]" /> Milestones Achieved
            </h3>
            <Badge label="3 of 5 Unlocked" variant="blush" size="sm" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {ANNIVERSARIES.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={milestone.achieved ? { y: -4, boxShadow: 'var(--shadow-featured)' } : {}}
                whileTap={milestone.achieved ? { scale: 0.97 } : {}}
              >
                <Card
                  elevation={milestone.achieved ? 'elevated' : 'resting'}
                  className={milestone.achieved ? '' : 'opacity-45'}
                  bodyClassName="p-4"
                  hover={milestone.achieved}
                >
                  <div className="mb-3 flex items-center justify-between">
                    {milestone.achieved ? (
                      <Star size={16} className="text-[var(--blush)]" fill="currentColor" />
                    ) : (
                      <Lock size={14} className="text-[var(--text-muted)]" />
                    )}
                    <Badge
                      label={milestone.achieved ? 'Unlocked' : 'Locked'}
                      variant={milestone.achieved ? 'blush' : 'cream'}
                      size="sm"
                    />
                  </div>
                  <div className={`mb-1 ${typo.body} font-bold leading-tight`}>{milestone.label}</div>
                  <div className={typo.caption}>{milestone.date}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Memories */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className={`flex items-center gap-2 ${typo.heading}`}>
              <BookHeart size={17} className="text-[var(--sage-deep)]" /> Letters & Memories
            </h3>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsWritingLetter(true)}
              className="text-[var(--sage-deep)]"
            >
              <Sprout size={14} /> Write Letter
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {MEMORIES.map((memory) => (
              <motion.div
                key={memory.id}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Card elevation="elevated" hover>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={typo.heading}>{memory.title}</h4>
                      {memory.locked && <Lock size={14} className="text-[var(--text-muted)]" />}
                    </div>
                    <p className={`${typo.bodyMuted} mb-4 line-clamp-3 leading-relaxed`}>{memory.body}</p>
                    <div className="flex items-center justify-between">
                      <Badge label={memory.date} variant="cream" size="sm" />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setShowLetter(memory.id)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-sm)] border-none bg-transparent px-3 py-1.5 text-sm font-bold text-[var(--blush-deep)] hover:bg-[var(--blush-soft)] transition-colors"
                      >
                        Reveal Message <ArrowRight size={14} />
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Letter Reveal Modal */}
        {showLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[var(--text-primary)]/95 p-6 backdrop-blur-md"
            onClick={() => {
              setShowLetter(null);
              setIsRevealed(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[440px] overflow-hidden rounded-[var(--radius-xl)] border border-white/20 bg-[var(--bg-card)] text-center shadow-2xl"
            >
              <div className="p-8">
                {!isRevealed ? (
                  <div>
                    <Lock size={40} className="mx-auto mb-3 text-[var(--mauve)] opacity-50" />
                    <h4 className={`mb-2 ${typo.pageHeroBold}`}>A Letter for Your Future Self</h4>
                    <p className={`mx-auto mb-6 max-w-xs ${typo.bodyMuted}`}>
                      This is a private memory you saved for yourself. Open it when you need a reminder of your strength.
                    </p>
                    <Button
                      onClick={() => setIsRevealed(true)}
                      className="!bg-gradient-to-r !from-[var(--mauve)] !to-[var(--mauve-deep)] !text-white"
                    >
                      <BookHeart size={16} /> Reveal Message
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                  >
                    <p className={`${typo.body} mx-auto max-w-sm text-left italic leading-loose`}>
                      On the night you were born, the moon was full and the room smelled of lavender. You were so small, your father\'s hand covered your entire back. He cried. I smiled. That was the moment I understood what unconditional love truly meant. Never forget how wanted you were, how loved you are, and how strong you will become. - Mum
                    </p>
                    <button
                      type="button"
                      onClick={() => { setShowLetter(null); setIsRevealed(false); }}
                      className="mt-8 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Write Letter Modal */}
        {isWritingLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[var(--text-primary)]/95 p-6 backdrop-blur-md"
            onClick={() => {
              setIsWritingLetter(false);
              setLetterText('');
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[440px] overflow-hidden rounded-[var(--radius-xl)] border border-white/20 bg-[var(--bg-card)] shadow-2xl"
            >
              <div className="p-8">
                <h4 className={`mb-1 ${typo.pageHeroBold}`}>Write a Letter to Your Future Self</h4>
                <p className={`mb-5 ${typo.bodyMuted}`}>
                  This will be sealed and private. No one but you can see it.
                </p>
                <textarea
                  value={letterText}
                  onChange={(e) => { if (e.target.value.length <= 500) setLetterText(e.target.value); }}
                  placeholder="Dear future me..."
                  className="mb-4 h-48 w-full resize-none rounded-[var(--radius-lg)] border-2 border-[var(--border)] bg-[var(--bg-primary)] px-5 py-4 text-sm font-semibold leading-relaxed outline-none transition-all focus:border-[var(--mauve)] focus:shadow-[var(--shadow-glow-blush)]"
                />
                <div className="mb-5 flex justify-between items-center">
                  <span className={typo.caption}>{letterText.length} / 500</span>
                </div>
                <Button
                  disabled={!letterText.trim()}
                  onClick={() => {
                    setIsWritingLetter(false);
                    setLetterText('');
                    showToast('Letter sealed. It will be revealed on your selected date.', 'success');
                  }}
                  className="w-full !bg-gradient-to-r !from-[var(--sage)] !to-[var(--sage-deep)] !text-white"
                >
                  Seal for the Future
                </Button>
                <button
                  type="button"
                  onClick={() => { setIsWritingLetter(false); setLetterText(''); }}
                  className="mt-3 w-full cursor-pointer border-none bg-transparent text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </TabContent>
    </div>
  );
}

