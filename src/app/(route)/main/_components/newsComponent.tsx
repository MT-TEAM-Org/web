"use client";

import React from "react";
import NewsItem from "./newsItem";
import useGetNewsDataList from "@/_hooks/useNews/useGetNewsDataList";
import { NewsItemType } from "@/app/_constants/newsItemType";

const NewsComponent = () => {
  const { data, isLoading, isError } = useGetNewsDataList();

  const slicedNewsData = data?.slice(1, 4);
  console.log("newsData: ", slicedNewsData);

  if (isLoading) return "loading...";
  if (isError) return "error...";

  return (
    <div className="w-[436px] min-h-[236px] flex flex-col gap-4">
      {slicedNewsData.map((newsItem: NewsItemType) => (
        <NewsItem key={newsItem.id} newsItem={newsItem} />
      ))}
    </div>
  );
};

export default NewsComponent;
