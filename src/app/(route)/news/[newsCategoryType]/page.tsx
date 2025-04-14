"use client";

import React, { useEffect } from "react";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import NewsTalkToolbar from "../_components/NewsTalkToolbar";
import NewsPostItemSkeleton from "../_components/NewsPostItemSkeleton";
import NewsPostItem from "../_components/NewsPostItem";
import { newsListConfig } from "../_types/newsListConfig";
import { NewsItemType } from "../_types/newsItemType";
import { useRouter } from "next/navigation";
import EmptyItem from "../../customer/_components/EmptyItem";
import { cn } from "@/utils";
import Pagination from "../../mypage/_components/Pagination";
import changeURLParams from "../../mypage/util/changeURLParams";

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > newsData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "w-full max-w-[720px] min-h-[120px] rounded-[5px] bg-white mx-auto mb-10",
          "tablet:max-w-[688px]",
          "mobile:max-w-[768px]"
        )}
      >
        <div className="sticky top-0 z-10">
          <NewsTalkToolbar newsType={category} pageInfo={newsData?.pageInfo} />
        </div>
        <div
          className={cn(
            "w-full max-w-[720px] h-auto rounded-b-[5px]",
            "tablet:max-w-[688px]",
            "mobile:w-full mobile:max-w-[768px]",
            newsData?.content?.length !== 0 &&
              newsData &&
              "shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
          )}
        >
          {isLoading ? (
            Array(10)
              .fill(0)
              .map((_, index) => <NewsPostItemSkeleton key={index} />)
          ) : newsData?.content?.length === 0 || !newsData ? (
            <EmptyItem title="뉴스가" />
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
          {newsData?.content?.length !== 0 && (
            <div
              className={cn(
                "hidden",
                "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
              )}
            >
              <Pagination
                pageInfo={newsData?.pageInfo}
                onPageChangeAction={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
