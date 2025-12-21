import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KadaiPOS - Modern POS for Restaurants & Retail',
    short_name: 'KadaiPOS',
    description: 'Modern, fast, and easy to use Point of Sale system for restaurants and retail stores.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF5A5F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
