import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "문의 관리",
  description: "플레이하이브 관리자 문의 관리",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full min-h-[calc(100vh-64px)]">{children}</main>;
};

export default Layout;
