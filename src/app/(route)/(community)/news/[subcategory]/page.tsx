"use client";

import React, { useState } from "react";
import NewsPostItem from "../_components/NewsPostItem";
import { useParams } from "next/navigation";
import NewsItem from "@/app/(route)/main/_components/newsItem";
import useSortedNewsDataList from "@/_hooks/useNews/useSortedPosts";
import NewsTalkToolbar from "../_components/NewsTalkToolbar";

export default function NewsPage() {
  const params = useParams();
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );
  const [pageNum, setPageNum] = useState(1);

  const changedCategory = (category: string): string | undefined => {
    if (category === "esports-news") return "ESPORTS";
    if (category === "football-news") return "FOOTBALL";
    if (category === "baseball-news") return "BASEBALL";
  };

  const category = changedCategory(String(params.subcategory));

  const { data: newsData, isLoading } = useSortedNewsDataList({
    category,
    orderType,
    pageNum,
  });

  const onPageChange = (newPage: string) => {
    setPageNum(Number(newPage));
  };

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
