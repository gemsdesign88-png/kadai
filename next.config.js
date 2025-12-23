/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use ISR for all dynamic pages
  typescript: {
    ignoreBuildErrors: true,
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { isServer }) => {
    // Fix React version mismatch - ensure Next.js uses app's React
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    };
    return config;
  },
};

module.exports = nextConfig;
