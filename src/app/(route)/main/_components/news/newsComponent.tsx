"use client";

import React from "react";

import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import useIsMobile from "@/utils/useIsMobile";
import useIsTablet from "@/utils/useIsTablet";
import { cn } from "@/utils";
import NewsItemSkeleton from "../state/NewsItemSkeleton";
import NewsItem from "./newsItem";

interface NewsComponentProps {
  data: NewsItemType[] | undefined;
  isLoading: boolean;
}

const NewsComponent = ({ data, isLoading }: NewsComponentProps) => {
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const itemCount = isMobile ? 2 : isTablet ? 4 : 3;

  const slicedNewsData = data?.slice(0, itemCount);
  const skeletonCount = isMobile ? 2 : isTablet ? 4 : 3;

  return (
    <div
      className={cn(
        "max-w-[436px] h-[236px] flex flex-col gap-4 overflow-hidden",
        "tablet:min-w-[348px] tablet:max-w-full tablet:h-auto tablet:overflow-hidden",
        "mobile:max-w-[768px] mobile:h-[152px]"
      )}>
      {isLoading
        ? Array(itemCount)
            .fill(0)
            .map((_, index) => <NewsItemSkeleton key={index} />)
        : slicedNewsData?.map((newsItem: NewsListType) => (
            <NewsItem key={newsItem?.id} newsItem={newsItem} />
          ))}
    </div>
  );
};

export default NewsComponent;
