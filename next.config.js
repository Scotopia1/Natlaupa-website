/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactStrictMode: true,
  // Prisma needs to be external for serverless functions
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Fix turbopack root detection issue with multiple lockfiles
  turbopack: {
    root: process.cwd(),
  },
}

module.exports = nextConfig
