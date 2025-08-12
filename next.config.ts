/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
