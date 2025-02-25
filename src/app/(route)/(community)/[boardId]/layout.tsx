import React from "react";
import LeftSidebar from "../_components/LeftSidebar";
import { RightSideBar } from "../_components/RightSideBar";
import DetailBanner from "../_components/DetailBanner";

export const metadata = {
  title: "게시글 상세조회",
  description: "게시글 상세조회 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center bg-gray1">
      <DetailBanner />
      <div className="mt-[20px] max-w-[1200px] mx-auto flex gap-[10px]">
        <div className="w-[160px] min-h-[364px]">
          <div className="">
            <LeftSidebar />
          </div>
        </div>
        <div className="flex-1 max-w-[720px]">{children}</div>
        <div className="flex-1">
          <div className="">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
