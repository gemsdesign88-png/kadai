"use client"
import * as React from "react"
import { motion } from "framer-motion"

export function GeneralSettingsMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Settings' : 'Pengaturan'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'General' : 'Umum'}</p>
        </div>
        <div className="space-y-4">
          {[
            { icon: '🏪', label: isEnglish ? 'Restaurant Info' : 'Info Restoran', value: isEnglish ? 'Update details' : 'Update info' },
            { icon: '👤', label: isEnglish ? 'User Profile' : 'Profil User', value: isEnglish ? 'Manage account' : 'Kelola akun' },
            { icon: '🌐', label: isEnglish ? 'Language' : 'Bahasa', value: 'English' },
            { icon: '💰', label: isEnglish ? 'Currency' : 'Mata Uang', value: 'IDR (Rp)' },
            { icon: '🔔', label: isEnglish ? 'Notifications' : 'Notifikasi', value: isEnglish ? 'Enabled' : 'Aktif' },
            { icon: '🎨', label: isEnglish ? 'Theme' : 'Tema', value: isEnglish ? 'Customize' : 'Sesuaikan' },
            { icon: '🔗', label: isEnglish ? 'Integrations' : 'Integrasi', value: isEnglish ? '3 connected' : '3 terhubung' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">{item.icon}</div>
                <div>
                  <p className="font-bold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.value}</p>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function RestaurantInfoMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Restaurant Info' : 'Info Restoran'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Update details' : 'Perbarui info'}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Restaurant Name' : 'Nama Restoran'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">Warung Makan Berkah</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Address' : 'Alamat'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">Jl. Sudirman No. 123, Jakarta</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Phone Number' : 'Nomor Telepon'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">+62 812-3456-7890</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Operating Hours' : 'Jam Operasional'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">09:00 - 22:00</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Table Count' : 'Jumlah Meja'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">20 {isEnglish ? 'tables' : 'meja'}</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg">
          {isEnglish ? 'Save Changes' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  )
}

export function UserProfileMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
            👤
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'User Profile' : 'Profil User'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Manage your account' : 'Kelola akun Anda'}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Full Name' : 'Nama Lengkap'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">Ahmad Budiman</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Email</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">ahmad@restaurant.com</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Role' : 'Peran'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">{isEnglish ? 'Owner / Admin' : 'Pemilik / Admin'}</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{isEnglish ? 'Password' : 'Kata Sandi'}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">••••••••</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-6">
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg">
            {isEnglish ? 'Update Profile' : 'Perbarui Profil'}
          </button>
          <button className="w-full py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-bold">
            {isEnglish ? 'Change Password' : 'Ubah Kata Sandi'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function IntegrationsMockup({ color, language }: { color: string; language: string }) {
  const isEnglish = language === 'en'
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Integrations' : 'Integrasi'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Connected services' : 'Layanan terhubung'}</p>
        </div>
        <div className="space-y-3">
          {[
            { name: 'QRIS Payment', icon: '💳', status: 'connected', color: 'green' },
            { name: 'WhatsApp Business', icon: '💬', status: 'connected', color: 'green' },
            { name: 'Google Analytics', icon: '📊', status: 'connected', color: 'green' },
            { name: 'Email Marketing', icon: '📧', status: 'available', color: 'gray' },
            { name: 'Delivery Apps', icon: '🛵', status: 'available', color: 'gray' },
          ].map((integration, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">{integration.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900">{integration.name}</p>
                    <p className={`text-xs mt-0.5 font-semibold ${
                      integration.status === 'connected' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {integration.status === 'connected' ? (isEnglish ? 'Connected' : 'Terhubung') : (isEnglish ? 'Available' : 'Tersedia')}
                    </p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg font-bold text-sm ${
                  integration.status === 'connected' 
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {integration.status === 'connected' ? (isEnglish ? 'Disconnect' : 'Putuskan') : (isEnglish ? 'Connect' : 'Hubungkan')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}