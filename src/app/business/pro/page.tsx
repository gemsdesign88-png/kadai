"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  Scissors, 
  Check, 
  ArrowRight,
  Heart,
  Sparkles,
  Stethoscope,
  Dumbbell,
  Briefcase,
  Scale,
  GraduationCap,
  Camera,
  Wrench,
  Baby,
  Car,
  Bike,
  Gamepad2,
  Baby as BabyIcon,
  Home,
  Hammer,
  Music,
  Laptop,
  Shirt
} from "lucide-react";
import Link from "next/link";

export default function ProPage() {
  const { t, language } = useLanguage();
  const pro = t.proPage || { hero: {}, useCases: {} };

  const useCaseIcons = {
    salon: Scissors,
    spa: Heart,
    beautyclinic: Sparkles,
    medicalclinic: Stethoscope,
    dentalclinic: Stethoscope,
    gym: Dumbbell,
    yoga: Heart,
    coworking: Briefcase,
    legal: Scale,
    tutoring: GraduationCap,
    photography: Camera,
    carwash: Car,
    bikewash: Bike,
    petgrooming: Heart,
    childcare: Baby,
    workshop: Hammer,
    gamezone: Gamepad2,
    playground: BabyIcon,
    computerrepair: Laptop,
    laundry: Home,
    barbershop: Scissors,
    tailor: Shirt,
    musicschool: Music,
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white mb-6" style={{backgroundColor: '#8B5CF6'}}>
                {pro.hero?.badge || (language === 'en' ? 'Professional Services' : language === 'id' ? 'Layanan Profesional' : '专业服务')}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {pro.hero?.title || (language === 'en' ? 'Complete Solution for' : language === 'id' ? 'Solusi Lengkap untuk' : '完整解决方案')}{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #8B5CF6, #A78BFA)'}}>
                  {pro.hero?.titleHighlight || (language === 'en' ? 'Professional Services' : language === 'id' ? 'Layanan Profesional' : '专业服务')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {pro.hero?.subtitle || (language === 'en' 
                  ? 'Powerful POS system designed specifically for service-based businesses. Manage appointments, staff, and customers with ease.'
                  : language === 'id'
                  ? 'Sistem POS powerful yang dirancang khusus untuk bisnis berbasis layanan. Kelola janji temu, staff, dan pelanggan dengan mudah.'
                  : '专为基于服务的企业设计的强大 POS 系统。轻松管理预约、员工和客户。')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <span className="text-3xl font-bold" style={{color: '#8B5CF6'}}>
                  {pro.hero?.price || (language === 'en' ? 'Rp 149,000/month' : language === 'id' ? 'Rp 149.000/bulan' : 'Rp 149,000/月')}
                </span>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-opacity shadow-lg flex items-center gap-2 mx-auto group hover:opacity-90" style={{backgroundColor: '#8B5CF6'}}>
                  {pro.hero?.getStarted || (language === 'en' ? 'Get Started' : language === 'id' ? 'Mulai Sekarang' : '开始使用')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {pro.useCases?.title || (language === 'en' ? 'Perfect for Every Professional Service' : language === 'id' ? 'Sempurna untuk Semua Layanan Profesional' : '适用于每项专业服务')}
            </h2>
            <p className="text-xl text-gray-300">
              {pro.useCases?.subtitle || (language === 'en' ? 'From salons to clinics, Kadai Pro adapts to your business needs' : language === 'id' ? 'Dari salon hingga klinik, Kadai Pro beradaptasi dengan kebutuhan bisnis Anda' : '从沙龙到诊所，Kadai Pro 适应您的业务需求')}
            </p>
          </div>

          {/* Check if we have detailed use cases or just show grid of all business types */}
          {Object.keys(pro.useCases || {}).filter(k => k !== 'title' && k !== 'subtitle').length > 0 ? (
            <div className="space-y-20">
              {Object.entries(pro.useCases || {}).map(([key, useCase]: [string, any], idx) => {
                if (key === 'title' || key === 'subtitle' || typeof useCase !== 'object') return null;
                
                const Icon = useCaseIcons[key as keyof typeof useCaseIcons];
                if (!Icon) return null;
                
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}
                  >
                    <div className={isEven ? '' : 'md:col-start-2'}>
                      <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(to bottom right, #8B5CF6, #A78BFA)', boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)'}}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">{useCase.name}</h3>
                      </div>
                      <p className="text-lg text-gray-300 mb-6">{useCase.description}</p>

                      {/* Challenges */}
                      {useCase.challenges && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-white">Common Challenges:</h4>
                          <ul className="space-y-2">
                            {useCase.challenges?.map((challenge: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-gray-400">
                                <span className="text-red-400 mt-1">✕</span>
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Story */}
                      {useCase.story && (
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border" style={{borderColor: 'rgba(139, 92, 246, 0.3)'}}>
                          <p className="text-gray-300 italic">{useCase.story}</p>
                        </div>
                      )}
                    </div>

                    <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                    <div className="backdrop-blur-sm border rounded-3xl p-8 shadow-2xl" style={{background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.15))', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
                        <h4 className="text-xl font-bold mb-6 text-white">How Kadai Pro Helps:</h4>
                        <div className="space-y-4">
                          {useCase.solutions?.map((solution: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl hover:bg-white/20 transition-all">
                              <div className="p-1 bg-green-500/20 rounded-lg mt-0.5">
                                <Check className="w-4 h-4 text-green-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-white">{solution.title}</p>
                                <p className="text-sm text-gray-300">{solution.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Fallback grid showing all sub-business types
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Object.entries(useCaseIcons).map(([key, Icon]) => {
                const names = {
                  salon: { en: 'Salon', id: 'Salon', zh: '美容院' },
                  spa: { en: 'Spa & Wellness', id: 'Spa & Wellness', zh: '水疗' },
                  beautyclinic: { en: 'Beauty Clinic', id: 'Klinik Kecantikan', zh: '美容诊所' },
                  medicalclinic: { en: 'Medical Clinic', id: 'Klinik Kesehatan', zh: '医疗诊所' },
                  dentalclinic: { en: 'Dental Clinic', id: 'Klinik Gigi', zh: '牙科诊所' },
                  gym: { en: 'Gym & Fitness', id: 'Gym & Fitness', zh: '健身房' },
                  yoga: { en: 'Yoga Studio', id: 'Studio Yoga', zh: '瑜伽馆' },
                  coworking: { en: 'Coworking Space', id: 'Coworking Space', zh: '联合办公' },
                  legal: { en: 'Legal Services', id: 'Layanan Hukum', zh: '法律服务' },
                  tutoring: { en: 'Tutoring Center', id: 'Pusat Bimbel', zh: '辅导中心' },
                  photography: { en: 'Photography Studio', id: 'Studio Fotografi', zh: '摄影工作室' },
                  carwash: { en: 'Car Wash', id: 'Cuci Mobil', zh: '洗车服务' },
                  bikewash: { en: 'Bike Wash', id: 'Cuci Motor', zh: '洗摩托车' },
                  petgrooming: { en: 'Pet Grooming', id: 'Pet Grooming', zh: '宠物美容' },
                  childcare: { en: 'Childcare', id: 'Penitipan Anak', zh: '托儿所' },
                  workshop: { en: 'Auto Workshop', id: 'Bengkel', zh: '汽车修理厂' },
                  gamezone: { en: 'Game Zone', id: 'Game Zone', zh: '游戏区' },
                  playground: { en: 'Playground', id: 'Playground', zh: '游乐场' },
                  computerrepair: { en: 'Computer Repair', id: 'Service Komputer', zh: '电脑维修' },
                  laundry: { en: 'Laundry', id: 'Laundry', zh: '洗衣店' },
                  barbershop: { en: 'Barbershop', id: 'Barbershop', zh: '理发店' },
                  tailor: { en: 'Tailor Shop', id: 'Penjahit', zh: '裁缝店' },
                  musicschool: { en: 'Music School', id: 'Sekolah Musik', zh: '音乐学校' },
                };
                
                const name = names[key as keyof typeof names];
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg" style={{background: 'linear-gradient(to bottom right, #8B5CF6, #A78BFA)', boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)'}}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-base font-bold text-white">
                          {language === 'id' ? name.id : language === 'zh' ? name.zh : name.en}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {pro.features?.title || (language === 'en' ? 'Everything You Need' : language === 'id' ? 'Semua yang Anda Butuhkan' : '您需要的一切')}
            </h2>
            <p className="text-xl text-gray-600">
              {pro.features?.subtitle || (language === 'en' ? 'Comprehensive features for professional service businesses' : language === 'id' ? 'Fitur lengkap untuk bisnis layanan profesional' : '专业服务企业的综合功能')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(pro.features?.list && pro.features.list.length > 0 ? pro.features.list : [
              {
                title: language === 'en' ? 'Appointment System' : language === 'id' ? 'Sistem Janji Temu' : '预约系统',
                description: language === 'en' ? 'Easy booking and scheduling' : language === 'id' ? 'Booking dan jadwal mudah' : '轻松预订和排班'
              },
              {
                title: language === 'en' ? 'Staff Management' : language === 'id' ? 'Manajemen Staff' : '员工管理',
                description: language === 'en' ? 'Track performance and commissions' : language === 'id' ? 'Track performa dan komisi' : '追踪绩效和佣金'
              },
              {
                title: language === 'en' ? 'Service Tracking' : language === 'id' ? 'Tracking Layanan' : '服务追踪',
                description: language === 'en' ? 'Monitor service duration' : language === 'id' ? 'Monitor durasi layanan' : '监控服务时长'
              },
              {
                title: language === 'en' ? 'Analytics' : language === 'id' ? 'Analytics' : '分析',
                description: language === 'en' ? 'Business insights and reports' : language === 'id' ? 'Insights dan laporan bisnis' : '业务洞察和报告'
              },
              {
                title: language === 'en' ? 'Customer CRM' : language === 'id' ? 'CRM Pelanggan' : '客户管理',
                description: language === 'en' ? 'Build customer relationships' : language === 'id' ? 'Bangun relasi pelanggan' : '建立客户关系'
              },
              {
                title: language === 'en' ? 'Package Deals' : language === 'id' ? 'Paket Layanan' : '服务套餐',
                description: language === 'en' ? 'Create service bundles' : language === 'id' ? 'Buat bundling layanan' : '创建服务套餐'
              },
              {
                title: language === 'en' ? 'Fast Checkout' : language === 'id' ? 'Checkout Cepat' : '快速结账',
                description: language === 'en' ? 'Quick payment processing' : language === 'id' ? 'Proses pembayaran cepat' : '快速支付处理'
              },
              {
                title: language === 'en' ? 'Membership' : language === 'id' ? 'Membership' : '会员',
                description: language === 'en' ? 'Loyalty program management' : language === 'id' ? 'Manajemen program loyalitas' : '忠诚度计划管理'
              }
            ]).map((feature: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                {pro.pricing?.title || (language === 'en' ? 'Simple, Transparent Pricing' : language === 'id' ? 'Harga Sederhana dan Transparan' : '简单透明的价格')}
              </h2>
              <p className="text-xl text-gray-600">
                {pro.pricing?.subtitle || (language === 'en' ? 'Everything you need to run your professional service business' : language === 'id' ? 'Semua yang Anda butuhkan untuk menjalankan bisnis layanan profesional' : '运营专业服务业务所需的一切')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {pro.pricing?.price || 'Rp 149.000'}
                  <span className="text-2xl text-gray-600">{pro.pricing?.period || (language === 'en' ? '/month' : language === 'id' ? '/bulan' : '/月')}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {(pro.pricing?.features && pro.pricing.features.length > 0 ? pro.pricing.features : [
                  language === 'en' ? 'Unlimited appointments' : language === 'id' ? 'Janji temu unlimited' : '无限预约',
                  language === 'en' ? 'Staff management' : language === 'id' ? 'Manajemen staff' : '员工管理',
                  language === 'en' ? 'Customer CRM' : language === 'id' ? 'CRM pelanggan' : '客户管理',
                  language === 'en' ? 'Service packages' : language === 'id' ? 'Paket layanan' : '服务套餐',
                  language === 'en' ? 'Analytics & reports' : language === 'id' ? 'Analytics & laporan' : '分析和报告',
                  language === 'en' ? '24/7 support' : language === 'id' ? 'Support 24/7' : '24/7 支持'
                ]).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/pricing">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 mx-auto group">
                  {pro.pricing?.cta || (language === 'en' ? 'Start Free Trial' : language === 'id' ? 'Mulai Trial Gratis' : '开始免费试用')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              {pro.faq?.title || (language === 'en' ? 'Frequently Asked Questions' : language === 'id' ? 'Pertanyaan yang Sering Diajukan' : '常见问题')}
            </h2>
            <div className="space-y-6">
              {(pro.faq?.items && pro.faq.items.length > 0 ? pro.faq.items : [
                {
                  q: language === 'en' ? 'What types of businesses can use Kadai Pro?' : language === 'id' ? 'Jenis bisnis apa saja yang bisa menggunakan Kadai Pro?' : 'Kadai Pro 适用于哪些类型的企业？',
                  a: language === 'en' ? 'Kadai Pro is perfect for any service-based business including salons, spas, beauty clinics, medical clinics, gyms, yoga studios, coworking spaces, and more.' : language === 'id' ? 'Kadai Pro sempurna untuk semua bisnis berbasis layanan termasuk salon, spa, klinik kecantikan, klinik medis, gym, studio yoga, coworking space, dan lainnya.' : 'Kadai Pro 非常适合任何基于服务的企业，包括沙龙、水疗、美容诊所、医疗诊所、健身房、瑜伽馆、共享办公空间等。'
                },
                {
                  q: language === 'en' ? 'Can I manage staff schedules and appointments?' : language === 'id' ? 'Apakah saya bisa mengatur jadwal staff dan janji temu?' : '我可以管理员工排班和预约吗？',
                  a: language === 'en' ? 'Yes! Kadai Pro includes a comprehensive appointment and staff scheduling system. You can manage multiple staff members, track their availability, and assign appointments automatically.' : language === 'id' ? 'Ya! Kadai Pro dilengkapi sistem jadwal staff dan janji temu yang lengkap. Anda bisa kelola banyak staff, track ketersediaan mereka, dan assign janji temu secara otomatis.' : '是的！Kadai Pro 包含全面的预约和员工排班系统。您可以管理多名员工，追踪他们的可用时间，并自动分配预约。'
                },
                {
                  q: language === 'en' ? 'Does it support membership and loyalty programs?' : language === 'id' ? 'Apakah mendukung program membership dan loyalitas?' : '支持会员和忠诚度计划吗？',
                  a: language === 'en' ? 'Absolutely! You can create membership tiers, track customer visit history, and offer loyalty rewards to keep your customers coming back.' : language === 'id' ? 'Tentu! Anda bisa buat tingkatan membership, track riwayat kunjungan pelanggan, dan tawarkan reward loyalitas untuk membuat pelanggan kembali lagi.' : '当然！您可以创建会员等级，追踪客户访问历史，并提供忠诚度奖励以留住客户。'
                },
                {
                  q: language === 'en' ? 'Can I create service packages?' : language === 'id' ? 'Bisakah saya membuat paket layanan?' : '我可以创建服务套餐吗？',
                  a: language === 'en' ? 'Yes, you can easily create service packages and bundles. This is great for offering treatment packages or course packages at discounted rates.' : language === 'id' ? 'Ya, Anda bisa dengan mudah membuat paket dan bundling layanan. Ini bagus untuk menawarkan paket treatment atau paket kursus dengan harga diskon.' : '是的，您可以轻松创建服务套餐和组合。这非常适合以折扣价格提供疗程套餐或课程套餐。'
                }
              ]).map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #8B5CF6, #A78BFA)'}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {pro.cta?.title || (language === 'en' ? 'Ready to Transform Your Business?' : language === 'id' ? 'Siap Transformasi Bisnis Anda?' : '准备好改变您的业务了吗？')}
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              {pro.cta?.subtitle || (language === 'en' ? 'Join hundreds of professional service businesses using Kadai Pro' : language === 'id' ? 'Bergabung dengan ratusan bisnis layanan profesional yang menggunakan Kadai Pro' : '加入使用 Kadai Pro 的数百家专业服务企业')}
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/pricing">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-xl flex items-center gap-2 group">
                  {pro.cta?.button || (language === 'en' ? 'Start Free Trial' : language === 'id' ? 'Mulai Trial Gratis' : '开始免费试用')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <span className="text-purple-100 text-sm">
                {pro.cta?.noCard || (language === 'en' ? 'No credit card required' : language === 'id' ? 'Tanpa kartu kredit' : '无需信用卡')}
              </span>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
