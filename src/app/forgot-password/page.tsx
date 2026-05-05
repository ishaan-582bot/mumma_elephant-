'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const json = await res.json();

      if (json.success) {
        setIsSubmitted(true);
      } else {
        setError(json.message || 'Something went wrong');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="profile-page-bg flex min-h-[100dvh] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--blush-soft)] text-3xl shadow-[var(--shadow-elevated)]">
            🐘
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Reset Password
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            We&apos;ll send you a link to reset your password
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-elevated)] sm:p-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sage-soft)] text-xl">
                ✉️
              </div>
              <h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                Check your inbox
              </h2>
              <p className="mb-4 text-sm text-[var(--text-muted)]">
                If that email is registered, you&apos;ll receive a reset link shortly.
              </p>
              <Link
                href="/login"
                className="inline-block rounded-[var(--radius-md)] bg-[var(--blush)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--blush-deep)]"
              >
                Back to login
              </Link>
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 rounded-[var(--radius-md)] border border-[var(--status-error)] bg-[var(--error-soft)] p-3 text-sm text-[var(--status-error)]"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--blush-glow)]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--blush)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-resting)] transition-all hover:bg-[var(--blush-deep)] hover:shadow-[var(--shadow-elevated)] disabled:opacity-60"
                >
                  {isLoading ? (
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {!isSubmitted && (
          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Remember your password?{' '}
            <Link
              href="/login"
              className="font-medium text-[var(--blush-deep)] transition-colors hover:text-[var(--blush)]"
            >
              Log in
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
