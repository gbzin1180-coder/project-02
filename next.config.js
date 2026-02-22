/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  swcMinify: true,
  
  // Otimizar imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.imgur.com',
      }
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Cabeçalhos de cache
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ]
  },

  // Rewrite para API
  async rewrites() {
    return {
      beforeFiles: [],
    }
  },
}

module.exports = nextConfig
