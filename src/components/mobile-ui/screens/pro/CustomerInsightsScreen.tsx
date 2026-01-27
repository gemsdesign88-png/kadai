'use client';

import React from 'react';
import { MobileScreenContainer } from '../../MobileDeviceFrame';
import { Users, Phone, Calendar, TrendingUp, Award, Gift } from 'lucide-react';

/**
 * CustomerInsightsScreen - Customer analytics and loyalty for Pro tier
 * Shows customer relationship value
 */
export function CustomerInsightsScreen() {
  const topCustomers = [
    {
      name: 'Ahmad Wijaya',
      phone: '0812-3456-7890',
      visits: 47,
      totalSpent: 'Rp 4.2M',
      lastVisit: '2 jam lalu',
      tier: 'Gold',
      color: '#F59E0B',
      favorite: 'Nasi Goreng Special',
    },
    {
      name: 'Siti Nurhaliza',
      phone: '0813-9876-5432',
      visits: 38,
      totalSpent: 'Rp 3.8M',
      lastVisit: '1 hari lalu',
      tier: 'Gold',
      color: '#F59E0B',
      favorite: 'Ayam Bakar',
    },
    {
      name: 'Budi Santoso',
      phone: '0821-5555-4444',
      visits: 29,
      totalSpent: 'Rp 2.9M',
      lastVisit: '3 hari lalu',
      tier: 'Silver',
      color: '#9CA3AF',
      favorite: 'Soto Ayam',
    },
  ];

  const stats = [
    { label: 'Total Pelanggan', value: '1,234', change: '+45 minggu ini', icon: Users, color: '#3B82F6' },
    { label: 'Repeat Customer', value: '68%', change: '+5% vs bulan lalu', icon: TrendingUp, color: '#10B981' },
    { label: 'Rata-rata Kunjungan', value: '3.2x', change: 'per bulan', icon: Calendar, color: '#F59E0B' },
    { label: 'Customer Loyalty', value: '89%', change: 'Satisfaction Rate', icon: Award, color: '#8B5CF6' },
  ];

  return (
    <MobileScreenContainer>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Customer Insights</h1>
          <p className="text-indigo-100 text-sm">Analisis perilaku & loyalitas pelanggan</p>
        </div>

        {/* Stats Grid */}
        <div className="px-4 -mt-4">
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-3">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-3 pb-3 last:pb-0 border-b last:border-b-0">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-600">{stat.label}</div>
                    <div className="font-bold text-xl">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.change}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Customers */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Pelanggan Setia</h3>
            <span className="text-sm text-gray-600">{topCustomers.length} teratas</span>
          </div>

          <div className="space-y-3">
            {topCustomers.map((customer, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Customer Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-base">{customer.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Phone size={12} />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                  <div 
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: customer.color }}
                  >
                    {customer.tier}
                  </div>
                </div>

                {/* Customer Stats */}
                <div className="px-4 pb-4 grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-600 mb-1">Total Belanja</div>
                    <div className="font-bold text-lg text-green-600">{customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">{customer.visits}x kunjungan</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-600 mb-1">Kunjungan Terakhir</div>
                    <div className="font-semibold text-sm">{customer.lastVisit}</div>
                    <div className="text-xs text-gray-500 truncate">🍽️ {customer.favorite}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex gap-2">
                  <button className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm font-semibold active:scale-95 transition-transform flex items-center justify-center gap-1">
                    <Phone size={14} />
                    <span>Hubungi</span>
                  </button>
                  <button className="flex-1 bg-purple-600 text-white rounded-xl py-2 text-sm font-semibold active:scale-95 transition-transform flex items-center justify-center gap-1">
                    <Gift size={14} />
                    <span>Beri Reward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Program */}
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Gift size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold">Program Loyalitas Aktif</div>
                <div className="text-xs text-gray-600">Otomatis track & reward pelanggan</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="font-bold text-lg">423</div>
                <div className="text-xs text-gray-600">Bronze</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="font-bold text-lg">156</div>
                <div className="text-xs text-gray-600">Silver</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="font-bold text-lg">89</div>
                <div className="text-xs text-gray-600">Gold</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  );
}
