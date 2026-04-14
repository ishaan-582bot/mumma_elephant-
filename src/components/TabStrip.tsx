'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { User, Image, Lightbulb, Baby, Lock } from 'lucide-react';

export type TabId = 'personal' | 'posts' | 'tips' | 'children' | 'vault';

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
];

interface TabStripProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export default function TabStrip({ activeTab, onChange }: TabStripProps) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: '2px solid var(--cream-dark)',
      background: 'var(--bg-card)',
      overflowX: 'auto',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      paddingTop: 4,
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
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
          </button>
        );
      })}
    </div>
  );
}
