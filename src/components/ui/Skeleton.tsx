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
  <div className="flex flex-col items-center gap-4 rounded-b-[var(--radius-3xl)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-primary)] px-6 py-8 shadow-[var(--shadow-sm)]">
    <div className="flex w-full justify-between">
      <SkeletonBox width="64px" height="24px" borderRadius="16px" />
      <SkeletonBox width="36px" height="36px" borderRadius="50%" />
    </div>
    
    <SkeletonBox width="100px" height="100px" borderRadius="50%" />
    
    <div className="flex flex-col items-center gap-2">
      <SkeletonBox width="180px" height="28px" />
      <SkeletonBox width="120px" height="20px" />
    </div>
    
    <div className="mt-3 flex gap-4">
      <SkeletonBox width="80px" height="60px" borderRadius="16px" />
      <SkeletonBox width="80px" height="60px" borderRadius="16px" />
      <SkeletonBox width="80px" height="60px" borderRadius="16px" />
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="flex flex-col gap-5 p-6">
    <SkeletonBox width="100%" height="60px" borderRadius="16px" />
    <SkeletonBox width="100%" height="150px" borderRadius="16px" />
    <SkeletonBox width="100%" height="80px" borderRadius="16px" />
  </div>
);

/* ─── Tab-specific skeleton screens ─── */

/** Field row: 36px icon circle on left, two text lines on right */
const FieldRowSkeleton = () => (
  <div className="flex items-center gap-3 py-2.5">
    <SkeletonBox width="36px" height="36px" borderRadius="var(--radius-sm)" />
    <div className="flex flex-1 flex-col gap-1.5">
      <SkeletonBox width="30%" height="12px" borderRadius="6px" />
      <SkeletonBox width="60%" height="14px" borderRadius="6px" />
    </div>
  </div>
);

/** PersonalInfo: progress bar + 6 field rows */
export const PersonalInfoSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-6">
    {/* Progress bar card */}
    <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] px-5 py-4">
      <div className="mb-2.5 flex justify-between">
        <SkeletonBox width="55%" height="14px" borderRadius="6px" />
        <SkeletonBox width="32px" height="14px" borderRadius="6px" />
      </div>
      <SkeletonBox width="100%" height="8px" borderRadius="var(--radius-full)" />
    </div>
    {/* Field rows */}
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] px-4 py-2">
        <FieldRowSkeleton />
      </div>
    ))}
  </div>
);

/** MyChildren: 3 avatar circles + 4 info rows + 5 accordion headers */
export const MyChildrenSkeleton = () => (
  <div className="flex flex-col gap-4 px-4 py-6">
    {/* Child avatars row */}
    <div className="flex gap-3 py-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <SkeletonBox width="64px" height="64px" borderRadius="50%" />
          <SkeletonBox width="48px" height="10px" borderRadius="6px" />
        </div>
      ))}
    </div>
    {/* Info field rows */}
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
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
  <div className="flex flex-col gap-3 px-4 py-6">
    {/* Gradient hero block */}
    <SkeletonBox width="100%" height="80px" borderRadius="var(--radius-lg)" />
    {/* Accordion headers */}
    <SkeletonBox width="100%" height="52px" borderRadius="var(--radius-lg)" />
    {/* Document rows */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--bg-card)] px-4 py-3">
        <SkeletonBox width="40px" height="40px" borderRadius="var(--radius-sm)" />
        <div className="flex flex-1 flex-col gap-1.5">
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
  <div className="flex flex-col gap-4 px-4 py-6">
    {/* Toggle bar */}
    <div className="flex items-center justify-between">
      <SkeletonBox width="80px" height="16px" borderRadius="6px" />
      <SkeletonBox width="72px" height="32px" borderRadius="var(--radius-sm)" />
    </div>
    {/* Grid */}
    <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-[var(--radius-md)]">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBox key={i} width="100%" height="0" borderRadius="0" style={{ paddingBottom: '100%' }} />
      ))}
    </div>
  </div>
);

/** MyTips: header row + 3 tip cards */
export const MyTipsSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-6">
    {/* Header row */}
    <div className="flex items-center justify-between">
      <SkeletonBox width="100px" height="18px" borderRadius="6px" />
      <SkeletonBox width="64px" height="28px" borderRadius="var(--radius-sm)" />
    </div>
    {/* Tip cards */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-2.5 rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4 transition-shadow hover:shadow-sm">
        <SkeletonBox width="90%" height="14px" borderRadius="6px" />
        <SkeletonBox width="70%" height="12px" borderRadius="6px" />
        <SkeletonBox width="50%" height="12px" borderRadius="6px" />
        {/* Tag row */}
        <div className="mt-1 flex gap-1.5">
          <SkeletonBox width="48px" height="20px" borderRadius="var(--radius-full)" />
          <SkeletonBox width="56px" height="20px" borderRadius="var(--radius-full)" />
        </div>
        {/* Bar */}
        <div className="mt-2">
          <SkeletonBox width="100%" height="6px" borderRadius="var(--radius-full)" />
        </div>
      </div>
    ))}
  </div>
);
