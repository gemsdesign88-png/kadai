"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { 
  Store, 
  TrendingUp, 
  PieChart, 
  UserCheck, 
  Wallet, 
  Tablet 
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.5,
      duration: 0.6,
    },
  },
}

export function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      name: t.features.fastOrder.title,
      description: t.features.fastOrder.description,
      icon: TrendingUp,
      bgColor: "#FFE8E9",
      borderColor: "#FF5A5F",
    },
    {
      name: t.features.inventory.title,
      description: t.features.inventory.description,
      icon: Store,
      bgColor: "#E6F0FF",
      borderColor: "#0066FF",
    },
    {
      name: t.features.analytics.title,
      description: t.features.analytics.description,
      icon: PieChart,
      bgColor: "#E6F9F5",
      borderColor: "#00D4AA",
    },
    {
      name: t.features.customer.title,
      description: t.features.customer.description,
      icon: UserCheck,
      bgColor: "#FFF4E6",
      borderColor: "#FFB020",
    },
    {
      name: t.features.payment.title,
      description: t.features.payment.description,
      icon: Wallet,
      bgColor: "#F0E6FF",
      borderColor: "#8B5CF6",
    },
    {
      name: t.features.mobile.title,
      description: t.features.mobile.description,
      icon: Tablet,
      bgColor: "#FFE8E9",
      borderColor: "#FF5A5F",
    },
  ]
  
  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="blob-background -z-10">
        <div className="blob" style={{
          top: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'var(--color-lavender)',
        }} />
        <div className="blob" style={{
          bottom: '10%',
          right: '10%',
          width: '350px',
          height: '350px',
          background: 'var(--color-sky)',
          animationDelay: '-7s'
        }} />
      </div>
      
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              bounce: 0.4 
            }}
          >
            {/* Sticker badge */}
            <div className="inline-flex items-center gap-2 sticker px-5 py-2 text-sm font-bold rounded-xl mb-6">
              <div className="w-2 h-2 bg-[#FF5A5F] rounded-full animate-pulse" />
              <span className="text-[#121516]">{t.features.sectionTitle}</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-playful block">
                {t.features.title}
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl leading-relaxed text-[#4B5563] max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid max-w-6xl mx-auto grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.name} 
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { 
                  type: "spring",
                  bounce: 0.5,
                  duration: 0.3
                }
              }}
            >
              <div 
                className="card-3d h-full p-8 bg-white border-2 border-gray-100 group cursor-pointer"
                style={{
                  borderRadius: 'var(--radius-card)',
                }}
              >
                {/* Icon with clean background and playful hover */}
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] mb-6"
                  style={{
                    backgroundColor: feature.bgColor,
                    border: `2px solid ${feature.borderColor}`,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { 
                      rotate: {
                        duration: 0.5,
                        ease: "easeInOut"
                      },
                      scale: {
                        type: "spring",
                        bounce: 0.6
                      }
                    }
                  }}
                >
                  <feature.icon 
                    className="h-10 w-10 group-hover:scale-110 transition-transform" 
                    style={{ color: feature.borderColor }}
                    strokeWidth={2}
                    aria-hidden="true" 
                  />
                </motion.div>
                
                {/* Feature title */}
                <h3 className="text-2xl font-black mb-4 text-[#121516] group-hover:text-[#FF5A5F] transition-colors">
                  {feature.name}
                </h3>
                
                {/* Description */}
                <p className="text-base leading-relaxed text-[#4B5563]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
