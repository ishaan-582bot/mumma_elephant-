/**
 * Six-level typographic scale — Tailwind utilities only (no arbitrary text-[npx]).
 * Weight tiers: 800 displayExtrabold (two call sites only) → 700 bold → 600 semibold → 500 medium.
 */
export const typo = {
  /** 800 extrabold — ProfileHeader user name + Wellbeing main prompt only */
  displayExtrabold: 'text-3xl font-extrabold tracking-tight text-[var(--text-primary)]',

  /** 700 bold — hero page titles (Journey, Community, Privacy, SafeVault lock, Wellbeing disabled) */
  pageHeroBold: 'text-2xl font-bold tracking-tight text-[var(--text-primary)]',

  /** 700 bold — card titles, major section headers */
  heading: 'text-lg font-bold text-[var(--text-primary)]',

  /** 700 bold — profile stat row labels (Posts / Tips / Children) */
  statLabel: 'text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]',

  /** 600 semibold — section intros, card subtitles */
  subheading: 'text-sm font-semibold text-[var(--text-secondary)]',

  /** 600 semibold — read-only profile field values */
  fieldValue: 'text-sm font-semibold leading-relaxed text-[var(--text-primary)]',

  /** 500 medium — primary body */
  body: 'text-sm font-medium leading-relaxed text-[var(--text-primary)]',
  /** 500 medium — secondary body */
  bodyMuted: 'text-sm font-medium leading-relaxed text-[var(--text-secondary)]',

  /** 500 medium — timestamps, tertiary metadata */
  caption: 'text-xs font-medium text-[var(--text-muted)]',

  /** Tab strip labels — inactive (600) / active (700); pair with color classes in TabStrip */
  tabLabel: 'text-sm font-semibold uppercase tracking-wide',
  tabLabelActive: 'text-sm font-bold uppercase tracking-wide',
} as const;
