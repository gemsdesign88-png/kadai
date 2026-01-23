"use client"
import * as React from "react"
import { motion } from "framer-motion"

export function QRMenuDisplayMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'QR Menu' : 'Menu QR'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table 5' : 'Meja 5'}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-4">
          <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="text-6xl">📱</div>
          </div>
          <p className="text-center text-sm font-bold text-gray-900 mb-2">{isEnglish ? 'Scan to View Menu' : 'Scan untuk Lihat Menu'}</p>
          <p className="text-center text-xs text-gray-600">{isEnglish ? 'Or visit: menu.kadai.id/t5' : 'Atau kunjungi: menu.kadai.id/t5'}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">✨</div>
            <div className="flex-1">
              <p className="font-bold text-blue-900 text-sm">{isEnglish ? 'Benefits' : 'Keuntungan'}</p>
              <ul className="text-xs text-blue-700 mt-2 space-y-1">
                <li>• {isEnglish ? 'Contactless ordering' : 'Pesan tanpa kontak'}</li>
                <li>• {isEnglish ? 'Real-time menu' : 'Menu real-time'}</li>
                <li>• {isEnglish ? 'Multiple languages' : 'Multi bahasa'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QRMenuCustomerMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Digital Menu' : 'Menu Digital'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table 5' : 'Meja 5'}</p>
        </div>
        <div className="flex gap-2 mb-4">
          {[isEnglish ? 'All' : 'Semua', isEnglish ? 'Food' : 'Makanan', isEnglish ? 'Drinks' : 'Minuman'].map((cat, i) => (
            <button key={i} className={`px-4 py-2 rounded-full text-sm font-bold ${i === 0 ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>{cat}</button>
          ))}
        </div>
        <div className="space-y-3">
          {[
            { name: 'Nasi Goreng Spesial', price: 25, image: '🍚', desc: 'Special fried rice' },
            { name: 'Mie Goreng', price: 22, image: '🍜', desc: 'Fried noodles' },
            { name: 'Es Teh Manis', price: 5, image: '🥤', desc: 'Sweet iced tea' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">{item.image}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  <p className="text-lg font-bold text-purple-600 mt-1">Rp {item.price}k</p>
                </div>
              </div>
              <button className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-bold text-xl">+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function QROrderCartMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Your Order' : 'Pesanan Anda'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table 5' : 'Meja 5'}</p>
        </div>
        <div className="space-y-3 mb-4">
          {[
            { name: 'Nasi Goreng Spesial', qty: 2, price: 50 },
            { name: 'Es Teh Manis', qty: 3, price: 15 },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-900 flex-1">{item.name}</p>
                <button className="text-red-500 text-xl">×</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 bg-gray-100 rounded-full font-bold">-</button>
                  <span className="font-bold text-gray-900 w-8 text-center">{item.qty}</span>
                  <button className="w-7 h-7 bg-purple-600 text-white rounded-full font-bold">+</button>
                </div>
                <span className="font-bold text-gray-900">Rp {item.price}k</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold">Rp 65k</span>
          </div>
          <button className="w-full py-3 bg-white text-purple-600 rounded-lg font-bold">
            {isEnglish ? 'Send to Kitchen' : 'Kirim ke Dapur'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function QRAnalyticsMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'QR Analytics' : 'Analitik QR'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'This week' : 'Minggu ini'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: isEnglish ? 'Scans' : 'Scan', value: '124', icon: '📱' },
            { label: isEnglish ? 'Orders' : 'Pesanan', value: '89', icon: '🛒' },
            { label: isEnglish ? 'Conv. Rate' : 'Konversi', value: '72%', icon: '📊' },
            { label: isEnglish ? 'Avg Order' : 'Rata-rata', value: 'Rp 45k', icon: '💰' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-purple-600">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">{isEnglish ? 'Scans by Day' : 'Scan per Hari'}</p>
          <div className="flex items-end justify-between h-32 gap-2">
            {[50, 65, 72, 85, 78, 90, 82].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg" style={{ height: `${height}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}