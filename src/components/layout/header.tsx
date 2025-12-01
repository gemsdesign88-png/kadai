"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/i18n/context"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

const navigation = [
  { name: "features", href: "/features" },
  { name: "pricing", href: "/pricing" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Only show glass effect when scrolling, not based on page
  const shouldShowScrolled = isScrolled

  return (
    <motion.header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        shouldShowScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg' 
          : pathname === '/' 
            ? 'bg-transparent' 
            : 'bg-white border-b border-gray-200'
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between" aria-label="Global">
          <div className="flex items-center gap-10">
            <Link 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src={pathname === '/' && !shouldShowScrolled ? "/logo-white.svg" : "/logo-black.svg"} 
                alt="Kadai" 
                className="h-10 w-auto transition-all duration-300" 
              />
            </Link>
            <div className="hidden lg:flex lg:gap-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-bold rounded-[12px] transition-all ${
                      isActive
                        ? pathname === '/' && !shouldShowScrolled
                          ? 'text-white bg-white/20'
                          : 'text-[#FF5A5F] bg-[#FF5A5F]/10'
                        : pathname === '/' && !shouldShowScrolled
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-gray-700 hover:text-[#FF5A5F] hover:bg-gray-50'
                    }`}
                  >
                    {t.nav[item.name as keyof typeof t.nav]}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LanguageSwitcher isScrolled={pathname !== '/' || shouldShowScrolled} />
            </div>
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button 
                variant="ghost" 
                size="default" 
                asChild
                className={`font-bold rounded-[12px] transition-all px-6 py-5 ${
                  pathname === '/' && !shouldShowScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Link href="/login">{t.nav.login}</Link>
              </Button>
              <Button 
                size="default" 
                asChild
                className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white font-bold rounded-full shadow-lg shadow-[#FF5A5F]/30 px-6 py-5"
              >
                <Link href="/demo">{t.nav.getDemo}</Link>
              </Button>
            </div>
            <button
              type="button"
              className={`lg:hidden p-2 rounded-[12px] transition-all ${
                pathname === '/' && !shouldShowScrolled
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:text-[#FF5A5F] hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm border-l border-gray-200 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <Link 
                href="/" 
                className="flex items-center gap-3" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src="/logo-black.svg" alt="Radai" className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                className="p-2 text-gray-700 hover:text-[#FF5A5F] hover:bg-gray-50 rounded-[12px] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flow-root">
              <div className="space-y-6">
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-3 text-base font-bold rounded-[12px] transition-all ${
                          isActive
                            ? 'text-[#FF5A5F] bg-[#FF5A5F]/10'
                            : 'text-gray-700 hover:text-[#FF5A5F] hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t.nav[item.name as keyof typeof t.nav]}
                      </Link>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <LanguageSwitcher isScrolled={true} />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-bold hover:bg-gray-50 rounded-[12px]" 
                    size="sm" 
                    asChild
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      {t.nav.login}
                    </Link>
                  </Button>
                  <Button 
                    className="w-full bg-[#FF5A5F] hover:bg-[#E8484D] font-bold rounded-full shadow-lg" 
                    size="sm" 
                    asChild
                  >
                    <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                      {t.nav.getDemo}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}
