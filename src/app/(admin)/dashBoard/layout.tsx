import React from "react";
import type { Metadata } from "next";
import Header from "@/app/(admin)/_components/gnb/Header";
import Navbar from "@/app/(admin)/_components/gnb/Navbar";
import { ToastContainer } from "@/app/_components/ToastContainer";

export const metadata: Metadata = {
  title: { default: "Playhive", template: "Playhive - %s" },
  description: "플레이하이브 관리자 페이지",
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />

      <div className="flex">
        <aside className="min-h-[calc(100vh-64px)] bg-Fifth text-white flex flex-col">
          <Navbar />
        </aside>

        <main className="flex-1 p-6">
          <div className="w-full h-full ">{children}</div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
