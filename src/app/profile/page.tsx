'use client';

import React, { useState } from 'react';
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
import { ProfileHeaderSkeleton, ContentSkeleton } from '@/components/ui/Skeleton';
import BackToTop from '@/components/ui/BackToTop';
import ProfileShell from '@/components/profile/ProfileShell';
import { mockUser, mockPosts, mockTips, mockChildren, mockDocuments } from '@/lib/data';
import type { UserProfile } from '@/lib/data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditRequested, setIsEditRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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

  return (
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
      <div className="rounded-[var(--radius-lg)] bg-[var(--bg-primary)] p-3 sm:p-4 lg:p-5">
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
      </div>
      <BackToTop />
    </ProfileShell>
  );
}
