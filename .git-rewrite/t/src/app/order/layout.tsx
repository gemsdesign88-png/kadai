'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
