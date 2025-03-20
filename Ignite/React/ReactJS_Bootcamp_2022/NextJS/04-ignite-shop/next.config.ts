import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // use image.remotePatterns

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.stripe.com',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
