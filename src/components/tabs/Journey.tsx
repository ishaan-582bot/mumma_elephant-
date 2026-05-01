'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, BookOpen, Heart, Clock, Send, ImageIcon, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import SectionHero from '@/components/ui/SectionHero';
import { typo } from '@/lib/typography';
import { useToast } from '@/components/ui/ToastContext';

interface JourneyEvent {
  id: string;
  type: 'milestone' | 'post' | 'system';
  title: string;
  date: string;
  icon: string;
}

interface LegacyLetter {
  id: string;
  to: string;
  date: string;
  unlockDate: string;
  preview: string;
}

interface HistoricalMemory {
  id: string;
  photo: string;
  caption: string;
  date: string;
}

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar size={16} />,
  lightbulb: <BookOpen size={16} />,
  baby: <Heart size={16} />,
  heart: <Heart size={16} />,
};

export default function Journey() {
  const { showToast } = useToast();
  const [events, setEvents] = useState<JourneyEvent[]>([]);
  const [memories, setMemories] = useState<HistoricalMemory[]>([]);
  const [letters, setLetters] = useState<LegacyLetter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/journey');
        const json = await res.json();
        if (json.success) {
          setEvents(json.data.events || []);
          setMemories(json.data.memories || []);
          setLetters(json.data.letters || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="fade-in-up">
        <TabContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 rounded-xl bg-[var(--cream-deep)]" />
            <div className="h-24 rounded-xl bg-[var(--cream-deep)]" />
            <div className="h-24 rounded-xl bg-[var(--cream-deep)]" />
          </div>
        </TabContent>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <TabContent>
        <motion.div variants={tabViewVariants.item}>
          <SectionHero
            icon={<MapPin size={28} />}
            title="Your Journey"
            subtitle="Every step, every milestone, every memory — preserved forever."
            accentColor="var(--mauve)"
          />
        </motion.div>

        {/* Timeline */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <Clock size={17} className="text-[var(--mauve)]" /> Timeline
          </h3>
          <div className="ml-3 border-l-2 border-[var(--border)] pb-5 pl-7">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative mb-5 last:mb-0"
              >
                <div className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mauve-soft)] text-[var(--mauve)] shadow-sm">
                  {iconMap[event.icon] || <Calendar size={14} />}
                </div>
                <div className={typo.body}>{event.title}</div>
                <div className={`mt-0.5 ${typo.caption}`}>{event.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legacy Letters */}
        {letters.length > 0 && (
          <motion.div variants={tabViewVariants.item} className="mb-8">
            <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
              <Send size={17} className="text-[var(--blush)]" /> Legacy Letters
            </h3>
            <div className="flex flex-col gap-3">
              {letters.map((letter) => (
                <Card key={letter.id} elevation="elevated" bodyClassName="p-5" hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`font-bold ${typo.subheading}`}>To: {letter.to}</span>
                      <div className={`mt-1 ${typo.caption}`}>Unlocks {letter.unlockDate}</div>
                    </div>
                    <ChevronRight size={16} className="text-[var(--text-muted)]" />
                  </div>
                  <p className={`mt-3 italic ${typo.bodyMuted}`}>&ldquo;{letter.preview}&rdquo;</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Historical Memories */}
        {memories.length > 0 && (
          <motion.div variants={tabViewVariants.item}>
            <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
              <ImageIcon size={17} className="text-[var(--sky-blue)]" /> Memories
            </h3>
            <div className="flex flex-col gap-3">
              {memories.map((memory) => (
                <Card key={memory.id} elevation="resting" bodyClassName="p-5" hover>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--cream-deep)] text-2xl">
                      {memory.photo ? <img src={memory.photo} alt="" className="h-full w-full rounded-[var(--radius-md)] object-cover" /> : '📸'}
                    </div>
                    <div className="flex-1">
                      <p className={`italic ${typo.body}`}>&ldquo;{memory.caption}&rdquo;</p>
                      <div className={`mt-1 ${typo.caption}`}>{memory.date}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </TabContent>
    </div>
  );
}
