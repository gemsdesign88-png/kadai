'use client';

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide header and footer for dashboard and login pages
  const isDashboard = pathname?.startsWith('/dashboard');
  const isLogin = pathname === '/login';
  const hideHeaderFooter = isDashboard || isLogin;

  return (
    <>
      {!hideHeaderFooter && <ScrollProgress />}
      {!hideHeaderFooter && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
