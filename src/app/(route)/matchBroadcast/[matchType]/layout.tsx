import React, { use } from "react";
import ScheduleContainer from "../../main/_components/scheduleContainer";
import { cn } from "@/utils";
import MatchMobileGnb from "../_components/matchGnb/MatchMobileGnb";

export const metadata = {
  title: "PlayHive 경기중계 페이지",
  description: "PlayHive 경기중계 페이지입니다.",
  openGraph: {
    title: "PlayHive 경기중계 페이지",
    description: "PlayHive 경기중계 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["플레이하이브", "경기중계", "스포츠", "야구", "축구", "E스포츠"],
};

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ matchType: string }>;
}) {
  const unwrappedParams = use(params);
  const { matchType } = unwrappedParams;

  return (
    <div className="w-full mobile:min-h-[calc(100vh-450px)]">
      <MatchMobileGnb type="match" />
      <div
        className={cn(
          "w-full h-[226px] flex justify-center items-center mx-auto bg-gray1",
          "mobile:h-fit"
        )}
      >
        <div
          className={cn(
            "max-w-full",
            "tablet:max-w-full tablet:mx-6",
            "mobile:h-[158px]"
          )}
        >
          <ScheduleContainer
            matchType={matchType}
            showCategoryButtons={true}
            showAll={false}
            isMatch={true}
          />
        </div>
      </div>
      <div
        className={cn(
          "my-[24px]",
          "mobile:mt-[20px]",
          "pc:min-h-[500px]",
          "tablet:min-h-[550px]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
