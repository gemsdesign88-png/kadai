import { Container } from "@/components/ui/container"
import { Globe, ShoppingCart, Clock, Heart, Star, Bell, ArrowRight, Package, CreditCard, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function CustomerWebPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Online Ordering Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Customer Web by{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Kadai
              </span>
            </h1>
            
            <div className="mb-8">
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                Platform pemesanan online untuk pelanggan Anda - Order dari website atau scan QR code di meja.
                Terintegrasi langsung dengan sistem POS. <span className="font-bold text-green-400">100% GRATIS!</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <div className="px-8 py-4 bg-green-500/20 border-2 border-green-400 rounded-xl">
                  <span className="text-3xl font-bold text-green-400">FREE</span>
                  <p className="text-sm text-gray-300 mt-1">Sudah termasuk dalam paket POS</p>
                </div>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 mx-auto group">
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Fitur <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Customer Web</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Semua yang Anda butuhkan untuk memberikan pengalaman ordering online yang superior
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: "Online Ordering",
                description: "Pelanggan bisa pesan langsung dari website atau scan QR code. Order masuk otomatis ke POS."
              },
              {
                icon: Clock,
                title: "Pickup & Delivery",
                description: "Support order pickup dan delivery. Integrasi dengan kurir atau kelola driver sendiri."
              },
              {
                icon: Heart,
                title: "Loyalty Program",
                description: "Point rewards, membership tiers, dan special offers untuk pelanggan loyal."
              },
              {
                icon: Star,
                title: "Reviews & Ratings",
                description: "Kumpulkan feedback pelanggan dan bangun reputasi bisnis Anda."
              },
              {
                icon: Bell,
                title: "Real-time Updates",
                description: "Notifikasi otomatis untuk setiap update status order via WhatsApp atau SMS."
              },
              {
                icon: CreditCard,
                title: "Multiple Payment",
                description: "Terima pembayaran online via transfer, e-wallet, atau bayar di tempat."
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-xl text-gray-600">Berbagai jenis bisnis yang ingin go digital</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🍕",
                title: "Restaurant & Cafe",
                description: "Online menu, table reservation, pre-order untuk dine-in atau takeaway",
                examples: ["Restoran", "Cafe", "Bakery", "Food Court"]
              },
              {
                icon: "🛍️",
                title: "Retail Store",
                description: "Katalog produk online, pre-order, click & collect, home delivery",
                examples: ["Fashion Store", "Electronics", "Grocery", "Pharmacy"]
              },
              {
                icon: "💈",
                title: "Service Business",
                description: "Online booking, appointment scheduling, service packages",
                examples: ["Salon", "Barbershop", "Spa", "Clinic"]
              }
            ].map((useCase, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-6">{useCase.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((ex, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Setup dalam hitungan menit, tidak perlu coding</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Setup Website",
                description: "Customize tampilan, upload logo, atur menu/katalog produk"
              },
              {
                step: "2",
                title: "Share Link",
                description: "Bagikan link ke pelanggan atau cetak QR code untuk scan"
              },
              {
                step: "3",
                title: "Customer Order",
                description: "Pelanggan browse menu dan checkout dengan mudah"
              },
              {
                step: "4",
                title: "Auto Sync to POS",
                description: "Order masuk otomatis ke Kadai POS dan dapur/kasir langsung dapat notif"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "10x", label: "Lebih Banyak Order Online" },
              { value: "50%", label: "Pengurangan Order Error" },
              { value: "24/7", label: "Terima Order Kapanpun" },
              { value: "0%", label: "Komisi Platform" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Terintegrasi dengan{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Semua Produk Kadai
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Customer Web sync otomatis dengan POS, Inventory, dan Kitchen Display
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Package,
                  title: "Real-time Inventory",
                  description: "Stock habis? Menu item otomatis sold out di website"
                },
                {
                  icon: MessageCircle,
                  title: "Kitchen Integration",
                  description: "Order langsung muncul di Kitchen Display System"
                },
                {
                  icon: Bell,
                  title: "WhatsApp Notif",
                  description: "Update status order otomatis ke pelanggan via WhatsApp"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-all">
                  <item.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.2),transparent_50%)]" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Go <span className="text-blue-400">Online?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Mulai terima order online hari ini. Setup gratis, tanpa biaya komisi platform!
            </p>
            <Link href="/pricing">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 inline-flex items-center gap-2 group">
                Coba Gratis 14 Hari
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
