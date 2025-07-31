import React from "react";
import MainNewsSection from "./MainNewsSection";
import MainLivePost from "./MainLivePost";
import { cn } from "@/utils";

interface MainRightSectionProps {
  bigNewsItems: any[]; // TODO: 타입수정
  newsItems: any[];
  bigNewsDataIsLoading: boolean;
  newsDataIsLoading: boolean;
  isTablet: boolean;
  isValidNews: boolean;
  isError: boolean;
}

const MainRightSection = ({
  bigNewsItems,
  newsItems,
  bigNewsDataIsLoading,
  newsDataIsLoading,
  isTablet,
  isValidNews,
  isError,
}: MainRightSectionProps) => {
  return (
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
        <MainLivePost />
      </div>
    </div>
  );
};

export default MainRightSection;
