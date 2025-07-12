import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'placehold.co',
      'res.cloudinary.com',
      'darkgray-termite-166434.hostingersite.com'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://darkgray-termite-166434.hostingersite.com/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
