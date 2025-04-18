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
    <div className="flex flex-col gap-6">
      <div className="p-6 bg-gray1">
        <ScheduleContainer showAll={true} />
      </div>

      <div className="min-h-[704px] flex justify-center">
        <div
          className={cn(
            "w-full max-w-[1200px] min-h-[704px] mb-[30px] flex gap-x-10",
            "tablet:max-w-[768px]",
            "mobile:flex-col"
          )}
        >
          <div className="max-w-[862px] h-auto flex gap-10">
            <div className="flex flex-col gap-10">
              {!bigNewsDataIsError && !newsDataIsError && (
                <div
                  className={cn(
                    "w-full min-h-[236px] flex gap-4",
                    "tablet:min-h-396px]"
                  )}
                >
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

              <div className="w-full min-h-[392px] flex gap-6">
                <HotPost />
                <NewPost />
              </div>
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
