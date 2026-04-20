'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Image as ImageIcon, Lightbulb, Baby, Lock, Shield, Users, Sparkles, History } from 'lucide-react';

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
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Show fade if there's more than 5px to scroll on the right
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        style={{ scrollbarWidth: 'none' }}
        className="hide-scrollbar flex overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] p-1.5 lg:grid lg:grid-cols-3 lg:gap-1.5 lg:overflow-x-visible"
      >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex min-w-[92px] flex-1 flex-col items-center gap-1 rounded-[var(--radius-md)] border px-3 py-2.5 text-center transition-all duration-150 lg:min-w-0 ${isActive ? 'border-[var(--blush)] bg-[var(--blush-light)] text-[var(--blush-dark)] shadow-[var(--shadow-sm)]' : 'border-transparent text-[var(--text-muted)] hover:border-[var(--cream-dark)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-secondary)]'}`}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {tab.icon}
            </span>
            <span className={`text-[11px] uppercase tracking-[0.06em] ${isActive ? 'font-bold' : 'font-semibold'}`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-3 right-3 h-[3px] rounded-[var(--radius-full)] bg-[linear-gradient(90deg,var(--blush),var(--blush-dark))]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
      </div>
      
      <AnimatePresence>
        {showRightFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-[101] w-10 bg-[linear-gradient(to_right,transparent,var(--bg-card))] lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
