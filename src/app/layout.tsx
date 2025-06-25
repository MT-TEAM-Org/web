import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./_components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { suitFont } from "./font";

export const metadata: Metadata = {
  title: { default: "Playhive", template: "Playhive - %s" },
  description: "함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: { default: "Playhive", template: "Playhive - %s" },
    description: "함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!",
    url: "https://playhive.co.kr",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "플레이하이브",
    "스포츠",
    "E스포츠",
    "e스포츠",
    "커뮤니티",
    "축구",
    "야구",
    "플하",
    "스포츠 뉴스",
    "스포츠 커뮤니티",
    "스포츠 정보",
    "커뮤",
    "스포츠 커뮤니티",
    "스포츠 소식",
    "스포츠 게시판",
    "playhive",
    "Play Hive",
    "PlayHive",
  ],
  other: {
    "google-site-verification": "pGIRhN9ZARqJ4YvsrWTumwGGZ84_1szS0Y4KtZavPJQ",
    "naver-site-verification": "7da94a4ed4283cfc772ded058e02215b7f6c9978",
    "google-adsense-account": "ca-pub-5439279065689577",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={suitFont.variable}>
      <body className="defaultFont">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <QueryProvider>
          {children}
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        </QueryProvider>
      </body>
    </html>
  );
}
