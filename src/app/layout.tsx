import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link"; // Import Link
import { cn } from "@/lib/utils"; // Import cn for classnames

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jules Docs", // Updated title
  description: "A simple document editor built with Next.js by Jules AI", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark:bg-slate-900 dark:text-slate-50 flex flex-col", // Added dark mode base, flex for footer
          geistSans.variable,
          geistMono.variable
        )}
      >
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-slate-700">
          <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Jules Docs
            </Link>
            {/* Future additions: Theme toggle or user profile button */}
          </div>
        </header>
        <main className="flex-1 py-6"> {/* flex-1 to take available space, py-6 for padding */}
          {children}
        </main>
        <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
          <div className="container flex flex-col items-center justify-center gap-4 h-20 md:h-24 md:flex-row">
            <p className="text-xs text-center text-muted-foreground md:text-left dark:text-slate-400">
              Built by Jules AI.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
