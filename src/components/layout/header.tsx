"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/i18n/context"
import { Menu, X, ShoppingCart, Utensils, TrendingUp, Users, Grid, CreditCard, Package, ChefHat, QrCode, Tag, Heart, Settings, Palette, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "features", href: "/features", hasDropdown: true },
  { name: "pricing", href: "/pricing" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
]

const featuresMenu = [
  { icon: ShoppingCart, title: "Order Management", titleId: "orderManagement", href: "/features/orders", color: "#FF5A5F" },
  { icon: Grid, title: "Table Management", titleId: "tableManagement", href: "/features/tables", color: "#8B5CF6" },
  { icon: Utensils, title: "Menu Management", titleId: "menuManagement", href: "/features/menu", color: "#0066FF" },
  { icon: TrendingUp, title: "Analytics & Insights", titleId: "analytics", href: "/features/analytics", color: "#00D4AA" },
  { icon: Users, title: "Staff Management", titleId: "staffManagement", href: "/features/staff", color: "#FFB020" },
  { icon: CreditCard, title: "Payment System", titleId: "paymentSystem", href: "/features/payment", color: "#EC4899" },
  { icon: Package, title: "Inventory Control", titleId: "inventoryControl", href: "/features/inventory", color: "#10B981" },
  { icon: ChefHat, title: "Kitchen Display", titleId: "kitchenDisplay", href: "/features/kitchen", color: "#F59E0B" },
  { icon: QrCode, title: "QR Menu", titleId: "qrMenu", href: "/features/qr-menu", color: "#06B6D4" },
  { icon: Tag, title: "Promo Manager", titleId: "promoManager", href: "/features/promo", color: "#EF4444" },
  { icon: Heart, title: "Customer CRM", titleId: "customerCRM", href: "/features/crm", color: "#3B82F6" },
  { icon: Settings, title: "System Settings", titleId: "systemSettings", href: "/features/settings", color: "#6366F1" },
  { icon: Palette, title: "Theme Customization", titleId: "themeCustomization", href: "/features/theme", color: "#9C27B0" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [featuresOpen, setFeaturesOpen] = React.useState(false)
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const featuresTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  
  // Hide header on order pages
  if (pathname?.startsWith('/order')) {
    return null
  }
  
  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (featuresTimeoutRef.current) {
        clearTimeout(featuresTimeoutRef.current)
      }
    }
  }, [])
  
  const handleFeaturesMouseEnter = () => {
    if (featuresTimeoutRef.current) {
      clearTimeout(featuresTimeoutRef.current)
    }
    setFeaturesOpen(true)
  }
  
  const handleFeaturesMouseLeave = () => {
    featuresTimeoutRef.current = setTimeout(() => {
      setFeaturesOpen(false)
    }, 200)
  }
  
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
                
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleFeaturesMouseEnter}
                      onMouseLeave={handleFeaturesMouseLeave}
                    >
                      <button
                        className={`px-4 py-2 text-sm font-bold rounded-[12px] transition-all flex items-center gap-1 ${
                          isActive
                            ? pathname === '/' && !shouldShowScrolled
                              ? 'text-white bg-white/20'
                              : 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent'
                            : pathname === '/' && !shouldShowScrolled
                              ? 'text-white/90 hover:text-white hover:bg-white/10'
                              : 'text-gray-700 hover:text-[#FF5A5F] hover:bg-gray-50'
                        }`}
                      >
                        {t.nav[item.name as keyof typeof t.nav]}
                        <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {featuresOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 mx-auto top-full mt-3 w-[1100px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
                          >
                            <div className="p-8">
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                  {language === 'en' ? 'Powerful Features' : 'Fitur Lengkap'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {language === 'en' ? 'Everything you need to run your business efficiently' : 'Semua yang Anda butuhkan untuk menjalankan bisnis dengan efisien'}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-4 gap-3">
                                {featuresMenu.map((feature, idx) => {
                                  const Icon = feature.icon
                                  return (
                                    <Link
                                      key={idx}
                                      href={feature.href}
                                      onClick={() => setFeaturesOpen(false)}
                                      className="group flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 hover:border-gray-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                                    >
                                      <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm"
                                        style={{ 
                                          backgroundColor: `${feature.color}`,
                                          boxShadow: `0 4px 12px ${feature.color}40`
                                        }}
                                      >
                                        <Icon className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <p className="font-bold text-gray-900 text-xs leading-tight group-hover:text-[#FF5A5F] transition-colors mb-1">
                                          {t.nav[feature.titleId as keyof typeof t.nav] || feature.title}
                                        </p>
                                        <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">
                                          {language === 'en' 
                                            ? 'Streamline your operations' 
                                            : 'Optimalkan operasional'}
                                        </p>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                              
                              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center">
                                <Link
                                  href="/features"
                                  onClick={() => setFeaturesOpen(false)}
                                  className="text-sm font-bold text-white bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#FF5A5F]/30 hover:shadow-xl inline-flex items-center gap-2"
                                >
                                  {language === 'en' ? 'Explore All Features' : 'Jelajahi Semua Fitur'}
                                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-bold rounded-[12px] transition-all ${
                      isActive
                        ? pathname === '/' && !shouldShowScrolled
                          ? 'text-white bg-white/20'
                          : 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent'
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
      {mobileMenuOpen && mounted && createPortal(
        <div className="lg:hidden relative z-[100]">
          <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm border-l border-gray-200 shadow-xl">
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
                            ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent'
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
        </div>,
        document.body
      )}
    </motion.header>
  )
}
