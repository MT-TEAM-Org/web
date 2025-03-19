import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "imgnews.pstatic.net",
<<<<<<< HEAD
      "54.180.104.178",
      "rs.nxfs.nexon.com",
      "shared.fastly.steamstatic.com",
    ],

=======
      "43.201.99.157",
      "54.180.104.178",
      "media.playhive.co.kr",
      "naver.com",
    ],
>>>>>>> 363494cff0194a5eeda0fb3e9f3ec7d6052d69f9
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
