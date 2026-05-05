'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token');
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const json = await res.json();

        if (json.success) {
          setStatus('success');
          setMessage('Your email has been verified!');
          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push('/login?verified=true');
          }, 2000);
        } else {
          setStatus('error');
          setMessage(json.message || 'Verification failed');
        }
      } catch {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    }

    verify();
  }, [token, router]);

  return (
    <div className="profile-page-bg flex min-h-[100dvh] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-[420px] text-center"
      >
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--blush-soft)] text-3xl shadow-[var(--shadow-elevated)]">
            🐘
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Email Verification
          </h1>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-elevated)]">
          {status === 'verifying' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <svg className="mb-4 h-8 w-8 animate-spin text-[var(--blush)]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-[var(--text-secondary)]">{message}</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sage-soft)] text-xl">
                ✓
              </div>
              <h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                Verified!
              </h2>
              <p className="mb-4 text-sm text-[var(--text-muted)]">
                {message}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Redirecting you to login...
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--error-soft)] text-xl">
                ✕
              </div>
              <h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                Verification Failed
              </h2>
              <p className="mb-4 text-sm text-[var(--text-muted)]">{message}</p>
              <Link
                href="/login"
                className="inline-block rounded-[var(--radius-md)] bg-[var(--blush)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--blush-deep)]"
              >
                Go to login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
