/* ═══════════════════════════════════════════
   Typography Scale — Nunito
   Warm, approachable, clear hierarchy
   ═══════════════════════════════════════════ */

export const typo = {
  /* Display — Profile name, hero moments */
  displayExtrabold: 'text-2xl lg:text-[28px] font-extrabold tracking-tight text-[var(--text-primary)] leading-tight',

  /* Page Hero — Section titles */
  pageHeroBold: 'text-xl lg:text-[22px] font-bold tracking-tight text-[var(--text-primary)] leading-snug',

  /* Heading — Card titles, section headers */
  heading: 'text-[15px] lg:text-[17px] font-bold text-[var(--text-primary)] leading-snug',

  /* Subheading — Labels, secondary headers */
  subheading: 'text-[13px] lg:text-sm font-semibold text-[var(--text-secondary)] leading-snug',

  /* Body — Content text */
  body: 'text-sm font-medium text-[var(--text-primary)] leading-relaxed',

  /* Body Muted — Descriptions, secondary content */
  bodyMuted: 'text-sm font-medium text-[var(--text-muted)] leading-relaxed',

  /* Caption — Metadata, hints, dates */
  caption: 'text-xs font-semibold text-[var(--text-muted)] leading-snug',

  /* Stat — Numbers in stat cards */
  stat: 'text-2xl font-bold leading-none',

  /* Stat Label — Labels under stat numbers */
  statLabel: 'text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider',

  /* Field Label — Form field labels */
  fieldLabel: 'text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide',

  /* Field Value — Form field values */
  fieldValue: 'text-sm font-semibold text-[var(--text-primary)] leading-snug',

  /* Tab Label — Inactive tab text */
  tabLabel: 'text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider',

  /* Tab Label Active — Active tab text */
  tabLabelActive: 'text-[11px] font-bold text-[var(--blush-deep)] uppercase tracking-wider',
} as const;
