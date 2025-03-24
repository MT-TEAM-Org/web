"use client";

import React from "react";
import EmptyNews from "./EmptyNews";
import NewsPostItem from "./NewsPostItem";
import NewsPostItemSkeleton from "./NewsPostItemSkeleton";
import { NewsListDataType } from "@/app/(route)/news/_types/newsListItemType";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";

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

  return (
    <>
      {data?.content?.length === 0 || !data ? (
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
