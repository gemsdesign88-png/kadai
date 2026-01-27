'use client';

import React from 'react';
import { MobileScreenContainer } from '../../MobileDeviceFrame';
import { Scan, Package } from 'lucide-react';

/**
 * QuickSaleScreen - Fast barcode scanning and checkout for Toko
 * Shows speed and efficiency value
 */
export function QuickSaleScreen() {
  const recentItems = [
    { name: 'Indomie Goreng', price: 3500, qty: 2, barcode: '089686050509' },
    { name: 'Aqua 600ml', price: 5000, qty: 1, barcode: '899999045352' },
  ];

  const quickAccess = [
    { name: 'Kopi Sachet', price: 2000, color: '#8B4513' },
    { name: 'Rokok', price: 25000, color: '#DC2626' },
    { name: 'Pulsa 10K', price: 11000, color: '#3B82F6' },
    { name: 'Token PLN', price: 21000, color: '#F59E0B' },
  ];

  const total = recentItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <MobileScreenContainer>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Kasir Cepat</h1>
          <p className="text-blue-100 text-sm">Scan barcode atau pilih produk</p>
        </div>

        {/* Barcode Scanner */}
        <div className="px-4 -mt-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="aspect-square bg-white/10 rounded-xl flex flex-col items-center justify-center mb-4 border-2 border-dashed border-white/30">
              <Scan size={64} className="text-white mb-3" />
              <p className="text-white font-semibold">Scan Barcode</p>
              <p className="text-white/60 text-sm">Atau ketik manual</p>
            </div>
            
            <input
              type="text"
              placeholder="Masukkan kode barcode..."
              className="w-full bg-white/20 border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-mono"
            />
          </div>
        </div>

        {/* Quick Access Products */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-lg mb-3">Produk Favorit</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickAccess.map((product, idx) => (
              <button
                key={idx}
                className="bg-white rounded-xl p-4 shadow-md active:scale-95 transition-transform text-left"
              >
                <div 
                  className="w-10 h-10 rounded-lg mb-2"
                  style={{ backgroundColor: `${product.color}20` }}
                >
                  <Package size={20} style={{ color: product.color }} className="m-2" />
                </div>
                <div className="font-semibold text-sm mb-1">{product.name}</div>
                <div className="font-bold text-lg" style={{ color: product.color }}>
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="px-4 mt-6">
          <h3 className="font-bold text-lg mb-3">Keranjang</h3>
          {recentItems.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {recentItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.barcode}</div>
                  </div>
                  <div className="text-center px-3">
                    <div className="text-sm text-gray-600">x{item.qty}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-500">
                      @{item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Total */}
              <div className="bg-gray-50 p-4 flex items-center justify-between">
                <div className="font-bold text-lg">Total</div>
                <div className="font-bold text-2xl text-blue-600">
                  Rp {total.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <Package size={48} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">Belum ada produk</p>
            </div>
          )}
        </div>

        {/* Checkout Button */}
        {recentItems.length > 0 && (
          <div className="px-4 mt-6">
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl py-4 font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
              <span>Bayar Sekarang</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </button>
          </div>
        )}
      </div>
    </MobileScreenContainer>
  );
}
