/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  target: 'serverless',
  env: {
    ADDRESS: process.env.CONTRACT_ADDRESS,
    INFURA_API: process.env.INFURA_API
  },
}

module.exports = nextConfig
