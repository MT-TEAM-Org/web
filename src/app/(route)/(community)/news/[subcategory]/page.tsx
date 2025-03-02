"use client";

import React from "react";
import NewsPostItem from "../_components/NewsPostItem";
import { useParams } from "next/navigation";
import NewsItem from "@/app/(route)/main/_components/newsItem";
import useSortedNewsDataList from "@/_hooks/useNews/useSortedPosts";
import NewsTalkToolbar from "../_components/NewsTalkToolbar";
import { useNewsPageLogic } from "@/utils/newsUtils/useNewsPageLogic";

export default function NewsPage() {
  const params = useParams();
  const { orderType, setOrderType, pageNum, onPageChange } = useNewsPageLogic();

  const changedCategory = (category: string): string | undefined => {
    const categoryMap: Record<string, string> = {
      "esports-news": "ESPORTS",
      "football-news": "FOOTBALL",
      "baseball-news": "BASEBALL",
    };
    return categoryMap[category];
  };

  const category = changedCategory(String(params.subcategory));

  const { data: newsData, isLoading } = useSortedNewsDataList({
    category,
    orderType,
    pageNum,
  });

  return (
    <div className="flex justify-center bg-gray1">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-white mx-auto">
        <NewsTalkToolbar
          setOrderType={setOrderType}
          onPageChange={onPageChange}
        />
        <div className="w-[720px]">
          {isLoading
            ? "Loading..."
            : newsData?.map((newsItem: NewsItem) => (
                <NewsPostItem key={newsItem.id} newsItem={newsItem} />
              ))}
        </div>
      </div>
    </div>
  );
}
