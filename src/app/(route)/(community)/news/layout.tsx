import React from "react";
import LeftSidebar from "../_components/LeftSidebar";
import { RightSideBar } from "../_components/RightSideBar";

export const metadata = {
  title: "뉴스 페이지",
  description: "뉴스 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-500">
      <div className="w-full h-[40px]">
        <h5 className="w-[200px] h-[40px] absolute top-[170px] left-[360px] font-bold text-[28px] leading-10 tracking-[0.04em]">
          뉴스톡톡
        </h5>
      </div>

      <div className="max-w-[1200px] mx-auto flex gap-[10px] px-[20px]">
        <div className="w-[160px] min-h-[364px]">
          <div className="sticky top-[314px]">
            <LeftSidebar />
          </div>
        </div>
        <div className="flex-1 max-w-[720px] pt-[126px]">{children}</div>
        <div className="flex-1">
          <div className="sticky top-[314px]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
