'use client'
import dynamic from 'next/dynamic'

const AnalyticsClient = dynamic(() => import('./analytics-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
    </div>
  )
})

export function AnalyticsWrapper() {
  return <AnalyticsClient />
}
