"use client"

import * as React from "react"
import { Activity, TrendingUp, DollarSign, Package, Target, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function BusinessHealthDemo() {
  const { language } = useLanguage()
  
  const healthMetrics = [
    {
      id: "sales",
      icon: DollarSign,
      title: language === 'en' ? 'Sales' : language === 'id' ? 'Penjualan' : '销售',
      score: 87,
      status: "healthy" as const,
      trend: language === 'en' ? '+15% from last month' : language === 'id' ? '+15% dari bulan lalu' : '比上月+15%',
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "hpp",
      icon: Package,
      title: language === 'en' ? 'COGS' : language === 'id' ? 'HPP / COGS' : '销售成本',
      score: 78,
      status: "healthy" as const,
      trend: language === 'en' ? 'Stable' : language === 'id' ? 'Stabil' : '稳定',
      color: "from-orange-500 to-red-500"
    },
    {
      id: "opex",
      icon: TrendingUp,
      title: language === 'en' ? 'Operating Expenses' : language === 'id' ? 'OPEX' : '运营费用',
      score: 82,
      status: "healthy" as const,
      trend: language === 'en' ? '+5% from target' : language === 'id' ? '+5% dari target' : '比目标+5%',
      color: "from-yellow-500 to-amber-500"
    },
    {
      id: "profit",
      icon: Target,
      title: language === 'en' ? 'Net Profit' : language === 'id' ? 'Laba Bersih' : '净利润',
      score: 85,
      status: "healthy" as const,
      trend: language === 'en' ? '42% of revenue' : language === 'id' ? '42% dari revenue' : '收入45%',
      color: "from-blue-500 to-cyan-500"
    }
  ]

  const insights = [
    {
      type: "success" as const,
      title: language === 'en' ? 'Strong Sales Performance' : language === 'id' ? 'Performa Penjualan Kuat' : '销售表现强劲',
      desc: language === 'en' ? 'Sales this month up 15% from last month. Keep the momentum!' : language === 'id' ? 'Penjualan bulan ini naik 15% dari bulan lalu. Pertahankan momentum!' : '本月销售额比上月增长15%。保持势头！'
    },
    {
      type: "warning" as const,
      title: language === 'en' ? 'COGS Increasing' : language === 'id' ? 'HPP Meningkat' : '销售成本上升',
      desc: language === 'en' ? 'Onion prices up 20%. Consider menu price adjustment.' : language === 'id' ? 'Harga bawang merah naik 20%. Pertimbangkan penyesuaian harga menu.' : '洋葱价格上涨20%。考虑调整菜单价格。'
    },
    {
      type: "info" as const,
      title: language === 'en' ? 'AI Prediction' : language === 'id' ? 'Prediksi AI' : 'AI预测',
      desc: language === 'en' ? 'Predicted 8% sales increase next week based on historical trends.' : language === 'id' ? 'Prediksi penjualan naik 8% minggu depan berdasarkan tren historis.' : '根据历史趋势，预测下周销售额增长8%。'
    }
  ]

  const goals = [
    {
      label: language === 'en' ? 'Net Profit Target' : language === 'id' ? 'Target Laba Bersih' : '净利润目标',
      current: 42,
      target: 45,
      value: language === 'en' ? '$3,200' : language === 'id' ? 'Rp 50.5 juta' : '￥65,000'
    },
    {
      label: language === 'en' ? 'Monthly Revenue Target' : language === 'id' ? 'Target Revenue Bulanan' : '月收入目标',
      current: 87,
      target: 100,
      value: language === 'en' ? '$7,600' : language === 'id' ? 'Rp 120 juta' : '￥150,000'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-3xl p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-white/10 backdrop-blur-xl mb-4">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-white">
              {language === 'en' ? 'Example Dashboard' : language === 'id' ? 'Contoh Dashboard' : '示例仪表板'}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {language === 'en' ? 'See Business Health Dashboard' : language === 'id' ? 'Lihat Dashboard Kesehatan Bisnis' : '查看业务健康仪表板'}
          </h3>
          <p className="text-gray-400">
            {language === 'en'
              ? 'Real-time monitoring with AI insights and goal tracking'
              : language === 'id'
              ? 'Monitoring real-time dengan AI insights dan goal tracking'
              : '实时监控，AI洞察和目标跟踪'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Health Score & Metrics */}
          <div className="space-y-6">
            {/* Health Score Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white">
                  {language === 'en' ? 'Health Score' : language === 'id' ? 'Skor Kesehatan' : '健康分数'}
                </h4>
                <Activity className="w-5 h-5 text-green-400" />
              </div>

              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-white/10"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#healthGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="295 352"
                  />
                  <defs>
                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-green-400">85</div>
                  <span className="text-xs text-gray-400 mt-1">
                    {language === 'en' ? 'of 100' : language === 'id' ? 'dari 100' : '/100'}
                  </span>
                  <span className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                    {language === 'en' ? 'Healthy' : language === 'id' ? 'Sehat' : '健康'}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {healthMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="relative group"
                >
                  <div className={`relative rounded-xl bg-gradient-to-br ${metric.color} p-[2px]`}>
                    <div className="rounded-xl bg-black p-4 backdrop-blur-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-white truncate">
                          {metric.title}
                        </span>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                        {metric.score}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Goals & AI Insights */}
          <div className="space-y-6">
            {/* Business Goals */}
            <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-bold text-white">
                  {language === 'en' ? 'Business Goals' : language === 'id' ? 'Target Bisnis' : '业务目标'}
                </h4>
              </div>

              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">{goal.label}</span>
                      <span className="text-sm font-bold text-white">{goal.value}</span>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      {/* Target marker */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-white/60 z-10" 
                        style={{ left: `${goal.target}%` }}
                      />
                      {/* Progress bar */}
                      <div 
                        className={`absolute top-0 bottom-0 left-0 rounded-full ${
                          goal.current >= goal.target 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-yellow-500 to-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, goal.current)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {language === 'en' ? 'Current' : language === 'id' ? 'Saat ini' : '当前'}: {goal.current}%
                      </span>
                      <span className="text-gray-400">
                        {language === 'en' ? 'Target' : language === 'id' ? 'Target' : '目标'}: {goal.target}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-bold text-white">
                  {language === 'en' ? 'AI Recommendations' : language === 'id' ? 'Rekomendasi AI' : 'AI建议'}
                </h4>
              </div>

              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`rounded-xl backdrop-blur-xl border p-4 ${
                    insight.type === "success"
                      ? "bg-green-500/5 border-green-500/30"
                      : insight.type === "warning"
                        ? "bg-yellow-500/5 border-yellow-500/30"
                        : "bg-blue-500/5 border-blue-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      insight.type === "success"
                        ? "bg-green-500/20"
                        : insight.type === "warning"
                          ? "bg-yellow-500/20"
                          : "bg-blue-500/20"
                    }`}>
                      {insight.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : insight.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className={`font-semibold text-sm mb-1 ${
                        insight.type === "success"
                          ? "text-green-400"
                          : insight.type === "warning"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}>
                        {insight.title}
                      </h5>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {insight.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          {language === 'en'
            ? '✨ AI automatically analyzes and provides recommendations based on your business data'
            : language === 'id'
            ? '✨ AI secara otomatis menganalisis dan memberikan rekomendasi berdasarkan data bisnis Anda'
            : '✨ AI自动分析并根据您的业务数据提供建议'}
        </div>
      </div>
    </div>
  )
}
