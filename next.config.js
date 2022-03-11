/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  target: 'serverless',
  env: {
    ADDRESS: process.env.CONTRACT_ADDRESS,
  },
}

module.exports = nextConfig
