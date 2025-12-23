"use client"
import dynamic from 'next/dynamic'

const DemoRequestsClient = dynamic(() => import('./demo-requests-client'), { ssr: false })

export const runtime = 'edge'

export default function DemoRequestsPage() {
  return <DemoRequestsClient />
}
