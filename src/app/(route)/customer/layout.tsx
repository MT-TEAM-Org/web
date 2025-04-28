import React from "react";
import CustomerLeftSidebar from "./_components/CustomerLeftSidebar";
import RightSidebarWrapper from "./_components/RightSidebarWrapper";
import { cn } from "@/utils";
import CustomerMobileGnb from "./_components/customerGnb/CustomerMobileGnb";

export const metadata = {
  title: "PlayHive 고객센터 페이지",
  description: "PlayHive 고객센터 페이지입니다.",
  openGraph: {
    title: "PlayHive 고객센터 페이지",
    description: "PlayHive 고객센터 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["플레이하이브", "고객센터", "공지사항"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "w-full min-h-[calc(100vh-188px)] bg-gray1",
        "tablet:max-w-[1279px]",
        "mobile:w-full mobile:mx-0 mobile:min-h-fit"
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
        <CustomerMobileGnb />
        <CustomerLeftSidebar />

        <div
          className={cn(
            "flex-1 w-full max-w-[720px] mb-0",
            "tablet:max-w-[688px]",
            "mobile:max-w-[768px]"
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
          <RightSidebarWrapper />
        </div>
      </div>
    </div>
  );
}
