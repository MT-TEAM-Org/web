"use client";

import { Suspense } from "react";
import MainRightBar from "./_components/MainRightBar";
import ScheduleContainer from "./_components/scheduleContainer";
import NewsComponent from "./_components/newsComponent";
import MainBigSizeNews from "./_components/MainBigSizeNews";
import useHandleRefreshToken from "@/_hooks/fetcher/sign/useHandleRefreshToken";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { cn } from "@/utils";
import MainLivePost from "./_components/MainLivePost";
import useIsTablet from "@/utils/useIsTablet";
import MainNewsSection from "./_components/MainNewsSection";

function HomePageContent() {
  const refreshToken = useHandleRefreshToken();
  const { data: userData } = useAuthCheck();
  const isTablet = useIsTablet();

  const {
    data: newsData,
    isLoading: newsDataIsLoading,
    isError: newsDataIsError,
  } = useGetNewsDataList();

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

  const newsItems = Array.isArray(newsData)
    ? newsData
    : newsData?.content || [];
  const bigNewsItems = Array.isArray(bigNewsData)
    ? bigNewsData
    : bigNewsData?.content || [];

  const isValidNews = bigNewsItems.length !== 0 && newsItems.length !== 0;
  const isError = bigNewsDataIsError || newsDataIsError;

  return (
    <div className={cn("flex flex-col gap-6", "mobile:gap-0")}>
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
          <div
            className={cn(
              "max-w-[862px] h-auto flex gap-10",
              "tablet:max-w-full tablet:w-full",
              "mobile:max-w-full"
            )}>
            <div className="w-full flex flex-col gap-10">
              {(isValidNews || !isError) && (
                <MainNewsSection
                  bigNewsItems={bigNewsItems}
                  newsItems={newsItems}
                  bigNewsDataIsLoading={bigNewsDataIsLoading}
                  newsDataIsLoading={newsDataIsLoading}
                  isTablet={isTablet}
                />
              )}
              <div className={cn("w-full", "tablet:w-full")}>
                <MainLivePost />
              </div>
            </div>
          </div>
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
