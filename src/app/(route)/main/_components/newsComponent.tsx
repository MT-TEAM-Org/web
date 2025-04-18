"use client";

import React from "react";
import NewsItemSkeleton from "./NewsItemSkeleton";
import NewsItem from "./newsItem";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { NewsItemType } from "../../news/_types/newsItemType";
import useIsMobile from "@/utils/useIsMobile";
import useIsTablet from "@/utils/useIsTablet";
import { cn } from "@/utils";

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
        "w-[436px] min-h-[236px] flex flex-col gap-4",
        "mobile:min-h-[396px]"
      )}
    >
      {isLoading
        ? Array(skeletonCount)
            .fill(0)
            .map((_, index) => <NewsItemSkeleton key={index} />)
        : slicedNewsData?.map((newsItem: NewsListType) => (
            <NewsItem key={newsItem?.id} newsItem={newsItem} />
          ))}
    </div>
  );
};

export default NewsComponent;
