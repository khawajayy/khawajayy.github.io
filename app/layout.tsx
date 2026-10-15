import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamza Sadiq — Engineering Quality. Building Systems.",
  description:
    "Software Quality Engineer specializing in automation and quality engineering. Systems thinker, AI explorer, long-term investor, lifelong learner.",
  keywords: [
    "Hamza Sadiq",
    "Software Quality Engineer",
    "Automation Engineer",
    "QA",
    "Playwright",
    "TypeScript",
    "AI",
  ],
  openGraph: {
    title: "Hamza Sadiq — Engineering Quality. Building Systems.",
    description:
      "Explore the digital mind of a curious engineer: automation, AI, systems thinking, and craft.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
