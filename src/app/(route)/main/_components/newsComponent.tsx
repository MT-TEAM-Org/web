"use client";

import React from "react";
import NewsItemSkeleton from "./NewsItemSkeleton";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import NewsItem from "./newsItem";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { NewsItemType } from "../../news/_types/newsItemType";
import NewsItemIsError from "./NewsItemIsError";

const NewsComponent = () => {
  const { data, isLoading, isError } = useGetNewsDataList();

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
        : isError || slicedNewsData?.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <NewsItemIsError key={index} />
          ))
        : slicedNewsData?.map((newsItem: NewsListType) => (
            <NewsItem key={newsItem?.id} newsItem={newsItem} />
          ))}
    </div>
  );
};

export default NewsComponent;
