'use client';

import React from 'react';
import { MobileScreenContainer } from '../../MobileDeviceFrame';
import { Store, TrendingUp, TrendingDown, MapPin, Crown } from 'lucide-react';

/**
 * MultiStoreDashboardScreen - Compare multiple locations for Pro tier
 * Shows scaling and enterprise value
 */
export function MultiStoreDashboardScreen() {
  const stores = [
    {
      id: 1,
      name: 'Toko Pusat',
      location: 'Jakarta',
      revenue: 'Rp 15.2M',
      trend: '+18%',
      trendDir: 'up',
      orders: 342,
      status: 'active',
      topProduct: 'Nasi Goreng',
      color: '#10B981',
    },
    {
      id: 2,
      name: 'Cabang Surabaya',
      location: 'Surabaya',
      revenue: 'Rp 12.8M',
      trend: '+12%',
      trendDir: 'up',
      orders: 289,
      status: 'active',
      topProduct: 'Soto Ayam',
      color: '#3B82F6',
    },
    {
      id: 3,
      name: 'Cabang Bandung',
      location: 'Bandung',
      revenue: 'Rp 8.5M',
      trend: '-3%',
      trendDir: 'down',
      orders: 198,
      status: 'active',
      topProduct: 'Mie Ayam',
      color: '#F59E0B',
    },
  ];

  const totalRevenue = stores.reduce((sum, store) => {
    const revenue = parseFloat(store.revenue.replace('Rp ', '').replace('M', ''));
    return sum + revenue;
  }, 0);

  const totalOrders = stores.reduce((sum, store) => sum + store.orders, 0);

  return (
    <MobileScreenContainer>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Crown size={24} className="text-yellow-300" />
            <h1 className="text-2xl font-bold text-white">Multi-Store</h1>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <div className="text-white/80 text-xs mb-1">Total Pendapatan</div>
              <div className="text-white font-bold text-xl">
                Rp {totalRevenue.toFixed(1)}M
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={12} className="text-green-300" />
                <span className="text-green-300 text-xs font-semibold">+15%</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <div className="text-white/80 text-xs mb-1">Total Pesanan</div>
              <div className="text-white font-bold text-xl">{totalOrders}</div>
              <div className="text-white/60 text-xs mt-1">{stores.length} Toko Aktif</div>
            </div>
          </div>
        </div>

        {/* Store List */}
        <div className="px-4 mt-4 space-y-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Store Header */}
              <div 
                className="p-4 flex items-center justify-between"
                style={{ backgroundColor: `${store.color}10` }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: store.color }}
                  >
                    <Store size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{store.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{store.location}</span>
                    </div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>

              {/* Store Metrics */}
              <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Pendapatan</div>
                  <div className="font-bold text-xl mb-1">{store.revenue}</div>
                  <div className="flex items-center gap-1">
                    {store.trendDir === 'up' ? (
                      <TrendingUp size={14} className="text-green-500" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500" />
                    )}
                    <span 
                      className={`text-xs font-semibold ${
                        store.trendDir === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {store.trend}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">Pesanan</div>
                  <div className="font-bold text-xl mb-1">{store.orders}</div>
                  <div className="text-xs text-gray-600">minggu ini</div>
                </div>
              </div>

              {/* Top Product */}
              <div 
                className="px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: `${store.color}05` }}
              >
                <div className="text-sm text-gray-600">Produk Terlaris:</div>
                <div className="font-semibold text-sm">{store.topProduct}</div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button 
                  className="w-full py-2.5 rounded-xl font-semibold text-sm text-white active:scale-95 transition-transform"
                  style={{ backgroundColor: store.color }}
                >
                  Lihat Detail Toko
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Crown size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold">Fitur Pro Active</div>
                <div className="text-xs text-gray-600">Kelola semua toko dalam 1 akun</div>
              </div>
            </div>
            <button className="w-full bg-purple-600 text-white rounded-xl py-2.5 font-semibold text-sm active:scale-95 transition-transform">
              Tambah Toko Baru
            </button>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  );
}
