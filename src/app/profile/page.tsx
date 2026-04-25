'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastProvider } from '@/components/ui/ToastContext';
import { ConfettiProvider } from '@/components/ui/ConfettiContext';
import ProfileShell from '@/components/profile/ProfileShell';
import BackToTop from '@/components/ui/BackToTop';
import {
  SkeletonBox, ProfileHeaderSkeleton, ContentSkeleton,
} from '@/components/ui/Skeleton';
import { mockUser } from '@/lib/data';
import type { UserProfile } from '@/lib/data';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay, then load existing mock data
    const timer = setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="profile-page-bg flex min-h-[100dvh] items-center justify-center p-4">
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-featured)]">
          <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
          <button
            onClick={() => window.location.reload()}
            className="rounded-[var(--radius-md)] bg-[var(--blush)] px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
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
              user={user}
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
        <div className="h-fit">
          <ProfileHeaderSkeleton />
        </div>
        <div className="min-w-0">
          <div className="mb-4 grid grid-cols-5 gap-1.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBox key={i} width="100%" height="72px" borderRadius="var(--radius-md)" />
            ))}
          </div>
          <ContentSkeleton />
        </div>
      </div>
    </div>
  );
}