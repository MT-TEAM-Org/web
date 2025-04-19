"use client";

import { Suspense } from "react";
import MainRightBar from "./_components/MainRightBar";
import NewPost from "./_components/NewPost";
import ScheduleContainer from "./_components/scheduleContainer";
import HotPost from "./_components/hotPost";
import NewsComponent from "./_components/newsComponent";
import MainBigSizeNews from "./_components/MainBigSizeNews";
import useHandleRefreshToken from "@/_hooks/fetcher/sign/useHandleRefreshToken";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { cn } from "@/utils";
import MainLivePost from "./_components/MainLivePost";

function HomePageContent() {
  const refreshToken = useHandleRefreshToken();
  const { data: userData } = useAuthCheck();

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
      <div className="p-6 bg-gray1">
        <ScheduleContainer showAll={true} />
      </div>

      <div className="min-h-[704px] flex justify-center">
        <div
          className={cn(
            "w-full max-w-[1200px] min-h-[704px] mb-[30px] flex gap-x-10",
            "tablet:max-w-[768px]",
            "mobile:flex-col mobile:px-4"
          )}
        >
          <div className="max-w-[862px] h-auto flex gap-10">
            <div className="flex flex-col gap-10">
              {!bigNewsDataIsError && !newsDataIsError && (
                <div
                  className={cn(
                    "max-w-full min-h-[236px] flex gap-4 overflow-hidden",
                    "tablet:h-[396px]",
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
                  <div className={cn("hidden", "tablet:block")}>
                    <MainRightBar />
                  </div>
                </div>
              )}
              <MainLivePost />
            </div>
          </div>
          <div
            className={cn(
              "max-w-[298px] min-h-[696px] flex-1",
              "tablet:hidden"
            )}
          >
            <MainRightBar />
          </div>
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
