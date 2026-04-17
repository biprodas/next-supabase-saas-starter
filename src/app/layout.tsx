import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import ReactQueryProvider from "~/providers/react-query-provider";
import { ThemeProvider } from "~/providers/theme-provider";
import { siteConfig } from "~/config/site";

import "~/styles/globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-sans",
          inter.variable,
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <NextTopLoader />
              <Toaster richColors position="top-right" />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
