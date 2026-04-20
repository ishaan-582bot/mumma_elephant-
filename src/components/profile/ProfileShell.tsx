import React from 'react';

interface ProfileShellProps {
  sidebar: React.ReactNode;
  navigation: React.ReactNode;
  children: React.ReactNode;
}

export default function ProfileShell({ sidebar, navigation, children }: ProfileShellProps) {
  return (
    <main className="profile-page-bg min-h-dvh">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:sticky lg:top-8 lg:self-start">{sidebar}</aside>

          <section className="min-w-0">
            <div className="mb-5">{navigation}</div>
            <div className="space-y-6">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
