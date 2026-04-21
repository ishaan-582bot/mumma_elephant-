'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonBox = ({ width, height, borderRadius = '12px', style }: any) => (
  <motion.div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1,
      ease: "easeInOut",
    }}
    style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, var(--cream-dark) 0%, var(--blush) 50%, var(--cream-dark) 100%)',
      backgroundSize: '200% 100%',
      ...style,
    }}
  />
);

export const ProfileHeaderSkeleton = () => (
  <div style={{
    background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-primary) 100%)',
    padding: '32px 24px 24px',
    borderBottomLeftRadius: 'var(--radius-3xl)',
    borderBottomRightRadius: 'var(--radius-3xl)',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  }}>
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      <SkeletonBox width="64px" height="24px" borderRadius="16px" />
      <SkeletonBox width="36px" height="36px" borderRadius="50%" />
    </div>
    
    <SkeletonBox width="100px" height="100px" borderRadius="50%" />
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <SkeletonBox width="180px" height="28px" />
      <SkeletonBox width="120px" height="20px" />
    </div>
    
    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
      <SkeletonBox width="80px" height="60px" borderRadius="16px" />
      <SkeletonBox width="80px" height="60px" borderRadius="16px" />
      <SkeletonBox width="80px" height="60px" borderRadius="16px" />
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <SkeletonBox width="100%" height="60px" borderRadius="16px" />
    <SkeletonBox width="100%" height="150px" borderRadius="16px" />
    <SkeletonBox width="100%" height="80px" borderRadius="16px" />
  </div>
);

/* ─── Tab-specific skeleton screens ─── */

/** Field row: 36px icon circle on left, two text lines on right */
const FieldRowSkeleton = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
    <SkeletonBox width="36px" height="36px" borderRadius="var(--radius-sm)" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <SkeletonBox width="30%" height="12px" borderRadius="6px" />
      <SkeletonBox width="60%" height="14px" borderRadius="6px" />
    </div>
  </div>
);

/** PersonalInfo: progress bar + 6 field rows */
export const PersonalInfoSkeleton = () => (
  <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {/* Progress bar card */}
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <SkeletonBox width="55%" height="14px" borderRadius="6px" />
        <SkeletonBox width="32px" height="14px" borderRadius="6px" />
      </div>
      <SkeletonBox width="100%" height="8px" borderRadius="var(--radius-full)" />
    </div>
    {/* Field rows */}
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '8px 16px' }}>
        <FieldRowSkeleton />
      </div>
    ))}
  </div>
);

/** MyChildren: 3 avatar circles + 4 info rows + 5 accordion headers */
export const MyChildrenSkeleton = () => (
  <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Child avatars row */}
    <div style={{ display: 'flex', gap: 12, padding: '4px 0' }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <SkeletonBox width="64px" height="64px" borderRadius="50%" />
          <SkeletonBox width="48px" height="10px" borderRadius="6px" />
        </div>
      ))}
    </div>
    {/* Info field rows */}
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <SkeletonBox width="60px" height="10px" borderRadius="6px" />
            <SkeletonBox width="120px" height="14px" borderRadius="6px" />
          </div>
          <SkeletonBox width="44px" height="24px" borderRadius="var(--radius-full)" />
        </div>
      </div>
    ))}
    {/* Accordion section headers */}
    {Array.from({ length: 5 }).map((_, i) => (
      <SkeletonBox key={i} width="100%" height="48px" borderRadius="var(--radius-lg)" />
    ))}
  </div>
);

/** SafeVault: hero block + 2 accordions + 3 document rows */
export const SafeVaultSkeleton = () => (
  <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {/* Gradient hero block */}
    <SkeletonBox width="100%" height="80px" borderRadius="var(--radius-lg)" />
    {/* Accordion headers */}
    <SkeletonBox width="100%" height="52px" borderRadius="var(--radius-lg)" />
    {/* Document rows */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '12px 16px' }}>
        <SkeletonBox width="40px" height="40px" borderRadius="var(--radius-sm)" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SkeletonBox width="65%" height="14px" borderRadius="6px" />
          <SkeletonBox width="40%" height="10px" borderRadius="6px" />
        </div>
        <SkeletonBox width="28px" height="28px" borderRadius="50%" />
      </div>
    ))}
    {/* Second accordion header */}
    <SkeletonBox width="100%" height="52px" borderRadius="var(--radius-lg)" />
  </div>
);

/** MyPosts: toggle bar + 6 grid squares (3-column) */
export const MyPostsSkeleton = () => (
  <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Toggle bar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <SkeletonBox width="80px" height="16px" borderRadius="6px" />
      <SkeletonBox width="72px" height="32px" borderRadius="var(--radius-sm)" />
    </div>
    {/* Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBox key={i} width="100%" height="0" borderRadius="0" style={{ paddingBottom: '100%' }} />
      ))}
    </div>
  </div>
);

/** MyTips: header row + 3 tip cards */
export const MyTipsSkeleton = () => (
  <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {/* Header row */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <SkeletonBox width="100px" height="18px" borderRadius="6px" />
      <SkeletonBox width="64px" height="28px" borderRadius="var(--radius-sm)" />
    </div>
    {/* Tip cards */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SkeletonBox width="90%" height="14px" borderRadius="6px" />
        <SkeletonBox width="70%" height="12px" borderRadius="6px" />
        <SkeletonBox width="50%" height="12px" borderRadius="6px" />
        {/* Tag row */}
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <SkeletonBox width="48px" height="20px" borderRadius="var(--radius-full)" />
          <SkeletonBox width="56px" height="20px" borderRadius="var(--radius-full)" />
        </div>
        {/* Bar */}
        <SkeletonBox width="100%" height="6px" borderRadius="var(--radius-full)" />
      </div>
    ))}
  </div>
);
