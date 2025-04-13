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

function HomePageContent() {
  const refreshToken = useHandleRefreshToken();

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
        <div className="w-full max-w-[1200px] min-h-[704px] mb-[30px] flex gap-x-10">
          <div className="max-w-[862px] min-h-[668px] flex gap-10">
            <div className="flex flex-col gap-10">
              {!bigNewsDataIsError && !newsDataIsError && (
                <div className="w-full min-h-[236px] flex gap-4">
                  <MainBigSizeNews
                    data={bigNewsItems}
                    isLoading={bigNewsDataIsLoading}
                    isError={bigNewsDataIsError}
                  />
                  <NewsComponent
                    data={newsItems}
                    isLoading={newsDataIsLoading}
                    isError={newsDataIsError}
                  />
                </div>
              )}

              <div className="w-full min-h-[392px] flex gap-6">
                <HotPost />
                <NewPost />
              </div>
            </div>
          </div>
          <div className="max-w-[298px] min-h-[696px] flex-1">
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
