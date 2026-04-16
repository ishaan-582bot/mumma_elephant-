'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Image, Lightbulb, Baby, Lock, Shield, Users, Sparkles, History } from 'lucide-react';

export type TabId = 'personal' | 'posts' | 'tips' | 'children' | 'vault' | 'privacy' | 'community' | 'wellbeing' | 'journey';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'personal', label: 'Personal', icon: <User size={18} /> },
  { id: 'posts', label: 'My Posts', icon: <Image size={18} /> },
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
        style={{
      display: 'flex',
      borderBottom: '2px solid var(--cream-dark)',
      background: 'var(--bg-card)',
          overflowX: 'auto',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          paddingTop: 4,
          scrollbarWidth: 'none', // hide scrollbar for Firefox
        }}
        className="hide-scrollbar" // ensure custom CSS hides it too
      >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '12px 14px 10px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: isActive ? 'var(--blush-dark)' : 'var(--text-muted)',
              position: 'relative',
              transition: 'color 0.2s ease',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              minWidth: 70,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: isActive ? 700 : 600,
              letterSpacing: '0.02em',
            }}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-underline"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 8,
                  right: 8,
                  height: 3,
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(90deg, var(--blush), var(--blush-dark))',
                }}
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
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background: 'linear-gradient(to right, transparent, var(--bg-card))',
              pointerEvents: 'none',
              zIndex: 101,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
