import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["imgnews.pstatic.net", "54.180.104.178"], // 이미지 호스트 추가

    remotePatterns: [
      {
        protocol: "http",
        hostname: "52.79.222.87",
        port: "9000",
        pathname: "/devbucket/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
