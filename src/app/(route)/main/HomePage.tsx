"use client";

import { Suspense } from "react";
import ScheduleContainer from "./_components/schedule/scheduleContainer";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import { cn } from "@/utils";
import useIsTablet from "@/utils/useIsTablet";
import MainRightSection from "./_components/section/MainRightSection";
import { extractNewsItemsPair } from "./_utils/extractNewsItems";
import { getNewsStatus } from "./_utils/getNewsStatus";
import dynamic from "next/dynamic";
const MainRightBar = dynamic(
  () => import("./_components/rightNews/MainRightBar")
);

function HomePageContent() {
  const isTablet = useIsTablet();

  // 뉴스 큰 컴포넌트 데이터
  const {
    data: bigNewsData,
    isLoading: bigNewsDataIsLoading,
    isError: bigNewsDataIsError,
  } = useGetNewsDataList({
    page: "1",
    orderType: "VIEW",
    size: 1,
    timePeriod: "MONTHLY",
    withPageInfo: false,
    startIndex: 1,
  });

  // 뉴스 컴포넌트 데이터
  const {
    data: newsData,
    isLoading: newsDataIsLoading,
    isError: newsDataIsError,
  } = useGetNewsDataList();

  // 뉴스 데이터 유틸 함수
  const { newsItems, bigNewsItems } = extractNewsItemsPair({
    newsData,
    bigNewsData,
  });

  // 뉴스 상태 유틸 함수
  const { isValidNews, isError } = getNewsStatus({
    newsItems,
    bigNewsItems,
    newsDataIsError,
    bigNewsDataIsError,
  });

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-120px)] flex flex-col gap-6",
        "mobile:gap-0"
      )}>
      <div className={cn("p-6 bg-gray1", "mobile:p-4")}>
        <ScheduleContainer showAll={true} />
      </div>

      <div className="min-h-[704px] flex justify-center">
        <div
          className={cn(
            "w-full max-w-[1200px] min-h-[704px] mb-[30px] flex gap-x-10",
            "tablet:max-w-full tablet:px-6",
            "mobile:flex-col mobile:p-4"
          )}>
          <MainRightSection
            data={{ bigNewsItems, newsItems }}
            state={{
              isTablet,
              isValidNews,
              isError,
              bigNewsDataIsLoading,
              newsDataIsLoading,
            }}
          />
          {!isTablet && <MainRightBar isDesktop />}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={""}>
      <HomePageContent />
    </Suspense>
  );
}
