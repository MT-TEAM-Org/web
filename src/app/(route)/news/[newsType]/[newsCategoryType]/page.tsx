"use client";

import React from "react";
import { useSearchParams, useParams } from "next/navigation";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import NewsTalkToolbar from "../../_components/NewsTalkToolbar";
import NewsPostItemSkeleton from "../../_components/NewsPostItemSkeleton";
import NewsPostItem from "../../_components/NewsPostItem";
import { newsListConfig } from "../../_types/newsListConfig";
import EmptyNews from "../../_components/EmptyNews";

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
  const searchParams = useSearchParams();

  // URL에서 페이지와 검색 쿼리 가져오기
  const currentPage = searchParams.get("page") || "1";
  const searchQuery = searchParams.get("search");
  const searchType = searchParams.get("search_type");

  // 카테고리 변환 로직
  const changedCategory = (category: string): NewsCategoryType | undefined => {
    const categoryMap: Record<string, NewsCategoryType> = {
      esports: "ESPORTS",
      football: "FOOTBALL",
      baseball: "BASEBALL",
    };
    return categoryMap[category.toLowerCase()];
  };

  const category = changedCategory(params.subcategory);

  const newsOption: newsListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    category: searchParams.get("category") as NewsCategoryType,
    orderType: searchParams.get("order_type") as newsListConfig["orderType"],
    searchType:
      (searchParams.get("search_type") as newsListConfig["searchType"]) || "",
    content: searchParams.get("search") || "",
    timePeriod: searchParams.get("time_period") as newsListConfig["timePeriod"],
  };

  const { data: newsData, isLoading } = useSortedNewsDataList(newsOption);

  return (
    <div className="flex justify-center bg-gray1 min-h-[calc(100vh-476px)]">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-white mx-auto">
        <div className="sticky top-0 z-10">
          <NewsTalkToolbar boardType={category} pageInfo={newsData?.pageInfo} />
        </div>
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
