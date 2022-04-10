/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  target: 'serverless',
  env: {
    ADDRESS: process.env.CONTRACT_ADDRESS,
    INFURA_API: process.env.INFURA_API,
    PRIVATE_KEY :process.env.PRIVATE_KEY
  },
}

module.exports = nextConfig
