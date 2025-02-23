"use client";

import React, { useState } from "react";
import NewsPostItem from "../_components/NewsPostItem";
import { useParams } from "next/navigation";
import NewsItem from "@/app/(route)/main/_components/newsItem";
import { NewsTalkToolbar } from "../../_components/NewsTalkToolbar";
import useSortedNewsDataList from "@/_hooks/useSortedPosts";

export default function NewsPage() {
  const params = useParams();
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );

  const changedCategory = (category: string): string | undefined => {
    if (category === "esports-news") return "ESPORTS";
    if (category === "football-news") return "FOOTBALL";
    if (category === "baseball-news") return "BASEBALL";
  };

  const category = changedCategory(String(params.subcategory));

  const { data: newsData, isLoading } = useSortedNewsDataList({
    category,
    orderType,
  });

  return (
    <div className="flex justify-center bg-[#FAFAFA]">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar setOrderType={setOrderType} />
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
