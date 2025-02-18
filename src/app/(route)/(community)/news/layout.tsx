import React from "react";
import { RightSideBar } from "../_components/RightSideBar";
import NewsLeftSidebar from "./_components/NewsLeftSidebar";

export const metadata = {
  title: "뉴스 페이지",
  description: "뉴스 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-500 flex flex-col justify-between items-center">
      <div className="w-[1200px] min-h-[160px] flex items-center">
        <h5 className="font-bold text-[28px] leading-10 tracking-[0.04em]">
          뉴스톡톡
        </h5>
      </div>

      <div className="max-w-[1200px] mx-auto flex gap-4">
        <div className="w-[160px] min-h-[364px] rounded-[5px] overflow-hidden">
          <NewsLeftSidebar />
        </div>
        <div className="flex-1 max-w-[720px] mb-[47px] rounded-bl-[5px] rounded-br-[5px]">
          {children}
        </div>
        <div className="flex-1">
          <div className="">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
