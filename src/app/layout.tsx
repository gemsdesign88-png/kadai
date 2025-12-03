import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LayoutContent } from "./layout-content";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KadaiPOS - Modern POS System for All Businesses",
  description: "Streamline your business operations with KadaiPOS. Modern, intuitive point of sale system designed for restaurants, cafes, retail stores, and all types of businesses.",
  icons: {
    icon: [
      { url: "/Favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/Favicon.svg",
    apple: "/Favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-plus-jakarta-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <LayoutContent>{children}</LayoutContent>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
