'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from '../ProfileHeader';
import TabStrip, { type TabId } from '../TabStrip';
import {
  PersonalInfo, MyPosts, MyTips, MyChildren,
  SafeVault, PrivacySafety, Community, Wellbeing, Journey
} from '../tabs';
import { type UserProfile } from '@/lib/data';

interface ProfileShellProps {
  user: UserProfile;
  onUserUpdate: (user: UserProfile) => void;
}

export default function ProfileShell({ user, onUserUpdate }: ProfileShellProps) {
  const [activeTab, setActiveTab] = useState<TabId>('personal');

  const handleNavigate = (tab: TabId) => setActiveTab(tab);

  const renderTab = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo user={user} onUpdate={onUserUpdate} />;
      case 'posts':
        return <MyPosts posts={user.posts} />;
      case 'tips':
        return <MyTips tips={user.tips} />;
      case 'children':
        return <MyChildren childrenList={user.children} />;
      case 'vault':
        return <SafeVault documents={user.vaultDocuments} />;
      case 'privacy':
        return <PrivacySafety />;
      case 'community':
        return <Community />;
      case 'wellbeing':
        return <Wellbeing />;
      case 'journey':
        return <Journey />;
      default:
        return <PersonalInfo user={user} onUpdate={onUserUpdate} />;
    }
  };

  return (
    <div className="mx-auto grid max-w-[900px] gap-5 p-4 pb-20 lg:grid-cols-[340px_1fr] lg:gap-8 lg:p-8 lg:pb-8">
      {/* Left Sidebar — Profile Header */}
      <div className="h-fit">
        <ProfileHeader
          user={user}
          onEdit={() => setActiveTab('personal')}
          onNavigate={handleNavigate}
          onAvatarChange={(avatar) => onUserUpdate({ ...user, avatar: avatar || '' })}
        />
      </div>

      {/* Right Content Area */}
      <main className="min-w-0">
        {/* Tab Navigation */}
        <div className="mb-4 lg:mb-5">
          <TabStrip activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Tab Content with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] as any }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
