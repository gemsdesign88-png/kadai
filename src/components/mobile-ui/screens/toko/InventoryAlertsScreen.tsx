'use client';

import React from 'react';
import { MobileScreenContainer } from '../../MobileDeviceFrame';
import { AlertTriangle, TrendingUp, Package, ShoppingCart, Bell } from 'lucide-react';

/**
 * InventoryAlertsScreen - Shows stock alerts and inventory management
 * High-value screen for Toko businesses
 */
export function InventoryAlertsScreen() {
  const lowStockItems = [
    { 
      name: 'Indomie Goreng', 
      stock: 8, 
      unit: 'pcs',
      minStock: 20,
      category: 'Food',
      lastRestock: '3 days ago',
      reorderSuggestion: 50,
      urgency: 'high'
    },
    { 
      name: 'Aqua 600ml', 
      stock: 15, 
      unit: 'btl',
      minStock: 30,
      category: 'Beverage',
      lastRestock: '1 day ago',
      reorderSuggestion: 100,
      urgency: 'medium'
    },
    { 
      name: 'Tissue Pack', 
      stock: 5, 
      unit: 'pack',
      minStock: 15,
      category: 'Supplies',
      lastRestock: '5 days ago',
      reorderSuggestion: 30,
      urgency: 'high'
    },
  ];

  const fastMoving = [
    { name: 'Kopi Sachet', sold: 145, profit: 'Rp 435K', margin: '35%' },
    { name: 'Teh Botol', sold: 128, profit: 'Rp 384K', margin: '28%' },
    { name: 'Rokok Sampoerna', sold: 96, profit: 'Rp 192K', margin: '15%' },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <MobileScreenContainer>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Inventory</h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Bell size={20} className="text-white" />
            </div>
          </div>
          
          {/* Alert Summary */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">3 Items Low Stock</div>
                <div className="text-white/80 text-sm">Reorder sekarang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="px-4 mt-4">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            Stok Menipis
          </h3>
          
          <div className="space-y-3">
            {lowStockItems.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-4 border-2 ${getUrgencyColor(item.urgency)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{item.name}</h4>
                    <div className="text-xs opacity-60">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl">{item.stock}</div>
                    <div className="text-xs">{item.unit}</div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Min. Stock:</span>
                    <span className="font-semibold">{item.minStock} {item.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Restock:</span>
                    <span className="font-semibold">{item.lastRestock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suggestion:</span>
                    <span className="font-bold text-green-600">Order {item.reorderSuggestion} {item.unit}</span>
                  </div>
                </div>

                <button className="w-full mt-3 bg-black text-white rounded-xl py-2.5 font-semibold text-sm active:scale-95 transition-transform">
                  Reorder Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Moving Products */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-500" />
            Produk Laris (7 hari terakhir)
          </h3>
          
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="space-y-3">
              {fastMoving.map((product, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600">{product.sold} sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-green-600">{product.profit}</div>
                    <div className="text-xs text-gray-600">{product.margin} margin</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 font-semibold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Package size={18} />
              Stock In
            </button>
            <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 font-semibold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              View All
            </button>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  );
}
