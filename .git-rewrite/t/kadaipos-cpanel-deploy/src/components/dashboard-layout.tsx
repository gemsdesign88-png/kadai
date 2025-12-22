'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Building2, Home, BarChart3, ShoppingCart, Users, Archive, UtensilsCrossed, ChevronDown, Check, Globe } from 'lucide-react';
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
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { path: '/dashboard', icon: Home, label: language === 'en' ? 'Dashboard' : 'Dashboard' },
    { path: '/dashboard/analytics', icon: BarChart3, label: language === 'en' ? 'Analytics' : 'Analitik' },
    { path: '/dashboard/orders', icon: ShoppingCart, label: language === 'en' ? 'Orders' : 'Pesanan' },
    { path: '/dashboard/menu', icon: UtensilsCrossed, label: language === 'en' ? 'Menu' : 'Menu' },
    { path: '/dashboard/customers', icon: Users, label: language === 'en' ? 'Customers' : 'Pelanggan' },
    { path: '/dashboard/staff', icon: Users, label: language === 'en' ? 'Staff' : 'Staff' },
    { path: '/dashboard/inventory', icon: Archive, label: language === 'en' ? 'Inventory' : 'Stok' },
    { path: '/dashboard/tables', icon: Building2, label: language === 'en' ? 'Tables' : 'Meja' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-50 flex flex-col">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-black.svg" 
                alt="KadaiPOS" 
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Restaurant Selector */}
          {restaurants.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                {language === 'en' ? 'Active Restaurant' : 'Restoran Aktif'}
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full pl-12 pr-10 py-3.5 text-sm font-bold text-gray-900 bg-white border-3 border-gray-200 rounded-2xl focus:ring-0 focus:outline-none focus:border-gray-400 transition-all hover:border-gray-300 hover:shadow-sm text-left"
                >
                  <span className="block truncate">{activeRestaurant?.name}</span>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Restaurant Logo/Icon */}
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

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
                    {restaurants.map((restaurant) => {
                      const isActive = activeRestaurant?.id === restaurant.id;
                      return (
                        <button
                          key={restaurant.id}
                          onClick={() => handleRestaurantChange(restaurant)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            isActive 
                              ? 'bg-gray-50 text-gray-900' 
                              : 'text-gray-700 hover:bg-gray-50'
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
                          {isActive && (
                            <Check className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                          )}
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
                <p className="text-xs text-[var(--color-accent)] font-medium">👤 {language === 'en' ? 'Owner Profile' : 'Profil Owner'}</p>
              </div>
            </button>
            <div className="space-y-1">
              <button
                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 rounded-lg transition-all"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? '🇬🇧 English' : '🇮🇩 Bahasa'}
              </button>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[var(--color-accent)] hover:bg-gray-50 rounded-lg transition-all disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {language === 'en' ? 'Logout' : 'Keluar'}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
