"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useNewsPageLogic } from "@/utils/newsUtils/useNewsPageLogic";
import NewsTalkToolbar from "../_components/NewsTalkToolbar";
import NewsPostItem from "../_components/NewsPostItem";
import EmptyNews from "../_components/EmptyNews";
import NewsPostItemSkeleton from "../_components/NewsPostItemSkeleton";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";

type NewsCategoryType = "ESPORTS" | "FOOTBALL" | "BASEBALL";

interface NewsItemType {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
  content: string;
  source: string;
  viewCount: number;
  commentCount: number;
  recommendCount: number;
}

export default function NewsPage() {
  const params = useParams<{ subcategory: string }>();
  const {
    orderType,
    setOrderType,
    page,
    onPageChange,
    timePeriod,
    setTimePeriod,
    searchType,
    setSearchType,
  } = useNewsPageLogic();

  const changedCategory = (category: string): NewsCategoryType | undefined => {
    const categoryMap: Record<string, NewsCategoryType> = {
      esports: "ESPORTS",
      football: "FOOTBALL",
      baseball: "BASEBALL",
    };
    return categoryMap[category.toLowerCase()];
  };

  const category = changedCategory(params.subcategory);

  const { data: newsData, isLoading } = useSortedNewsDataList({
    category,
    orderType,
    timePeriod,
    page,
    searchType,
  });

  return (
    <div className="flex justify-center bg-gray1">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-white mx-auto">
        <NewsTalkToolbar
          setOrderType={setOrderType}
          setTimeType={setTimePeriod}
          onPageChange={onPageChange}
          setSearchType={setSearchType}
          paginationData={newsData?.pageInfo}
        />
        <div className="w-[720px]">
          {isLoading ? (
            Array(10)
              .fill(0)
              .map((_, index) => <NewsPostItemSkeleton key={index} />)
          ) : newsData?.length === 0 || !newsData ? (
            <EmptyNews />
          ) : (
            newsData?.content?.map((newsItem: NewsItemType) => (
              <NewsPostItem key={newsItem?.id} newsItem={newsItem} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
