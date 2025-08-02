"use client";

import React from "react";
import MainNewsSection from "./MainNewsSection";
import { cn } from "@/utils";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import dynamic from "next/dynamic";
const MainLivePost = dynamic(() => import("../live/MainLivePost"));

type StateType = {
  isTablet: boolean;
  isValidNews: boolean;
  isError: boolean;
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
  return (
    <div
      className={cn(
        "max-w-[862px] h-auto flex gap-10",
        "tablet:max-w-full tablet:w-full",
        "mobile:max-w-full"
      )}>
      <div className="w-full flex flex-col gap-10">
        {(state.isValidNews || !state.isError) && (
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
