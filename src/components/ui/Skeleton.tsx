'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonBox = ({ width, height, borderRadius = '12px', className = '', style }: any) => (
  <div
    className={`skeleton ${className}`}
    style={{
      width,
      height,
      borderRadius,
      ...style,
    }}
  />
);

export const ProfileHeaderSkeleton = () => (
  <div className="flex flex-col items-center gap-4 rounded-[var(--radius-xl)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-primary)] px-6 py-8 shadow-[var(--shadow-resting)]">
    <div className="flex w-full justify-between">
      <SkeletonBox width="64px" height="24px" borderRadius="var(--radius-full)" />
      <SkeletonBox width="36px" height="36px" borderRadius="var(--radius-full)" />
    </div>
    <SkeletonBox width="96px" height="96px" borderRadius="var(--radius-full)" />
    <div className="flex flex-col items-center gap-2">
      <SkeletonBox width="160px" height="26px" borderRadius="var(--radius-md)" />
      <SkeletonBox width="100px" height="18px" borderRadius="var(--radius-full)" />
    </div>
    <div className="mt-3 flex gap-3">
      <SkeletonBox width="76px" height="56px" borderRadius="var(--radius-md)" />
      <SkeletonBox width="76px" height="56px" borderRadius="var(--radius-md)" />
      <SkeletonBox width="76px" height="56px" borderRadius="var(--radius-md)" />
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="flex flex-col gap-5 p-6">
    <SkeletonBox width="100%" height="56px" borderRadius="var(--radius-lg)" />
    <SkeletonBox width="100%" height="140px" borderRadius="var(--radius-lg)" />
    <SkeletonBox width="100%" height="72px" borderRadius="var(--radius-lg)" />
  </div>
);

/* ─── Tab-specific skeleton screens ─── */

const FieldRowSkeleton = () => (
  <div className="flex items-center gap-3 py-2.5">
    <SkeletonBox width="36px" height="36px" borderRadius="var(--radius-sm)" />
    <div className="flex flex-1 flex-col gap-1.5">
      <SkeletonBox width="30%" height="12px" borderRadius="6px" />
      <SkeletonBox width="55%" height="14px" borderRadius="6px" />
    </div>
  </div>
);

export const PersonalInfoSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-6">
    <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] px-5 py-4 shadow-[var(--shadow-resting)]">
      <div className="mb-2.5 flex justify-between">
        <SkeletonBox width="55%" height="14px" borderRadius="6px" />
        <SkeletonBox width="32px" height="14px" borderRadius="6px" />
      </div>
      <SkeletonBox width="100%" height="8px" borderRadius="var(--radius-full)" />
    </div>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] px-4 py-2 shadow-[var(--shadow-resting)]">
        <FieldRowSkeleton />
      </div>
    ))}
  </div>
);

export const MyChildrenSkeleton = () => (
  <div className="flex flex-col gap-4 px-4 py-6">
    <div className="flex gap-3 py-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <SkeletonBox width="60px" height="60px" borderRadius="var(--radius-full)" />
          <SkeletonBox width="44px" height="10px" borderRadius="6px" />
        </div>
      ))}
    </div>
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-resting)]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <SkeletonBox width="60px" height="10px" borderRadius="6px" />
            <SkeletonBox width="110px" height="14px" borderRadius="6px" />
          </div>
          <SkeletonBox width="40px" height="22px" borderRadius="var(--radius-full)" />
        </div>
      </div>
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <SkeletonBox key={i} width="100%" height="44px" borderRadius="var(--radius-lg)" className="shadow-[var(--shadow-resting)]" />
    ))}
  </div>
);

export const SafeVaultSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-6">
    <SkeletonBox width="100%" height="72px" borderRadius="var(--radius-lg)" />
    <SkeletonBox width="100%" height="48px" borderRadius="var(--radius-lg)" />
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--bg-card)] px-4 py-3 shadow-[var(--shadow-resting)]">
        <SkeletonBox width="38px" height="38px" borderRadius="var(--radius-sm)" />
        <div className="flex flex-1 flex-col gap-1.5">
          <SkeletonBox width="60%" height="14px" borderRadius="6px" />
          <SkeletonBox width="35%" height="10px" borderRadius="6px" />
        </div>
        <SkeletonBox width="26px" height="26px" borderRadius="var(--radius-full)" />
      </div>
    ))}
    <SkeletonBox width="100%" height="48px" borderRadius="var(--radius-lg)" />
  </div>
);

export const MyPostsSkeleton = () => (
  <div className="flex flex-col gap-4 px-4 py-6">
    <div className="flex items-center justify-between">
      <SkeletonBox width="72px" height="16px" borderRadius="6px" />
      <SkeletonBox width="68px" height="30px" borderRadius="var(--radius-sm)" />
    </div>
    <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-[var(--radius-md)]">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBox key={i} width="100%" height="0" borderRadius="0" style={{ paddingBottom: '100%' }} />
      ))}
    </div>
  </div>
);

export const MyTipsSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-6">
    <div className="flex items-center justify-between">
      <SkeletonBox width="92px" height="18px" borderRadius="6px" />
      <SkeletonBox width="60px" height="26px" borderRadius="var(--radius-sm)" />
    </div>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-2.5 rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-resting)]">
        <SkeletonBox width="88%" height="14px" borderRadius="6px" />
        <SkeletonBox width="65%" height="12px" borderRadius="6px" />
        <div className="mt-1 flex gap-1.5">
          <SkeletonBox width="44px" height="18px" borderRadius="var(--radius-full)" />
          <SkeletonBox width="52px" height="18px" borderRadius="var(--radius-full)" />
        </div>
        <div className="mt-1">
          <SkeletonBox width="100%" height="6px" borderRadius="var(--radius-full)" />
        </div>
      </div>
    ))}
  </div>
);
ap-2.5 rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4 transition-shadow hover:shadow-sm">
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
