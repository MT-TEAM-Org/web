"use client";

import React from "react";
import NewsItem from "./newsItem";
import useFetchNewsData from "../../(community)/news/fetchNewsData";

interface newsItem {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
}

const NewsComponent = () => {
  const { data, isLoading, isError } = useFetchNewsData();

  const limitedNewsData = data?.slice(1, 4);
  console.log("newsData: ", limitedNewsData);

  if (isLoading) return "loading...";
  if (isError) return "error...";

  return (
    <div className="w-[436px] min-h-[236px] flex flex-col gap-4">
      {limitedNewsData.map((newsItem: newsItem) => (
        <NewsItem key={newsItem.id} newsItem={newsItem} />
      ))}
    </div>
  );
};

export default NewsComponent;
