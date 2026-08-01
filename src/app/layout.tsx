import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { PillNav } from "@/components/nav/PillNav";
import { Footer } from "@/components/footer/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { CommandPalette } from "@/components/palette/CommandPalette";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
        <ScrollProgressBar />
        <CustomCursor />
        <CommandPalette />
        <PillNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
