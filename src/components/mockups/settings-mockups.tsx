"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { getMockupTranslator } from "./mockup-i18n"

export function GeneralSettingsMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Settings', 'Pengaturan', '设置')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('General', 'Umum', '常规')}</p>
        </div>
        <div className="space-y-4">
          {[
            { icon: '🏪', label: t('Store Info', 'Info Toko', '店铺信息'), value: t('Update details', 'Update info', '更新详情') },
            { icon: '👤', label: t('User Profile', 'Profil User', '用户资料'), value: t('Manage account', 'Kelola akun', '管理账户') },
            { icon: '🌐', label: t('Language', 'Bahasa', '语言'), value: t('English', 'Bahasa Indonesia', '中文') },
            { icon: '💰', label: t('Currency', 'Mata Uang', '货币'), value: 'IDR (Rp)' },
            { icon: '🔔', label: t('Notifications', 'Notifikasi', '通知'), value: t('Enabled', 'Aktif', '已启用') },
            { icon: '🎨', label: t('Theme', 'Tema', '主题'), value: t('Customize', 'Sesuaikan', '自定义') },
            { icon: '🔗', label: t('Integrations', 'Integrasi', '集成'), value: t('3 connected', '3 terhubung', '3 个已连接') },
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

export function StoreInfoMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Store Info', 'Info Toko', '店铺信息')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Update details', 'Perbarui info', '更新详情')}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Store Name', 'Nama Toko', '店铺名称')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">Kadai Kopi Berkah</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Address', 'Alamat', '地址')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">Jl. Sudirman No. 123, Jakarta</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Phone Number', 'Nomor Telepon', '电话号码')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">+62 812-3456-7890</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Operating Hours', 'Jam Operasional', '营业时间')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">09:00 - 22:00</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Table Count', 'Jumlah Meja', '桌子数量')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">20 {t('tables', 'meja', '张桌子')}</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg">
          {t('Save Changes', 'Simpan Perubahan', '保存更改')}
        </button>
      </div>
    </div>
  )
}

export function UserProfileMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
            👤
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{t('User Profile', 'Profil User', '用户资料')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Manage your account', 'Kelola akun Anda', '管理您的账户')}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Full Name', 'Nama Lengkap', '全名')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">Ahmad Budiman</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Email</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">ahmad@kadaipos.id</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Role', 'Peran', '角色')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="font-semibold text-gray-900">{t('Owner / Admin', 'Pemilik / Admin', '所有者 / 管理员')}</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">{t('Password', 'Kata Sandi', '密码')}</label>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <p className="text-sm text-gray-900">••••••••</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-6">
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg">
            {t('Update Profile', 'Perbarui Profil', '更新资料')}
          </button>
          <button className="w-full py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-bold">
            {t('Change Password', 'Ubah Kata Sandi', '更改密码')}
          </button>
        </div>
      </div>
    </div>
  )
}

export function IntegrationsMockup({ color, language }: { color: string; language: string }) {
  const t = getMockupTranslator(language)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-[4/5] rounded-3xl p-8 shadow-2xl border" style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderColor: `${color}30` }}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('Integrations', 'Integrasi', '集成')}</h3>
          <p className="text-sm text-gray-600 mt-1">{t('Connected services', 'Layanan terhubung', '已连接的服务')}</p>
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
                      {integration.status === 'connected' ? (t('Connected', 'Terhubung', '已连接')) : (t('Available', 'Tersedia', '可用'))}
                    </p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg font-bold text-sm ${
                  integration.status === 'connected' 
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {integration.status === 'connected' ? (t('Disconnect', 'Putuskan', '断开连接')) : (t('Connect', 'Hubungkan', '连接'))}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}