import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "내 정보",
  description: "플레이하이브 관리자 내 정보",
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
  return <main className="w-full min-h-[calc(100vh-64px)]">{children}</main>;
};

export default layout;
