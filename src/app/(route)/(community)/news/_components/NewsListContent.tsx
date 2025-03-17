"use client";

import React from "react";
import EmptyNews from "./EmptyNews";
import NewsPostItem from "./NewsPostItem";
import NewsPostItemSkeleton from "./NewsPostItemSkeleton";
import { NewsListDataType } from "@/app/_constants/newsListItemType";
import { NewsListType } from "@/app/_constants/newsListItemType";

interface NewsListContentProps {
  data: NewsListDataType | undefined;
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

  console.log("data: ", data);

  return (
    <>
      {data?.content?.length === 0 ? (
        <EmptyNews />
      ) : (
        data?.content.map((newsItem: NewsListType) => (
          <NewsPostItem key={newsItem.id} newsItem={newsItem} />
        ))
      )}
    </>
  );
};

export default NewsListContent;
