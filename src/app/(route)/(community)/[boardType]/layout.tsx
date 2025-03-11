import React from "react";
import Banner from "../_components/Banner";
import LeftSidebar from "../_components/LeftSidebar";
import { RightSideBar } from "../_components/RightSideBar";

export const metadata = {
  title: "게시판 페이지",
  description: "게시판 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center bg-gray1">
      <Banner />
      <div className="mt-[24px] w-[1200px] flex justify-center mx-auto gap-[16px]">
        <div className="w-[160px] min-h-[364px]">
          <div className="sticky top-[120px]">
            <LeftSidebar />
          </div>
        </div>
        <div className="flex-1 max-w-[720px] min-h-[120px]">{children}</div>
        <div className="flex-1">
          <div className="sticky top-[120px]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
