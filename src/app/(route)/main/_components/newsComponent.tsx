"use client";

import React from "react";
import NewsItemSkeleton from "./NewsItemSkeleton";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import NewsItem from "./newsItem";
<<<<<<< HEAD
import { NewsListType } from "@/app/_constants/newsListItemType";
import { NewsItemType } from "@/app/_constants/newsItemType";
=======
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
>>>>>>> 40cf44297da965b2e8ce7a27c714ff440d356e54

const NewsComponent = () => {
  const { data, isLoading } = useGetNewsDataList();

  let slicedNewsData: NewsItemType[] | undefined;

  if (data) {
    if (Array.isArray(data)) {
      slicedNewsData = data.slice(0, 3);
    } else {
      slicedNewsData = data.content.slice(0, 3);
    }
  }

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
