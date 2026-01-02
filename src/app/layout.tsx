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
    default: "KadaiPOS - POS Terbaik di Indonesia untuk Restoran & Toko",
    template: "%s | KadaiPOS"
  },
  description: "KadaiPOS adalah sistem POS terbaik di Indonesia untuk restoran, cafe, dan toko retail. Aplikasi kasir digital modern untuk kelola stok, penjualan, dan staff dengan mudah.",
  keywords: ["POS terbaik di Indonesia", "Aplikasi Kasir Terbaik", "POS system", "Point of Sale", "Aplikasi Kasir", "Kasir Digital", "Restaurant POS", "Retail POS", "Cafe POS", "Inventory Management", "Sales Tracking", "KadaiPOS", "Indonesia POS", "Software Kasir"],
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
    icon: { url: '/Favicon.svg', type: 'image/svg+xml' },
    apple: '/Favicon.svg',
  },
  manifest: '/manifest.webmanifest',
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "KadaiPOS",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "120"
    },
    "description": "Modern POS system for restaurants, cafes, and retail stores in Indonesia.",
    "url": "https://kadaipos.id",
    "author": {
      "@type": "Organization",
      "name": "KadaiPOS"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
