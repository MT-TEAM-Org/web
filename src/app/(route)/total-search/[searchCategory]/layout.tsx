import React from "react";
import SearchLeftSideBar from "../_components/SearchLeftSideBar";
import { RightSideBar } from "../../(community)/_components/RightSideBar";
import { cn } from "@/utils";
import TotalSearchMobileGnb from "../_components/totalSearchGnb/TotalSearchMobileGnb";

export const metadata = {
  title: "PlayHive 전체검색",
  description: "PlayHive에서 뉴스와 콘텐츠를 검색해보세요.",
  openGraph: {
    title: "PlayHive 전체검색",
    description: "PlayHive에서 뉴스와 콘텐츠를 검색해보세요.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata2.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["플레이하이브", "뉴스", "게시판", "통합검색"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-188px)] bg-gray1",
        "tablet:min-w-[768px] tablet:max-w-[1279px] tablet:px-[40px]",
        "mobile:w-full mobile:mx-0"
      )}
    >
      <div
        className={cn(
          "max-w-[1200px] mx-auto pt-[40px] pb-[20px]",
          "tablet:max-w-full",
          "mobile:hidden"
        )}
      >
        <h1 className="text-[28px] font-bold leading-10 tracking-[-0.04em]">
          통합검색
        </h1>
      </div>

      <div
        className={cn(
          "mt-[20px] max-w-[1200px] flex mx-auto gap-4",
          "tablet:max-w-full tablet:flex-col tablet:gap-0",
          "mobile:w-full mobile:flex mobile:flex-col mobile:gap-0 mobile:mt-0"
        )}
      >
        <div
          className={cn(
            "w-[160px] h-[104px] sticky top-0",
            "tablet:w-full tablet:h-auto tablet:min-h-[52px] tablet:static tablet:overflow-x-auto",
            "mobile:w-full mobile:h-auto mobile:min-h-[52px] mobile:static mobile:overflow-x-auto"
          )}
        >
          <TotalSearchMobileGnb />
          <SearchLeftSideBar />
        </div>

        <div
          className={cn(
            "flex-1 w-full max-w-[720px] min-h-[calc(100vh-188px)] mb-10",
            "tablet:max-w-full",
            "mobile:w-full mobile:max-w-none mobile:mb-0"
          )}
        >
          {children}
        </div>

        <div
          className={cn(
            "sticky top-0 mb-[42px] self-start",
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
