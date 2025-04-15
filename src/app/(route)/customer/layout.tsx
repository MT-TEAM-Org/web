import React from "react";
import CustomerLeftSidebar from "./_components/CustomerLeftSidebar";
import RightSidebarWrapper from "./_components/RightSidebarWrapper";
import { cn } from "@/utils";

export const metadata = {
  title: "PlayHive 고객센터 페이지",
  description: "PlayHive 고객센터 페이지입니다.",
  openGraph: {
    title: "PlayHive 고객센터 페이지",
    description: "PlayHive 고객센터 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
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
        "min-h-[calc(100vh-188px)] mx-10",
        "tablet:max-w-[1279px]",
        "mobile:w-full mobile:mx-0"
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
          고객센터
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
            "w-[160px] h-[260px] sticky top-0 shadow-md",
            "tablet:w-full tablet:h-auto tablet:min-h-[52px] tablet:static tablet:shadow-none tablet:overflow-x-auto",
            "mobile:w-full mobile:h-auto mobile:min-h-[52px] mobile:static mobile:shadow-none mobile:overflow-x-auto"
          )}
        >
          <CustomerLeftSidebar />
        </div>

        <div
          className={cn(
            "flex-1 w-full max-w-[720px] min-h-[calc(100vh-100px)] mb-10",
            "tablet:max-w-[688px]",
            "mobile:w-full mobile:max-w-none"
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
          <RightSidebarWrapper />
        </div>
      </div>
    </div>
  );
}
