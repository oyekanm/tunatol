/** @type {import('next').NextConfig} */
// const nodeExternals = require('webpack-node-externals');
// import nodeExternals from "webpack-node-externals"

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
  eslint:{
      ignoreDuringBuilds: true,
  }
};

export default nextConfig;
