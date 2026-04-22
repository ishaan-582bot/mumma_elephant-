import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MummaElephant — Safe, Smart, Supportive for Mums',
  description: 'A safe, supportive space for mums. Track your children, store memories securely, and connect with a community of mums who understand.',
  appleWebApp: { statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFBF7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={`${nunito.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
