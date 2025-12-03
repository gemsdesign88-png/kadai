#!/bin/bash

# Kitchen Mockups
cat > src/components/mockups/kitchen-mockups.tsx << 'EOF'
"use client"
import * as React from "react"
import { motion } from "framer-motion"

export function KitchenQueueMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Kitchen Queue' : 'Antrian Dapur'}</h3>
          <p className="text-sm text-gray-600 mt-1">8 {isEnglish ? 'items to prepare' : 'item harus dibuat'}</p>
        </div>
        <div className="space-y-3">
          {[
            { order: '#1842', table: 5, item: 'Nasi Goreng', qty: 2, time: '2m', priority: 'high' },
            { order: '#1843', table: 12, item: 'Mie Goreng', qty: 1, time: '5m', priority: 'normal' },
            { order: '#1844', table: 8, item: 'Ayam Bakar', qty: 3, time: '1m', priority: 'high' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-4 shadow-md border-2 ${item.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-500">{item.order}</span>
                    <span className="text-xs font-bold text-gray-500">•</span>
                    <span className="text-xs font-bold text-gray-500">{isEnglish ? 'Table' : 'Meja'} {item.table}</span>
                  </div>
                  <p className="font-bold text-gray-900">{item.item}</p>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Qty' : 'Jml'}: {item.qty}</p>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${item.priority === 'high' ? 'text-red-600' : 'text-gray-600'}`}>{item.time}</div>
                  {item.priority === 'high' && <span className="text-xs font-bold text-red-600 mt-1 inline-block">URGENT</span>}
                </div>
              </div>
              <button className={`w-full py-2 rounded-lg font-bold mt-2 ${item.priority === 'high' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'}`}>
                {isEnglish ? 'Mark Ready' : 'Tandai Siap'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OrderDetailKitchenMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Order' : 'Pesanan'} #1842</h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">{isEnglish ? 'Cooking' : 'Memasak'}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table' : 'Meja'} 5 • 2 {isEnglish ? 'min ago' : 'menit lalu'}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 mb-4">
          <h4 className="font-bold text-gray-900 mb-4">{isEnglish ? 'Main Course' : 'Makanan Utama'}</h4>
          <div className="space-y-3">
            {[
              { name: 'Nasi Goreng Spesial', qty: 2, notes: isEnglish ? 'Extra spicy' : 'Lebih pedas', time: '5m' },
              { name: 'Mie Goreng', qty: 1, notes: isEnglish ? 'No vegetables' : 'Tanpa sayuran', time: '4m' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">{item.qty}</div>
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-amber-600 mt-1">⏱ {item.time}</p>
                    </div>
                  </div>
                </div>
                {item.notes && <p className="text-xs text-gray-600 bg-yellow-50 rounded px-2 py-1 mt-2">📝 {item.notes}</p>}
              </div>
            ))}
          </div>
        </div>
        <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold shadow-lg">
          {isEnglish ? 'Mark All Ready' : 'Tandai Semua Siap'}
        </button>
      </div>
    </div>
  )
}

export function ReadyItemsMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Ready for Pickup' : 'Siap Diambil'}</h3>
          <p className="text-sm text-gray-600 mt-1">5 {isEnglish ? 'orders ready' : 'pesanan siap'}</p>
        </div>
        <div className="space-y-3">
          {[
            { order: '#1840', table: 3, items: 3, time: '2m', waiter: 'Budi' },
            { order: '#1841', table: 7, items: 2, time: '1m', waiter: 'Sarah' },
            { order: '#1839', table: 12, items: 4, time: '5m', waiter: 'Ahmad' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 shadow-md border-2 border-green-300">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{item.order}</span>
                    <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded-full text-xs font-bold">✓ {isEnglish ? 'READY' : 'SIAP'}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table' : 'Meja'} {item.table} • {item.items} {isEnglish ? 'items' : 'item'}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">{item.time}</div>
                  <p className="text-xs text-gray-600">{item.waiter}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-green-200">
                <p className="text-xs text-gray-600">{isEnglish ? 'Waiting for waiter pickup' : 'Menunggu pelayan mengambil'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function KitchenStatsMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Kitchen Performance' : 'Performa Dapur'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Today' : 'Hari Ini'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: isEnglish ? 'Orders Done' : 'Selesai', value: '48', color: 'text-green-600' },
            { label: isEnglish ? 'In Queue' : 'Dalam Antrian', value: '8', color: 'text-amber-600' },
            { label: isEnglish ? 'Avg Time' : 'Rata-rata', value: '12m', color: 'text-blue-600' },
            { label: isEnglish ? 'Efficiency' : 'Efisiensi', value: '94%', color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">{isEnglish ? 'Orders by Hour' : 'Pesanan per Jam'}</p>
          <div className="flex items-end justify-between h-32 gap-2">
            {[40, 35, 50, 45, 60, 55, 48].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg"></motion.div>
                <span className="text-xs text-gray-600">{8 + i}:00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

echo "Kitchen mockups created"

