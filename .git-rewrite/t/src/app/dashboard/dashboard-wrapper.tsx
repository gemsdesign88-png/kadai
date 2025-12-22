"use client"
import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('./dashboard-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
    </div>
  )
});

export default function DashboardWrapper({ restaurants }: { restaurants: any[] }) {
  return <DashboardClient restaurants={restaurants} />;
}
