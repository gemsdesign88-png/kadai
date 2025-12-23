"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/i18n/context"
import { Menu, X, ShoppingCart, Utensils, TrendingUp, Users, Grid, CreditCard, Package, ChefHat, QrCode, Tag, Heart, Settings, Palette, ChevronDown, Store } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "features", href: "/features", hasDropdown: true },
  { name: "pricing", href: "/pricing" },
  { name: "business", href: "/business", hasDropdown: true },
  { name: "benefits", href: "/benefits" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
]

const businessMenu = [
  { icon: Store, title: "tokoTitle", titleId: "tokoDesc", href: "/business/toko", color: "#0066FF" },
  { icon: ChefHat, title: "restoTitle", titleId: "restoDesc", href: "/business/resto", color: "#8B5CF6" },
]

const featuresMenu = [
  { icon: ShoppingCart, title: "Order Management", titleId: "orderManagement", subtitleId: "realTimeOrder", href: "/features/orders", color: "#FF5A5F" },
  { icon: Grid, title: "Table Management", titleId: "tableManagement", subtitleId: "tableManagement", href: "/features/tables", color: "#8B5CF6" },
  { icon: Utensils, title: "Menu Management", titleId: "menuManagement", subtitleId: "flexibleMenu", href: "/features/menu", color: "#0066FF" },
  { icon: TrendingUp, title: "Analytics & Insights", titleId: "analytics", subtitleId: "analyticsInsights", href: "/features/analytics", color: "#00D4AA" },
  { icon: Users, title: "Staff Management", titleId: "staffManagement", subtitleId: "staffManagement", href: "/features/staff", color: "#FFB020" },
  { icon: CreditCard, title: "Payment System", titleId: "paymentSystem", subtitleId: "paymentSystem", href: "/features/payment", color: "#EC4899" },
  { icon: Package, title: "Inventory Control", titleId: "inventoryControl", subtitleId: "inventoryControl", href: "/features/inventory", color: "#10B981" },
  { icon: ChefHat, title: "Kitchen Display", titleId: "kitchenDisplay", subtitleId: "kitchenDisplay", href: "/features/kitchen", color: "#F59E0B" },
  { icon: QrCode, title: "QR Menu", titleId: "qrMenu", subtitleId: "qrMenu", href: "/features/qr-menu", color: "#06B6D4" },
  { icon: Tag, title: "Promo Manager", titleId: "promoManager", subtitleId: "promoManager", href: "/features/promo", color: "#EF4444" },
  { icon: Heart, title: "Customer CRM", titleId: "customerCRM", subtitleId: "customerCRM", href: "/features/crm", color: "#3B82F6" },
  { icon: Settings, title: "System Settings", titleId: "systemSettings", subtitleId: "systemSettings", href: "/features/settings", color: "#6366F1" },
  { icon: Palette, title: "Theme Customization", titleId: "themeCustomization", subtitleId: "themeCustomization", href: "/features/theme", color: "#9C27B0" },
]

export function Header() {
  const pathname = usePathname()

  // Hide header on in-app views (dashboard/order/register)
  if (pathname?.startsWith('/order') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/register')) {
    return null
  }

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [featuresOpen, setFeaturesOpen] = React.useState(false)
  const [businessOpen, setBusinessOpen] = React.useState(false)
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const featuresTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const businessTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  
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
      if (businessTimeoutRef.current) {
        clearTimeout(businessTimeoutRef.current)
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
  
  const handleBusinessMouseEnter = () => {
    if (businessTimeoutRef.current) {
      clearTimeout(businessTimeoutRef.current)
    }
    setBusinessOpen(true)
  }
  
  const handleBusinessMouseLeave = () => {
    businessTimeoutRef.current = setTimeout(() => {
      setBusinessOpen(false)
    }, 200)
  }
  
  // Only show glass effect when scrolling, not based on page
  const shouldShowScrolled = isScrolled

  // Refs for logo and Try Demo button, modal position and width state
  const logoRef = React.useRef<HTMLImageElement>(null);
  const tryDemoButtonRef = React.useRef<HTMLButtonElement>(null);
  const businessButtonRef = React.useRef<HTMLButtonElement>(null);
  const [modalLeft, setModalLeft] = React.useState<number | null>(null);
  const [modalWidth, setModalWidth] = React.useState<number | null>(null);
  const [businessModalLeft, setBusinessModalLeft] = React.useState<number | null>(null);

  // When modal opens, calculate logo left and Try Demo button right, set modal left and width
  React.useEffect(() => {
    if (featuresOpen && logoRef.current && tryDemoButtonRef.current) {
      const logoRect = logoRef.current.getBoundingClientRect();
      const demoRect = tryDemoButtonRef.current.getBoundingClientRect();
      setModalLeft(logoRect.left);
      setModalWidth(demoRect.right - logoRect.left);
    }
  }, [featuresOpen]);

  // Calculate business button position for dropdown
  React.useEffect(() => {
    if (businessOpen && businessButtonRef.current) {
      const buttonRect = businessButtonRef.current.getBoundingClientRect();
      setBusinessModalLeft(buttonRect.left);
    }
  }, [businessOpen]);

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
      <Container className="relative">
        <nav className="flex h-20 items-center justify-between" aria-label="Global">
          <div className="flex items-center gap-10">
            <Link 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img 
                ref={logoRef}
                src={pathname === '/' && !shouldShowScrolled ? "/logo-white.svg" : "/logo-black.svg"} 
                alt="Kadai" 
                className="h-10 w-auto transition-all duration-300" 
              />
            </Link>
            <div className="hidden lg:flex lg:gap-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                if (item.hasDropdown) {
                  const isFeatures = item.name === 'features';
                  const isBusiness = item.name === 'business';
                  const isOpen = isFeatures ? featuresOpen : businessOpen;
                  const handleMouseEnter = isFeatures ? handleFeaturesMouseEnter : handleBusinessMouseEnter;
                  const handleMouseLeave = isFeatures ? handleFeaturesMouseLeave : handleBusinessMouseLeave;
                  
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        ref={isBusiness ? businessButtonRef : undefined}
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
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
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
              {/* <Button 
                variant="ghost" 
                size="default" 
                asChild
                className={`font-bold rounded-[12px] transition-all px-6 py-5 ${
                  pathname === '/' && !shouldShowScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Link href="https://sibos.kadaipos.id/login">{t.nav.login}</Link>
              </Button> */}
              <Button 
                ref={tryDemoButtonRef}
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

        {/* Features Dropdown */}
        {mounted && featuresOpen && createPortal(
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={modalLeft !== null && modalWidth !== null ? {
              position: 'fixed',
              top: 88,
              left: modalLeft,
              width: modalWidth,
              maxWidth: '100vw',
              paddingLeft: '0',
              paddingRight: '0',
              zIndex: 100,
            } : undefined}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
            onMouseEnter={handleFeaturesMouseEnter}
            onMouseLeave={handleFeaturesMouseLeave}
          >
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t.nav.powerfulFeatures}
                </h3>
                <p className="text-sm text-gray-500">
                  {t.nav.everythingYouNeed}
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
                      className="group flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 hover:border-gray-300 hover:shadow-xl hover:scale-[1.02] hover:bg-[var(--feature-bg)] transition-all duration-300"
                      style={{
                        '--feature-color': feature.color,
                        '--feature-bg': `${feature.color}2F` // 12% opacity (1F in hex is ~12%)
                      } as React.CSSProperties}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm"
                        style={{
                          backgroundColor: `${feature.color}3D`, // 24% opacity
                          boxShadow: `0 4px 12px ${feature.color}40`
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: feature.color }} />
                      </div>
                      <div>
                        <p
                          className="font-bold text-gray-900 text-xs leading-tight transition-colors mb-1 group-hover:text-[var(--feature-color)]"
                          style={{ '--feature-color': feature.color } as React.CSSProperties}
                        >
                          {t.nav[feature.titleId as keyof typeof t.nav] || feature.title}
                        </p>
                        <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">
                          {
                            (t.features[feature.subtitleId as keyof typeof t.features] as any)?.description
                            || (language === 'en'
                              ? feature.title === 'Order Management' ? 'Manage orders in real time.'
                                : feature.title === 'Table Management' ? 'Organize tables efficiently.'
                                : feature.title === 'Menu Management' ? 'Customize your menu easily.'
                                : feature.title === 'Analytics & Insights' ? 'Gain business insights.'
                                : feature.title === 'Staff Management' ? 'Empower your staff.'
                                : feature.title === 'Payment System' ? 'Accept payments securely.'
                                : feature.title === 'Inventory Control' ? 'Track inventory seamlessly.'
                                : feature.title === 'Kitchen Display' ? 'Streamline kitchen workflow.'
                                : feature.title === 'QR Menu' ? 'Contactless menu access.'
                                : feature.title === 'Promo Manager' ? 'Boost sales with promos.'
                                : feature.title === 'Customer CRM' ? 'Build customer loyalty.'
                                : feature.title === 'System Settings' ? 'Configure your system.'
                                : feature.title === 'Theme Customization' ? 'Personalize your POS.'
                                : 'Streamline your operations'
                              : feature.title === 'Order Management' ? 'Kelola pesanan secara real time.'
                                : feature.title === 'Table Management' ? 'Atur meja dengan efisien.'
                                : feature.title === 'Menu Management' ? 'Kustomisasi menu dengan mudah.'
                                : feature.title === 'Analytics & Insights' ? 'Dapatkan insight bisnis.'
                                : feature.title === 'Staff Management' ? 'Optimalkan kinerja staf.'
                                : feature.title === 'Payment System' ? 'Terima pembayaran dengan aman.'
                                : feature.title === 'Inventory Control' ? 'Pantau stok dengan mudah.'
                                : feature.title === 'Kitchen Display' ? 'Optimalkan workflow dapur.'
                                : feature.title === 'QR Menu' ? 'Akses menu tanpa kontak.'
                                : feature.title === 'Promo Manager' ? 'Tingkatkan penjualan dengan promo.'
                                : feature.title === 'Customer CRM' ? 'Bangun loyalitas pelanggan.'
                                : feature.title === 'System Settings' ? 'Konfigurasi sistem Anda.'
                                : feature.title === 'Theme Customization' ? 'Personalisasi POS Anda.'
                                : 'Optimalkan operasional')
                          }
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
                  {t.nav.exploreAllFeatures}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>,
          document.body
        )}

        {/* Business Dropdown */}
        {mounted && businessOpen && createPortal(
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={businessModalLeft !== null ? {
              position: 'fixed',
              top: 88,
              left: businessModalLeft,
              width: 'auto',
              maxWidth: '600px',
              zIndex: 100,
            } : undefined}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
            onMouseEnter={handleBusinessMouseEnter}
            onMouseLeave={handleBusinessMouseLeave}
          >
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t.nav.businessMenu.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {t.nav.businessMenu.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {businessMenu.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setBusinessOpen(false)}
                      className="group flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 hover:border-gray-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                      style={{
                        '--item-color': item.color,
                        '--item-bg': `${item.color}2F`
                      } as React.CSSProperties}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm"
                        style={{
                          backgroundColor: `${item.color}3D`,
                          boxShadow: `0 4px 12px ${item.color}40`
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p
                          className="font-bold text-gray-900 text-base leading-tight transition-colors mb-1 group-hover:text-[var(--item-color)]"
                          style={{ '--item-color': item.color } as React.CSSProperties}
                        >
                          {t.nav.businessMenu[item.title as keyof typeof t.nav.businessMenu]}
                        </p>
                        <p className="text-xs text-gray-500 leading-snug">
                          {t.nav.businessMenu[item.titleId as keyof typeof t.nav.businessMenu]}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center">
                <Link
                  href="/business"
                  onClick={() => setBusinessOpen(false)}
                  className="text-sm font-bold text-white bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#FF5A5F]/30 hover:shadow-xl inline-flex items-center gap-2"
                >
                  {t.nav.businessMenu.compare}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
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
                  {/* <Button 
                    variant="ghost" 
                    className="w-full justify-start font-bold hover:bg-gray-50 rounded-[12px]" 
                    size="sm" 
                    asChild
                  >
                    <Link href="https://sibos.kadaipos.id/login" onClick={() => setMobileMenuOpen(false)}>
                      {t.nav.login}
                    </Link>
                  </Button> */}
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
