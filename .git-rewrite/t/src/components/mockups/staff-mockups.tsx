"use client"

import * as React from "react"
import { motion } from "framer-motion"

// Staff List, Staff Detail, Attendance, Performance mockups
export function StaffListMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Team Management' : 'Manajemen Tim'}</h3>
          <p className="text-sm text-gray-600 mt-1">12 {isEnglish ? 'staff members' : 'staff'}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Budi Santoso', role: isEnglish ? 'Cashier' : 'Kasir', status: 'active', avatar: '👨‍💼' },
            { name: 'Sarah Putri', role: isEnglish ? 'Chef' : 'Koki', status: 'active', avatar: '👩‍🍳' },
            { name: 'Ahmad Rizki', role: isEnglish ? 'Waiter' : 'Pelayan', status: 'active', avatar: '👨‍🍳' },
            { name: 'Dewi Lestari', role: isEnglish ? 'Waiter' : 'Pelayan', status: 'offline', avatar: '👩‍💼' },
          ].map((staff, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-2xl relative">
                  {staff.avatar}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    staff.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{staff.name}</p>
                  <p className="text-sm text-gray-600">{staff.role}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                staff.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {staff.status === 'active' ? (isEnglish ? 'Active' : 'Aktif') : 'Offline'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StaffDetailMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
            👨‍💼
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Budi Santoso</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Cashier' : 'Kasir'}</p>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-xs text-gray-600 mb-2">{isEnglish ? 'Performance This Month' : 'Performa Bulan Ini'}</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">248</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'Orders' : 'Pesanan'}</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-2xl font-bold text-green-600">4.8</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'Rating' : 'Rating'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">22</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'Days' : 'Hari'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="font-bold text-gray-900 mb-3">{isEnglish ? 'Work Schedule' : 'Jadwal Kerja'}</p>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-semibold">{day}</span>
                  <span className="text-gray-900 font-bold">08:00 - 17:00</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 bg-white border-2 border-amber-200 text-amber-700 rounded-xl font-bold">
              {isEnglish ? 'Edit' : 'Edit'}
            </button>
            <button className="py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold">
              {isEnglish ? 'Schedule' : 'Jadwal'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AttendanceMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Attendance' : 'Kehadiran'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Today - December 3, 2025' : 'Hari Ini - 3 Desember 2025'}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-green-600">10</p>
            <p className="text-xs text-gray-600 mt-1">{isEnglish ? 'Present' : 'Hadir'}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-red-600">1</p>
            <p className="text-xs text-gray-600 mt-1">{isEnglish ? 'Absent' : 'Absen'}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-amber-600">1</p>
            <p className="text-xs text-gray-600 mt-1">{isEnglish ? 'Late' : 'Terlambat'}</p>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Budi Santoso', time: '08:00', status: 'on-time' },
            { name: 'Sarah Putri', time: '08:15', status: 'late' },
            { name: 'Ahmad Rizki', time: '07:55', status: 'on-time' },
            { name: 'Dewi Lestari', time: '-', status: 'absent' },
          ].map((record, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <span className="font-semibold text-gray-900 text-sm">{record.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{record.time}</span>
                <span className={`w-2 h-2 rounded-full ${
                  record.status === 'on-time' ? 'bg-green-500' :
                  record.status === 'late' ? 'bg-amber-500' :
                  'bg-red-500'
                }`}></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PerformanceMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Performance Ranking' : 'Ranking Performa'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'This month' : 'Bulan ini'}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Sarah Putri', role: 'Chef', score: 98, orders: 342, avatar: '👩‍🍳', rank: 1 },
            { name: 'Budi Santoso', role: 'Cashier', score: 95, orders: 248, avatar: '👨‍💼', rank: 2 },
            { name: 'Ahmad Rizki', role: 'Waiter', score: 92, orders: 189, avatar: '👨‍🍳', rank: 3 },
          ].map((staff, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-4 shadow-md border-2 flex items-center gap-3 ${
                i === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300' :
                i === 1 ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300' :
                'bg-white border-orange-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black ${
                i === 0 ? 'bg-yellow-400 text-yellow-900' :
                i === 1 ? 'bg-gray-400 text-gray-900' :
                'bg-orange-400 text-orange-900'
              }`}>
                {staff.rank}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-2xl">
                {staff.avatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{staff.name}</p>
                <p className="text-xs text-gray-600">{staff.role} • {staff.orders} {isEnglish ? 'orders' : 'pesanan'}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600">{staff.score}</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'score' : 'skor'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
