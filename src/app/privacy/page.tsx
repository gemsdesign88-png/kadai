"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { ChevronDown, ChevronRight, Shield, Lock, Database, Eye, UserCheck, FileText } from "lucide-react"

export default function PrivacyPage() {
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
        ? `Welcome to KadaiPOS Privacy Policy. This policy explains how we collect, use, protect, and share your personal information when you use our Point of Sale system for restaurant management.

We are committed to protecting your privacy and ensuring the security of your data. By using KadaiPOS, you agree to the collection and use of information in accordance with this policy.

Last updated: December 3, 2025`
        : `Selamat datang di Kebijakan Privasi KadaiPOS. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan membagikan informasi pribadi Anda saat menggunakan sistem Point of Sale kami untuk manajemen restoran.

Kami berkomitmen untuk melindungi privasi Anda dan memastikan keamanan data Anda. Dengan menggunakan KadaiPOS, Anda setuju dengan pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.

Terakhir diperbarui: 3 Desember 2025`
    },
    {
      id: "collection",
      icon: Database,
      title: isEnglish ? "2. Information We Collect" : "2. Informasi yang Kami Kumpulkan",
      content: isEnglish
        ? `2.1 Personal Information:
• Name, email address, phone number
• User role and permissions
• Account credentials (encrypted)
• Staff ID and employment information

2.2 Transaction Data:
• Order details and timestamps
• Payment information and methods
• Customer preferences and history
• Table and service information

2.3 Usage Data:
• System activity logs
• Feature usage patterns
• Device information (type, OS, browser)
• IP address and location data

2.4 Restaurant Data:
• Menu items and pricing
• Inventory levels
• Business hours and settings
• Custom branding and themes`
        : `2.1 Informasi Pribadi:
• Nama, alamat email, nomor telepon
• Peran dan izin pengguna
• Kredensial akun (terenkripsi)
• ID staf dan informasi kepegawaian

2.2 Data Transaksi:
• Detail pesanan dan waktu transaksi
• Informasi dan metode pembayaran
• Preferensi dan riwayat pelanggan
• Informasi meja dan layanan

2.3 Data Penggunaan:
• Log aktivitas sistem
• Pola penggunaan fitur
• Informasi perangkat (tipe, OS, browser)
• Alamat IP dan data lokasi

2.4 Data Restoran:
• Item menu dan harga
• Tingkat inventaris
• Jam operasional dan pengaturan
• Branding dan tema kustom`
    },
    {
      id: "usage",
      icon: Eye,
      title: isEnglish ? "3. How We Use Your Information" : "3. Bagaimana Kami Menggunakan Informasi Anda",
      content: isEnglish
        ? `3.1 Service Delivery:
• Process orders and payments
• Manage tables and reservations
• Generate receipts and invoices
• Synchronize data across devices

3.2 Business Analytics:
• Create sales reports and insights
• Track inventory and stock levels
• Analyze customer preferences
• Monitor business performance

3.3 Service Improvement:
• Enhance user experience
• Develop new features
• Fix bugs and issues
• Optimize system performance

3.4 Communication:
• Send order confirmations
• Provide customer support
• Share system updates
• Deliver promotional content (with consent)

3.5 Legal Compliance:
• Tax reporting and documentation
• Fraud prevention and detection
• Comply with regulatory requirements
• Respond to legal requests`
        : `3.1 Penyediaan Layanan:
• Memproses pesanan dan pembayaran
• Mengelola meja dan reservasi
• Menghasilkan struk dan faktur
• Mensinkronkan data antar perangkat

3.2 Analitik Bisnis:
• Membuat laporan dan wawasan penjualan
• Melacak inventaris dan tingkat stok
• Menganalisis preferensi pelanggan
• Memantau kinerja bisnis

3.3 Peningkatan Layanan:
• Meningkatkan pengalaman pengguna
• Mengembangkan fitur baru
• Memperbaiki bug dan masalah
• Mengoptimalkan kinerja sistem

3.4 Komunikasi:
• Mengirim konfirmasi pesanan
• Menyediakan dukungan pelanggan
• Membagikan pembaruan sistem
• Mengirimkan konten promosi (dengan persetujuan)

3.5 Kepatuhan Hukum:
• Pelaporan dan dokumentasi pajak
• Pencegahan dan deteksi penipuan
• Mematuhi persyaratan peraturan
• Menanggapi permintaan hukum`
    },
    {
      id: "protection",
      icon: Lock,
      title: isEnglish ? "4. Data Protection & Security" : "4. Perlindungan & Keamanan Data",
      content: isEnglish
        ? `4.1 Security Measures:
• End-to-end encryption for sensitive data
• Secure cloud storage with Supabase
• Regular security audits and updates
• SSL/TLS encryption for data transmission
• Multi-factor authentication options

4.2 Access Controls:
• Role-based access permissions
• Individual user accounts with passwords
• Automatic logout after inactivity
• Account lockout after failed login attempts

4.3 Data Backup:
• Daily automated backups
• Redundant storage systems
• Disaster recovery procedures
• Data restoration capabilities

4.4 Employee Training:
• Security awareness programs
• Data handling best practices
• Incident response protocols
• Privacy policy compliance`
        : `4.1 Langkah Keamanan:
• Enkripsi end-to-end untuk data sensitif
• Penyimpanan cloud aman dengan Supabase
• Audit dan pembaruan keamanan rutin
• Enkripsi SSL/TLS untuk transmisi data
• Opsi autentikasi multi-faktor

4.2 Kontrol Akses:
• Izin akses berbasis peran
• Akun pengguna individual dengan password
• Logout otomatis setelah tidak aktif
• Penguncian akun setelah percobaan login gagal

4.3 Cadangan Data:
• Backup otomatis harian
• Sistem penyimpanan redundan
• Prosedur pemulihan bencana
• Kemampuan restorasi data

4.4 Pelatihan Karyawan:
• Program kesadaran keamanan
• Praktik terbaik penanganan data
• Protokol respons insiden
• Kepatuhan kebijakan privasi`
    },
    {
      id: "sharing",
      icon: UserCheck,
      title: isEnglish ? "5. Information Sharing" : "5. Pembagian Informasi",
      content: isEnglish
        ? `5.1 We DO NOT sell your personal data to third parties.

5.2 We may share information with:

Service Providers:
• Payment processors (for transactions)
• Cloud storage providers (Supabase)
• Analytics tools (for insights)
• Customer support platforms

Legal Requirements:
• Government authorities (when legally required)
• Law enforcement (for fraud investigation)
• Tax authorities (for compliance)
• Courts (under legal orders)

Business Transfers:
• In case of merger or acquisition
• Asset sales or restructuring
• With prior notice to affected users

5.3 Data Sharing Controls:
• You control what customer data to collect
• Export your data anytime
• Delete account and associated data
• Opt-out of marketing communications`
        : `5.1 Kami TIDAK menjual data pribadi Anda ke pihak ketiga.

5.2 Kami dapat membagikan informasi dengan:

Penyedia Layanan:
• Pemroses pembayaran (untuk transaksi)
• Penyedia penyimpanan cloud (Supabase)
• Alat analitik (untuk wawasan)
• Platform dukungan pelanggan

Persyaratan Hukum:
• Otoritas pemerintah (saat diperlukan secara hukum)
• Penegak hukum (untuk investigasi penipuan)
• Otoritas pajak (untuk kepatuhan)
• Pengadilan (di bawah perintah hukum)

Transfer Bisnis:
• Dalam kasus merger atau akuisisi
• Penjualan aset atau restrukturisasi
• Dengan pemberitahuan sebelumnya kepada pengguna yang terpengaruh

5.3 Kontrol Pembagian Data:
• Anda mengontrol data pelanggan apa yang dikumpulkan
• Ekspor data Anda kapan saja
• Hapus akun dan data terkait
• Pilih keluar dari komunikasi pemasaran`
    },
    {
      id: "rights",
      icon: Shield,
      title: isEnglish ? "6. Your Privacy Rights" : "6. Hak Privasi Anda",
      content: isEnglish
        ? `You have the right to:

6.1 Access Your Data:
• Request a copy of your personal data
• Review information we have about you
• Receive data in portable format

6.2 Correct Your Data:
• Update inaccurate information
• Complete incomplete data
• Modify outdated details

6.3 Delete Your Data:
• Request account deletion
• Remove specific information
• Right to be forgotten (where applicable)

6.4 Restrict Processing:
• Limit how we use your data
• Object to certain processing activities
• Withdraw consent anytime

6.5 Data Portability:
• Export your data in CSV/JSON format
• Transfer data to another service
• Receive structured data files

6.6 Lodge Complaints:
• Contact our Data Protection Officer
• File complaints with authorities
• Seek legal remedies

To exercise these rights, contact us at mamak@kadaipos.id`
        : `Anda memiliki hak untuk:

6.1 Mengakses Data Anda:
• Meminta salinan data pribadi Anda
• Meninjau informasi yang kami miliki tentang Anda
• Menerima data dalam format portabel

6.2 Memperbaiki Data Anda:
• Memperbarui informasi yang tidak akurat
• Melengkapi data yang tidak lengkap
• Memodifikasi detail yang ketinggalan zaman

6.3 Menghapus Data Anda:
• Meminta penghapusan akun
• Menghapus informasi tertentu
• Hak untuk dilupakan (jika berlaku)

6.4 Membatasi Pemrosesan:
• Membatasi bagaimana kami menggunakan data Anda
• Keberatan terhadap aktivitas pemrosesan tertentu
• Menarik persetujuan kapan saja

6.5 Portabilitas Data:
• Ekspor data Anda dalam format CSV/JSON
• Transfer data ke layanan lain
• Menerima file data terstruktur

6.6 Mengajukan Keluhan:
• Hubungi Petugas Perlindungan Data kami
• Ajukan keluhan kepada otoritas
• Mencari upaya hukum

Untuk menjalankan hak-hak ini, hubungi kami di mamak@kadaipos.id`
    },
    {
      id: "retention",
      icon: Database,
      title: isEnglish ? "7. Data Retention" : "7. Retensi Data",
      content: isEnglish
        ? `7.1 Transaction Data:
• Retained for 5 years (tax compliance)
• Financial records per regulatory requirements
• Cannot be deleted during retention period

7.2 Operational Data:
• Kept while account is active
• Deleted 90 days after account closure
• Backup copies removed within 180 days

7.3 Analytics Data:
• Aggregated data retained indefinitely
• Anonymized insights for service improvement
• No personally identifiable information

7.4 Marketing Data:
• Retained until consent is withdrawn
• Deleted upon opt-out request
• Removed from mailing lists immediately`
        : `7.1 Data Transaksi:
• Disimpan selama 5 tahun (kepatuhan pajak)
• Catatan keuangan sesuai persyaratan peraturan
• Tidak dapat dihapus selama periode retensi

7.2 Data Operasional:
• Disimpan selama akun aktif
• Dihapus 90 hari setelah penutupan akun
• Salinan cadangan dihapus dalam 180 hari

7.3 Data Analitik:
• Data agregat disimpan tanpa batas
• Wawasan anonim untuk peningkatan layanan
• Tanpa informasi yang dapat diidentifikasi secara pribadi

7.4 Data Pemasaran:
• Disimpan sampai persetujuan ditarik
• Dihapus atas permintaan opt-out
• Dihapus dari mailing list segera`
    },
    {
      id: "cookies",
      icon: Database,
      title: isEnglish ? "8. Cookies & Tracking" : "8. Cookie & Pelacakan",
      content: isEnglish
        ? `8.1 Types of Cookies We Use:

Essential Cookies:
• Authentication and login sessions
• Security and fraud prevention
• System functionality

Performance Cookies:
• Analytics and usage statistics
• Error tracking and debugging
• Performance monitoring

Functional Cookies:
• User preferences and settings
• Language selection
• Theme customization

8.2 Third-Party Cookies:
• Payment gateways
• Analytics providers (Google Analytics)
• Support chat services

8.3 Cookie Management:
• Control cookies in browser settings
• Opt-out of analytics cookies
• Clear cookies anytime
• Note: Disabling essential cookies may affect functionality

For more details, see our Cookie Policy.`
        : `8.1 Jenis Cookie yang Kami Gunakan:

Cookie Esensial:
• Sesi autentikasi dan login
• Keamanan dan pencegahan penipuan
• Fungsionalitas sistem

Cookie Kinerja:
• Statistik analitik dan penggunaan
• Pelacakan dan debugging error
• Pemantauan kinerja

Cookie Fungsional:
• Preferensi dan pengaturan pengguna
• Pemilihan bahasa
• Kustomisasi tema

8.2 Cookie Pihak Ketiga:
• Gateway pembayaran
• Penyedia analitik (Google Analytics)
• Layanan chat dukungan

8.3 Manajemen Cookie:
• Kontrol cookie di pengaturan browser
• Pilih keluar dari cookie analitik
• Hapus cookie kapan saja
• Catatan: Menonaktifkan cookie esensial dapat mempengaruhi fungsi

Untuk detail lebih lanjut, lihat Kebijakan Cookie kami.`
    },
    {
      id: "children",
      icon: Shield,
      title: isEnglish ? "9. Children's Privacy" : "9. Privasi Anak-anak",
      content: isEnglish
        ? `KadaiPOS is not intended for use by children under 18 years of age.

• We do not knowingly collect data from minors
• Restaurant owners must ensure staff members are 18+
• If we discover data from minors, we will delete it
• Parents/guardians can contact us to remove minor's data

If you believe we have collected information from a child, please contact us immediately at mamak@kadaipos.id`
        : `KadaiPOS tidak dimaksudkan untuk digunakan oleh anak-anak di bawah usia 18 tahun.

• Kami tidak dengan sengaja mengumpulkan data dari anak di bawah umur
• Pemilik restoran harus memastikan anggota staf berusia 18+
• Jika kami menemukan data dari anak di bawah umur, kami akan menghapusnya
• Orang tua/wali dapat menghubungi kami untuk menghapus data anak di bawah umur

Jika Anda yakin kami telah mengumpulkan informasi dari anak, segera hubungi kami di mamak@kadaipos.id`
    },
    {
      id: "international",
      icon: Shield,
      title: isEnglish ? "10. International Data Transfers" : "10. Transfer Data Internasional",
      content: isEnglish
        ? `10.1 Data Storage Location:
• Primary servers in Singapore (AWS/Supabase)
• Backup servers in Asia-Pacific region
• CDN servers worldwide for performance

10.2 Data Protection Standards:
• Compliance with GDPR (EU users)
• Indonesian data protection laws
• Industry-standard security measures
• Contractual safeguards with providers

10.3 Cross-Border Transfers:
• Only to countries with adequate protection
• Under EU-approved mechanisms (where applicable)
• With your explicit consent for certain transfers`
        : `10.1 Lokasi Penyimpanan Data:
• Server utama di Singapura (AWS/Supabase)
• Server cadangan di wilayah Asia-Pasifik
• Server CDN di seluruh dunia untuk kinerja

10.2 Standar Perlindungan Data:
• Kepatuhan dengan GDPR (pengguna UE)
• Hukum perlindungan data Indonesia
• Langkah keamanan standar industri
• Perlindungan kontrak dengan penyedia

10.3 Transfer Lintas Negara:
• Hanya ke negara dengan perlindungan yang memadai
• Di bawah mekanisme yang disetujui UE (jika berlaku)
• Dengan persetujuan eksplisit Anda untuk transfer tertentu`
    },
    {
      id: "changes",
      icon: FileText,
      title: isEnglish ? "11. Changes to This Policy" : "11. Perubahan Kebijakan Ini",
      content: isEnglish
        ? `We may update this Privacy Policy from time to time:

• Notification 30 days before major changes
• Email and in-app notifications
• Continued use implies acceptance
• Material changes require explicit consent
• Previous versions archived and available

We encourage you to review this policy periodically. The "Last updated" date at the top indicates the latest revision.`
        : `Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu:

• Pemberitahuan 30 hari sebelum perubahan besar
• Email dan notifikasi dalam aplikasi
• Penggunaan berkelanjutan berarti penerimaan
• Perubahan material memerlukan persetujuan eksplisit
• Versi sebelumnya diarsipkan dan tersedia

Kami mendorong Anda untuk meninjau kebijakan ini secara berkala. Tanggal "Terakhir diperbarui" di atas menunjukkan revisi terbaru.`
    },
    {
      id: "contact",
      icon: FileText,
      title: isEnglish ? "12. Contact Us" : "12. Hubungi Kami",
      content: isEnglish
        ? `For privacy-related questions or concerns:

Data Protection Officer:
Email: mamak@kadaipos.id
Phone: +628211031903

Mailing Address:
Business Hours:
Monday - Friday: 09:00 - 18:00 WIB
Saturday: 09:00 - 13:00 WIB
Sunday & Holidays: Closed

We will respond to your inquiry within 7 business days.`
        : `Untuk pertanyaan atau masalah terkait privasi:

Petugas Perlindungan Data:
Email: mamak@kadaipos.id
Telepon: +628211031903

Alamat Surat:
Jam Operasional:
Senin - Jumat: 09:00 - 18:00 WIB
Sabtu: 09:00 - 13:00 WIB
Minggu & Libur: Tutup

Kami akan menanggapi pertanyaan Anda dalam 7 hari kerja.`
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white mb-4">
              {isEnglish ? "Privacy Policy" : "Kebijakan Privasi"}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {isEnglish
                ? "Your privacy is important to us. Learn how we collect, use, and protect your data."
                : "Privasi Anda penting bagi kami. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda."}
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
                  {isEnglish ? "Important Notice" : "Pemberitahuan Penting"}
                </h3>
                <p className="text-amber-800 leading-relaxed">
                  {isEnglish
                    ? "Please read this Privacy Policy carefully. By using KadaiPOS, you acknowledge that you have read, understood, and agree to be bound by this policy. If you do not agree, please do not use our services."
                    : "Harap baca Kebijakan Privasi ini dengan seksama. Dengan menggunakan KadaiPOS, Anda mengakui bahwa Anda telah membaca, memahami, dan setuju untuk terikat oleh kebijakan ini. Jika Anda tidak setuju, harap jangan gunakan layanan kami."}
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
                {isEnglish ? "Privacy Commitment" : "Komitmen Privasi"}
              </h3>
              <p className="text-green-800 leading-relaxed max-w-2xl mx-auto">
                {isEnglish
                  ? "We are committed to maintaining the highest standards of data protection and privacy. Your trust is important to us, and we continuously work to safeguard your information."
                  : "Kami berkomitmen untuk mempertahankan standar tertinggi perlindungan data dan privasi. Kepercayaan Anda penting bagi kami, dan kami terus bekerja untuk melindungi informasi Anda."}
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
                href="/terms"
                className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold transition-colors"
              >
                {isEnglish ? "Terms & Conditions" : "Syarat & Ketentuan"}
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
