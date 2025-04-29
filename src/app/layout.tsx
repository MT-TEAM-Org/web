import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./_components/QueryProvider";
import Gnb from "./_components/_gnb/Gnb";
import Footer from "./_components/Footer";
import { ToastContainer } from "./_components/ToastContainer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MobileGnb from "./_components/_gnb/_components/MobileGnb";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { suitFont } from "./font";

export const metadata: Metadata = {
  title: "Playhive",
  description: "함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Playhive",
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
  keywords: ["플레이하이브", "스포츠", "E스포츠", "커뮤니티", "축구", "야구"],
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  other: {
    "google-site-verification": "pGIRhN9ZARqJ4YvsrWTumwGGZ84_1szS0Y4KtZavPJQ",
  },
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
          <Gnb />
          <MobileGnb />
          {children}
          <Footer />
          <ToastContainer />
          <ReactQueryDevtools />
        </QueryProvider>
      </body>
    </html>
  );
}
