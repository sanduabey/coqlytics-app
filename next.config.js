/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.chikn.farm',
        port: '',
        pathname: '/api/chikn/thumb/**',
      },
      {
        protocol: 'https',
        hostname: 'api.chikn.farm',
        port: '',
        pathname: '/api/roostr/thumb/**',
      },
      {
        protocol: 'https',
        hostname: 'api.chikn.farm',
        port: '',
        pathname: '/api/farmland/thumb/**',
      },
      {
        protocol: 'https',
        hostname: 'chikn-farm.sfo3.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/blueprint/thumbnail/**',
      },
      {
        protocol: 'https',
        hostname: 'chikn-farm.sfo3.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/blueprint/onchain/thumbnail/**',
      },
    ],
  },
  env: {
    HOST: process.env.HOST,
    EGG_CONTRACT_ADDRESS: process.env.EGG_CONTRACT_ADDRESS,
  },
}

module.exports = nextConfig
