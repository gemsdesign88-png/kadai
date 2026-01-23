import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kadai.id';
  
  const routes = [
    '',
    '/features',
    '/pricing',
    '/about',
    '/contact',
    '/benefits',
    '/careers',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : 0.8,
  }));
}
