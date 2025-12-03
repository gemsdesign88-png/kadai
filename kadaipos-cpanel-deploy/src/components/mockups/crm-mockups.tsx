"use client"
import * as React from "react"
import { motion } from "framer-motion"

export function CustomerListMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Customer List' : 'Daftar Pelanggan'}</h3>
          <p className="text-sm text-gray-600 mt-1">248 {isEnglish ? 'customers' : 'pelanggan'}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-4">
          <input type="text" placeholder={isEnglish ? "Search customers..." : "Cari pelanggan..."} className="w-full text-sm text-gray-900 outline-none" />
        </div>
        <div className="space-y-3">
          {[
            { name: 'Ahmad Rizki', visits: 24, spent: '2.4M', tier: 'Gold', avatar: '👨‍💼' },
            { name: 'Sarah Putri', visits: 18, spent: '1.8M', tier: 'Silver', avatar: '👩‍💼' },
            { name: 'Budi Santoso', visits: 12, spent: '1.2M', tier: 'Bronze', avatar: '👨' },
          ].map((customer, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                {customer.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900">{customer.name}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    customer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    customer.tier === 'Silver' ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>{customer.tier}</span>
                </div>
                <p className="text-xs text-gray-600">{customer.visits} {isEnglish ? 'visits' : 'kunjungan'} • Rp {customer.spent}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CustomerDetailMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
            👨‍💼
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Ahmad Rizki</h3>
          <p className="text-sm text-gray-600 mt-1">ahmad@email.com</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: isEnglish ? 'Visits' : 'Kunjungan', value: '24' },
            { label: isEnglish ? 'Spent' : 'Total', value: 'Rp 2.4M' },
            { label: isEnglish ? 'Points' : 'Poin', value: '1,240' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
              <p className="text-xl font-bold text-purple-600">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="font-bold text-gray-900 mb-3">{isEnglish ? 'Recent Orders' : 'Pesanan Terakhir'}</p>
          <div className="space-y-2">
            {[
              { date: 'Dec 2', items: 3, total: '120k' },
              { date: 'Nov 28', items: 2, total: '85k' },
              { date: 'Nov 25', items: 4, total: '145k' },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-gray-900">{order.date}</p>
                  <p className="text-xs text-gray-600">{order.items} {isEnglish ? 'items' : 'item'}</p>
                </div>
                <span className="font-bold text-gray-900">Rp {order.total}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👑</span>
            <span className="font-bold text-yellow-900">{isEnglish ? 'Gold Member' : 'Member Gold'}</span>
          </div>
          <p className="text-xs text-yellow-800">{isEnglish ? '20% discount on all orders' : 'Diskon 20% semua pesanan'}</p>
        </div>
      </div>
    </div>
  )
}

export function LoyaltyProgramMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Loyalty Program' : 'Program Loyalitas'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Membership Tiers' : 'Tingkat Member'}</p>
        </div>
        <div className="space-y-3">
          {[
            { tier: 'Gold', icon: '👑', color: 'from-yellow-400 to-yellow-600', discount: '20%', min: 'Rp 2M', members: 45 },
            { tier: 'Silver', icon: '⭐', color: 'from-gray-300 to-gray-500', discount: '15%', min: 'Rp 1M', members: 78 },
            { tier: 'Bronze', icon: '🥉', color: 'from-orange-400 to-orange-600', discount: '10%', min: 'Rp 500k', members: 125 },
          ].map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-5 shadow-lg bg-gradient-to-br ${tier.color} text-white`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{tier.icon}</span>
                    <p className="text-xl font-bold">{tier.tier}</p>
                  </div>
                  <p className="text-sm opacity-90">{isEnglish ? 'Minimum spend:' : 'Min. belanja:'} {tier.min}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">{tier.discount}</p>
                  <p className="text-xs opacity-90">{isEnglish ? 'discount' : 'diskon'}</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 mt-3">
                <p className="text-xs font-semibold">{tier.members} {isEnglish ? 'members' : 'anggota'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CustomerInsightsCRMMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Customer Insights' : 'Insight Pelanggan'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Overview' : 'Ringkasan'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: isEnglish ? 'Total' : 'Total', value: '248', icon: '👥' },
            { label: isEnglish ? 'New (30d)' : 'Baru (30h)', value: '45', icon: '✨' },
            { label: isEnglish ? 'Returning' : 'Kembali', value: '78%', icon: '🔄' },
            { label: isEnglish ? 'Avg Spend' : 'Rata-rata', value: 'Rp 52k', icon: '💰' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-purple-600">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <p className="font-bold text-gray-900 mb-3">{isEnglish ? 'Customer Growth' : 'Pertumbuhan Pelanggan'}</p>
          <div className="flex items-end justify-between h-32 gap-2">
            {[65, 72, 85, 90, 95, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"></motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <p className="font-bold text-gray-900 mb-3">{isEnglish ? 'Top Customers' : 'Pelanggan Teratas'}</p>
          <div className="space-y-2">
            {[
              { name: 'Ahmad Rizki', spent: '2.4M' },
              { name: 'Sarah Putri', spent: '1.8M' },
              { name: 'Budi Santoso', spent: '1.2M' },
            ].map((customer, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-900 font-semibold">{customer.name}</span>
                <span className="font-bold text-purple-600">Rp {customer.spent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}