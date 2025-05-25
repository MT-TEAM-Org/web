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
    timePeriod: "WEEKLY",
    withPageInfo: false,
  });

  const newsItems = Array.isArray(newsData)
    ? newsData
    : newsData?.content || [];
  const bigNewsItems = Array.isArray(bigNewsData)
    ? bigNewsData
    : bigNewsData?.content || [];

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
          )}
        >
          <div
            className={cn(
              "max-w-[862px] h-auto flex gap-10",
              "tablet:max-w-full tablet:w-full",
              "mobile:max-w-full"
            )}
          >
            <div className="w-full flex flex-col gap-10">
              {!bigNewsDataIsError && !newsDataIsError && (
                <div
                  className={cn(
                    "max-w-full min-h-[236px] flex gap-4",
                    "tablet:h-[396px] tablet:justify-between",
                    "mobile:h-[196px] mobile:min-h-0 mobile:flex-col mobile:gap-2"
                  )}
                >
                  <h1
                    className={cn(
                      "font-bold leading-6 tracking-[-0.02em] text-black hidden",
                      "mobile:block"
                    )}
                  >
                    뉴스
                  </h1>
                  <MainBigSizeNews
                    data={bigNewsItems}
                    isLoading={bigNewsDataIsLoading}
                  />
                  <NewsComponent
                    data={newsItems}
                    isLoading={newsDataIsLoading}
                  />
                  {isTablet && (
                    <div className="tablet:block">
                      <MainRightBar />
                    </div>
                  )}
                </div>
              )}
              <div className={cn("w-full", "tablet:w-full")}>
                <MainLivePost />
              </div>
            </div>
          </div>
          {!isTablet && (
            <div
              className={cn(
                "max-w-[298px] min-h-[696px] flex-1",
                "mobile:max-w-full mobile:min-h-fit"
              )}
            >
              <MainRightBar />
            </div>
          )}
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
