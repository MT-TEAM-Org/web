import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "imgnews.pstatic.net",
      "43.201.99.157",
      "54.180.104.178",
      "rs.nxfs.nexon.com",
      "shared.fastly.steamstatic.com",
      "naver.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "43.201.99.157",
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
