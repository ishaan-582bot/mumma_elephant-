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
