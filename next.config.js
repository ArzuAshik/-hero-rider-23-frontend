/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hero-rider-23.herokuapp.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
