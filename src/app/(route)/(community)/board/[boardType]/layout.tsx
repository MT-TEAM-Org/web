import React from "react";
import Banner from "../../_components/Banner";
import LeftSidebar from "../../_components/LeftSidebar";
import { RightSideBar } from "../../_components/RightSideBar";
import { cn } from "@/utils";

export const metadata = {
  title: "게시판 페이지",
  description: "게시판 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col w-full justify-center items-center bg-gray1 mobile:w-full mobile:mx-auto overflow-hidden"
      )}
    >
      <Banner />
      <div className="mt-[24px] mobile:mt-0 w-full max-w-[1200px] flex justify-center mx-auto gap-[16px] tablet:w-full mobile:w-full mobile:max-w-none mobile:px-4">
        <div className="w-full max-w-[160px] min-h-[364px] hidden pc:block tablet:w-full mobile:w-full">
          <div className="w-full sticky top-0">
            <LeftSidebar />
          </div>
        </div>
        <div
          className={cn(
            "flex-1 min-w-0 min-h-[120px]",
            "tablet:min-w-0 tablet:mx-auto",
            "mobile:w-full"
          )}
        >
          {children}
        </div>
        <div className="flex-1 tablet:hidden mobile:hidden">
          <div className="sticky top-0">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
