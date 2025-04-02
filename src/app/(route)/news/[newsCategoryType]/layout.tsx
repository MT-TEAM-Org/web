import React from "react";

import NewsLeftSidebar from "../_components/NewsLeftSidebar";
import { RightSideBar } from "../../(community)/_components/RightSideBar";
import { cn } from "@/utils";

export const metadata = {
  title: "뉴스 페이지",
  description: "뉴스 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between items-center bg-gray1",
        "tablet:flex tablet:flex-col",
        "mobile:w-[360px] mobile:flex mobile:flex-col"
      )}
    >
      <div
        className={cn(
          "w-[1200px] min-h-[120px] flex items-center",
          "tablet:w-full tablet:text-start tablet:ml-10",
          "mobile:hidden"
        )}
      >
        <h5 className="font-bold text-[28px] leading-10 tracking-[-0.04em]">
          뉴스톡톡
        </h5>
      </div>

      <div
        className={cn(
          "max-w-[1200px] mx-auto flex gap-4",
          "tablet:flex tablet:flex-col tablet:gap-0",
          "mobile:flex mobile:flex-col mobile:gap-0"
        )}
      >
        <div
          className={cn(
            "w-[160px] min-h-[260px] rounded-[5px]",
            "tablet:min-h-0",
            "mobile:min-h-0"
          )}
        >
          <div className="sticky top-0">
            <NewsLeftSidebar />
          </div>
        </div>
        <div className="flex-1 max-w-[720px] mb-[47px] rounded-b-[5px]">
          {children}
        </div>
        <div className={cn("flex-1 mb-12", "tablet:hidden", "mobile:hidden")}>
          <div className="sticky top-0">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
