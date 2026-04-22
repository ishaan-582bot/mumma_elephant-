'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastProvider } from '@/components/ui/ToastContext';
import { ConfettiProvider } from '@/components/ui/ConfettiContext';
import ProfileShell from '@/components/profile/ProfileShell';
import BackToTop from '@/components/ui/BackToTop';
import {
  SkeletonBox, ProfileHeaderSkeleton, ContentSkeleton,
  PersonalInfoSkeleton, MyChildrenSkeleton, SafeVaultSkeleton,
  MyPostsSkeleton, MyTipsSkeleton
} from '@/components/ui/Skeleton';
import type { UserProfile } from '@/lib/data';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 900));
        const res = await fetch('/api/user-profile');
        if (!res.ok) {
          if (res.status === 404) return;
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="profile-page-bg min-h-[100dvh]">
      <ToastProvider>
        <ConfettiProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ProfileShell
              user={user!}
              onUserUpdate={setUser}
            />
            <BackToTop />
          </motion.div>
        </ConfettiProvider>
      </ToastProvider>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="profile-page-bg min-h-[100dvh] p-4 pb-20 lg:p-8">
      <div className="mx-auto grid max-w-[900px] gap-5 lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* Left Sidebar Skeleton */}
        <div className="h-fit">
          <ProfileHeaderSkeleton />
        </div>

        {/* Right Content Skeleton */}
        <div className="min-w-0">
          {/* Tab strip skeleton */}
          <div className="mb-4 grid grid-cols-5 gap-1.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBox key={i} width="100%" height="72px" borderRadius="var(--radius-md)" />
            ))}
          </div>
          {/* Content skeleton */}
          <ContentSkeleton />
        </div>
      </div>
    </div>
  );
}
