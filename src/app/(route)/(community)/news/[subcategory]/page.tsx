"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useNewsPageLogic } from "@/utils/newsUtils/useNewsPageLogic";
import NewsTalkToolbar from "../_components/NewsTalkToolbar";
import NewsPostItem from "../_components/NewsPostItem";
import { NewsItemType } from "@/app/_constants/newsItemType";
import EmptyNews from "../_components/EmptyNews";
import NewsPostItemSkeleton from "../_components/NewsPostItemSkeleton";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";

export default function NewsPage() {
  const params = useParams();
  const {
    orderType,
    setOrderType,
    pageNum,
    onPageChange,
    timeType,
    setTimeType,
    searchType,
    setSearchType,
  } = useNewsPageLogic();

  const changedCategory = (category: string): string | undefined => {
    const categoryMap: Record<string, string> = {
      esports: "ESPORTS",
      football: "FOOTBALL",
      baseball: "BASEBALL",
    };
    return categoryMap[category];
  };

  const category = changedCategory(String(params.subcategory));

  const { data: newsData, isLoading } = useSortedNewsDataList({
    category,
    orderType,
    timeType,
    pageNum,
    searchType,
  });

  return (
    <div className="flex justify-center bg-gray1">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-white mx-auto">
        <NewsTalkToolbar
          setOrderType={setOrderType}
          setTimeType={setTimeType}
          onPageChange={onPageChange}
          setSearchType={setSearchType}
        />
        <div className="w-[720px]">
          {isLoading ? (
            Array(10)
              .fill(0)
              .map((_, index) => <NewsPostItemSkeleton key={index} />)
          ) : newsData.length === 0 ? (
            <EmptyNews />
          ) : (
            newsData?.map((newsItem: NewsItemType) => (
              <NewsPostItem key={newsItem.id} newsItem={newsItem} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
