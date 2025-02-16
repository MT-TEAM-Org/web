import React from "react";
import Banner from "../_components/Banner";
import LeftSidebar from "../_components/LeftSidebar";
import { RightSideBar } from "../_components/RightSideBar";

export const metadata = {
  title: "e스포츠 페이지",
  description: "e스포츠 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fafafa]">
      <Banner url={"eSports_banner.png"} />
      <div className="mt-[20px] max-w-[1200px] flex justify-center mx-auto gap-[10px] px-[20px]">
        <div className="w-[160px] min-h-[364px]">
          <div className="sticky top-[314px]">
            <LeftSidebar isEsports />
          </div>
        </div>
        <div className="flex-1 max-w-[720px]">{children}</div>
        <div className="flex-1">
          <div className="sticky top-[314px]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
