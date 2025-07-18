import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원정보 상세페이지",
  description: "플레이하이브 관리자 회원정보 상세페이지",
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
