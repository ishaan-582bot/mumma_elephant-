'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Eye, EyeOff, Lock, Globe, 
  ArrowRight, Download, Trash2, ShieldCheck, 
  History, Settings2, ShieldAlert
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import HoldToDeleteButton from '../ui/HoldToDeleteButton';
import { useToast } from '../ui/ToastContext';
import BottomSheet from '../ui/BottomSheet';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import SectionHero from '../ui/SectionHero';
import { mockPrivacyLogs } from '@/lib/data';
import { typo } from '@/lib/typography';
import FieldLabel from '@/components/ui/FieldLabel';
import Card from '@/components/ui/Card';

export default function PrivacySafety() {
  const [activePreset, setActivePreset] = useState<'Maximum' | 'Community' | 'Open' | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { showToast } = useToast();

  const stats = [
    { label: 'Private Items', value: 12, icon: <Lock size={16} />, color: 'var(--mauve)' },
    { label: 'Connections Only', value: 5, icon: <ShieldCheck size={16} />, color: 'var(--sage)' },
    { label: 'Visible to All', value: 2, icon: <Globe size={16} />, color: 'var(--sky-blue)' },
  ];

  const applyPreset = (preset: 'Maximum' | 'Community' | 'Open') => {
    setActivePreset(preset);
    const messages = {
      Maximum: 'Maximum Privacy applied: Everything is now private 🔒',
      Community: 'Community Sharing applied: Moments shared with mums 🌸',
      Open: 'Open Book applied: Profile visible to community ✨'
    };
    showToast(messages[preset], 'success');
  };

  return (
    <div className="fade-in-up">
      <TabContent>

      {/* Hero Header */}
      <motion.div variants={tabViewVariants.item}>
        <SectionHero
          icon={<Shield size={32} />}
          title="Privacy & Safety"
          subtitle="You are in total control of your data, mum."
          accentColor="var(--sky-blue)"
        />
      </motion.div>

      {/* Visual Dashboard */}
      <motion.div variants={tabViewVariants.item} className="mb-6 grid grid-cols-3 gap-2.5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="h-full transition-transform duration-150 hover:scale-[1.02]"
          >
            <Card elevation="resting" bodyClassName="px-2 py-4 text-center h-full">
              <div className="mb-1.5 flex justify-center" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</div>
            <div className="mt-1">
              <FieldLabel>{stat.label}</FieldLabel>
            </div>
            </Card>
          </div>
        ))}
      </motion.div>

      {/* Bulk Presets */}
      <motion.div variants={tabViewVariants.item} className="mb-6">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <Settings2 size={18} className="text-[var(--mauve)]" /> Privacy Presets
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { id: 'Maximum', label: 'Maximum Privacy', desc: 'Hide everything from everyone but you.', icon: <Lock size={18} /> },
            { id: 'Community', label: 'Community Sharing', desc: 'Share posts with mums, keep info private.', icon: <ShieldCheck size={18} /> },
            { id: 'Open', label: 'Open Book', desc: 'Most content visible to the community.', icon: <Globe size={18} /> },
          ].map((preset, i) => (
            <motion.button
              key={preset.id}
              onClick={() => applyPreset(preset.id as any)}
              className="w-full text-left outline-none"
            >
              <Card 
                elevation="elevated"
                title={preset.label}
                description={preset.desc}
                className="transition-all duration-150"
                bodyClassName="px-5 py-5 flex items-center gap-3"
              >
                  <div className={activePreset === preset.id ? 'text-[var(--blush-dark)]' : 'text-[var(--text-muted)]'}>
                    {preset.icon}
                  </div>
                  <div className="flex-1" />
                  <ArrowRight size={16} className="text-[var(--cream-dark)]" />
              </Card>
            </motion.button>
          ))}
        </div>
      </motion.div>

        <motion.div variants={tabViewVariants.item} className="relative mb-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[var(--sky-blue)] to-[var(--sky-blue-dark)]" />
          <h4 className={`flex items-center gap-1.5 ${typo.heading}`}>
            <ShieldCheck size={16} className="text-[var(--sage-dark)]" /> Your Safe Space
          </h4>
          <p className={`mt-2 ${typo.bodyMuted} leading-relaxed`}>
            Your <strong>Emotional Wellbeing</strong> data and <strong>Safe Vault</strong> entries are never shared. They are <strong>encrypted</strong> and only visible to you.
          </p>
        </motion.div>

        {/* Compliance Tools */}
      <motion.div variants={tabViewVariants.item} className="mb-6">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <ShieldAlert size={18} className="text-[var(--terracotta)]" /> Your Data Rights
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => showToast('We are preparing your data package. Check your email soon! 📥', 'info')}
            className={`${typo.subheading} flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-card)] p-4 text-center transition-all duration-150 hover:border-[var(--sage)] hover:bg-[var(--sage-light)] focus:ring-2 focus:ring-[var(--blush)] focus:outline-none active:scale-[0.98] shadow-sm`}
          >
            <Download size={20} className="mb-1 text-[var(--sage)]" />
            Download Data
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className={`${typo.subheading} flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-card)] p-4 text-center transition-all duration-150 hover:border-[var(--terracotta)] hover:bg-[var(--terracotta-light)] focus:ring-2 focus:ring-[var(--blush)] focus:outline-none active:scale-[0.98] shadow-sm`}
          >
            <Trash2 size={20} className="mb-1 text-[var(--terracotta)]" />
            Delete Account
          </button>
        </div>
      </motion.div>

      {/* Activity Log */}
      <motion.div variants={tabViewVariants.item} className="mb-8">
        <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
          <History size={18} className="text-[var(--sky-blue)]" /> Recent Privacy Changes
        </h3>
        <Card elevation="featured" bodyClassName="p-2">
          {mockPrivacyLogs.map((log: any) => (
            <div key={log.id} className="flex items-center justify-between border-b border-[var(--cream-dark)] px-4 py-3 last:border-none hover:bg-[var(--bg-card-hover)] transition-colors duration-150 rounded-[var(--radius-md)] m-1">
              <div>
                <div className={typo.body}>{log.action}</div>
                <div className={`mt-0.5 ${typo.caption}`}>{log.details}</div>
              </div>
              <div className={`shrink-0 font-semibold ${typo.caption}`}>{log.date}</div>
            </div>
          ))}
        </Card>
      </motion.div>

      {/* Delete Confirmation */}
      <BottomSheet isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Delete Your Account">
        <div className="px-1 py-4 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--terracotta-light)] text-[var(--terracotta)]">
            <Trash2 size={32} />
          </div>
          <h4 className={`mb-3 ${typo.heading}`}>Are you absolutely sure?</h4>
          <p className={`mb-6 ${typo.bodyMuted}`}>
            This will permanently remove all your posts, messages, and child milestones. Your shared tips will remain visible anonymously to help other mums, unless you choose to delete them individually.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 rounded-[var(--radius-md)] bg-[var(--cream-dark)] py-3.5 text-sm font-bold text-[var(--text-primary)] transition-colors hover:bg-[color-mix(in_oklab,var(--cream-dark)_90%,black)]"
            >
              Keep My Account
            </button>
            <div className="flex-1">
              <HoldToDeleteButton
                label="Hold to Delete Account"
                confirmLabel="Deleting..."
                onConfirm={() => {
                  setShowDeleteConfirm(false);
                  showToast('Account successfully queued for deletion. You have 30 days to cancel.', 'warning', 6000);
                }}
              />
            </div>
          </div>
        </div>
      </BottomSheet>
      </TabContent>
    </div>
  );
}
