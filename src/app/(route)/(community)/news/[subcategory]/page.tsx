"use client";

import React from "react";
import { CommunityToolbar } from "../../_components/CommunityToolbar";
import NewsPostItem from "../_components/NewsPostItem";
import useGetNewsDataList from "@/_hooks/useGetNewsDataList";
import { useParams } from "next/navigation";
import NewsItem from "@/app/(route)/main/_components/newsItem";

export default function NewsPage() {
  const params = useParams();

  const changedCategory = (category: string): string | undefined => {
    if (category === "esports-news") return "ESPORTS";
    if (category === "football-news") return "FOOTBALL";
    if (category === "baseball-news") return "BASEBALL";
  };

  const category = changedCategory(String(params.subcategory));

  const { data: newsData, isLoading } = useGetNewsDataList(category);

  return (
    <div className="flex justify-center bg-[#FAFAFA] mt-3.5">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-[#FFFFFF] mx-auto">
        <CommunityToolbar />
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
