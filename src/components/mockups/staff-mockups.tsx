"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

// Staff List, Staff Detail, Attendance, Performance mockups
export function StaffListMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Team Management', 'Manajemen Tim', '团队管理')}</h3>
          <p className="text-sm text-gray-600 mt-1">12 {t('staff members', 'staff', '员工')}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Budi Santoso', role: t('Cashier', 'Kasir', '收银员'), status: 'active', avatar: '👨‍💼' },
            { name: 'Sarah Putri', role: t('Chef', 'Koki', '厨师'), status: 'active', avatar: '👩‍🍳' },
            { name: 'Ahmad Rizki', role: t('Waiter', 'Pelayan', '服务员'), status: 'active', avatar: '👨‍🍳' },
            { name: 'Dewi Lestari', role: t('Waiter', 'Pelayan', '服务员'), status: 'offline', avatar: '👩‍💼' },
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
                {staff.status === 'active' ? (t('Active', 'Aktif', '活跃')) : 'Offline'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StaffDetailMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
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
          <p className="text-sm text-gray-600 mt-1">{t('Cashier', 'Kasir', '收银员')}</p>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-xs text-gray-600 mb-2">{t('Performance This Month', 'Performa Bulan Ini', '本月表现')}</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">248</p>
                <p className="text-xs text-gray-600">{t('Orders', 'Pesanan', '订单')}</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-2xl font-bold text-green-600">4.8</p>
                <p className="text-xs text-gray-600">{t('Rating', 'Rating', '评分')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">22</p>
                <p className="text-xs text-gray-600">{t('Days', 'Hari', '天数')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="font-bold text-gray-900 mb-3">{t('Work Schedule', 'Jadwal Kerja', '工作安排')}</p>
            <div className="space-y-2">
              {[t('Mon', 'Sen', '周一'), t('Tue', 'Sel', '周二'), t('Wed', 'Rab', '周三'), t('Thu', 'Kam', '周四'), t('Fri', 'Jum', '周五')].map((day, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-semibold">{day}</span>
                  <span className="text-gray-900 font-bold">08:00 - 17:00</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 bg-white border-2 border-amber-200 text-amber-700 rounded-xl font-bold">
              {t('Edit', 'Edit', '编辑')}
            </button>
            <button className="py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold">
              {t('Schedule', 'Jadwal', '排班')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AttendanceMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Attendance', 'Kehadiran', '考勤')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Today - December 3, 2025', 'Hari Ini - 3 Desember 2025', '今天 - 2025年12月3日')}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-green-600">10</p>
            <p className="text-xs text-gray-600 mt-1">{t('Present', 'Hadir', '出勤')}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-red-600">1</p>
            <p className="text-xs text-gray-600 mt-1">{t('Absent', 'Absen', '缺勤')}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 text-center">
            <p className="text-2xl font-bold text-amber-600">1</p>
            <p className="text-xs text-gray-600 mt-1">{t('Late', 'Terlambat', '迟到')}</p>
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
  const t = getMockupTranslator(language)
  
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
          <h3 className="text-2xl font-bold text-gray-900">{t('Performance Ranking', 'Ranking Performa', '绩效排名')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('This month', 'Bulan ini', '本月')}</p>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Sarah Putri', role: t('Chef', 'Koki', '厨师'), score: 98, orders: 342, avatar: '👩‍🍳', rank: 1 },
            { name: 'Budi Santoso', role: t('Cashier', 'Kasir', '收银员'), score: 95, orders: 248, avatar: '👨‍💼', rank: 2 },
            { name: 'Ahmad Rizki', role: t('Waiter', 'Pelayan', '服务员'), score: 92, orders: 189, avatar: '👨‍🍳', rank: 3 },
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
                <p className="text-xs text-gray-600">{staff.role} • {staff.orders} {t('orders', 'pesanan', '订单')}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600">{staff.score}</p>
                <p className="text-xs text-gray-600">{t('score', 'skor', '分数')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
