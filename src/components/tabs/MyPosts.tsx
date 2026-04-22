'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, LayoutList, Plus, Lock, Globe, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import BottomSheet from '../ui/BottomSheet';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import type { Post } from '@/lib/data';
import { typo } from '@/lib/typography';

interface MyPostsProps {
  posts: Post[];
}

const PLACEHOLDER_EMOJIS = ['\u{1F338}', '\u{1F6C1}', '\u{1F33F}', '\u{1F380}', '\u{2728}', '\u{1F4AA}'] as const;

function PostGridPlaceholder({ index, emojiSize }: { index: number; emojiSize: number }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <span style={{ fontSize: emojiSize, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }}>
        {PLACEHOLDER_EMOJIS[index % 6]}
      </span>
      <Camera size={22} className="pointer-events-none absolute bottom-2 right-2 opacity-20 text-[var(--text-primary)]" strokeWidth={1.5} aria-hidden />
    </div>
  );
}

export default function MyPosts({ posts }: MyPostsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<string | null>(null);

  const postColors = [
    'linear-gradient(135deg, #FDE8F0, #E8DAE7)',
    'linear-gradient(135deg, #D4E8D0, #C8DDF0)',
    'linear-gradient(135deg, #F5D9C8, #F0C9B8)',
    'linear-gradient(135deg, #E8E0F0, #FDE8F0)',
    'linear-gradient(135deg, #F5EDE6, #D4E8D0)',
    'linear-gradient(135deg, #C8DDF0, #E8E0F0)',
  ];

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<Camera size={44} className="text-[var(--blush-deep)]" strokeWidth={1.5} />}
        title="Capture the beautiful chaos, mum"
        subtitle="Your journey is unique and worth holding onto. Add photos to create a private timeline of your motherhood story."
        hint="Documenting moments helps you reflect on your beautiful journey and see how far you've come."
        action={{ label: 'Upload Photo', onClick: () => { } }}
      />
    );
  }

  return (
    <div className="fade-in-up">
      <TabContent>
        {/* View toggle */}
        <motion.div variants={tabViewVariants.item} className="mb-4 flex items-center justify-between px-1">
          <span className={`${typo.subheading} font-semibold`}>
            {posts.length} {posts.length === 1 ? 'moment' : 'moments'}
          </span>
          <div className="flex gap-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--cream-deep)]/50 p-1 shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`flex items-center justify-center rounded-[var(--radius-sm)] px-3 py-1.5 transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white text-[var(--blush-deep)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode('feed')}
              aria-label="Feed view"
              className={`flex items-center justify-center rounded-[var(--radius-sm)] px-3 py-1.5 transition-all duration-200 ${
                viewMode === 'feed'
                  ? 'bg-white text-[var(--blush-deep)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <LayoutList size={15} />
            </button>
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <motion.div
            variants={tabViewVariants.item}
            className="grid grid-cols-3 gap-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-resting)]"
          >
            {posts.map((post, i) => (
              <motion.button
                key={post.id}
                whileHover={{ opacity: 0.88, scale: 0.97 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedPost(i)}
                onContextMenu={(e) => { e.preventDefault(); setContextMenu(post.id); }}
                className="relative flex aspect-square cursor-pointer items-center justify-center text-3xl transition-all"
                style={{ background: postColors[i % postColors.length] }}
              >
                <span className="drop-shadow-sm">{['\u{1F338}', '\u{1F6C1}', '\u{1F33F}', '\u{1F380}', '\u{2728}', '\u{1F4AA}'][i % 6]}</span>
                {/* Privacy badge */}
                <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
                  {post.privacy === 'private'
                    ? <Lock size={11} className="text-[var(--text-muted)]" />
                    : <Globe size={11} className="text-[var(--sage-deep)]" />
                  }
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Feed View */
          <motion.div variants={tabViewVariants.item} className="flex flex-col gap-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPost(i)}
                className="group cursor-pointer overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-elevated)] transition-shadow duration-300 hover:shadow-[var(--shadow-featured)]"
              >
                <div
                  className="flex h-56 items-center justify-center shadow-inner"
                  style={{ background: postColors[i % postColors.length] }}
                >
                  <PostGridPlaceholder index={i} emojiSize={64} />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className={`flex-1 font-medium italic leading-relaxed ${typo.body}`}>
                      &ldquo;{post.caption}&rdquo;
                    </p>
                    <div className="mt-1 flex grow-0 flex-col items-end gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[var(--text-muted)] shadow-sm">
                        {post.privacy === 'private' ? <Lock size={13} /> : <Globe size={13} className="text-[var(--sage-deep)]" />}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-[var(--border-light)] pt-3">
                    <p className={`font-semibold italic text-[var(--text-muted)] ${typo.caption}`}>{post.createdAt}</p>
                    <span className="text-[11px] font-bold text-[var(--blush-deep)] underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                      View Details
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.88 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[var(--blush)] to-[var(--blush-deep)] text-white shadow-[var(--shadow-featured)] transition-shadow hover:shadow-[var(--shadow-glow-blush)]"
        >
          <Plus size={26} strokeWidth={2.5} />
        </motion.button>

        {/* Post Preview Modal */}
        <AnimatePresence>
          {selectedPost !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-[var(--text-primary)]/92 backdrop-blur-lg"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
              >
                <X size={22} />
              </button>

              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4 sm:px-10">
                <button
                  disabled={selectedPost === 0}
                  onClick={(e) => { e.stopPropagation(); setSelectedPost(selectedPost - 1); }}
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-90 ${selectedPost === 0 ? 'invisible' : 'visible'}`}
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  disabled={selectedPost === posts.length - 1}
                  onClick={(e) => { e.stopPropagation(); setSelectedPost(selectedPost + 1); }}
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-90 ${selectedPost === posts.length - 1 ? 'invisible' : 'visible'}`}
                >
                  <ChevronRight size={26} />
                </button>
              </div>

              <motion.div
                key={selectedPost}
                initial={{ scale: 0.82, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.82, y: 24, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="flex aspect-square w-[85vw] max-w-md items-center justify-center rounded-[var(--radius-xl)] shadow-2xl"
                style={{ background: postColors[selectedPost % postColors.length] }}
              >
                <PostGridPlaceholder index={selectedPost} emojiSize={96} />
              </motion.div>

              <div className="mt-8 max-w-md px-10 text-center">
                <p className="text-lg font-bold italic leading-relaxed text-white">
                  &ldquo;{posts[selectedPost].caption}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="text-xs font-extrabold tracking-widest text-white/40 uppercase">
                    {posts[selectedPost].createdAt}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--blush)]">
                    {posts[selectedPost].privacy === 'private' ? <Lock size={11} /> : <Globe size={11} />}
                    {posts[selectedPost].privacy}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Context Menu */}
        <BottomSheet isOpen={contextMenu !== null} onClose={() => setContextMenu(null)} title="Manage Post">
          <div className="flex flex-col gap-1 pb-4">
            {[
              { label: 'Edit Memories', icon: <Plus size={17} /> },
              { label: 'Change Visibility', icon: <Globe size={17} /> },
              { label: 'Share Support', icon: <Camera size={17} /> },
              { label: 'Delete Forever', icon: <X size={17} />, danger: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setContextMenu(null)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-4 py-3.5 text-sm font-bold transition-colors ${
                  opt.danger
                    ? 'text-[var(--status-error)] hover:bg-[var(--error-soft)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--cream-deep)]'
                }`}
              >
                <span className="shrink-0">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </BottomSheet>
      </TabContent>
    </div>
  );
}
