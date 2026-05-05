'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, LogOut, User } from 'lucide-react';

interface FeedPost {
  id: string;
  content: string;
  caption: string;
  privacy: string;
  isAnonymous: boolean;
  authorName: string | null;
  authorAvatar: string | null;
  createdAt: string;
  _count: { comments: number; reactions: number };
  hasReacted: boolean;
}

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userName, setUserName] = useState('Mumma');

  useEffect(() => {
    loadPosts(1);
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const res = await fetch('/api/auth/me');
      const json = await res.json();
      if (json.success) {
        setUserName(json.data.name || 'Mumma');
      }
    } catch {
      // silent
    }
  }

  async function loadPosts(pageNum: number) {
    try {
      const res = await fetch(`/api/feed?page=${pageNum}&limit=10`);
      const json = await res.json();
      if (json.success) {
        const newPosts = json.data.posts || [];
        if (pageNum === 1) {
          setPosts(newPosts);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }
        setHasMore(newPosts.length === 10);
      }
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newPost.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: newPost.trim(),
          privacy: isAnonymous ? 'private' : 'public',
        }),
      });

      const json = await res.json();

      if (json.success) {
        const created: FeedPost = {
          id: json.data.id,
          content: json.data.caption,
          caption: json.data.caption,
          privacy: json.data.privacy,
          isAnonymous,
          authorName: isAnonymous ? null : userName,
          authorAvatar: null,
          createdAt: 'Just now',
          _count: { comments: 0, reactions: 0 },
          hasReacted: false,
        };
        setPosts((prev) => [created, ...prev]);
        setNewPost('');
        setIsAnonymous(false);
      }
    } catch {
      // silent
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleReaction(postId: string) {
    try {
      const res = await fetch(`/api/posts/${postId}/react`, {
        method: 'POST',
      });
      const json = await res.json();
      if (json.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  hasReacted: json.data.reacted,
                  _count: {
                    ...p._count,
                    reactions: json.data.reacted
                      ? p._count.reactions + 1
                      : Math.max(0, p._count.reactions - 1),
                  },
                }
              : p
          )
        );
      }
    } catch {
      // silent
    }
  }

  function timeAgo(dateStr: string): string {
    if (dateStr === 'Just now') return 'Just now';
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch {
      router.push('/login');
    }
  }

  return (
    <div className="profile-page-bg min-h-[100dvh]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[680px] items-center justify-between px-4 py-3">
          <Link href="/feed" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--blush-soft)] text-lg">
              🐘
            </span>
            <span className="font-bold text-[var(--text-primary)]">MummaElephant</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--blush-soft)]"
              title="Profile"
            >
              <User size={18} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--error-soft)] hover:text-[var(--status-error)]"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[680px] px-4 py-6">
        {/* Post Composer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-resting)]"
        >
          <form onSubmit={handleSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={`What's on your mind, ${userName}?`}
              maxLength={500}
              rows={3}
              className="w-full resize-none rounded-[var(--radius-md)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--blush-glow)]"
            />
            <div className="mt-3 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border)] text-[var(--blush)] accent-[var(--blush)]"
                />
                Post anonymously
              </label>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-muted)]">
                  {newPost.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!newPost.trim() || isSubmitting}
                  className="flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--blush)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-resting)] transition-all hover:bg-[var(--blush-deep)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <>
                      <Send size={14} />
                      Share
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Posts */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : posts.length === 0 ? (
          <EmptyFeed />
        ) : (
          <AnimatePresence>
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="mb-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-resting)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
              >
                {/* Author */}
                <div className="mb-3 flex items-center gap-3">
                  {post.isAnonymous || !post.authorName ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[var(--text-muted)]">
                      🐘
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--blush-soft)] text-sm font-bold text-[var(--blush-deep)]">
                      {post.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {post.isAnonymous || !post.authorName ? 'Anonymous' : post.authorName}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {timeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <Link href={`/post/${post.id}`} className="block">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-primary)]">
                    {post.caption}
                  </p>
                </Link>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-5 border-t border-[var(--border-light)] pt-3">
                  <button
                    onClick={() => toggleReaction(post.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      post.hasReacted
                        ? 'text-[var(--status-error)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--status-error)]'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={post.hasReacted ? 'currentColor' : 'none'}
                    />
                    <span>{post._count.reactions}</span>
                  </button>
                  <Link
                    href={`/post/${post.id}`}
                    className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--blush-deep)]"
                  >
                    <MessageCircle size={18} />
                    <span>{post._count.comments}</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        )}

        {/* Load More */}
        {!isLoading && hasMore && posts.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                loadPosts(nextPage);
              }}
              className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card-hover)]"
            >
              Load more
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="skeleton h-10 w-10 rounded-full" />
            <div>
              <div className="skeleton mb-1 h-4 w-24" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
          <div className="skeleton mb-2 h-4 w-full" />
          <div className="skeleton mb-2 h-4 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function EmptyFeed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 text-center"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--blush-soft)] text-3xl">
        🌸
      </div>
      <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
        Be the first to share
      </h3>
      <p className="text-sm text-[var(--text-muted)]">
        Your thoughts could help another mum feel less alone.
      </p>
    </motion.div>
  );
}
