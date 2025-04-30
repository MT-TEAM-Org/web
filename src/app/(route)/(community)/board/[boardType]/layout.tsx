import React from "react";
import Banner from "../../_components/Banner";
import LeftSidebar from "../../_components/LeftSidebar";
import { RightSideBar } from "../../_components/RightSideBar";
import { cn } from "@/utils";

export const metadata = {
  title: "PlayHive 게시판 페이지",
  description: "PlayHive 게시판 페이지입니다.",
  openGraph: {
    title: "PlayHive 게시판 페이지",
    description: "PlayHive 게시판 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["플레이하이브", "게시판", "커뮤니티", "E스포츠", "축구", "야구"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col w-full justify-center items-center bg-gray1 pb-[40px] tablet:pb-0 mobile:pb-0 mobile:w-full mobile:max-w-[768px] mobile:min-w-[360px] mobile:mx-auto"
      )}
    >
      <Banner />
      <div className="mt-[24px] mobile:mt-0 w-full max-w-[1200px] flex justify-center mx-auto gap-[16px] pc:min-h-[calc(100vh-660px)] tablet:min-h-[calc(100vh-707px)] tablet:w-full mobile:w-full mobile:max-w-[768px] mobile:min-h-[calc(100vh-451px)] mobile:min-w-[360px]">
        <div className="w-full max-w-[160px] min-h-[364px] hidden pc:block tablet:w-full mobile:w-full">
          <div className="w-full sticky top-0">
            <LeftSidebar />
          </div>
        </div>
        <div
          className={cn(
            "flex-1 max-w-[720px] min-h-[120px]",
            "tablet:max-w-[688px] tablet:w-full tablet:mx-auto",
            "mobile:w-full mobile:max-w-[768px] mobile:min-w-0"
          )}
        >
          {children}
        </div>
        <div className="flex-1 tablet:hidden mobile:hidden">
          <div className="sticky top-0 ">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
