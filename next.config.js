/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.chikn.farm',
        port: '',
        pathname: '/api/chikn/thumb/**',
      },
    ],
  },
  env: {
    HOST: process.env.HOST,
  },
}

module.exports = nextConfig
