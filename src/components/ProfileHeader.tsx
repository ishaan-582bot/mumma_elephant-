import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Edit3, ShieldCheck, Briefcase, Camera, Image as ImageIcon, Lightbulb, Baby, MapPin } from 'lucide-react';
import Image from 'next/image';
import Badge from './ui/Badge';
import Toast from './ui/Toast';
import type { UserProfile } from '@/lib/data';
import type { TabId } from './TabStrip';
import Card from './ui/Card';
import Button from './ui/Button';

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
  onNavigate?: (tab: TabId) => void;
  onAvatarChange?: (avatar: string | null) => void;
}

export default function ProfileHeader({ user, onEdit, onNavigate, onAvatarChange }: ProfileHeaderProps) {
  const [avatarHover, setAvatarHover] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as 'success' | 'warning' | 'info' | 'error' | 'default' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stageLabel = `${user.motherhoodStage} · ${user.motherhoodMonths} months`;

  React.useEffect(() => {
    setCurrentAvatar(user.avatar);
  }, [user.avatar]);

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
        onAvatarChange?.(result);
        setToast({ show: true, message: 'Looking good, mum! Avatar updated 🐘✨', type: 'success' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[var(--radius-xl)] border border-[var(--cream-dark)] bg-[linear-gradient(180deg,var(--blush-light)_0%,var(--cream)_100%)] p-5 shadow-[var(--shadow-md)] lg:p-6"
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

      <div className="mb-4 flex justify-end">
        <Button onClick={onEdit} variant="secondary" size="sm" aria-label="Edit profile">
          <Edit3 size={16} /> Edit Profile
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          onClick={handleAvatarClick}
          className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-[var(--radius-full)] border-4 border-white/80 bg-[linear-gradient(135deg,var(--blush),var(--mauve-light))] shadow-[var(--shadow-glow-blush)] transition-all duration-150 hover:scale-[1.02] lg:h-28 lg:w-28"
        >
          {currentAvatar ? (
            <Image
              src={currentAvatar}
              alt={user.name}
              fill
              sizes="(min-width: 1024px) 112px, 96px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span style={{ fontSize: 48 }}>🐘</span>
          )}
          
          {/* Camera overlay */}
          <motion.div
            animate={{ opacity: avatarHover ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-full)] bg-[rgba(74,55,40,0.4)]"
          >
            <Camera size={24} color="white" />
          </motion.div>
        </div>

        {/* Name + Verified */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] lg:text-[2rem]">
            {user.name}
          </h1>
          {user.isVerified && (
            <ShieldCheck size={20} color="#4A8B4A" strokeWidth={2.5} />
          )}
        </div>

        {/* Stage badge */}
        <Badge label={stageLabel} variant="blush" />

        {/* Occupation + Country */}
        {(user.occupation || user.country || user.location) && (
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--text-secondary)]">
            {user.occupation && (
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} />
                {user.occupation}
              </span>
            )}
            {user.country && (
              <span className="inline-flex items-center gap-1.5">
                <span>{user.countryFlag}</span>
                {user.country}
              </span>
            )}
            {user.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {user.location}
              </span>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="mt-1 grid w-full grid-cols-3 gap-2">
          {[
            { label: 'Posts', count: user.postsCount, icon: <ImageIcon size={14} />, tab: 'posts' as TabId },
            { label: 'Tips', count: user.tipsCount, icon: <Lightbulb size={14} />, tab: 'tips' as TabId },
            { label: 'Children', count: user.childrenCount, icon: <Baby size={14} />, tab: 'children' as TabId },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={onNavigate ? { y: -4, boxShadow: 'var(--shadow-md)' } : {}}
              onClick={() => onNavigate && onNavigate(stat.tab)}
              className="rounded-[var(--radius-md)] border border-[var(--cream-dark)] bg-[var(--bg-card)] px-2 py-2.5 text-center shadow-[var(--shadow-sm)] transition-all duration-150"
              style={{ cursor: onNavigate ? 'pointer' : 'default' }}
            >
              <div className="text-2xl font-extrabold text-[var(--blush-dark)]">
                {stat.count}
              </div>
              <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Card
          className="w-full bg-white/70"
          bodyClassName="px-4 py-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
            <span>Profile complete</span>
            <span className="text-[var(--blush-dark)]">{user.profileCompletion}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-[var(--radius-full)] bg-[var(--cream-dark)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${user.profileCompletion}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-[var(--radius-full)] bg-[linear-gradient(90deg,var(--blush),var(--terracotta))]"
            />
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
