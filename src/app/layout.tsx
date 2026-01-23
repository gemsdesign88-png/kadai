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
  metadataBase: new URL('https://kadai.id'),
  title: {
    default: "Kadai - Business Operating System for Retail, F&B, and Services",
    template: "%s | Kadai"
  },
  description: "Kadai adalah platform manajemen bisnis lengkap untuk toko retail, restoran, kafe, dan bisnis jasa. Kelola inventori, penjualan, staff, dan operasional dari satu aplikasi powerful dengan AI Magic Paste.",
  keywords: ["Business Operating System", "Business Management Platform", "Aplikasi Bisnis", "Retail Management", "Restaurant Management", "Inventory Management", "POS System", "Aplikasi Kasir", "Kasir Digital", "Sales Tracking", "Staff Management", "Kadai", "Indonesia Business Software", "AI Magic Paste", "Business Automation"],
  authors: [{ name: "Kadai Team" }],
  creator: "Kadai",
  publisher: "Kadai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kadai.id",
    siteName: "Kadai",
    title: "Kadai - Business Operating System for Modern Entrepreneurs",
    description: "The complete business management platform for retail, F&B, and service businesses. Manage everything from one powerful app.",
    images: [
      {
        url: "/Logo.svg",
        width: 800,
        height: 600,
        alt: "Kadai Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadai - Business Operating System",
    description: "Complete business management platform for retail, restaurants, and services. Manage everything from one powerful app.",
    images: ["/Logo.svg"],
  },
  icons: {
    icon: { url: '/Favicon.svg', type: 'image/svg+xml' },
    apple: '/Favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: 'https://kadai.id',
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
    "name": "Kadai",
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
    "description": "Complete Business Operating System for retail, f&b, and service businesses.",
    "url": "https://kadai.id",
    "author": {
      "@type": "Organization",
      "name": "Kadai"
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
