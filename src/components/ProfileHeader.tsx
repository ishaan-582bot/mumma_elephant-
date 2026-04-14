'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, ShieldCheck, Briefcase, MapPin, Camera } from 'lucide-react';
import Badge from './ui/Badge';
import type { UserProfile } from '@/lib/data';

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
}

export default function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  const [avatarHover, setAvatarHover] = useState(false);

  const stageLabel = `${user.motherhoodStage} · ${user.motherhoodMonths} months`;

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
      {/* Edit button */}
      <button
        onClick={onEdit}
        aria-label="Edit profile"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: '50%',
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
      </button>

      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          style={{
            position: 'relative',
            width: 100,
            height: 100,
            borderRadius: '50%',
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
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 48 }}>🐘</span>
          )}
          
          {/* Camera overlay */}
          <motion.div
            animate={{ opacity: avatarHover ? 1 : 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
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
            { label: 'Posts', count: user.postsCount },
            { label: 'Tips', count: user.tipsCount },
            { label: 'Children', count: user.childrenCount },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                minWidth: 80,
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {stat.count}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
