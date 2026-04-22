'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Eye, Lock, Globe,
  ArrowRight, Download, Trash2, ShieldCheck,
  History, Settings2, ShieldAlert, LockKeyhole
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
    { label: 'Private', value: 12, icon: <Lock size={15} />, color: 'var(--mauve)' },
    { label: 'Connections', value: 5, icon: <ShieldCheck size={15} />, color: 'var(--sage)' },
    { label: 'Visible to All', value: 2, icon: <Globe size={15} />, color: 'var(--sky-blue)' },
  ];

  const applyPreset = (preset: 'Maximum' | 'Community' | 'Open') => {
    setActivePreset(preset);
    const messages = {
      Maximum: 'Maximum Privacy applied: Everything is now private',
      Community: 'Community Sharing applied: Moments shared with mums',
      Open: 'Open Book applied: Profile visible to community',
    };
    showToast(messages[preset], 'success');
  };

  return (
    <div className="fade-in-up">
      <TabContent>
        {/* Hero */}
        <motion.div variants={tabViewVariants.item}>
          <SectionHero
            icon={<Shield size={28} />}
            title="Privacy & Safety"
            subtitle="You are in total control of your data, mum."
            accentColor="var(--sky-blue)"
          />
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div variants={tabViewVariants.item} className="mb-6 grid grid-cols-3 gap-2.5">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Card elevation="resting" bodyClassName="px-2 py-4 text-center" hover>
                <div className="mb-1.5 flex justify-center" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                <div className="mt-1">
                  <FieldLabel>{stat.label}</FieldLabel>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Privacy Presets */}
        <motion.div variants={tabViewVariants.item} className="mb-6">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <Settings2 size={17} className="text-[var(--mauve)]" /> Privacy Presets
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { id: 'Maximum' as const, label: 'Maximum Privacy', desc: 'Hide everything from everyone but you.', icon: <LockKeyhole size={17} /> },
              { id: 'Community' as const, label: 'Community Sharing', desc: 'Share posts with mums, keep info private.', icon: <ShieldCheck size={17} /> },
              { id: 'Open' as const, label: 'Open Book', desc: 'Most content visible to the community.', icon: <Globe size={17} /> },
            ].map((preset) => (
              <motion.button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="w-full text-left outline-none"
                whileTap={{ scale: 0.99 }}
              >
                <Card
                  elevation="elevated"
                  className={`transition-all duration-200 ${activePreset === preset.id ? 'border-[var(--blush-soft)]' : ''}`}
                  bodyClassName="px-5 py-4 flex items-center gap-4"
                  hover
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-full)] ${
                    activePreset === preset.id ? 'bg-[var(--blush-soft)] text-[var(--blush-deep)]' : 'bg-[var(--cream-deep)] text-[var(--text-muted)]'
                  }`}>
                    {preset.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`${typo.subheading} font-bold`}>{preset.label}</div>
                    <div className={typo.caption}>{preset.desc}</div>
                  </div>
                  <ArrowRight size={15} className="text-[var(--border)] shrink-0" />
                </Card>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Safe Space Banner */}
        <motion.div
          variants={tabViewVariants.item}
          className="relative mb-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-elevated)]"
        >
          <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[var(--sky-blue)] to-[var(--sky-blue-dark)]" />
          <h4 className={`flex items-center gap-1.5 ${typo.heading}`}>
            <ShieldCheck size={16} className="text-[var(--sage-deep)]" /> Your Safe Space
          </h4>
          <p className={`mt-2 ${typo.bodyMuted} leading-relaxed`}>
            Your <strong>Emotional Wellbeing</strong> data and <strong>Safe Vault</strong> entries are never shared. They are <strong>encrypted</strong> and only visible to you.
          </p>
        </motion.div>

        {/* Data Rights */}
        <motion.div variants={tabViewVariants.item} className="mb-6">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <ShieldAlert size={17} className="text-[var(--terracotta)]" /> Your Data Rights
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: <Download size={18} />, label: 'Download Data', color: 'var(--sage)', onClick: () => showToast('We are preparing your data package. Check your email soon!', 'info') },
              { icon: <Trash2 size={18} />, label: 'Delete Account', color: 'var(--status-error)', onClick: () => setShowDeleteConfirm(true) },
            ].map((action) => (
              <motion.button
                key={action.label}
                onClick={action.onClick}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-4 text-center transition-all duration-200 hover:border-[${action.color}] hover:shadow-[var(--shadow-elevated)] focus:ring-2 focus:ring-[var(--blush)] focus:outline-none active:scale-[0.98] shadow-sm`}
              >
                <span style={{ color: action.color }}>{action.icon}</span>
                <span className={`${typo.subheading}`}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div variants={tabViewVariants.item} className="mb-8">
          <h3 className={`${typo.heading} mb-3 flex items-center gap-2`}>
            <History size={17} className="text-[var(--sky-blue)]" /> Recent Privacy Changes
          </h3>
          <Card elevation="featured" bodyClassName="p-2">
            {mockPrivacyLogs.map((log: any) => (
              <div key={log.id} className="flex items-center justify-between border-b border-[var(--border-light)] px-4 py-3 last:border-none hover:bg-[var(--surface-elevated)] transition-colors duration-150 rounded-[var(--radius-md)] m-1">
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
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--error-soft)] text-[var(--status-error)]"
            >
              <Trash2 size={28} />
            </motion.div>
            <h4 className={`mb-3 ${typo.heading}`}>Are you absolutely sure?</h4>
            <p className={`mb-6 ${typo.bodyMuted}`}>
              This will permanently remove all your posts, messages, and child milestones. Your shared tips will remain visible anonymously to help other mums, unless you choose to delete them individually.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                Keep My Account
              </Button>
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
