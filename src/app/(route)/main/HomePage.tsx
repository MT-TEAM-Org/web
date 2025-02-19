"use client";
import { Suspense } from "react";
import MainRightBar from "./_components/MainRightBar";
import NewPost from "./_components/NewPost";
import ScheduleContainer from "./_components/scheduleContainer";
import HotPost from "./_components/hotPost";
import NewsComponent from "./_components/newsComponent";
import useSocialReissue from "@/_hooks/useSocialReissue";
import MainBigSizeNews from "./_components/MainBigSizeNews";

function HomePageContent() {
  const {} = useSocialReissue();

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 bg-[#FAFAFA]">
        <ScheduleContainer />
      </div>

      <div className="min-h-[704px] flex justify-center">
        <div className="w-full max-w-[1200px] min-h-[704px] mb-[30px] flex gap-x-10">
          <div className="max-w-[862px] min-h-[668px] flex gap-10">
            <div className="flex flex-col gap-10">
              <div className="max-w-[862px] min-h-[236px] flex gap-4">
                <MainBigSizeNews />
                <NewsComponent />
              </div>
              <div className="flex gap-6">
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
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
