'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, LayoutList, Plus, Lock, Globe, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import BottomSheet from '../ui/BottomSheet';
import TabContent from '../ui/TabContent';
import type { Post } from '@/lib/data';
import { typo } from '@/lib/typography';

interface MyPostsProps {
  posts: Post[];
}

const PLACEHOLDER_EMOJIS = ['🌸', '🛁', '🌿', '🎀', '✨', '💪'] as const;

function PostGridPlaceholder({ index, emojiSize }: { index: number; emojiSize: number }) {
  const emoji = PLACEHOLDER_EMOJIS[index % 6];
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <span style={{ fontSize: emojiSize, lineHeight: 1 }}>{emoji}</span>
      <Camera
        size={24}
        className="pointer-events-none absolute bottom-1 right-1 opacity-30 text-[var(--text-primary)]"
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

export default function MyPosts({ posts }: MyPostsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<string | null>(null);

  const postColors = [
    'linear-gradient(135deg, var(--blush-light), var(--mauve-light))',
    'linear-gradient(135deg, var(--sage-light), var(--sky-blue-light))',
    'linear-gradient(135deg, var(--peach-light), var(--terracotta-light))',
    'linear-gradient(135deg, var(--lavender-light), var(--blush-light))',
    'linear-gradient(135deg, var(--cream-dark), var(--sage-light))',
    'linear-gradient(135deg, var(--sky-blue-light), var(--lavender-light))',
  ];

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<Camera size={48} color="var(--blush-dark)" strokeWidth={1.5} />}
        title="Capture the beautiful chaos, mum"
        subtitle="Your journey is unique and worth holding onto. Add photos to create a private timeline of your motherhood story."
        hint="Documenting moments helps you reflect on your beautiful journey and see how far you've come."
        action={{ label: 'Upload Photo', onClick: () => {} }}
      />
    );
  }

  return (
    <div className="fade-in-up">
      <TabContent>
      {/* View toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span className={typo.subheading}>
          {posts.length} moments
        </span>
        <div style={{ display: 'flex', gap: 4, background: 'var(--cream-dark)', borderRadius: 'var(--radius-sm)', padding: 3 }}>
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            style={{
              padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: 'none',
              background: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent',
              cursor: 'pointer', color: viewMode === 'grid' ? 'var(--blush-dark)' : 'var(--text-muted)',
              boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
              display: 'flex', alignItems: 'center',
            }}
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => setViewMode('feed')}
            aria-label="Feed view"
            style={{
              padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: 'none',
              background: viewMode === 'feed' ? 'var(--bg-card)' : 'transparent',
              cursor: 'pointer', color: viewMode === 'feed' ? 'var(--blush-dark)' : 'var(--text-muted)',
              boxShadow: viewMode === 'feed' ? 'var(--shadow-sm)' : 'none',
              display: 'flex', alignItems: 'center',
            }}
          >
            <LayoutList size={16} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedPost(i)}
              onContextMenu={(e) => { e.preventDefault(); setContextMenu(post.id); }}
              style={{
                aspectRatio: '1',
                background: postColors[i % postColors.length],
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              {['🌸', '🛁', '🌿', '🎀', '✨', '💪'][i % 6]}
              
              {/* Privacy badge */}
              <div style={{
                position: 'absolute', top: 6, right: 6,
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {post.privacy === 'private' ? <Lock size={11} color="var(--text-secondary)" /> : <Globe size={11} color="var(--sage-dark)" />}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Feed View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedPost(i)}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            >
              <div style={{
                height: 200,
                background: postColors[i % postColors.length],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PostGridPlaceholder index={i} emojiSize={48} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className={`flex-1 ${typo.body}`}>
                    {post.caption}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                    {post.privacy === 'private' ? <Lock size={13} color="var(--text-muted)" /> : <Globe size={13} color="var(--sage-dark)" />}
                  </div>
                </div>
                <p className={`mt-1.5 ${typo.caption}`}>{post.createdAt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--blush), var(--blush-dark))',
          border: 'none',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          zIndex: 50,
        }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </motion.button>

      {/* Post Preview Modal */}
      <AnimatePresence>
        {selectedPost !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(30, 20, 15, 0.92)',
              zIndex: 5000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute', top: 16, right: 16, width: 44, height: 44,
                borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 10,
              }}
            >
              <X size={20} color="white" />
            </button>

            {/* Navigation */}
            {selectedPost > 0 && (
              <button
                onClick={() => setSelectedPost(selectedPost - 1)}
                style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ChevronLeft size={20} color="white" />
              </button>
            )}
            {selectedPost < posts.length - 1 && (
              <button
                onClick={() => setSelectedPost(selectedPost + 1)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ChevronRight size={20} color="white" />
              </button>
            )}

            <motion.div
              key={selectedPost}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                width: '85vw',
                maxWidth: 400,
                aspectRatio: '1',
                background: postColors[selectedPost % postColors.length],
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PostGridPlaceholder index={selectedPost} emojiSize={72} />
            </motion.div>
            <p className="mx-auto mt-5 max-w-md px-6 text-center text-base font-medium leading-relaxed text-white">
              {posts[selectedPost].caption}
            </p>
            <p className="mt-2 text-xs font-medium text-white/50">
              {posts[selectedPost].createdAt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context Menu */}
      <BottomSheet
        isOpen={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        title="Post Options"
      >
        {['Edit Post', 'Delete Post', 'Change Privacy', 'Share'].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setContextMenu(null)}
            className="w-full cursor-pointer border-none border-b border-[var(--cream-dark)] bg-transparent py-3.5 text-left text-sm font-semibold"
            style={{
              color: opt === 'Delete Post' ? 'var(--terracotta)' : 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
          >
            {opt}
          </button>
        ))}
      </BottomSheet>
      </TabContent>
    </div>
  );
}
