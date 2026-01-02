import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite order.kadaipos.id subdomain paths to /order route
        {
          source: '/:restaurantName/:tableBarcode',
          destination: '/order/:restaurantName/:tableBarcode',
          has: [
            {
              type: 'host',
              value: 'order.kadaipos.id',
            },
          ],
        },
      ],
    };
  },
};

export default nextConfig;
