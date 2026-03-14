"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Store, UtensilsCrossed, Briefcase, ChefHat, Warehouse, Users } from "lucide-react"
import Logo from "@/components/Logo"
import { useRouter } from "next/navigation"

/**
 * Option A: Equal Orbital Nodes
 * All nodes positioned equally around center Kadai logo
 * Each node has equal visual weight and importance
 */

interface Node {
  id: string
  label: string
  subtitle: string
  icon: React.ReactNode
  color: string
  glowColor: string
  tagline: string
  angle: number
}

interface Connection {
  from: string
  to: string
  color: string
  bidirectional?: boolean
}

export function CircularOptionA() {
  const nodes: Node[] = [
    {
      id: "customer",
      label: "Customer",
      subtitle: "End User",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      glowColor: "shadow-purple-500/50",
      tagline: "Pengguna akhir yang dilayani oleh ekosistem Kadai",
      angle: 0, // 12 o'clock
    },
    {
      id: "toko",
      label: "Toko",
      subtitle: "Retail POS",
      icon: <Store className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/50",
      tagline: "Sistem kasir pintar untuk bisnis retail & toko kelontong",
      angle: 60, // 2 o'clock
    },
    {
      id: "resto",
      label: "Resto",
      subtitle: "F&B System",
      icon: <UtensilsCrossed className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      glowColor: "shadow-orange-500/50",
      tagline: "Solusi manajemen restoran, kafe, dan bakery",
      angle: 120, // 4 o'clock
    },
    {
      id: "preppo",
      label: "Preppo",
      subtitle: "Central Kitchen",
      icon: <ChefHat className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      glowColor: "shadow-yellow-500/50",
      tagline: "Manajemen dapur terpusat untuk efisiensi produksi",
      angle: 180, // 6 o'clock
    },
    {
      id: "depo",
      label: "Depo",
      subtitle: "Warehouse",
      icon: <Warehouse className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      glowColor: "shadow-green-500/50",
      tagline: "Sistem gudang dan distribusi stok multi-lokasi",
      angle: 240, // 8 o'clock
    },
    {
      id: "pro",
      label: "Pro",
      subtitle: "Professional",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      glowColor: "shadow-indigo-500/50",
      tagline: "Layanan profesional dan jasa servis mandiri",
      angle: 300, // 10 o'clock
    },
  ]

  // Define relationships between nodes
  const connections: Connection[] = [
    // Customer connects to all business types
    { from: "customer", to: "toko", color: "rgb(147, 197, 253)" }, // blue-300
    { from: "customer", to: "resto", color: "rgb(253, 186, 116)" }, // orange-300
    { from: "customer", to: "pro", color: "rgb(196, 181, 253)" }, // indigo-300
    
    // Business relationships with Depo (warehouse)
    { from: "toko", to: "depo", color: "rgb(110, 231, 183)", bidirectional: true }, // green-300
    { from: "resto", to: "depo", color: "rgb(134, 239, 172)", bidirectional: true }, // green-300
    { from: "pro", to: "depo", color: "rgb(167, 243, 208)", bidirectional: true }, // green-300
    
    // Resto with Preppo (central kitchen)
    { from: "resto", to: "preppo", color: "rgb(252, 211, 77)", bidirectional: true }, // yellow-300
  ]

  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null)
  const radius = 240 // Distance from center
  const router = useRouter()

  const getNodeRoute = (nodeId: string): string | null => {
    const routes: Record<string, string> = {
      toko: '/business/toko',
      resto: '/business/resto',
      preppo: '/business/preppo',
      depo: '/business/depo',
      pro: '/business/pro',
    }
    return routes[nodeId] || null
  }

  const handleNodeClick = (nodeId: string) => {
    const route = getNodeRoute(nodeId)
    if (route) {
      router.push(route)
    }
  }

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Background layer for SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="lineGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <g transform="translate(600, 350)">
        {nodes.map((node, index) => {
          const angleRad = (node.angle * Math.PI) / 180
          const x2 = Math.sin(angleRad) * radius
          const y2 = -Math.cos(angleRad) * radius
          
          return (
            <motion.g key={`line-${node.id}`}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.15 }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
                x1="0"
                y1="0"
                x2={x2}
                y2={y2}
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              
              {/* Flowing dot on line */}
              <motion.circle
                r="4"
                fill="currentColor"
                className="text-green-400"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(74, 222, 128, 0.8))'
                }}
                animate={{
                  cx: [0, x2],
                  cy: [0, y2],
                  opacity: [0, 0.8, 1, 0.8, 0],
                  scale: [0.8, 1, 1.2, 1, 0.8]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: index * 0.6,
                  ease: "easeInOut"
                }}
              />
            </motion.g>
          )
        })}

        {/* Relationship connections between nodes */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find(n => n.id === conn.from)
          const toNode = nodes.find(n => n.id === conn.to)
          if (!fromNode || !toNode) return null

          const isConnected = hoveredNode === conn.from || hoveredNode === conn.to
          
          const fromAngleRad = (fromNode.angle * Math.PI) / 180
          const toAngleRad = (toNode.angle * Math.PI) / 180
          const fromX = Math.sin(fromAngleRad) * radius
          const fromY = -Math.cos(fromAngleRad) * radius
          const toX = Math.sin(toAngleRad) * radius
          const toY = -Math.cos(toAngleRad) * radius

          return (
            <motion.g key={`connection-${conn.from}-${conn.to}`}>
              {/* Main connection line */}
              <motion.line
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: isConnected ? 0.9 : 0,
                  pathLength: isConnected ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke={conn.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={conn.bidirectional ? "none" : "8 4"}
                style={{
                  filter: `drop-shadow(0 0 4px ${conn.color})`
                }}
              />

              {/* Secondary glow line */}
              {isConnected && (
                <motion.line
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={conn.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.2"
                  style={{
                    filter: `blur(4px)`
                  }}
                />
              )}

              {/* Arrow indicator for directional connections */}
              {isConnected && !conn.bidirectional && (
                <motion.circle
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  r="5"
                  cx={toX}
                  cy={toY}
                  fill={conn.color}
                  style={{
                    filter: `drop-shadow(0 0 6px ${conn.color})`
                  }}
                />
              )}

              {/* Animated pulse on connection when hovered */}
              {isConnected && (
                <>
                  <motion.circle
                    r="5"
                    fill={conn.color}
                    style={{
                      filter: `drop-shadow(0 0 8px ${conn.color})`
                    }}
                    animate={{
                      cx: [fromX, toX],
                      cy: [fromY, toY],
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: idx * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                  {conn.bidirectional && (
                    <motion.circle
                      r="5"
                      fill={conn.color}
                      style={{
                        filter: `drop-shadow(0 0 8px ${conn.color})`
                      }}
                      animate={{
                        cx: [toX, fromX],
                        cy: [toY, fromY],
                        opacity: [0, 1, 1, 0],
                        scale: [0.8, 1, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: idx * 0.4 + 1.25,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </>
              )}
            </motion.g>
          )
        })}
        </g>
      </svg>

      {/* Center Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%" 
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="absolute z-20 w-44 h-44 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-green-400/30 flex items-center justify-center shadow-[0_0_100px_rgba(74,222,128,0.3)]"
      >
        {/* Outer pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-green-400/40"
        />
        
        {/* Inner glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl"
        />
        
        <Logo width={70} height={70} color="white" hideText={true} />
      </motion.div>

      {/* Nodes layer */}
      {nodes.map((node, index) => {
        const angleRad = (node.angle * Math.PI) / 180
        const x = Math.sin(angleRad) * radius
        const y = -Math.cos(angleRad) * radius
        const isHovered = hoveredNode === node.id

        return (
          <motion.div
            key={node.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              x: "-50%",
              y: "-50%"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 120,
              damping: 15,
              delay: 0.6 + index * 0.12 
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => handleNodeClick(node.id)}
            className={`absolute transition-all duration-300 ${hoveredNode === node.id ? 'z-[60]' : 'z-30'} ${getNodeRoute(node.id) ? 'cursor-pointer' : 'cursor-default'}`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <motion.div
              className="relative"
            >
              {/* Outer glow effect when hovered */}
              {isHovered && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.4 }}
                  exit={{ scale: 1, opacity: 0 }}
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-green-400/30 to-blue-400/30 blur-xl"
                />
              )}
              
              {/* Node content */}
              <div className={`relative w-36 h-36 rounded-3xl backdrop-blur-xl border-2 flex flex-col items-center justify-center gap-2 group transition-all duration-500 overflow-hidden ${isHovered ? 'border-green-400 shadow-[0_0_50px_rgba(74,222,128,0.4),0_0_100px_rgba(74,222,128,0.2)] bg-gradient-to-br from-gray-800 to-gray-900' : 'border-white/20 bg-gray-900/95 shadow-xl'}`}>
                {/* Animated background shimmer */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12"
                    style={{ transform: 'translateX(-100%)' }}
                  />
                )}
                
                <motion.div 
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`transition-all duration-500 relative z-10 ${isHovered ? 'text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]' : 'text-white'}`}
                >
                  {node.icon}
                </motion.div>
                
                <div className="flex flex-col items-center text-center px-2 relative z-10">
                  <motion.span 
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    className={`text-sm font-bold transition-colors duration-500 ${isHovered ? 'text-green-400' : 'text-white'}`}
                  >
                    {node.label}
                  </motion.span>
                  <span className={`text-[10px] uppercase tracking-[0.15em] mt-1 transition-all duration-500 ${isHovered ? 'text-green-400/80 tracking-[0.2em]' : 'text-gray-400'}`}>
                    {node.subtitle}
                  </span>
                </div>
              </div>

              {/* Tagline tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: node.angle > 120 && node.angle < 240 ? -15 : 15, x: "-50%", scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                  className={`absolute left-1/2 w-72 p-5 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-green-400/40 text-center z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(74,222,128,0.2)] backdrop-blur-3xl ${
                    node.angle > 120 && node.angle < 240 ? 'bottom-full mb-5' : 'top-full mt-5'
                  }`}
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-2xl" />
                  
                  <p className="text-sm text-gray-100 leading-relaxed font-medium relative z-10">{node.tagline}</p>
                  
                  {/* Click hint for clickable nodes */}
                  {getNodeRoute(node.id) && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs text-green-400 mt-2 font-semibold relative z-10"
                    >
                      ✨ Click to explore
                    </motion.p>
                  )}
                  
                  {/* Enhanced anchor arrow */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 ${
                    node.angle > 120 && node.angle < 240 ? '-bottom-2' : '-top-2'
                  }`}>
                    <div className={`w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-400/40 rotate-45 ${
                      node.angle > 120 && node.angle < 240 ? '' : ''
                    }`} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )
      })}

      {/* Supplier Integration Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        className="absolute top-8 right-8"
      >
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="relative group cursor-pointer"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
          
          <div className="relative px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-yellow-400/20 group-hover:border-yellow-400/40 shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              />
              <span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Supplier Integration</span>
              <span className="text-xs text-gray-400 px-2.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 font-semibold">Coming Q3 2026</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
