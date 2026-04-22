'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileHeader from '@/components/ProfileHeader';
import TabStrip, { TabId } from '@/components/TabStrip';
import PersonalInfo from '@/components/tabs/PersonalInfo';
import MyPosts from '@/components/tabs/MyPosts';
import MyTips from '@/components/tabs/MyTips';
import MyChildren from '@/components/tabs/MyChildren';
import SafeVault from '@/components/tabs/SafeVault';
import PrivacySafety from '@/components/tabs/PrivacySafety';
import Community from '@/components/tabs/Community';
import Wellbeing from '@/components/tabs/Wellbeing';
import Journey from '@/components/tabs/Journey';
import {
  ProfileHeaderSkeleton,
  ContentSkeleton,
  PersonalInfoSkeleton,
  MyChildrenSkeleton,
  SafeVaultSkeleton,
  MyPostsSkeleton,
  MyTipsSkeleton,
} from '@/components/ui/Skeleton';
import BackToTop from '@/components/ui/BackToTop';
import ProfileShell from '@/components/profile/ProfileShell';
import { ToastProvider } from '@/components/ui/ToastContext';
import { ConfettiProvider } from '@/components/ui/ConfettiContext';
import { mockUser, mockPosts, mockTips, mockChildren, mockDocuments } from '@/lib/data';
import type { UserProfile } from '@/lib/data';

/** Map each tab to its skeleton — tabs without a specific skeleton use ContentSkeleton */
const tabSkeletonMap: Partial<Record<TabId, React.FC>> = {
  personal: PersonalInfoSkeleton,
  children: MyChildrenSkeleton,
  vault: SafeVaultSkeleton,
  posts: MyPostsSkeleton,
  tips: MyTipsSkeleton,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditRequested, setIsEditRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTabLoading, setIsTabLoading] = useState(false);

  // Initial page load skeleton
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Brief skeleton on tab switch to smooth the transition
  const prevTabRef = React.useRef<TabId>(activeTab);
  React.useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      setIsTabLoading(true);
      const timer = setTimeout(() => {
        setIsTabLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleEditProfile = () => {
    setActiveTab('personal');
    setIsEditRequested(true);
  };

  const handleAvatarChange = (avatar: string | null) => {
    setUser((current) => ({ ...current, avatar }));
  };

  if (isLoading) {
    return (
      <main className="profile-page-bg min-h-dvh">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <ProfileHeaderSkeleton />
          <ContentSkeleton />
        </div>
      </main>
    );
  }

  // Resolve the skeleton for the active tab
  const TabSkeleton = tabSkeletonMap[activeTab] || ContentSkeleton;

  return (
    <ToastProvider>
      <ConfettiProvider>
        <ProfileShell
      sidebar={
        <ProfileHeader
          user={user}
          onEdit={handleEditProfile}
          onNavigate={setActiveTab}
          onAvatarChange={handleAvatarChange}
        />
      }
      navigation={<TabStrip activeTab={activeTab} onChange={setActiveTab} />}
    >
      <div className="relative">
        {/* Ambient Glow behind tab content */}
        <div className="absolute -inset-4 z-0 bg-radial-gradient from-[rgba(248,200,220,0.15)] via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-sm)] border border-[var(--cream-dark)] sm:p-4 lg:p-5">
          <AnimatePresence mode="wait">
            {isTabLoading ? (
              <motion.div
                key={`skeleton-${activeTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] as any }}
              >
                <TabSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] as any }}
              >
                {activeTab === 'personal' && (
                  <PersonalInfo
                    user={user}
                    onUpdate={setUser}
                    initialEditMode={isEditRequested}
                    onEditConsumed={() => setIsEditRequested(false)}
                  />
                )}
                {activeTab === 'posts' && <MyPosts posts={mockPosts} />}
                {activeTab === 'tips' && <MyTips tips={mockTips} />}
                {activeTab === 'children' && <MyChildren childrenList={mockChildren} />}
                {activeTab === 'vault' && <SafeVault documents={mockDocuments} />}
                {activeTab === 'privacy' && <PrivacySafety />}
                {activeTab === 'community' && <Community />}
                {activeTab === 'wellbeing' && <Wellbeing />}
                {activeTab === 'journey' && <Journey />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <BackToTop />
    </ProfileShell>
    </ConfettiProvider>
    </ToastProvider>
  );
}
