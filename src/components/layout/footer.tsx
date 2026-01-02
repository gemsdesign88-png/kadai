"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export function Footer() {
  const { t, language } = useLanguage()
  const pathname = usePathname()

  const navigation = {
    product: [
      { name: t.nav.features, href: "/features" },
      { name: t.nav.pricing, href: "/pricing" },
    ],
    company: [
      { name: t.nav.about, href: "/about" },
      { name: t.nav.contact, href: "/contact" },
    ],
    legal: [
      { name: t.footer.privacy, href: "/privacy" },
      { name: t.footer.terms, href: "/terms" },
      { name: t.footer.cookiePolicy, href: "/cookies" },
    ],
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: Facebook,
      },
      {
        name: "Instagram",
        href: "#",
        icon: Instagram,
      },
      {
        name: "Twitter",
        href: "#",
        icon: Twitter,
      },
      {
        name: "LinkedIn",
        href: "#",
        icon: Linkedin,
      },
    ],
  }

  if (pathname?.startsWith('/order')) {
    return null
  }
  
  return (
    <footer className="relative overflow-hidden" aria-labelledby="footer-heading">
      {/* Same background as CTA section */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Floating Orbs - matching CTA section */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" />

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="py-16 lg:py-20 relative z-10">
          <div className="xl:grid xl:grid-cols-3 xl:gap-12">
            <div className="space-y-6">
              <Link 
                href="/" 
                className="inline-flex items-center gap-3"
              >
                <img src="/logo-white.svg" alt="KadaiPOS - Aplikasi Kasir Digital Terbaik" className="h-10 w-auto" />
              </Link>
              <p className="text-base leading-relaxed text-gray-400 max-w-xs font-medium">
                {t.footer.description}
              </p>
              <div className="flex space-x-3">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#FF5A5F] hover:to-[#8B5CF6] hover:border-transparent hover:scale-110 transition-all"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">
                    {t.footer.product}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] rounded-full mb-4" />
                  <ul role="list" className="space-y-3">
                    {navigation.product.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm font-bold leading-6 text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">
                    {t.footer.company}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] rounded-full mb-4" />
                  <ul role="list" className="space-y-3">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm font-bold leading-6 text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">
                    {t.footer.legal}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] rounded-full mb-4" />
                  <ul role="list" className="space-y-3">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm font-bold leading-6 text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm font-bold text-gray-400 flex items-center gap-2">
                &copy; {new Date().getFullYear()} Kadai. {t.footer.madeWith}{" "}
                <Heart className="h-4 w-4 text-[#FF5A5F] fill-[#FF5A5F] inline" />{" "}
                {t.footer.inIndonesia}
              </p>
              <div className="flex items-center gap-4">
                <Link 
                  href="/privacy" 
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors px-3 py-1 hover:bg-white/10 rounded-full"
                >
                  {t.footer.privacy}
                </Link>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <Link 
                  href="/terms" 
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors px-3 py-1 hover:bg-white/10 rounded-full"
                >
                  {t.footer.terms}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
