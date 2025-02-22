import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["imgnews.pstatic.net"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["imgnews.pstatic.net"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "52.79.222.87",
        port: "9000",
        pathname: "/devbucket/**",
      },
    ],
  },

};

export default nextConfig;