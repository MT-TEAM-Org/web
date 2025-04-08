import React from "react";
import NewsLeftSidebar from "../_components/NewsLeftSidebar";
import { RightSideBar } from "../../(community)/_components/RightSideBar";
import { cn } from "@/utils";

export const metadata = {
  metadataBase: new URL("https://playhive.co.kr/"),
  title: "PlayHive 뉴스 페이지",
  description: "PlayHive 뉴스 페이지입니다.",
  openGraph: {
    title: "PlayHive 뉴스 페이지",
    description: "PlayHive 뉴스 페이지입니다.",
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
    <div
      className={cn(
        "min-h-[calc(100vh-188px)] pb-[40px] mx-10",
        "tablet:max-w-[688px]",
        "mobile:max-w-[360px] mobile:mx-0"
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
          "mt-[20px] max-w-[1200px] flex mx-auto gap-5",
          "tablet:max-w-[688px] tablet:flex-col tablet:gap-0",
          "mobile:flex mobile:flex-col mobile:gap-0"
        )}
      >
        <div
          className={cn(
            "w-[160px] sticky top-0",
            "tablet:w-full tablet:static tablet:shadow-none",
            "mobile:hidden"
          )}
        >
          <NewsLeftSidebar />
        </div>

        <div
          className={cn(
            "flex-1 max-w-[720px] min-h-[calc(100vh-188px)] mb-10",
            "tablet:max-w-[688px]",
            "mobile:max-w-[360px]"
          )}
        >
          {children}
        </div>

        <div
          className={cn(
            "sticky top-0 mb-[42px]",
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
