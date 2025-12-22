import CatchAllClient from './catch-all-client'

export default function DashboardCatchAll({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  return <CatchAllClient slug={slug} />
}
