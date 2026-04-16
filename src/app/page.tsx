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
import { mockUser, mockPosts, mockTips, mockChildren, mockDocuments } from '@/lib/data';
import type { UserProfile } from '@/lib/data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditRequested, setIsEditRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate network fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEditProfile = () => {
    setActiveTab('personal');
    setIsEditRequested(true);
  };

  return (
    <main style={{
      maxWidth: 480,
      margin: '0 auto',
      width: '100%',
      minHeight: '100dvh',
      background: 'var(--bg-card)',
      boxShadow: '0 0 60px rgba(74, 55, 40, 0.08)',
      position: 'relative',
    }}>
      {isLoading ? (
        <>
          <ProfileHeaderSkeleton />
          <ContentSkeleton />
        </>
      ) : (
        <>
          <ProfileHeader user={user} onEdit={handleEditProfile} onNavigate={setActiveTab} />
          <TabStrip activeTab={activeTab} onChange={setActiveTab} />

          <div style={{ background: 'var(--bg-primary)', minHeight: 400 }}>
            {activeTab === 'personal' && (
              <PersonalInfo 
                user={user} 
                onUpdate={setUser} 
                initialEditMode={isEditRequested}
                onEditConsumed={() => setIsEditRequested(false)}
              />
            )}
            {activeTab === 'posts' && (
              <MyPosts posts={mockPosts} />
            )}
            {activeTab === 'tips' && (
              <MyTips tips={mockTips} />
            )}
            {activeTab === 'children' && (
              <MyChildren childrenList={mockChildren} />
            )}
            {activeTab === 'vault' && (
              <SafeVault documents={mockDocuments} />
            )}
            {activeTab === 'privacy' && (
              <PrivacySafety />
            )}
            {activeTab === 'community' && (
              <Community />
            )}
            {activeTab === 'wellbeing' && (
              <Wellbeing />
            )}
            {activeTab === 'journey' && (
              <Journey />
            )}
          </div>
          <BackToTop />
        </>
      )}
    </main>
  );
}
