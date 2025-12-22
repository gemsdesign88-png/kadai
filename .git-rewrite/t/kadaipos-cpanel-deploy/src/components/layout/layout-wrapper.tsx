'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { FooterGate } from './footer-gate';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOrderPage = pathname.startsWith('/order');

  return (
    <>
      {!isOrderPage && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isOrderPage && (
        <FooterGate>
          <Footer />
        </FooterGate>
      )}
    </>
  );
}
