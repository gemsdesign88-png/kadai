"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function PaymentCheckoutMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Payment' : 'Pembayaran'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table 5 - 3 items' : 'Meja 5 - 3 item'}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-4">
          <div className="space-y-3">
            {[
              { name: "Nasi Goreng Spesial", qty: 2, price: 50000 },
              { name: "Es Teh Manis", qty: 2, price: 10000 },
              { name: "Ayam Geprek", qty: 1, price: 20000 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.qty}x {item.name}</span>
                <span className="font-bold text-gray-900">Rp {item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">Rp 80.000</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{isEnglish ? 'Tax (10%)' : 'Pajak (10%)'}</span>
              <span className="font-semibold text-gray-900">Rp 8.000</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-pink-600">Rp 88.000</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700 mb-3">{isEnglish ? 'Payment Method' : 'Metode Pembayaran'}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Cash", icon: "💵", selected: true },
              { name: "QRIS", icon: "📱", selected: false },
              { name: "Debit", icon: "💳", selected: false },
              { name: "Transfer", icon: "🏦", selected: false },
            ].map((method, i) => (
              <div key={i} className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-2 ${
                method.selected ? 'bg-pink-50 border-pink-500' : 'bg-white border-gray-200'
              }`}>
                <span className="text-2xl">{method.icon}</span>
                <span className={`text-xs font-bold ${method.selected ? 'text-pink-600' : 'text-gray-600'}`}>{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-bold shadow-lg">
          {isEnglish ? 'Process Payment' : 'Proses Pembayaran'}
        </button>
      </div>
    </div>
  )
}

export function SplitBillMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Split Bill' : 'Bagi Tagihan'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table 5' : 'Meja 5'}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4 text-center">
          <p className="text-sm text-gray-600 mb-1">{isEnglish ? 'Total Bill' : 'Total Tagihan'}</p>
          <p className="text-3xl font-black text-gray-900">Rp 88.000</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold text-gray-700 mb-3">{isEnglish ? 'Split Options' : 'Opsi Pembagian'}</p>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 4, 5].map((num, i) => (
              <div key={i} className={`p-3 rounded-xl border-2 cursor-pointer text-center ${
                num === 3 ? 'bg-pink-50 border-pink-500' : 'bg-white border-gray-200'
              }`}>
                <p className="text-2xl font-bold text-gray-900">{num}</p>
                <p className={`text-xs mt-1 ${num === 3 ? 'text-pink-600 font-bold' : 'text-gray-600'}`}>
                  {isEnglish ? 'people' : 'orang'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-pink-200 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">{isEnglish ? 'Per Person' : 'Per Orang'}</p>
            <p className="text-3xl font-black text-pink-600">Rp 29.333</p>
          </div>
          <div className="mt-3 pt-3 border-t border-pink-200 flex items-center justify-between text-sm">
            <span className="text-gray-600">{isEnglish ? 'Split into' : 'Dibagi menjadi'}</span>
            <span className="font-bold text-gray-900">3 {isEnglish ? 'payments' : 'pembayaran'}</span>
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-bold shadow-lg">
          {isEnglish ? 'Proceed Split Payment' : 'Lanjut Bagi Pembayaran'}
        </button>
      </div>
    </div>
  )
}

export function QRISPaymentMockup({ color, language }: { color: string; language: string }) {
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
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'QRIS Payment' : 'Pembayaran QRIS'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Table 5' : 'Meja 5'}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-4 text-center">
          <p className="text-sm text-gray-600 mb-2">{isEnglish ? 'Amount to Pay' : 'Jumlah Bayar'}</p>
          <p className="text-3xl font-black text-pink-600 mb-4">Rp 88.000</p>
          
          <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="text-6xl">📱</div>
          </div>
          
          <p className="text-xs text-gray-600">{isEnglish ? 'Scan with any e-wallet app' : 'Scan dengan aplikasi e-wallet'}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg">⏱️</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-blue-900">{isEnglish ? 'Waiting for payment...' : 'Menunggu pembayaran...'}</p>
              <p className="text-xs text-blue-700">03:45</p>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold">
          {isEnglish ? 'Cancel' : 'Batal'}
        </button>
      </div>
    </div>
  )
}

export function ReceiptMockup({ color, language }: { color: string; language: string }) {
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
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Payment Success!' : 'Pembayaran Berhasil!'}</h3>
          <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'December 3, 2025 14:30' : '3 Desember 2025 14:30'}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-4">
          <div className="border-b border-dashed border-gray-300 pb-3 mb-3">
            <p className="font-bold text-gray-900 mb-2">KadaiPOS Restaurant</p>
            <p className="text-xs text-gray-600">Jl. Example No. 123</p>
            <p className="text-xs text-gray-600">Jakarta, Indonesia</p>
          </div>

          <div className="space-y-2 border-b border-dashed border-gray-300 pb-3 mb-3">
            {[
              { name: "Nasi Goreng Spesial", qty: 2, price: 50000 },
              { name: "Es Teh Manis", qty: 2, price: 10000 },
              { name: "Ayam Geprek", qty: 1, price: 20000 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-700">{item.qty}x {item.name}</span>
                <span className="text-gray-900">{item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 text-xs mb-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">80.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{isEnglish ? 'Tax' : 'Pajak'} (10%)</span>
              <span className="text-gray-900">8.000</span>
            </div>
          </div>

          <div className="flex justify-between font-bold border-t border-gray-300 pt-3">
            <span className="text-gray-900">Total</span>
            <span className="text-pink-600">Rp 88.000</span>
          </div>

          <div className="mt-3 pt-3 border-t border-dashed border-gray-300 text-xs">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">{isEnglish ? 'Payment' : 'Pembayaran'}</span>
              <span className="text-gray-900">Cash</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{isEnglish ? 'Table' : 'Meja'}</span>
              <span className="text-gray-900">5</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-white border-2 border-pink-200 text-pink-700 rounded-xl font-bold text-sm">
            {isEnglish ? 'Print' : 'Cetak'}
          </button>
          <button className="py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-bold text-sm">
            {isEnglish ? 'Send Email' : 'Kirim Email'}
          </button>
        </div>
      </div>
    </div>
  )
}
