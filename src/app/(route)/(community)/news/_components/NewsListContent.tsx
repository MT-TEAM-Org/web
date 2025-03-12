"use client";

import React from "react";
import EmptyNews from "./EmptyNews";
import NewsPostItem from "./NewsPostItem";
import NewsPostItemSkeleton from "./NewsPostItemSkeleton";
import { NewsItemType } from "@/app/_constants/newsItemType";

interface NewsListContentProps {
  data: NewsItemType[];
  isLoading: boolean;
  isError: boolean;
}

const NewsListContent = ({ data, isLoading }: NewsListContentProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <NewsPostItemSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <>
      {data.length === 0 ? (
        <EmptyNews />
      ) : (
        data.map((newsItem) => (
          <NewsPostItem key={newsItem.id} newsItem={newsItem} />
        ))
      )}
    </>
  );
};

export default NewsListContent;
