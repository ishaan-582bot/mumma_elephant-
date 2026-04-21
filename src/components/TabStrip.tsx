'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Image as ImageIcon, Lightbulb, Baby, Lock, Shield, Users, Sparkles, History } from 'lucide-react';
import { typo } from '@/lib/typography';

export type TabId = 'personal' | 'posts' | 'tips' | 'children' | 'vault' | 'privacy' | 'community' | 'wellbeing' | 'journey';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'personal', label: 'Personal', icon: <User size={18} /> },
  { id: 'posts', label: 'My Posts', icon: <ImageIcon size={18} /> },
  { id: 'tips', label: 'My Tips', icon: <Lightbulb size={18} /> },
  { id: 'children', label: 'Children', icon: <Baby size={18} /> },
  { id: 'vault', label: 'Safe Vault', icon: <Lock size={18} /> },
  { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> },
  { id: 'community', label: 'Community', icon: <Users size={18} /> },
  { id: 'wellbeing', label: 'Wellbeing', icon: <Sparkles size={18} /> },
  { id: 'journey', label: 'Journey', icon: <History size={18} /> },
];

interface TabStripProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export default function TabStrip({ activeTab, onChange }: TabStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none' }}
        className="hide-scrollbar flex gap-2 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] p-1.5 lg:grid lg:grid-cols-5 lg:gap-2 lg:overflow-x-visible xl:grid-cols-9"
      >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex min-w-[100px] flex-1 flex-col items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-3 text-center transition-all duration-150 lg:min-w-0 ${isActive ? 'border-[var(--blush)] bg-[var(--blush-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200' : 'border-transparent hover:border-[var(--cream-dark)] hover:bg-[var(--bg-card-hover)]'}`}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {tab.icon}
            </span>
            <span
              className={`text-xs ${isActive ? typo.tabLabelActive : typo.tabLabel} ${isActive ? 'text-[var(--blush-dark)]' : 'text-[var(--text-muted)]'}`}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-2 right-2 h-[2px] rounded-[var(--radius-full)] bg-[linear-gradient(90deg,var(--blush),var(--blush-dark))]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
      </div>
    </div>
  );
}
