'use client';

import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <img 
                src="/logo-black.svg" 
                alt="Kadai Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher isScrolled={true} />
          </div>
        </div>
      </div>
    </header>
  );
}
