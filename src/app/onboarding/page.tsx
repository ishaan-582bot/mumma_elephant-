'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type OnboardingStep = 1 | 2 | 3;

const STAGE_OPTIONS = [
  { value: 'Expecting', label: 'Expecting', sub: 'pregnant' },
  { value: 'New Mum', label: 'New mum', sub: '0-12 months' },
  { value: 'Toddler Mum', label: 'Toddler mum', sub: '1-3 years' },
  { value: 'Experienced Mum', label: 'Experienced mum', sub: '3+ years' },
  { value: 'Trying to Conceive', label: 'Trying to conceive', sub: '' },
];

const GOAL_OPTIONS = [
  'Feeling isolated or lonely',
  'Looking for parenting advice',
  'Postpartum support',
  'Finding mum friends',
  'Sharing my experience',
  'Just exploring',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>(1);
  const [displayName, setDisplayName] = useState('');
  const [stage, setStage] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        const json = await res.json();
        if (json.success && json.data.name) {
          setDisplayName(json.data.name);
        }
      } catch {
        // silent
      }
    }
    loadUser();
  }, []);

  function toggleGoal(goal: string) {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  async function handleComplete() {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: displayName,
          motherhoodStage: stage,
          onboardingDone: true,
        }),
      });

      const json = await res.json();

      if (json.success) {
        router.push('/feed');
      } else {
        setError(json.message || 'Failed to save profile');
        setIsLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  const progressPercent = (step / 3) * 100;

  return (
    <div className="profile-page-bg flex min-h-[100dvh] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-[480px]"
      >
        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-[var(--text-primary)]">Step {step} of 3</span>
            <span className="text-[var(--text-muted)]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--border-light)]">
            <motion.div
              className="h-full rounded-full bg-[var(--blush)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-elevated)] sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepOne
                key="step1"
                displayName={displayName}
                setDisplayName={setDisplayName}
                stage={stage}
                setStage={setStage}
              />
            )}
            {step === 2 && (
              <StepTwo
                key="step2"
                goals={goals}
                toggleGoal={toggleGoal}
              />
            )}
            {step === 3 && (
              <StepThree
                key="step3"
                displayName={displayName}
                stage={stage}
              />
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-[var(--status-error)]"
            >
              {error}
            </motion.p>
          )}

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as OnboardingStep)}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-primary)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-card-hover)]"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as OnboardingStep)}
                disabled={step === 1 && (!displayName.trim() || !stage)}
                className="ml-auto rounded-[var(--radius-md)] bg-[var(--blush)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-resting)] transition-all hover:bg-[var(--blush-deep)] hover:shadow-[var(--shadow-elevated)] disabled:opacity-50 disabled:hover:shadow-none"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className="ml-auto flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--blush)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-resting)] transition-all hover:bg-[var(--blush-deep)] hover:shadow-[var(--shadow-elevated)] disabled:opacity-60"
              >
                {isLoading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  'Go to my feed'
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Step 1: About You ─── */
function StepOne({
  displayName,
  setDisplayName,
  stage,
  setStage,
}: {
  displayName: string;
  setDisplayName: (v: string) => void;
  stage: string;
  setStage: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-1 text-xl font-bold text-[var(--text-primary)]">About You</h2>
      <p className="mb-6 text-sm text-[var(--text-muted)]">
        Let&apos;s personalise your experience
      </p>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          What do you prefer to be called?
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your display name"
          className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--blush-glow)]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          Your motherhood stage
        </label>
        <div className="flex flex-wrap gap-2">
          {STAGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setStage(option.value)}
              className={`rounded-[var(--radius-full)] px-4 py-2.5 text-sm font-medium transition-all ${
                stage === option.value
                  ? 'bg-[var(--blush)] text-white shadow-[var(--shadow-glow-blush)]'
                  : 'border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--border-focus)] hover:bg-[var(--blush-soft)]'
              }`}
            >
              {option.label}
              {option.sub && (
                <span className="ml-1 opacity-70">({option.sub})</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Step 2: What brings you here? ─── */
function StepTwo({
  goals,
  toggleGoal,
}: {
  goals: string[];
  toggleGoal: (g: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-1 text-xl font-bold text-[var(--text-primary)]">
        What brings you here?
      </h2>
      <p className="mb-6 text-sm text-[var(--text-muted)]">
        Select all that apply — this helps us tailor your experience
      </p>

      <div className="flex flex-wrap gap-2">
        {GOAL_OPTIONS.map((goal) => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={`rounded-[var(--radius-full)] px-4 py-2.5 text-sm font-medium transition-all ${
              goals.includes(goal)
                ? 'bg-[var(--blush)] text-white shadow-[var(--shadow-glow-blush)]'
                : 'border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--border-focus)] hover:bg-[var(--blush-soft)]'
            }`}
          >
            {goals.includes(goal) && <span className="mr-1">✓</span>}
            {goal}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Step 3: You're all set ─── */
function StepThree({
  displayName,
  stage,
}: {
  displayName: string;
  stage: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--blush-soft)] text-4xl shadow-[var(--shadow-glow-blush)]"
      >
        🐘
      </motion.div>

      <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
        You&apos;re all set, {displayName || 'Mumma'}!
      </h2>

      <p className="mb-1 text-sm text-[var(--text-secondary)]">
        {stage && (
          <>
            <span className="inline-block rounded-full bg-[var(--blush-soft)] px-3 py-1 text-xs font-medium text-[var(--blush-deep)]">
              {stage}
            </span>
          </>
        )}
      </p>

      <p className="mt-4 text-[var(--text-muted)]">
        You&apos;re not alone. MummaElephant is here.
      </p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        A safe space to share, connect, and grow together.
      </p>
    </motion.div>
  );
}
