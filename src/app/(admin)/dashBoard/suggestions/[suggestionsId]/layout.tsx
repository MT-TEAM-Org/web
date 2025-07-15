import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개선요청 내역 상세",
  description: "플레이하이브 관리자 개선요청 내역 상세",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full min-h-[calc(100vh-64px)]">{children}</div>;
};

export default layout;
