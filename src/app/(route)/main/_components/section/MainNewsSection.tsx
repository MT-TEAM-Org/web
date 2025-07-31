import { cn } from "@/utils";
import React from "react";
import MainBigSizeNews from "../news/MainBigSizeNews";
import MainRightBar from "../rightNews/MainRightBar";
import NewsComponent from "../news/newsComponent";

interface MainNewsSectionProps {
  bigNewsItems: any[]; // TODO: 타입수정
  newsItems: any[];
  bigNewsDataIsLoading: boolean;
  newsDataIsLoading: boolean;
  isTablet: boolean;
}

const MainNewsSection = ({
  bigNewsItems,
  newsItems,
  bigNewsDataIsLoading,
  newsDataIsLoading,
  isTablet,
}: MainNewsSectionProps) => {
  return (
    <div
      className={cn(
        "max-w-full min-h-[236px] flex gap-4",
        "tablet:h-[396px] tablet:justify-between",
        "mobile:h-[196px] mobile:min-h-0 mobile:flex-col mobile:gap-2"
      )}>
      <h1
        className={cn(
          "font-bold leading-6 tracking-[-0.02em] text-black hidden",
          "mobile:block"
        )}>
        뉴스
      </h1>
      <MainBigSizeNews data={bigNewsItems} isLoading={bigNewsDataIsLoading} />
      <NewsComponent data={newsItems} isLoading={newsDataIsLoading} />
      {isTablet && <MainRightBar isDesktop={false} />}
    </div>
  );
};

export default MainNewsSection;
