import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Edit3, ShieldCheck, Briefcase, Camera, Image as ImageIcon, Lightbulb, Baby, MapPin } from 'lucide-react';
import Badge from './ui/Badge';
import Toast from './ui/Toast';
import type { UserProfile } from '@/lib/data';
import type { TabId } from './TabStrip';

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
  onNavigate?: (tab: TabId) => void;
}

export default function ProfileHeader({ user, onEdit, onNavigate }: ProfileHeaderProps) {
  const [avatarHover, setAvatarHover] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as 'success' | 'warning' | 'info' | 'error' | 'default' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stageLabel = `${user.motherhoodStage} · ${user.motherhoodMonths} months`;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setCurrentAvatar(result);
        setToast({ show: true, message: 'Looking good, mum! Avatar updated 🐘✨', type: 'success' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'linear-gradient(180deg, var(--blush-light) 0%, var(--cream) 100%)',
        padding: '32px 20px 24px',
        position: 'relative',
      }}
    >
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Edit button */}
      <motion.button
        onClick={onEdit}
        aria-label="Edit profile"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-card)',
          border: 'none',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'all 0.2s ease',
        }}
      >
        <Edit3 size={18} />
      </motion.button>

      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          onClick={handleAvatarClick}
          style={{
            position: 'relative',
            width: 100,
            height: 100,
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--blush), var(--mauve-light))',
            boxShadow: 'var(--shadow-glow-blush)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            border: '4px solid rgba(255,255,255,0.8)',
          }}
        >
          {currentAvatar ? (
            <img src={currentAvatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 48 }}>🐘</span>
          )}
          
          {/* Camera overlay */}
          <motion.div
            animate={{ opacity: avatarHover ? 1 : 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--radius-full)',
              background: 'rgba(74, 55, 40, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Camera size={24} color="white" />
          </motion.div>
        </div>

        {/* Name + Verified */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            {user.name}
          </h1>
          {user.isVerified && (
            <ShieldCheck size={20} color="#4A8B4A" strokeWidth={2.5} />
          )}
        </div>

        {/* Stage badge */}
        <Badge label={stageLabel} variant="blush" />

        {/* Occupation + Country */}
        {(user.occupation || user.country) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {user.occupation && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Briefcase size={14} />
                {user.occupation}
              </span>
            )}
            {user.country && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span>{user.countryFlag}</span>
                {user.country}
              </span>
            )}
          </div>
        )}

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: 8,
        }}>
          {[
            { label: 'Posts', count: user.postsCount, icon: <ImageIcon size={14} />, tab: 'posts' as TabId },
            { label: 'Tips', count: user.tipsCount, icon: <Lightbulb size={14} />, tab: 'tips' as TabId },
            { label: 'Children', count: user.childrenCount, icon: <Baby size={14} />, tab: 'children' as TabId },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={onNavigate ? { y: -4, boxShadow: 'var(--shadow-md)' } : {}}
              onClick={() => onNavigate && onNavigate(stat.tab)}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                minWidth: 80,
                cursor: onNavigate ? 'pointer' : 'default',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--blush-dark)' }}>
                {stat.count}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
                {stat.icon}
                <span>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
