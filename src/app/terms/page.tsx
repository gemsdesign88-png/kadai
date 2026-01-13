"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { ChevronDown, ChevronRight, FileText, Shield, Lock, CreditCard, Scale, Copyright, Ban, RefreshCw, Handshake, Mail } from "lucide-react"

export default function TermsPage() {
  const { language } = useLanguage()
  const isEnglish = language === "en"
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null)

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  const sections = [
    {
      id: "intro",
      icon: FileText,
      title: isEnglish ? "1. Introduction" : "1. Pendahuluan",
      content: isEnglish
        ? `Welcome to KadaiPOS (Point of Sale System). These Terms and Conditions govern your use of the KadaiPOS application for restaurant management, including ordering, payments, and daily operations.

By using this application, you agree to be bound by the following terms and conditions. If you do not agree, please discontinue use of the application.

Last updated: December 3, 2025`
        : `Selamat datang di Kadai POS (Point of Sale System). Syarat dan Ketentuan ini mengatur penggunaan aplikasi Kadai POS untuk manajemen restoran, termasuk pemesanan, pembayaran, dan operasional harian.

Dengan menggunakan aplikasi ini, Anda menyetujui untuk terikat dengan syarat dan ketentuan berikut. Jika Anda tidak setuju, harap hentikan penggunaan aplikasi.

Terakhir diperbarui: 3 Desember 2025`
    },
    {
      id: "definitions",
      icon: FileText,
      title: isEnglish ? "2. Definitions" : "2. Definisi",
      content: isEnglish
        ? `• "Application" refers to KadaiPOS, including all its features and services
• "User" is restaurant staff using the application (cashier, waiter, chef, admin)
• "Admin" is the restaurant manager with full system access
• "Services" include all functions provided by the application
• "Data" includes all information entered or processed through the application`
        : `• "Aplikasi" mengacu pada Kadai POS, termasuk semua fitur dan layanannya
• "Pengguna" adalah staf restoran yang menggunakan aplikasi (kasir, pelayan, koki, admin)
• "Admin" adalah pengelola restoran dengan akses penuh ke sistem
• "Layanan" mencakup semua fungsi yang disediakan oleh aplikasi
• "Data" mencakup semua informasi yang dimasukkan atau diproses melalui aplikasi`
    },
    {
      id: "access",
      icon: Lock,
      title: isEnglish ? "3. Access Rights & Security" : "3. Hak Akses & Keamanan",
      content: isEnglish
        ? `3.1 User Accounts:
• Each user is provided an account with role-appropriate access
• QR code login is personal and must not be shared
• Users are responsible for all activities under their account
• Passwords must be kept confidential

3.2 Security:
• System uses encryption to protect sensitive data
• Automatic logout after 30 minutes of inactivity for security
• Account will be locked after 5 failed login attempts
• Users must report suspicious activities to admin

3.3 Access Restrictions:
• Users can only access features according to their roles
• Unauthorized access to restricted areas may result in account suspension
• Admin has the right to revoke user access at any time`
        : `3.1 Akun Pengguna:
• Setiap pengguna diberikan akun dengan hak akses sesuai perannya
• QR code login bersifat pribadi dan tidak boleh dibagikan
• Pengguna bertanggung jawab atas semua aktivitas dalam akunnya
• Password harus dijaga kerahasiaannya

3.2 Keamanan:
• Sistem menggunakan enkripsi untuk melindungi data sensitif
• Logout otomatis setelah 30 menit tidak aktif untuk keamanan
• Akun akan terkunci setelah 5 kali percobaan login gagal
• Pengguna wajib melaporkan aktivitas mencurigakan kepada admin

3.3 Pembatasan Akses:
• Pengguna hanya dapat mengakses fitur sesuai peran mereka
• Akses tidak sah ke area terlarang dapat mengakibatkan penangguhan akun
• Admin berhak mencabut akses pengguna kapan saja`
    },
    {
      id: "usage",
      icon: Shield,
      title: isEnglish ? "4. Usage Terms" : "4. Ketentuan Penggunaan",
      content: isEnglish
        ? `4.1 Permitted Use:
• Process customer orders accurately
• Manage menu, tables, and inventory as authorized
• View reports and analytics according to access rights
• Use internal communication features for team coordination

4.2 Prohibited Use:
• Manipulate transaction data or financial reports
• Use system for personal transactions unrelated to business
• Share login access with unauthorized parties
• Use application for illegal purposes or violate laws
• Damage, disrupt, or exploit the system
• Access data beyond your permissions

4.3 User Responsibilities:
• Ensure accuracy of entered data
• Report bugs or system errors immediately
• Maintain devices used in good condition
• Follow restaurant standard operating procedures`
        : `4.1 Penggunaan yang Diizinkan:
• Memproses pesanan pelanggan secara akurat
• Mengelola menu, meja, dan inventaris sesuai otorisasi
• Melihat laporan dan analitik sesuai hak akses
• Menggunakan fitur komunikasi internal untuk koordinasi tim

4.2 Penggunaan yang Dilarang:
• Memanipulasi data transaksi atau laporan keuangan
• Menggunakan sistem untuk transaksi pribadi yang tidak terkait bisnis
• Membagikan akses login ke pihak tidak berwenang
• Menggunakan aplikasi untuk tujuan ilegal atau melanggar hukum
• Merusak, mengganggu, atau mengeksploitasi sistem
• Mengakses data yang bukan haknya

4.3 Tanggung Jawab Pengguna:
• Memastikan akurasi data yang dimasukkan
• Melaporkan bug atau kesalahan sistem segera
• Menjaga perangkat yang digunakan dalam kondisi baik
• Mengikuti prosedur operasional standar restoran`
    },
    {
      id: "payment",
      icon: CreditCard,
      title: isEnglish ? "6. Transactions & Payments" : "6. Transaksi & Pembayaran",
      content: isEnglish
        ? `6.1 Payment Methods:
KadaiPOS supports various methods:
• Cash
• Debit/Credit Cards
• Bank Transfer
• E-wallets (GoPay, OVO, Dana, ShopeePay)
• QRIS

6.2 Transaction Responsibilities:
• Users must verify order details before confirmation
• All transactions are recorded and cannot be modified without authorization
• Cancellations or refunds must follow established procedures
• Cashiers are responsible for payment accuracy

6.3 Payment Security:
• Credit card data is not stored in our system
• Digital payments processed through secure gateways
• Digital receipts sent automatically after payment
• Users must report payment discrepancies immediately`
        : `6.1 Metode Pembayaran:
Kadai POS mendukung berbagai metode:
• Tunai
• Kartu Debit/Kredit
• Transfer Bank
• E-wallet (GoPay, OVO, Dana, ShopeePay)
• QRIS

6.2 Tanggung Jawab Transaksi:
• Pengguna wajib memverifikasi detail pesanan sebelum konfirmasi
• Semua transaksi dicatat dan tidak dapat diubah tanpa otorisasi
• Pembatalan atau refund harus melalui prosedur yang ditentukan
• Kasir bertanggung jawab atas keakuratan pembayaran

6.3 Keamanan Pembayaran:
• Data kartu kredit tidak disimpan di sistem kami
• Pembayaran digital diproses melalui gateway aman
• Struk digital dikirim otomatis setelah pembayaran
• Pengguna wajib melaporkan discrepancy pembayaran segera`
    },
    {
      id: "liability",
      icon: Scale,
      title: isEnglish ? "7. Liability Limitations" : "7. Batasan Tanggung Jawab",
      content: isEnglish
        ? `7.1 Service Availability:
• We strive to maintain 99.9% system uptime
• Scheduled maintenance will be announced in advance
• We are not responsible for disruptions beyond our control (natural disasters, power outages, ISP issues)

7.2 Data Accuracy:
• Users are responsible for accuracy of entered data
• We are not responsible for losses due to user input errors
• Reports and analytics provided "as is" based on available data

7.3 Damages Limitation:
• Our liability is limited to last 3 months subscription fees
• We are not responsible for lost revenue or profits
• We are not responsible for indirect or consequential damages

7.4 Force Majeure:
• We are not responsible for service failures due to force majeure (war, natural disasters, pandemics, government actions)`
        : `7.1 Ketersediaan Layanan:
• Kami berusaha menjaga sistem 99.9% uptime
• Maintenance terjadwal akan diinformasikan sebelumnya
• Kami tidak bertanggung jawab atas gangguan di luar kendali kami (bencana alam, pemadaman listrik, masalah ISP)

7.2 Akurasi Data:
• Pengguna bertanggung jawab atas keakuratan data yang dimasukkan
• Kami tidak bertanggung jawab atas kerugian akibat kesalahan input pengguna
• Laporan dan analitik disediakan "as is" berdasarkan data yang tersedia

7.3 Batasan Ganti Rugi:
• Tanggung jawab kami terbatas pada biaya langganan 3 bulan terakhir
• Kami tidak bertanggung jawab atas kehilangan pendapatan atau keuntungan
• Kami tidak bertanggung jawab atas kerusakan tidak langsung atau konsekuensial

7.4 Force Majeure:
• Kami tidak bertanggung jawab atas kegagalan layanan akibat keadaan kahar (perang, bencana alam, pandemi, tindakan pemerintah)`
    },
    {
      id: "compliance",
      icon: Scale,
      title: isEnglish ? "8. Legal Compliance" : "8. Kepatuhan Hukum",
      content: isEnglish
        ? `8.1 Taxation:
• Restaurants must comply with Indonesian tax regulations
• System provides reports for tax purposes
• Restaurants are responsible for timely tax payments

8.2 Licensing:
• Restaurants must have valid business licenses
• Application only for legal and legitimate operations
• We reserve the right to terminate service if used illegally

8.3 Consumer Protection:
• Restaurants must comply with Consumer Protection Law
• Menu prices must be clear and accurate
• Allergen and ingredient information must be available

8.4 Employment:
• Admin responsible for employment law compliance
• Work schedules and staff compensation per Labor Law`
        : `8.1 Perpajakan:
• Restoran wajib mematuhi peraturan perpajakan Indonesia
• Sistem menyediakan laporan untuk keperluan pajak
• Restoran bertanggung jawab atas pembayaran pajak yang tepat waktu

8.2 Perizinan:
• Restoran harus memiliki izin usaha yang sah
• Aplikasi hanya untuk operasional legal dan sah
• Kami berhak menghentikan layanan jika digunakan ilegal

8.3 Perlindungan Konsumen:
• Restoran wajib mematuhi UU Perlindungan Konsumen
• Harga menu harus jelas dan akurat
• Informasi alergen dan bahan harus tersedia

8.4 Ketenagakerjaan:
• Admin bertanggung jawab atas kepatuhan hukum ketenagakerjaan
• Jadwal kerja dan kompensasi staf sesuai UU Ketenagakerjaan`
    },
    {
      id: "ip",
      icon: Copyright,
      title: isEnglish ? "9. Intellectual Property Rights" : "9. Hak Kekayaan Intelektual",
      content: isEnglish
        ? `9.1 Ownership:
• KadaiPOS, logo, and all content are our property
• Users are not permitted to copy, modify, or distribute the application
• All copyrights, trademarks, and patents are protected by law

9.2 Usage License:
• We grant a limited, non-exclusive, non-transferable license
• License only for restaurant internal use
• Reverse engineering or decompiling is prohibited

9.3 Restaurant Data:
• Restaurants own the data they enter (menu, customers, transactions)
• We have the right to use anonymized aggregate data for analytics`
        : `9.1 Kepemilikan:
• Kadai POS, logo, dan semua kontennya adalah milik kami
• Pengguna tidak diizinkan menyalin, memodifikasi, atau mendistribusikan aplikasi
• Semua hak cipta, merek dagang, dan paten dilindungi hukum

9.2 Lisensi Penggunaan:
• Kami memberikan lisensi terbatas, non-eksklusif, tidak dapat dipindahtangankan
• Lisensi hanya untuk penggunaan internal restoran
• Reverse engineering atau decompiling dilarang

9.3 Data Restoran:
• Restoran memiliki data yang mereka masukkan (menu, pelanggan, transaksi)
• Kami memiliki hak menggunakan data agregat anonim untuk analitik`
    },
    {
      id: "termination",
      icon: Ban,
      title: isEnglish ? "10. Service Termination" : "10. Penghentian Layanan",
      content: isEnglish
        ? `10.1 Termination by User:
• Restaurants can terminate service anytime with 30 days notice
• Data can be exported before termination
• Subscription fees are non-refundable

10.2 Termination by Us:
We reserve the right to terminate service if:
• Violation of these terms and conditions
• Payment overdue more than 14 days
• Illegal activity or fraud detected
• Request from legal authorities

10.3 After Termination:
• Application access will be revoked
• Data will be stored 90 days for export
• After 90 days, data will be permanently deleted`
        : `10.1 Penghentian oleh Pengguna:
• Restoran dapat menghentikan layanan kapan saja dengan pemberitahuan 30 hari
• Data dapat diekspor sebelum penghentian
• Biaya berlangganan tidak dapat dikembalikan

10.2 Penghentian oleh Kami:
Kami berhak menghentikan layanan jika:
• Pelanggaran syarat dan ketentuan ini
• Pembayaran tertunggak lebih dari 14 hari
• Aktivitas ilegal atau penipuan terdeteksi
• Permintaan dari otoritas hukum

10.3 Setelah Penghentian:
• Akses ke aplikasi akan dicabut
• Data akan disimpan 90 hari untuk ekspor
• Setelah 90 hari, data akan dihapus permanen`
    },
    {
      id: "changes",
      icon: RefreshCw,
      title: isEnglish ? "11. Changes to Terms" : "11. Perubahan Syarat & Ketentuan",
      content: isEnglish
        ? `We reserve the right to modify these Terms and Conditions at any time:
• Changes will be notified 30 days in advance via email and app notifications
• Continued use after changes implies acceptance of new terms
• Material changes will require explicit consent
• Latest version always available in the application`
        : `Kami berhak mengubah Syarat dan Ketentuan ini kapan saja:
• Perubahan akan diberitahukan 30 hari sebelumnya melalui email dan notifikasi aplikasi
• Penggunaan aplikasi setelah perubahan berarti persetujuan terhadap syarat baru
• Perubahan material akan memerlukan persetujuan eksplisit
• Versi terbaru selalu tersedia di aplikasi`
    },
    {
      id: "dispute",
      icon: Handshake,
      title: isEnglish ? "12. Dispute Resolution" : "12. Penyelesaian Sengketa",
      content: isEnglish
        ? `12.1 Governing Law:
• These terms are governed by the laws of the Republic of Indonesia
• Any disputes are subject to Indonesian court jurisdiction

12.2 Resolution:
• Mediation and negotiation efforts as first step
• If mediation fails, resolution through arbitration in Jakarta
• Arbitration decision is final and binding

12.3 Legal Costs:
• Losing party bears legal costs of winning party
• Arbitration costs divided according to arbiter's decision`
        : `12.1 Hukum yang Berlaku:
• Syarat ini diatur oleh hukum Republik Indonesia
• Setiap sengketa tunduk pada yurisdiksi pengadilan Indonesia

12.2 Penyelesaian:
• Upaya mediasi dan negosiasi sebagai langkah pertama
• Jika mediasi gagal, penyelesaian melalui arbitrase di Jakarta
• Keputusan arbitrase bersifat final dan mengikat

12.3 Biaya Hukum:
• Pihak yang kalah menanggung biaya hukum pihak yang menang
• Biaya arbitrase dibagi sesuai putusan arbiter`
    },
    {
      id: "contact",
      icon: Mail,
      title: isEnglish ? "13. Contact" : "13. Kontak",
      content: isEnglish
        ? `For questions about these Terms and Conditions:

Email: mamak@kadaipos.id
Phone: +628211031903
Address: 

Business Hours:
Monday - Friday: 09:00 - 18:00 WIB
Saturday: 09:00 - 13:00 WIB
Sunday & Holidays: Closed`
        : `Untuk pertanyaan tentang Syarat dan Ketentuan ini:

Email: mamak@kadaipos.id
Telepon: +628211031903
Alamat: 

Jam Operasional:
Senin - Jumat: 09:00 - 18:00 WIB
Sabtu: 09:00 - 13:00 WIB
Minggu & Libur: Tutup`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <Container>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white mb-4">
              {isEnglish ? "Terms & Conditions" : "Syarat & Ketentuan"}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {isEnglish
                ? "Please read these terms carefully before using KadaiPOS services."
                : "Harap baca syarat ini dengan seksama sebelum menggunakan layanan KadaiPOS."}
            </p>
            <p className="text-sm text-gray-400 mt-4">
              {isEnglish ? "Last updated: December 3, 2025" : "Terakhir diperbarui: 3 Desember 2025"}
            </p>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <div className="py-16 max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-amber-900 mb-2">
                  {isEnglish ? "Important to Read" : "Penting untuk Dibaca"}
                </h3>
                <p className="text-amber-800 leading-relaxed">
                  {isEnglish
                    ? "Please read these Terms and Conditions carefully. By using KadaiPOS, you agree to be bound by all the terms below. This document protects both your rights and ours."
                    : "Harap baca Syarat dan Ketentuan ini dengan seksama. Dengan menggunakan Kadai POS, Anda setuju untuk terikat dengan semua ketentuan di bawah ini. Dokumen ini melindungi hak Anda dan kami."}
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon
              const isExpanded = expandedSection === section.id

              return (
                <div
                  key={section.id}
                  className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#FF5A5F]/30 transition-all"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="flex-1 text-lg font-black text-gray-900">
                      {section.title}
                    </h3>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="pl-16">
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Acceptance */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-400 mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-black text-green-900 mb-3">
                {isEnglish ? "User Agreement" : "Persetujuan Pengguna"}
              </h3>
              <p className="text-green-800 leading-relaxed max-w-2xl mx-auto">
                {isEnglish
                  ? "By logging in and using the KadaiPOS application, you declare that you have read, understood, and agree to all applicable Terms and Conditions."
                  : "Dengan login dan menggunakan aplikasi Kadai POS, Anda menyatakan telah membaca, memahami, dan menyetujui semua Syarat dan Ketentuan yang berlaku."}
              </p>
              <p className="text-green-700 text-sm mt-4 italic">
                {isEnglish ? "Effective since: December 3, 2025" : "Efektif sejak: 3 Desember 2025"}
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              {isEnglish ? "Related Documents:" : "Dokumen Terkait:"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy"
                className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold transition-colors"
              >
                {isEnglish ? "Privacy Policy" : "Kebijakan Privasi"}
              </Link>
              <Link
                href="/cookies"
                className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold transition-colors"
              >
                {isEnglish ? "Cookie Policy" : "Kebijakan Cookie"}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
