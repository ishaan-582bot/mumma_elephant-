import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MummaElephant — Your Safe Space",
  description: "A warm, nurturing maternal support app crafted with love for every stage of motherhood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
