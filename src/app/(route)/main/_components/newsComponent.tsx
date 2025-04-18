"use client";

import React from "react";
import NewsItemSkeleton from "./NewsItemSkeleton";
import NewsItem from "./newsItem";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { NewsItemType } from "../../news/_types/newsItemType";

interface NewsComponentProps {
  data: NewsItemType[] | undefined;
  isLoading: boolean;
}

const NewsComponent = ({ data, isLoading }: NewsComponentProps) => {
  const slicedNewsData = data?.slice(0, 3);

  return (
    <div className="w-[436px] min-h-[236px] flex flex-col gap-4">
      {isLoading
        ? Array(3)
            .fill(0)
            .map((_, index) => <NewsItemSkeleton key={index} />)
        : slicedNewsData?.map((newsItem: NewsListType) => (
            <NewsItem key={newsItem?.id} newsItem={newsItem} />
          ))}
    </div>
  );
};

export default NewsComponent;
