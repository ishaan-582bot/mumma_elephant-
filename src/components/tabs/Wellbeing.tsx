'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, CloudRain, Wind, Zap, CloudSnow, Heart, Coffee, BookOpen, Droplets, Music, Bath, Phone } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import SectionHero from '@/components/ui/SectionHero';
import { typo } from '@/lib/typography';
import { useToast } from '@/components/ui/ToastContext';

interface MoodEntry {
  id: string;
  emoji: string;
  label: string;
  date: string;
  note?: string;
}

interface SelfCareGoal {
  id: string;
  label: string;
  completed: boolean;
}

const moodIcons: Record<string, React.ReactNode> = {
  '😊': <Sun size={20} />,
  '😴': <Moon size={20} />,
  '🤯': <CloudRain size={20} />,
  '😔': <CloudSnow size={20} />,
  '💪': <Zap size={20} />,
  '😌': <Wind size={20} />,
};

const goalIcons: Record<string, React.ReactNode> = {
  'Drink 2L of water': <Droplets size={16} />,
  'Take a 5-minute breather': <Coffee size={16} />,
  'Read 2 pages of a book': <BookOpen size={16} />,
  'Call a friend': <Phone size={16} />,
  'Listen to calming music': <Music size={16} />,
  'Take a warm bath': <Bath size={16} />,
};

export default function Wellbeing() {
  const { showToast } = useToast();
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [goals, setGoals] = useState<SelfCareGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/wellbeing');
        const json = await res.json();
        if (json.success) {
          setMoods(json.data.moods || []);
          setGoals(json.data.goals || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleGoal = async (goalId: string) => {
    const updated = goals.map(g => g.id === goalId ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    try {
      await fetch('/api/wellbeing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId, completed: updated.find(g => g.id === goalId)?.completed }),
      });
    } catch {
      // ignore
    }
  };

  const submitMood = async () => {
    if (!selectedMood) return;
    const moodMap: Record<string, string> = { '😊': 'Good', '😴': 'Tired', '🤯': 'Overwhelmed', '😔': 'Sad', '💪': 'Strong', '😌': 'Calm' };
    const label = moodMap[selectedMood] || 'Good';
    try {
      const res = await fetch('/api/wellbeing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji: selectedMood, label, note: moodNote }),
      });
      const json = await res.json();
      if (json.success) {
        setMoods(prev => [json.data, ...prev]);
        setSelectedMood(null);
        setMoodNote('');
        showToast('Mood recorded. Take care, mum. 💛', 'success');
      }
    } catch {
      showToast('Failed to record mood', 'error');
    }
  };

  if (loading) {
    return (
      <div className="fade-in-up">
        <TabContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 rounded-xl bg-[var(--cream-deep)]" />
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
            icon={<Heart size={28} />}
            title="Emotional Wellbeing"
            subtitle="Your feelings are valid, and this space is just for you."
            accentColor="var(--blush)"
          />
        </motion.div>

        {/* Mood Tracker */}
        <motion.div variants={tabViewVariants.item} className="mb-6">
          <h3 className={`${typo.heading} mb-3`}>How are you feeling today?</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {Object.keys(moodIcons).map((mood) => (
              <motion.button
                key={mood}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood)}
                className={`flex flex-col items-center gap-1 rounded-[var(--radius-lg)] border p-3 transition-all ${
                  selectedMood === mood
                    ? 'border-[var(--blush)] bg-[var(--blush-soft)]'
                    : 'border-[var(--border)] bg-[var(--bg-card)]'
                }`}
              >
                <span className="text-2xl">{mood}</span>
                <span className={`text-[10px] font-bold ${typo.caption}`}>
                  {mood === '😊' ? 'Good' : mood === '😴' ? 'Tired' : mood === '🤯' ? 'Overwhelmed' : mood === '😔' ? 'Sad' : mood === '💪' ? 'Strong' : 'Calm'}
                </span>
              </motion.button>
            ))}
          </div>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3"
            >
              <textarea
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Add a note (optional)..."
                className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-primary)] p-3 text-sm outline-none focus:border-[var(--blush)]"
              />
              <button
                onClick={submitMood}
                className="mt-2 w-full rounded-[var(--radius-md)] bg-[var(--blush)] py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--blush-deep)]"
              >
                Log Mood
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Mood History */}
        {moods.length > 0 && (
          <motion.div variants={tabViewVariants.item} className="mb-6">
            <h3 className={`${typo.heading} mb-3`}>Recent Moods</h3>
            <div className="flex flex-col gap-2">
              {moods.map((m) => (
                <Card key={m.id} elevation="resting" bodyClassName="px-4 py-3 flex items-center gap-3" hover>
                  <span className="text-xl">{m.emoji}</span>
                  <div className="flex-1">
                    <span className={`font-bold ${typo.body}`}>{m.label}</span>
                    {m.note && <span className={`ml-2 ${typo.caption}`}>{m.note}</span>}
                  </div>
                  <Badge label={m.date} variant="cream" size="sm" />
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Self Care Goals */}
        <motion.div variants={tabViewVariants.item}>
          <h3 className={`${typo.heading} mb-3`}>Self Care Goals</h3>
          <div className="flex flex-col gap-2">
            {goals.map((goal) => (
              <motion.button
                key={goal.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleGoal(goal.id)}
                className={`flex items-center gap-3 rounded-[var(--radius-lg)] border p-4 text-left transition-all ${
                  goal.completed
                    ? 'border-[var(--sage)] bg-[var(--sage-soft)]'
                    : 'border-[var(--border)] bg-[var(--bg-card)]'
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${goal.completed ? 'bg-[var(--sage)] text-white' : 'bg-[var(--cream-deep)]'}`}>
                  {goal.completed ? '✓' : goalIcons[goal.label] || <Heart size={16} />}
                </div>
                <span className={`flex-1 font-bold ${goal.completed ? 'text-[var(--sage-deep)] line-through' : ''} ${typo.body}`}>
                  {goal.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </TabContent>
    </div>
  );
}
