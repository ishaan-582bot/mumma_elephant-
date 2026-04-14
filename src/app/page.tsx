'use client';
import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import TabStrip, { TabId } from '@/components/TabStrip';
import PersonalInfo from '@/components/tabs/PersonalInfo';
import MyPosts from '@/components/tabs/MyPosts';
import MyTips from '@/components/tabs/MyTips';
import MyChildren from '@/components/tabs/MyChildren';
import SafeVault from '@/components/tabs/SafeVault';
import { mockUser, mockPosts, mockTips, mockChildren, mockDocuments } from '@/lib/data';
import type { UserProfile } from '@/lib/data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [user, setUser] = useState<UserProfile>(mockUser);

  const handleEditProfile = () => {
    setActiveTab('personal');
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
      <ProfileHeader user={user} onEdit={handleEditProfile} />
      <TabStrip activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ background: 'var(--bg-primary)', minHeight: 400 }}>
        {activeTab === 'personal' && (
          <PersonalInfo user={user} onUpdate={setUser} />
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
      </div>
    </main>
  );
}
