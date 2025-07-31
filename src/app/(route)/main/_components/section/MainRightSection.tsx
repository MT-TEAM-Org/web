import React from "react";
import MainNewsSection from "./MainNewsSection";
import MainLivePost from "../live/MainLivePost";
import { cn } from "@/utils";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import { getNewsStatus } from "../../_utils/getNewsStatus";

type StateType = {
  isTablet: boolean;
  bigNewsDataIsLoading: boolean;
  newsDataIsLoading: boolean;
};

type DataType = {
  bigNewsItems: NewsItemType[];
  newsItems: NewsItemType[];
};

interface MainRightSectionProps {
  data: DataType;
  state: StateType;
}

const MainRightSection = ({ data, state }: MainRightSectionProps) => {
  // 뉴스 상태 유틸 함수
  const { isValidNews, isError } = getNewsStatus({
    newsItems: data.newsItems,
    bigNewsItems: data.bigNewsItems,
    newsDataIsError: state.newsDataIsLoading,
    bigNewsDataIsError: state.bigNewsDataIsLoading,
  });

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
            bigNewsItems={data.bigNewsItems}
            newsItems={data.newsItems}
            bigNewsDataIsLoading={state.bigNewsDataIsLoading}
            newsDataIsLoading={state.newsDataIsLoading}
            isTablet={state.isTablet}
          />
        )}
        <MainLivePost />
      </div>
    </div>
  );
};

export default MainRightSection;
