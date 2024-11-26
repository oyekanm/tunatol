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
      ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
 },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle server-only modules on client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        http2: false,
        dns: false,
        tls: false,
        'firebase-admin': false,
        'gcp-metadata': false,
      };
    }
    return config;
  },
};

export default nextConfig;
