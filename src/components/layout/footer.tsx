"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Clock, 
  Store, 
  UtensilsCrossed, 
  Scissors,
  Globe,
  Activity,
  Command,
  ArrowUpRight,
  Cpu
} from "lucide-react"

export function Footer() {
  const { t, language } = useLanguage()
  const pathname = usePathname()
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const navigation = {
    links: [
      { name: t.nav.features, href: "/features" },
      { name: t.nav.benefits, href: "/benefits" },
      { name: t.nav.pricing, href: "/pricing" },
      { name: t.nav.getDemo, href: "/demo" },
      { name: t.nav.about, href: "/about" },
      { name: t.nav.contact, href: "/contact" },
      { name: t.nav.careers || "Careers", href: "/careers" },
      { name: t.nav.founder || "Founder Message", href: "/founder" },
    ],
    legal: [
      { name: t.footer.privacy, href: "/privacy" },
      { name: t.footer.terms, href: "/terms" },
    ]
  }

  if (pathname?.startsWith('/order')) {
    return null
  }
  
  return (
    <footer className="relative overflow-hidden bg-[#0A0A0B] text-white pt-24 pb-12" aria-labelledby="footer-heading">
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 text-[15vw] font-black text-white/[0.02] leading-none pointer-events-none select-none tracking-tighter translate-x-1/4 -translate-y-1/4">
        KADAI
      </div>

      <Container>
        <div className="relative z-10">
          {/* Main Console Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
            
            {/* Left Block: Brand & Local Time */}
            <div className="lg:col-span-4 space-y-8 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <div className="space-y-4">
                <Link href="/" className="inline-block">
                  <img src="/logo-white.svg" alt="Kadai OS" className="h-8 w-auto opacity-90" />
                </Link>
                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                  {t.footer.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Jakarta (WIB)</span>
                  <span className="text-xl font-mono font-bold tabular-nums">
                    {time.toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Singapore (SGT)</span>
                  <span className="text-xl font-mono font-bold tabular-nums">
                    {time.toLocaleTimeString('en-US', { timeZone: 'Asia/Singapore', hour12: false, hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Center Block: Command Shortcuts (Navigation) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-8">
                <Command className="w-4 h-4 text-[#FF5A5F]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Portal Navigation</span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {navigation.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between text-sm font-bold text-gray-400 hover:text-white transition-colors py-1"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF5A5F]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Block: Live Engine HUD */}
            <div className="lg:col-span-3 bg-gray-900 rounded-[32px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
                      {t.footer.allSystemsOperational}
                    </span>
                  </div>
                  <Cpu className="w-4 h-4 text-white/20" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Master Engine Pulse</span>
                      <span className="text-sm font-mono font-black text-white">{t.footer.uptime}</span>
                    </div>
                    <div className="flex gap-1 h-1.5">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="flex-1 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Kernel</span>
                      <span className="text-[10px] font-mono font-bold text-[#FF5A5F]">{t.footer.currentVersion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Region</span>
                      <span className="text-[10px] font-bold text-white/70">{t.footer.cloudNodes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Status</span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5">
                        <Activity className="w-3 h-3" />
                        Healthy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Legal Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-gray-500">
                &copy; {new Date().getFullYear()} Kadai Business Operating System
              </span>
              <div className="flex gap-4">
                {navigation.legal.map((link) => (
                  <Link key={link.href} href={link.href} className="text-xs font-bold text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Support</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{t.footer.madeWith}</span>
                <Heart className="w-3 h-3 text-[#FF5A5F] fill-[#FF5A5F]" />
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{t.footer.inIndonesia}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Ticker / Infrastructure Strip */}
      <div className="mt-12 bg-white/[0.02] border-t border-white/5 py-3 overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-marquee inline-block">
          {[
            "RESTAURANT MANAGEMENT", "RETAIL OPERATIONS", "PROFESSIONAL SERVICES", "INVENTORY CONTROL", "ANALYTICS ENGINE", 
            "STAFF DISPATCH", "KITCHEN SYNC", "MULTI-PAYMENT GATEWAY", "CRM CLOUD",
            "RESTAURANT MANAGEMENT", "RETAIL OPERATIONS", "PROFESSIONAL SERVICES", "INVENTORY CONTROL", "ANALYTICS ENGINE"
          ].map((text, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 flex items-center gap-4">
              <Zap className="w-2 h-2 fill-current" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
