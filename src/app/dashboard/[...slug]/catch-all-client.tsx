"use client"

import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import AnalyticsClientSlim from '../analytics/analytics-client-slim'

// Use slim versions for heavy components to reduce bundle size
const CashFlow = dynamic(() => import('../cash-flow/cash-flow-client'), { ssr: false })
const Customers = dynamic(() => import('../customers/customers-client'), { ssr: false })
const DemoRequests = dynamic(() => import('../demo-requests/demo-requests-client'), { ssr: false })
const Menu = dynamic(() => import('../menu/menu-client'), { ssr: false })
const MenuManage = dynamic(() => import('../menu/manage/manage-client'), { ssr: false })
const Orders = dynamic(() => import('../orders/orders-client'), { ssr: false })
const Owner = dynamic(() => import('../owner/owner-client'), { ssr: false })
const Restaurant = dynamic(() => import('../owner/restaurant/\[id\]/restaurant-client'), { ssr: false })
const Profile = dynamic(() => import('../profile/profile-client'), { ssr: false })
const Staff = dynamic(() => import('../staff/staff-client'), { ssr: false })
const Subscription = dynamic(() => import('../subscription/subscription-client'), { ssr: false })
const Tables = dynamic(() => import('../tables/tables-client'), { ssr: false })
const TablesManage = dynamic(() => import('../tables/manage/manage-client'), { ssr: false })

export default function CatchAllClient({ slug }: { slug: string }) {
  // Use slim version of analytics to reduce bundle
  if (slug === 'analytics') return <AnalyticsClientSlim />
  if (slug === 'cash-flow') return <CashFlow />
  if (slug === 'customers') return <Customers />
  if (slug === 'demo-requests') return <DemoRequests />
  if (slug === 'menu') return <Menu />
  if (slug === 'menu/manage') return <MenuManage />
  if (slug === 'orders') return <Orders />
  if (slug === 'owner') return <Owner />
  if (slug.startsWith('owner/restaurant/')) return <Restaurant />
  if (slug === 'profile') return <Profile />
  if (slug === 'staff') return <Staff />
  if (slug === 'subscription') return <Subscription />
  if (slug === 'tables') return <Tables />
  if (slug === 'tables/manage') return <TablesManage />
  
  return notFound()
}
