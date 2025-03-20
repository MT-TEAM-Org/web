"use client";

import React from "react";
import CustomerLeftSidebar from "./_components/CustomerLeftSidebar";
import { RightSideBar } from "../(community)/_components/RightSideBar";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isNoticeWritePage =
    pathname === "/customer/notice/write" ||
    pathname === "/customer/feedback/write";

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="w-[1200px] min-h-[120px] flex items-center">
        <h1 className="font-bold text-[28px] leading-10 tracking-[-0.04em] ">
          고객센터
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto flex gap-4 items-start justify-center">
        <div className="w-[160px] min-h-[260px] rounded-5px bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] sticky top-[120px]">
          <CustomerLeftSidebar />
        </div>
        <div className="min-h-[calc(100vh-476px)]">{children}</div>
        <div className="w-[288px] sticky top-[120px]">
          {!isNoticeWritePage && <RightSideBar />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
