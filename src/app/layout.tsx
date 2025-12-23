import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { LanguageProvider } from "@/lib/i18n/context";
import { CurrencyProvider } from "@/lib/i18n/currency-context";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ThemeProvider } from '@/contexts/ThemeContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kadaipos.id'),
  title: {
    default: "KadaiPOS - Modern POS System for Restaurants, Cafes & Retail Stores",
    template: "%s | KadaiPOS"
  },
  description: "Streamline your business operations with KadaiPOS. Modern, intuitive point of sale system designed for restaurants, cafes, and retail stores. Manage inventory, sales, and staff efficiently.",
  keywords: ["POS system", "Point of Sale", "Restaurant POS", "Retail POS", "Cafe POS", "Inventory Management", "Sales Tracking", "KadaiPOS", "Indonesia POS"],
  authors: [{ name: "KadaiPOS Team" }],
  creator: "KadaiPOS",
  publisher: "KadaiPOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kadaipos.id",
    siteName: "KadaiPOS",
    title: "KadaiPOS - Modern POS System for Your Business",
    description: "The most intuitive and powerful POS system for modern businesses. Manage everything from one place.",
    images: [
      {
        url: "/Logo.svg",
        width: 800,
        height: 600,
        alt: "KadaiPOS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KadaiPOS - Modern POS System",
    description: "Streamline your business operations with KadaiPOS. Modern, intuitive point of sale system.",
    images: ["/Logo.svg"],
  },
  icons: {
    icon: [
      { url: '/Favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/Favicon.svg',
  },
  alternates: {
    canonical: 'https://kadaipos.id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      >
        <LanguageProvider>
          <CurrencyProvider>
            <ThemeProvider>
              <ScrollProgress />
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </ThemeProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
