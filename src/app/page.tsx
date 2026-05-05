import Link from 'next/link';
import { Heart, Shield, Users, BookOpen, Baby, Lock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--bg-primary)]">
      {/* Navbar */}
      <nav className="border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--blush-soft)] text-xl">
              🐘
            </span>
            <span className="text-lg font-bold text-[var(--text-primary)]">MummaElephant</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--cream-deep)] hover:text-[var(--text-primary)]"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-[var(--radius-md)] bg-[var(--blush)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-resting)] transition-all hover:bg-[var(--blush-deep)] hover:shadow-[var(--shadow-elevated)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[var(--blush-soft)] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--sage-soft)] opacity-30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--text-muted)] shadow-[var(--shadow-resting)]">
            <span className="flex h-2 w-2 rounded-full bg-[var(--sage)]" />
            A safe space for mums
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Motherhood is{' '}
            <span className="text-[var(--blush)]">beautiful</span>
            <br />
            and you&apos;re not alone
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Track your children&apos;s growth, store precious memories securely, share experiences 
            with a supportive community, and find wellbeing tools — all in one safe place built 
            for mums, by people who care.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="w-full rounded-[var(--radius-md)] bg-[var(--blush)] px-8 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-elevated)] transition-all hover:bg-[var(--blush-deep)] hover:shadow-[var(--shadow-featured)] sm:w-auto"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-base font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--bg-card-hover)] sm:w-auto"
            >
              Already a member? Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Everything you need
            </h2>
            <p className="text-[var(--text-muted)]">
              Thoughtfully designed tools for every stage of motherhood
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Baby size={22} />}
              title="Child Growth Tracking"
              description="Monitor weight, height, vaccinations, milestones, and create a photo timeline for each child."
              color="blush"
            />
            <FeatureCard
              icon={<Lock size={22} />}
              title="Safe Document Vault"
              description="Securely store birth certificates, medical records, and precious documents with PIN protection."
              color="sage"
            />
            <FeatureCard
              icon={<Users size={22} />}
              title="Community Support"
              description="Connect with other mums, share tips, send gratitude messages, and earn community badges."
              color="mauve"
            />
            <FeatureCard
              icon={<Heart size={22} />}
              title="Wellbeing Tools"
              description="Track your mood, set self-care goals, and journal your motherhood journey."
              color="terracotta"
            />
            <FeatureCard
              icon={<BookOpen size={22} />}
              title="Legacy Letters"
              description="Write letters to your children that unlock on special dates — preserve your love forever."
              color="lavender"
            />
            <FeatureCard
              icon={<Shield size={22} />}
              title="Privacy First"
              description="Granular privacy controls. You decide what's visible, what's private, and who's in your trusted circle."
              color="sky-blue"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-10 text-center shadow-[var(--shadow-featured)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--blush-soft)] text-2xl shadow-[var(--shadow-glow-blush)]">
            🐘
          </div>
          <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
            Ready to join the herd?
          </h2>
          <p className="mb-6 text-[var(--text-muted)]">
            Start your journey with MummaElephant today. It&apos;s free, safe, and built with love.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-[var(--radius-md)] bg-[var(--blush)] px-8 py-3 text-base font-semibold text-white shadow-[var(--shadow-elevated)] transition-all hover:bg-[var(--blush-deep)] hover:shadow-[var(--shadow-featured)]"
          >
            Create your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--blush-soft)] text-sm">
              🐘
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">MummaElephant</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Safe, Smart, Supportive — built for mums, by people who care.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    blush: { bg: 'var(--blush-soft)', text: 'var(--blush-deep)' },
    sage: { bg: 'var(--sage-soft)', text: 'var(--sage-deep)' },
    mauve: { bg: 'var(--mauve-soft)', text: 'var(--mauve-deep)' },
    terracotta: { bg: 'var(--terracotta-soft)', text: 'var(--terracotta-deep)' },
    lavender: { bg: 'var(--lavender-soft)', text: 'var(--mauve-deep)' },
    'sky-blue': { bg: 'var(--sky-blue-soft)', text: '#3A5A7A' },
  };

  const colors = colorMap[color] || colorMap.blush;

  return (
    <div className="group rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-resting)] transition-all hover:border-[var(--border-focus)] hover:shadow-[var(--shadow-elevated)]">
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)]"
        style={{ background: colors.bg, color: colors.text }}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
    </div>
  );
}
