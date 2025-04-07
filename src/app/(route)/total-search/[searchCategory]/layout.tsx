import React from "react";
import SearchLeftSideBar from "../_components/SearchLeftSideBar";
import { RightSideBar } from "../../(community)/_components/RightSideBar";
import { cn } from "@/utils";

export const metadata = {
  metadataBase: new URL("https://playhive.co.kr/"),
  title: "PlayHive 전체검색",
  description: "PlayHive에서 뉴스와 콘텐츠를 검색해보세요.",
  openGraph: {
    title: "PlayHive 전체검색",
    description: "PlayHive에서 뉴스와 콘텐츠를 검색해보세요.",
    images: [
      {
        url: "/Metadata.png",
        width: 1200,
        height: 630,
        alt: "PlayHive 이미지",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("w-full grid grid-cols-12")}>
      <div
        className={cn(
          "col-span-11 min-h-[120px] grid grid-cols-12 items-center",
          "tablet:col-span-12"
        )}
      >
        <h1
          className={cn(
            "col-start-3 col-span-10 font-bold text-[28px] leading-10 tracking-[-0.04em]",
            "tablet:col-start-3"
          )}
        >
          통합검색
        </h1>
      </div>

      <div
        className={cn(
          "col-span-12 col-start-2 col-end-12",
          "tablet:max-w-[688px] tablet:mx-auto"
        )}
      >
        <div
          className={cn(
            "w-full flex gap-4 items-start justify-center",
            "tablet:w-[688px] tablet:flex tablet:flex-col tablet:gap-0",
            "mobile:w-[688px] mobile:flex mobile:flex-col mobile:gap-0"
          )}
        >
          <div
            className={cn(
              "w-[160px] bg-white shadow-md sticky top-0",
              "tablet:w-auto tablet:min-h-0 tablet:flex-1 tablet:flex tablet:items-center tablet:justify-center tablet:shadow-none tablet:static",
              "mobile:w-auto mobile:min-h-0 mobile:flex-1 mobile:flex mobile:items-center mobile:justify-center mobile:shadow-none mobile:static"
            )}
          >
            <SearchLeftSideBar />
          </div>

          <div
            className={cn(
              "min-h-[calc(100vh-188px)] mb-10 w-[720px]",
              "tablet:w-[688px]",
              "mobile:w-[360px]"
            )}
          >
            {children}
          </div>

          <div
            className={cn(
              "mb-[42px] sticky top-0",
              "tablet:hidden",
              "mobile:hidden"
            )}
          >
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
