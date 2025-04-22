import React from "react";
import NewsLeftSidebar from "../_components/NewsLeftSidebar";
import { RightSideBar } from "../../(community)/_components/RightSideBar";
import { cn } from "@/utils";
import NewsMobileGnb from "../_components/newsGnb/NewsMobileGnb";

export const metadata = {
  title: "PlayHive 뉴스 페이지",
  description: "PlayHive 뉴스 페이지입니다.",
  openGraph: {
    title: "PlayHive 뉴스 페이지",
    description: "PlayHive 뉴스 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-188px)] pb-[40px] bg-gray1",
        "tablet:max-w-[1279px]",
        "mobile:w-full mobile:mx-0 mobile:pb-0"
      )}
    >
      <div
        className={cn(
          "max-w-[1200px] mx-auto pt-[40px] pb-[20px]",
          "tablet:w-[688px]",
          "mobile:hidden"
        )}
      >
        <h1 className="text-[28px] font-bold leading-10 tracking-[-0.04em]">
          뉴스톡톡
        </h1>
      </div>

      <div
        className={cn(
          "mt-[20px] max-w-[1200px] flex mx-auto gap-4",
          "tablet:max-w-[688px] tablet:flex-col tablet:gap-0",
          "mobile:w-full mobile:flex mobile:flex-col mobile:gap-0 mobile:mt-0"
        )}
      >
        <div
          className={cn(
            "w-[160px] pc:h-[260px] sticky top-0 rounded-[5px] overflow-hidden",
            "tablet:w-full tablet:h-auto tablet:min-h-[52px] tablet:static tablet:overflow-x-auto",
            "mobile:w-full mobile:h-auto mobile:min-h-[52px] mobile:static mobile:overflow-x-auto"
          )}
        >
          <NewsMobileGnb />
          <NewsLeftSidebar />
        </div>

        <div
          className={cn(
            "flex-1 w-full max-w-[720px]",
            "tablet:max-w-[688px]",
            "mobile:w-full mobile:max-w-none"
          )}
        >
          {children}
        </div>

        <div
          className={cn(
            "sticky top-0 self-start",
            "tablet:hidden",
            "mobile:hidden"
          )}
        >
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}
