'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Building2, Home, BarChart3, ShoppingCart, Users, Archive, UtensilsCrossed, ChevronDown, Check, Globe, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/context';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  profile: any;
  restaurants: any[];
}

export default function DashboardLayout({ children, user, profile, restaurants }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { language, setLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (restaurants.length > 0) {
      const savedRestaurantId = localStorage.getItem('selected_restaurant_id');
      if (savedRestaurantId) {
        const saved = restaurants.find(r => r.id === savedRestaurantId);
        if (saved) {
          setActiveRestaurant(saved);
        } else {
          setActiveRestaurant(restaurants[0]);
          localStorage.setItem('selected_restaurant_id', restaurants[0].id);
        }
      } else {
        setActiveRestaurant(restaurants[0]);
        localStorage.setItem('selected_restaurant_id', restaurants[0].id);
      }
    }
  }, [restaurants]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRestaurantChange = (restaurant: any) => {
    setActiveRestaurant(restaurant);
    localStorage.setItem('selected_restaurant_id', restaurant.id);
    window.dispatchEvent(new Event('restaurantChanged'));
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { path: '/dashboard', icon: Home, label: t.nav.dashboard },
    { path: '/dashboard/analytics', icon: BarChart3, label: t.nav.analyticsShort },
    { path: '/dashboard/orders', icon: ShoppingCart, label: t.nav.orders },
    { path: '/dashboard/menu', icon: UtensilsCrossed, label: t.nav.menu },
    { path: '/dashboard/customers', icon: Users, label: t.nav.customers },
    { path: '/dashboard/staff', icon: Users, label: t.nav.staff },
    { path: '/dashboard/inventory', icon: Archive, label: t.nav.inventory },
    { path: '/dashboard/gudang', icon: Package, label: t.nav.warehouse },
    { path: '/dashboard/tables', icon: Building2, label: t.nav.tables },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3">
          {/* First Row - Logo and Menu */}
          <div className="flex items-center justify-between mb-3">
            <img src="/logo-black.svg" alt="Kadai" className="h-7 w-auto" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          {/* Second Row - Restaurant Selector */}
          {restaurants.length > 0 && (
            <div className="relative mb-3" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
              >
                {activeRestaurant?.logo_url ? (
                  <img 
                    src={activeRestaurant.logo_url} 
                    alt={activeRestaurant.name}
                    className="w-6 h-6 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-[10px]">
                      {activeRestaurant?.name?.charAt(0).toUpperCase() || 'R'}
                    </span>
                  </div>
                )}
                <span className="truncate flex-1 text-left">{activeRestaurant?.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-[60] max-h-64 overflow-y-auto">
                  {restaurants.map((restaurant) => {
                    const isActiveRest = activeRestaurant?.id === restaurant.id;
                    return (
                      <button
                        key={restaurant.id}
                        onClick={() => handleRestaurantChange(restaurant)}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors ${
                          isActiveRest ? 'bg-gray-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        {restaurant.logo_url ? (
                          <img 
                            src={restaurant.logo_url} 
                            alt={restaurant.name}
                            className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-black text-xs">
                              {restaurant.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="flex-1 font-semibold text-xs truncate">{restaurant.name}</span>
                        {isActiveRest && <Check className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          
          {/* Third Row - Horizontal Navigation Tabs */}
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                      active
                        ? 'bg-[var(--color-accent)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="overflow-y-auto max-h-[85vh] pb-8">
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* User Profile Section */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {(profile?.full_name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900 truncate">{profile?.full_name || user.email}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="px-4 py-4">
                <p className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.nav.menu}
                </p>
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          router.push(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                          active
                            ? 'bg-gradient-to-r from-[var(--color-accent)] to-[#8B5CF6] text-white shadow-lg shadow-[var(--color-accent)]/30'
                            : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Quick Actions */}
              <div className="px-4 py-4 border-t border-gray-200">
                <p className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t.nav.settings}
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      router.push('/dashboard/owner');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all"
                  >
                    <Users className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold">{t.nav.ownerProfile}</span>
                  </button>
                  <button
                    onClick={() => {
                      const nextLang = language === 'en' ? 'id' : language === 'id' ? 'zh' : 'en';
                      setLanguage(nextLang);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all"
                  >
                    <Globe className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold">
                      {language === 'en' ? '🇬🇧 English' : language === 'id' ? '🇮🇩 Bahasa' : '🇨🇳 中文'}
                    </span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl transition-all disabled:opacity-50"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold">{t.nav.logout}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-50 flex-col">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <img src="/logo-black.svg" alt="Kadai" className="h-10 w-auto" />
          </div>

          {/* Restaurant Selector - Desktop */}
          {restaurants.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                {t.nav.activeRestaurant}
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full pl-12 pr-10 py-3.5 text-sm font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-2xl focus:ring-0 focus:outline-none focus:border-gray-400 transition-all hover:border-gray-300 hover:shadow-sm text-left"
                >
                  <span className="block truncate">{activeRestaurant?.name}</span>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  {activeRestaurant?.logo_url ? (
                    <img 
                      src={activeRestaurant.logo_url} 
                      alt={activeRestaurant.name}
                      className="w-7 h-7 rounded-xl object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-sm border-2 border-white">
                      <span className="text-white font-black text-xs">
                        {activeRestaurant?.name?.charAt(0).toUpperCase() || 'R'}
                      </span>
                    </div>
                  )}
                </div>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
                    {restaurants.map((restaurant) => {
                      const isActiveRest = activeRestaurant?.id === restaurant.id;
                      return (
                        <button
                          key={restaurant.id}
                          onClick={() => handleRestaurantChange(restaurant)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            isActiveRest ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {restaurant.logo_url ? (
                            <img 
                              src={restaurant.logo_url} 
                              alt={restaurant.name}
                              className="w-8 h-8 rounded-xl object-cover border-2 border-white shadow-sm flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-sm border-2 border-white flex-shrink-0">
                              <span className="text-white font-black text-xs">
                                {restaurant.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="flex-1 font-semibold text-sm truncate">{restaurant.name}</span>
                          {isActiveRest && <Check className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => router.push('/dashboard/owner')}
              className="w-full flex items-center gap-3 mb-3 p-3 hover:bg-gray-50 rounded-xl transition-colors border-2 border-gray-200 hover:border-[var(--color-accent)]"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {(profile?.full_name || user.email).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-gray-900 truncate">{profile?.full_name || user.email}</p>
                <p className="text-xs text-[var(--color-accent)] font-medium">👤 {t.nav.ownerProfile}</p>
              </div>
            </button>
            <div className="space-y-1">
              <button
                onClick={() => {
                  const nextLang = language === 'en' ? 'id' : language === 'id' ? 'zh' : 'en';
                  setLanguage(nextLang);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 rounded-lg transition-all"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? '🇬🇧 English' : language === 'id' ? '🇮🇩 Bahasa' : '🇨🇳 中文'}
              </button>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 rounded-lg transition-all disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {t.nav.logout}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 pt-[160px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
