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
import TabContent from '../ui/TabContent';
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
      <SectionHero
        icon={<Shield size={32} />}
        title="Privacy & Safety"
        subtitle="You are in total control of your data, mum."
        accentColor="var(--sky-blue)"
      />

      {/* Visual Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, ease: 'easeOut' }}
            className="hover:scale-[1.02] transition-transform duration-150 h-full"
          >
            <Card bodyClassName="px-3 py-4 text-center h-full">
              <div style={{ color: stat.color, marginBottom: 6, display: 'flex', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</div>
            <div className="mt-1">
              <FieldLabel>{stat.label}</FieldLabel>
            </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bulk Presets */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <Settings2 size={18} color="var(--mauve)" /> Privacy Presets
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'Maximum', label: 'Maximum Privacy', desc: 'Hide everything from everyone but you.', icon: <Lock size={18} /> },
            { id: 'Community', label: 'Community Sharing', desc: 'Share posts with mums, keep info private.', icon: <ShieldCheck size={18} /> },
            { id: 'Open', label: 'Open Book', desc: 'Most content visible to the community.', icon: <Globe size={18} /> },
          ].map((preset, i) => (
            <motion.button
              key={preset.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, ease: 'easeOut' }}
              onClick={() => applyPreset(preset.id as any)}
              className="w-full text-left outline-none"
            >
              <Card 
                title={preset.label}
                description={preset.desc}
                className="transition-all duration-150"
                bodyClassName="px-5 py-5 flex items-center gap-3"
              >
                  <div style={{ color: activePreset === preset.id ? 'var(--blush-dark)' : 'var(--text-muted)' }}>
                    {preset.icon}
                  </div>
                  <div className="flex-1"></div>
                  <ArrowRight size={16} color="var(--cream-dark)" />
              </Card>
            </motion.button>
          ))}
        </div>
      </div>

        <div className="mb-6 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--sky-blue)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]">
          <h4 className={`flex items-center gap-1.5 ${typo.heading}`}>
            <ShieldCheck size={16} color="var(--sage-dark)" /> Your Safe Space
          </h4>
          <p className={`mt-2 ${typo.bodyMuted}`}>
            Your <strong>Emotional Wellbeing</strong> data and <strong>Safe Vault</strong> entries are never shared. They are encrypted and only visible to you.
          </p>
        </div>

        {/* Compliance Tools */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <ShieldAlert size={18} color="var(--terracotta)" /> Your Data Rights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={() => showToast('We are preparing your data package. Check your email soon! 📥', 'info')}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '2px solid var(--cream-dark)',
              textAlign: 'center',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              outline: 'none',
            }}
            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--blush)'; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.background = 'var(--sage-light)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
          >
            <Download size={20} color="var(--sage)" style={{ marginBottom: 8 }} />
            <div className={`${typo.subheading} text-[var(--text-primary)]`}>Download Data</div>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '2px solid var(--cream-dark)',
              textAlign: 'center',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              outline: 'none',
            }}
            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--blush)'; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--terracotta)'; e.currentTarget.style.background = 'var(--terracotta-light)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
          >
            <Trash2 size={20} color="var(--terracotta)" style={{ marginBottom: 8 }} />
            <div className={`${typo.subheading} text-[var(--text-primary)]`}>Delete Account</div>
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div style={{ marginBottom: 24 }}>
        <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
          <History size={18} color="var(--sky-blue)" /> Recent Privacy Changes
        </h3>
        <motion.div
          whileHover={{ boxShadow: 'var(--shadow-lg)' }}
          style={{ 
          background: 'var(--bg-card)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '8px 4px',
          boxShadow: 'var(--shadow-md)',
          transition: 'all 0.15s ease',
          }}
        >
          {mockPrivacyLogs.map((log: any) => (
            <div key={log.id} style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--cream-dark)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div className={typo.body}>{log.action}</div>
                <div className={`mt-0.5 ${typo.caption}`}>{log.details}</div>
              </div>
              <div className={`shrink-0 font-semibold ${typo.caption}`}>{log.date}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Delete Confirmation */}
      <BottomSheet isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Delete Your Account">
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 'var(--radius-full)', 
            background: 'var(--terracotta-light)', color: 'var(--terracotta)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Trash2 size={32} />
          </div>
          <h4 className={`mb-3 ${typo.heading}`}>Are you absolutely sure?</h4>
          <p className={`mb-6 ${typo.bodyMuted}`}>
            This will permanently remove all your posts, messages, and child milestones. Your shared tips will remain visible anonymously to help other mums, unless you choose to delete them individually.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                flex: 1, padding: '14px', borderRadius: 'var(--radius-md)',
                background: 'var(--cream-dark)', border: 'none',
                fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Keep My Account
            </button>
            <div style={{ flex: 1 }}>
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
