'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, MapPin, Mail, Phone, Globe, ShieldCheck,
  Clock, AlertCircle, Plus, Check, X
} from 'lucide-react';
import Badge from '../ui/Badge';
import ConfettiEffect from '../ui/ConfettiEffect';
import Toast from '../ui/Toast';
import type { UserProfile } from '@/lib/data';

interface PersonalInfoProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

export default function PersonalInfo({ user, onUpdate }: PersonalInfoProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const fields = [
    { icon: <User size={18} />, label: 'Name', value: user.name, key: 'name' },
    { icon: <Briefcase size={18} />, label: 'Occupation', value: user.occupation, key: 'occupation', optional: true },
    { icon: <Globe size={18} />, label: 'Country', value: `${user.countryFlag} ${user.country}`, key: 'country' },
    { icon: <MapPin size={18} />, label: 'Location', value: user.location, key: 'location', optional: true },
    { icon: <Mail size={18} />, label: 'Email', value: user.email, key: 'email', masked: true },
    { icon: <Phone size={18} />, label: 'Phone', value: user.phone, key: 'phone', masked: true },
  ];

  const handleSave = () => {
    if (editData.motherhoodStage !== user.motherhoodStage) {
      setShowConfetti(true);
      setToast({ show: true, message: `Congratulations on your new journey as ${editData.motherhoodStage}! 🎉` });
    }
    onUpdate(editData);
    setEditing(false);
  };

  const stages: UserProfile['motherhoodStage'][] = [
    'Trying to Conceive', 'Pregnant', 'New Mum', 'Toddler Mum', 'Experienced Mum'
  ];

  return (
    <div className="fade-in-up" style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
      <ConfettiEffect trigger={showConfetti} />
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />

      {/* Progress Bar */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: 20,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Your profile is {user.profileCompletion}% complete 🌸
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blush-dark)' }}>
            {user.profileCompletion}%
          </span>
        </div>
        <div style={{
          height: 8,
          background: 'var(--cream-dark)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${user.profileCompletion}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--blush), var(--blush-dark))',
              borderRadius: 'var(--radius-full)',
            }}
          />
        </div>
      </div>

      {/* Edit toggles */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        {editing ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { setEditing(false); setEditData(user); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
                borderRadius: 'var(--radius-md)', border: '2px solid var(--cream-dark)',
                background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem',
              }}
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
                borderRadius: 'var(--radius-md)', border: 'none',
                background: 'linear-gradient(135deg, var(--sage), var(--sage-dark))',
                cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 700, color: 'white', fontSize: '0.85rem',
              }}
            >
              <Check size={16} /> Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              borderRadius: 'var(--radius-md)', border: '2px solid var(--blush)',
              background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, color: 'var(--blush-dark)', fontSize: '0.85rem',
            }}
          >
            Edit Info
          </button>
        )}
      </div>

      {/* Motherhood Stage */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: 12,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-sm)',
            background: 'var(--blush-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: 'var(--blush-dark)',
          }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Motherhood Stage</div>
            {editing ? (
              <select
                value={editData.motherhoodStage}
                onChange={(e) => setEditData({ ...editData, motherhoodStage: e.target.value as UserProfile['motherhoodStage'] })}
                style={{
                  fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)',
                  border: '2px solid var(--blush)', borderRadius: 'var(--radius-sm)',
                  padding: '4px 8px', fontFamily: 'inherit', background: 'var(--cream)',
                  marginTop: 4, cursor: 'pointer',
                }}
              >
                {stages.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            ) : (
              <Badge label={`${user.motherhoodStage} · ${user.motherhoodMonths} months`} variant="blush" />
            )}
          </div>
        </div>
      </div>

      {/* Fields */}
      <AnimatePresence mode="wait">
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 20px',
              marginBottom: 8,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-sm)',
              background: 'var(--cream-dark)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
              flexShrink: 0,
            }}>
              {field.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {field.label}
              </div>
              {editing && !field.masked ? (
                <input
                  type="text"
                  value={(editData as any)[field.key] || ''}
                  onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                  placeholder={field.optional ? `Add ${field.label.toLowerCase()} +` : ''}
                  style={{
                    width: '100%', fontSize: '0.95rem', fontWeight: 600,
                    color: 'var(--text-primary)', border: 'none',
                    borderBottom: '2px solid var(--blush-light)', padding: '6px 0',
                    outline: 'none', background: 'transparent', fontFamily: 'inherit',
                  }}
                />
              ) : (
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: field.value ? 'var(--text-primary)' : 'var(--text-muted)',
                  marginTop: 2,
                }}>
                  {field.value || (
                    <span style={{ fontStyle: 'italic', color: 'var(--blush-dark)', cursor: editing ? 'text' : 'pointer' }}>
                      Add {field.label.toLowerCase()} +
                    </span>
                  )}
                  {field.masked && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 8 }}>🔒 Private</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Verification Status */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginTop: 12,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 'var(--radius-sm)',
          background: user.verificationStatus === 'Verified' ? '#D4E8D0' : 'var(--cream-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: user.verificationStatus === 'Verified' ? '#2A6B2A' : 'var(--text-muted)',
        }}>
          {user.verificationStatus === 'Verified' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ID Verification
          </div>
          <Badge
            label={
              user.verificationStatus === 'Verified' ? 'Verified ✓' :
              user.verificationStatus === 'Pending' ? 'Pending ⏳' : 'Not Submitted'
            }
            variant={
              user.verificationStatus === 'Verified' ? 'success' :
              user.verificationStatus === 'Pending' ? 'warning' : 'cream'
            }
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
