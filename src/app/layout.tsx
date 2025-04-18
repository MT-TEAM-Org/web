import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./_components/QueryProvider";
import Gnb from "./_components/_gnb/Gnb";
import Footer from "./_components/Footer";
import { ToastContainer } from "./_components/ToastContainer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MobileGnb from "./_components/_gnb/_components/MobileGnb";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="defaultFont">
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
