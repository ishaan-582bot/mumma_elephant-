'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Edit3, ShieldCheck, Briefcase, Camera, Image as ImageIcon,
  Lightbulb, Baby, MapPin, User, ArrowRight, Award
} from 'lucide-react';
import Image from 'next/image';
import Badge from './ui/Badge';
import { useToast } from './ui/ToastContext';
import type { UserProfile } from '@/lib/data';
import type { TabId } from './TabStrip';
import Card from './ui/Card';
import Button from './ui/Button';
import { typo } from '@/lib/typography';

interface ProfileHeaderProps {
  user: UserProfile | null;  // <-- CHANGED: allow null
  onEdit: () => void;
  onNavigate?: (tab: TabId) => void;
  onAvatarChange?: (avatar: string | null) => void;
}

export default function ProfileHeader({ user, onEdit, onNavigate, onAvatarChange }: ProfileHeaderProps) {
  const [avatarHover, setAvatarHover] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar ?? null);  // <-- CHANGED: optional chaining + nullish coalescing
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pulse, setPulse] = useState(false);
  const prevCompletion = useRef(user?.profileCompletion ?? 0);  // <-- CHANGED: optional chaining

  // ADDED: Early return if no user data
  if (!user) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] p-6 shadow-[var(--shadow-featured)] lg:p-7"
        style={{
          background: 'linear-gradient(160deg, var(--blush-soft) 0%, var(--cream) 40%, var(--surface) 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="h-24 w-24 animate-pulse rounded-full bg-[var(--cream-deep)]" />
          <div className="h-6 w-32 animate-pulse rounded bg-[var(--cream-deep)]" />
          <div className="h-4 w-48 animate-pulse rounded bg-[var(--cream-deep)]" />
          <p className={typo.caption}>Loading profile...</p>
        </div>
      </motion.section>
    );
  }

  React.useEffect(() => {
    if (user.profileCompletion > prevCompletion.current) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1200);
      return () => clearTimeout(timer);
    }
    prevCompletion.current = user.profileCompletion;
  }, [user.profileCompletion]);

  const stageLabel = `${user.motherhoodStage} \u00B7 ${user.motherhoodMonths} months`;

  React.useEffect(() => {
    setCurrentAvatar(user.avatar);
  }, [user.avatar]);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setCurrentAvatar(result);
        onAvatarChange?.(result);
        showToast('Looking good, mum! Avatar updated.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as any }}
      className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] p-6 shadow-[var(--shadow-featured)] lg:p-7"
      style={{
        background: 'linear-gradient(160deg, var(--blush-soft) 0%, var(--cream) 40%, var(--surface) 100%)',
      }}
    >
      {/* Ambient decorative shapes */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--blush)] opacity-[0.07] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[var(--sage)] opacity-[0.06] blur-2xl" />

      {/* Hidden File Input */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {/* Edit Button */}
      <div className="mb-4 flex justify-end">
        <Button onClick={onEdit} variant="glass" size="sm" aria-label="Edit profile">
          <Edit3 size={15} /> Edit Profile
        </Button>
      </div>

      {/* Avatar + Identity */}
      <div className="flex flex-col items-center gap-3.5 text-center">
        {/* Avatar with ring animation */}
        <div
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          onClick={handleAvatarClick}
          className="group relative cursor-pointer"
        >
          {/* Animated ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1.5 rounded-full border-2 border-dashed border-[var(--blush)] opacity-40"
            style={{ borderSpacing: '8px' }}
          />
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative h-24 w-24 overflow-hidden rounded-[var(--radius-full)] border-[3px] border-white shadow-[var(--shadow-glow-blush)] lg:h-28 lg:w-28"
            style={{
              background: currentAvatar
                ? undefined
                : 'linear-gradient(135deg, var(--blush), var(--mauve-soft))',
            }}
          >
            {currentAvatar ? (
              <Image src={currentAvatar} alt={user.name} fill sizes="(min-width: 1024px) 112px, 96px" className="object-cover" unoptimized />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center">
                <User size={42} color="white" strokeWidth={1.5} />
              </span>
            )}
            {/* Camera overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: avatarHover ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--bg-overlay)] backdrop-blur-sm"
            >
              <Camera size={24} color="white" />
            </motion.div>
          </motion.div>
          {/* Status dot */}
          <div className="absolute bottom-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[var(--sage)] shadow-sm">
            <ShieldCheck size={12} color="white" strokeWidth={3} />
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center gap-2">
          <h1 className={typo.displayExtrabold}>
            {user.name}
          </h1>
          {user.isVerified && (
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Award size={20} className="text-[var(--sage)]" strokeWidth={2} />
            </motion.div>
          )}
        </div>

        {/* Stage badge */}
        <Badge label={stageLabel} variant="blush" dot />

        {/* Meta info */}
        {(user.occupation || user.country || user.location) && (
          <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 ${typo.caption}`}>
            {user.occupation && (
              <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
                <Briefcase size={13} strokeWidth={2} />
                {user.occupation}
              </span>
            )}
            {user.country && (
              <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
                <span>{user.countryFlag}</span>
                {user.country}
              </span>
            )}
            {user.location && (
              <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
                <MapPin size={13} strokeWidth={2} />
                {user.location}
              </span>
            )}
          </div>
        )}

        {/* Stats Row */}
        <div className="mt-1 grid w-full grid-cols-3 gap-2.5">
          {[
            { label: 'Posts', count: user.postsCount, icon: <ImageIcon size={14} />, tab: 'posts' as TabId },
            { label: 'Tips', count: user.tipsCount, icon: <Lightbulb size={14} />, tab: 'tips' as TabId },
            { label: 'Children', count: user.childrenCount, icon: <Baby size={14} />, tab: 'children' as TabId },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={onNavigate ? { y: -5, boxShadow: 'var(--shadow-featured)' } : {}}
              whileTap={onNavigate ? { scale: 0.96 } : {}}
              onClick={() => onNavigate?.(stat.tab)}
              className="group relative cursor-pointer overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2.5 py-3 text-center shadow-[var(--shadow-resting)] transition-colors hover:border-[var(--blush-soft)]"
            >
              {/* Hover gradient line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[var(--blush)] to-[var(--terracotta)]"
              />
              <div className={`${typo.stat} text-[var(--blush-deep)]`}>
                {stat.count}
              </div>
              <div className={`mt-1 flex items-center justify-center gap-1 ${typo.statLabel}`}>
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              {onNavigate && (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 0.35, x: 0 }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--blush)]"
                >
                  <ArrowRight size={10} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Profile Completion */}
        <div className="relative w-full">
          <motion.div
            animate={{
              boxShadow: pulse
                ? '0 0 20px 2px var(--sage-glow)'
                : 'var(--shadow-resting)',
            }}
            transition={{ duration: pulse ? 0.3 : 0.8 }}
            className="w-full overflow-hidden rounded-[var(--radius-lg)]"
          >
            <Card
              elevation="resting"
              hover={false}
              className="w-full border-[var(--border-light)]"
              bodyClassName="px-4 py-3"
            >
              <div className={`flex items-center justify-between ${typo.subheading}`}>
                <span className="text-[var(--text-secondary)]">Profile complete</span>
                <span className="font-bold text-[var(--blush-deep)]">{user.profileCompletion}%</span>
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-[var(--radius-full)] bg-[var(--cream-deep)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${user.profileCompletion}%` }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="h-full rounded-[var(--radius-full)]"
                  style={{
                    background: 'linear-gradient(90deg, var(--blush), var(--terracotta))',
                  }}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
