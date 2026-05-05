'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ArrowLeft, Send } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  isAnonymous: boolean;
  authorName: string | null;
  authorAvatar: string | null;
  createdAt: string;
}

interface PostDetail {
  id: string;
  caption: string;
  privacy: string;
  isAnonymous: boolean;
  authorName: string | null;
  authorAvatar: string | null;
  createdAt: string;
  _count: { comments: number; reactions: number };
  hasReacted: boolean;
  comments: Comment[];
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  async function loadPost() {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      const json = await res.json();
      if (json.success) {
        setPost(json.data);
      } else {
        setError('Post not found');
      }
    } catch {
      setError('Failed to load post');
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleReaction() {
    if (!post) return;
    try {
      const res = await fetch(`/api/posts/${post.id}/react`, {
        method: 'POST',
      });
      const json = await res.json();
      if (json.success) {
        setPost((prev) =>
          prev
            ? {
                ...prev,
                hasReacted: json.data.reacted,
                _count: {
                  ...prev._count,
                  reactions: json.data.reacted
                    ? prev._count.reactions + 1
                    : Math.max(0, prev._count.reactions - 1),
                },
              }
            : null
        );
      }
    } catch {
      // silent
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting || !post) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment.trim(),
          isAnonymous,
        }),
      });

      const json = await res.json();

      if (json.success && post) {
        const comment: Comment = {
          id: json.data.id,
          content: json.data.content,
          isAnonymous: json.data.isAnonymous,
          authorName: json.data.authorName,
          authorAvatar: null,
          createdAt: 'Just now',
        };
        setPost({
          ...post,
          comments: [...post.comments, comment],
          _count: { ...post._count, comments: post._count.comments + 1 },
        });
        setNewComment('');
        setIsAnonymous(false);
      }
    } catch {
      // silent
    } finally {
      setIsSubmitting(false);
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

  if (isLoading) {
    return (
      <div className="profile-page-bg flex min-h-[100dvh] items-center justify-center">
        <div className="skeleton h-8 w-8 rounded-full" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="profile-page-bg flex min-h-[100dvh] flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
          {error || 'Post not found'}
        </h2>
        <Link
          href="/feed"
          className="flex items-center gap-2 text-sm text-[var(--blush-deep)] hover:text-[var(--blush)]"
        >
          <ArrowLeft size={16} />
          Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page-bg min-h-[100dvh]">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[680px] items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.push('/feed')}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--blush-soft)]"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-semibold text-[var(--text-primary)]">Post</h1>
        </div>
      </nav>

      <main className="mx-auto max-w-[680px] px-4 py-6">
        {/* Post */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-resting)]"
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
              <p className="text-xs text-[var(--text-muted)]">{timeAgo(post.createdAt)}</p>
            </div>
          </div>

          {/* Content */}
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-primary)]">
            {post.caption}
          </p>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-5 border-t border-[var(--border-light)] pt-3">
            <button
              onClick={toggleReaction}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                post.hasReacted
                  ? 'text-[var(--status-error)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--status-error)]'
              }`}
            >
              <Heart size={18} fill={post.hasReacted ? 'currentColor' : 'none'} />
              <span>{post._count.reactions}</span>
            </button>
            <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <MessageCircle size={18} />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
            Comments ({post._count.comments})
          </h3>

          {/* Comment List */}
          <div className="mb-6 space-y-3">
            {post.comments.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--text-muted)]">
                No comments yet. Be the first to share a supportive word.
              </p>
            ) : (
              post.comments.map((comment, i) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-[var(--radius-lg)] border border-[var(--border-light)] bg-[var(--surface)] p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    {comment.isAnonymous || !comment.authorName ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--cream-deep)] text-xs text-[var(--text-muted)]">
                        🐘
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sage-soft)] text-xs font-bold text-[var(--sage-deep)]">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {comment.isAnonymous || !comment.authorName
                        ? 'Anonymous'
                        : comment.authorName}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="pl-9 text-sm leading-relaxed text-[var(--text-primary)]">
                    {comment.content}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Comment Composer */}
          <form
            onSubmit={handleComment}
            className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-resting)]"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a supportive comment..."
              rows={2}
              className="w-full resize-none rounded-[var(--radius-md)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--blush-glow)]"
            />
            <div className="mt-3 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border)] accent-[var(--blush)]"
                />
                Comment anonymously
              </label>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
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
                    Post comment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
