"use client"

import dynamic from 'next/dynamic'

const CashFlowClient = dynamic(() => import('./cash-flow-client'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-accent)]"></div>
    </div>
  )
})

export const runtime = 'edge'

export default function CashFlowPage() {
  return <CashFlowClient />
}
