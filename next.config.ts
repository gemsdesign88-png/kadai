import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite order.kadai.id subdomain paths to /order route
        {
          source: '/:path*',
          destination: '/order/:path*',
          has: [
            {
              type: 'host',
              value: 'order.kadai.id',
            },
          ],
        },
        // Backward-compatible: keep old subdomain working (middleware should redirect permanently)
        {
          source: '/:path*',
          destination: '/order/:path*',
          has: [
            {
              type: 'host',
              value: 'order.kadaipos.id',
            },
          ],
        },
        {
          source: '/po/:path*',
          destination: '/api/po/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
