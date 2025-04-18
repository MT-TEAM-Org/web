"use client";

import React from "react";
import NewsItemSkeleton from "./NewsItemSkeleton";
import NewsItem from "./newsItem";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { NewsItemType } from "../../news/_types/newsItemType";
import useIsMobile from "@/utils/useIsMobile";
import useIsTablet from "@/utils/useIsTablet";

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
    <div className="w-[436px] h-auto flex flex-col gap-4">
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
