"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { RightSideBar } from "../../(community)/_components/RightSideBar";

const RightSidebarWrapper = () => {
  const pathname = usePathname();
  const isNoticeWritePage =
    pathname === "/customer/notice/write" ||
    pathname === "/customer/feedback/write";

  return (
    <div className="w-[288px] sticky top-[120px]">
      {!isNoticeWritePage && <RightSideBar />}
    </div>
  );
};

export default RightSidebarWrapper;
