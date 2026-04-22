'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Image as ImageIcon, Lightbulb, Baby, Lock,
  Shield, Users, Sparkles, History
} from 'lucide-react';
import { typo } from '@/lib/typography';

export type TabId = 'personal' | 'posts' | 'tips' | 'children' | 'vault' | 'privacy' | 'community' | 'wellbeing' | 'journey';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  accent: string;
}

const tabs: Tab[] = [
  { id: 'personal', label: 'Personal', icon: <User size={17} strokeWidth={2} />, accent: 'var(--blush)' },
  { id: 'posts', label: 'My Posts', icon: <ImageIcon size={17} strokeWidth={2} />, accent: 'var(--mauve)' },
  { id: 'tips', label: 'My Tips', icon: <Lightbulb size={17} strokeWidth={2} />, accent: 'var(--terracotta)' },
  { id: 'children', label: 'Children', icon: <Baby size={17} strokeWidth={2} />, accent: 'var(--sage)' },
  { id: 'vault', label: 'Safe Vault', icon: <Lock size={17} strokeWidth={2} />, accent: 'var(--lavender)' },
  { id: 'privacy', label: 'Privacy', icon: <Shield size={17} strokeWidth={2} />, accent: 'var(--sky-blue)' },
  { id: 'community', label: 'Community', icon: <Users size={17} strokeWidth={2} />, accent: 'var(--peach)' },
  { id: 'wellbeing', label: 'Wellbeing', icon: <Sparkles size={17} strokeWidth={2} />, accent: 'var(--terracotta)' },
  { id: 'journey', label: 'Journey', icon: <History size={17} strokeWidth={2} />, accent: 'var(--mauve)' },
];

interface TabStripProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export default function TabStrip({ activeTab, onChange }: TabStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeEl = activeTabRef.current;
      const scrollLeft = activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex gap-1.5 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[var(--shadow-resting)] lg:grid lg:grid-cols-5 lg:gap-1.5 lg:overflow-x-visible xl:grid-cols-9"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const activeTabData = tabs.find((t) => t.id === activeTab);

          return (
            <motion.button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onChange(tab.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`
                relative flex min-w-[96px] flex-1 flex-col items-center gap-1.5 rounded-[var(--radius-md)]
                border px-2.5 py-3 text-center transition-all duration-200
                lg:min-w-0
                ${isActive
                  ? 'border-transparent bg-[var(--blush-soft)] shadow-[var(--shadow-elevated)]'
                  : 'border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-elevated)]'
                }
              `}
              style={isActive ? { background: `linear-gradient(135deg, ${tab.accent}18, ${tab.accent}08)` } : {}}
            >
              {/* Icon with color transition */}
              <motion.span
                animate={{
                  color: isActive ? tab.accent : 'var(--text-muted)',
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {tab.icon}
              </motion.span>

              {/* Label */}
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {tab.label}
              </span>

              {/* Active indicator pill */}
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-1 left-3 right-3 h-[2.5px] rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${tab.accent}, ${tab.accent}88)`,
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
