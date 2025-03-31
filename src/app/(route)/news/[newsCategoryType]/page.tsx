"use client";

import React, { useEffect } from "react";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import NewsTalkToolbar from "../_components/NewsTalkToolbar";
import NewsPostItemSkeleton from "../_components/NewsPostItemSkeleton";
import NewsPostItem from "../_components/NewsPostItem";
import { newsListConfig } from "../_types/newsListConfig";
import EmptyNews from "../_components/EmptyNews";
import { NewsItemType } from "../_types/newsItemType";
import { useRouter } from "next/navigation";

type NewsCategoryType = "" | "ESPORTS" | "FOOTBALL" | "BASEBALL";

export default function NewsPage() {
  const params = useParams<{ newsCategoryType: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const newsType = pathname.split("/")[2];

  const category =
    params.newsCategoryType === "ALL" ? "" : params.newsCategoryType;

  useEffect(() => {
    const validTypes = ["ALL", "ESPORTS", "FOOTBALL", "BASEBALL"];
    if (!validTypes.includes(newsType)) {
      router.push("/404");
    }
  }, [newsType, router]);

  const orderType = () => {
    const orderTypeParam = searchParams.get("order_type");

    if (!orderTypeParam) {
      return "DATE";
    }

    switch (searchParams.get("order_type")) {
      case "RECOMMEND":
        return "VIEW";
      case "CREATE":
        return "DATE";
      case "COMMENT":
        return "COMMENT";
      default:
        return "DATE";
    }
  };

  const newsOption: newsListConfig = {
    page: Number(searchParams.get("page")) || 1,
    size: 20,
    category: (category as NewsCategoryType) || "",
    orderType: orderType() as newsListConfig["orderType"],
    searchType:
      (searchParams.get("search_type") as newsListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
    timePeriod:
      (searchParams.get("time") as newsListConfig["timePeriod"]) || "DAILY",
  };

  const { data: newsData, isLoading } = useSortedNewsDataList(newsOption);

  return (
    <div className="flex justify-center bg-gray1 min-h-[calc(100vh-576px)]">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-white mx-auto">
        <div className="sticky top-0 z-10">
          <NewsTalkToolbar newsType={category} pageInfo={newsData?.pageInfo} />
        </div>
        <div className="w-[720px]">
          {isLoading ? (
            Array(10)
              .fill(0)
              .map((_, index) => <NewsPostItemSkeleton key={index} />)
          ) : newsData?.content?.length === 0 || !newsData ? (
            <EmptyNews />
          ) : (
            newsData?.content?.map((newsItem: NewsItemType) => (
              <NewsPostItem
                key={newsItem?.id}
                newsItem={newsItem}
                searchType={searchParams.get("search_type")}
                searchString={searchParams.get("search")}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
