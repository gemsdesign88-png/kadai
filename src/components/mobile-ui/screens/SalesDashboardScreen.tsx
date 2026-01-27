'use client';

import React from 'react';
import { MobileScreenContainer } from '../MobileDeviceFrame';
import { mobileDesignTokens } from '@/lib/design-tokens';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Clock } from 'lucide-react';

/**
 * SalesDashboardScreen - Shows daily revenue and business metrics
 * High-value screen that demonstrates business impact
 */
export function SalesDashboardScreen() {
  const stats = [
    {
      label: 'Today Revenue',
      labelId: 'Pendapatan Hari Ini',
      labelZh: '今日收入',
      value: 'Rp 4.250.000',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
    },
    {
      label: 'Orders',
      labelId: 'Pesanan',
      labelZh: '订单',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: ShoppingBag,
      color: '#3B82F6',
    },
    {
      label: 'Customers',
      labelId: 'Pelanggan',
      labelZh: '顾客',
      value: '156',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: '#8B5CF6',
    },
    {
      label: 'Avg Order',
      labelId: 'Rata-rata',
      labelZh: '平均订单',
      value: 'Rp 47.750',
      change: '+4%',
      trend: 'up',
      icon: TrendingUp,
      color: '#F59E0B',
    },
  ];

  const topProducts = [
    { name: 'Nasi Goreng Special', sales: 'Rp 850K', qty: 34, trend: 'up' },
    { name: 'Es Teh Manis', sales: 'Rp 420K', qty: 84, trend: 'up' },
    { name: 'Ayam Penyet', sales: 'Rp 680K', qty: 28, trend: 'up' },
    { name: 'Soto Ayam', sales: 'Rp 540K', qty: 24, trend: 'down' },
  ];

  const hourlyData = [
    { hour: '09:00', amount: 150 },
    { hour: '12:00', amount: 450 },
    { hour: '15:00', amount: 280 },
    { hour: '18:00', amount: 520 },
    { hour: '21:00', amount: 380 },
  ];

  const maxAmount = Math.max(...hourlyData.map(d => d.amount));

  return (
    <MobileScreenContainer>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 pb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-1 text-white text-sm">
              <Clock size={16} />
              <span>Live</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Monday, Jan 27, 2026</p>
        </div>

        {/* Stats Grid */}
        <div className="px-4 -mt-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 shadow-lg"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{stat.labelId}</div>
                  <div className="text-xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp size={14} className="text-green-500" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500" />
                    )}
                    <span 
                      className={`text-xs font-semibold ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs yesterday</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hourly Sales Chart */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h3 className="font-bold text-lg mb-4">Penjualan Per Jam</h3>
            <div className="flex items-end justify-between h-32 gap-2">
              {hourlyData.map((data, idx) => {
                const height = (data.amount / maxAmount) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-2">{data.hour}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h3 className="font-bold text-lg mb-4">Produk Terlaris</h3>
            <div className="space-y-3">
              {topProducts.map((product, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{product.name}</div>
                    <div className="text-xs text-gray-600">{product.qty} items</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{product.sales}</div>
                    {product.trend === 'up' ? (
                      <TrendingUp size={14} className="text-green-500 ml-auto" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-black text-white rounded-xl p-4 font-semibold text-sm active:scale-95 transition-transform">
              View Full Report
            </button>
            <button className="bg-gray-100 text-black rounded-xl p-4 font-semibold text-sm active:scale-95 transition-transform">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  );
}
