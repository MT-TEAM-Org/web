import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import NewsPostItem from "@/app/(route)/news/_components/NewsPostItem";
import NewsPostItemSkeleton from "@/app/(route)/news/_components/NewsPostItemSkeleton";
import NewsTalkToolbar from "@/app/(route)/news/_components/NewsTalkToolbar";
import { newsListConfig } from "@/app/(route)/news/_types/newsListConfig";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import NewsListSection from "./NewsListSection";

type NewsCategoryType = "" | "ESPORTS" | "FOOTBALL" | "BASEBALL";

interface NewsRecommendProps {
  isLoading: boolean;
  newsCategoryType: string;
  searchParams: URLSearchParams;
}

const NewsRecommend = ({
  isLoading,
  newsCategoryType,
  searchParams,
}: NewsRecommendProps) => {
  const router = useRouter();

  const changeURLParams = (
    params: URLSearchParams,
    key: string,
    value: string
  ) => {
    const newParams = new URLSearchParams(params);
    newParams.set(key, value);
    return newParams.toString();
  };

  const changedCategory = (category: string): NewsCategoryType | undefined => {
    const categoryMap: Record<string, NewsCategoryType> = {
      esports: "ESPORTS",
      football: "FOOTBALL",
      baseball: "BASEBALL",
    };
    return categoryMap[category?.toLowerCase()] || "";
  };

  const category = changedCategory(newsCategoryType);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > newsListData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  const orderType = () => {
    if (searchParams.get("order_type") === "RECOMMEND") {
      return "DATE";
    } else if (searchParams.get("order_type") === "CREATE") {
      return "VIEW";
    } else {
      return "COMMENT";
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

  const { data: newsListData } = useSortedNewsDataList(newsOption);

  const sliceNewsListData = newsListData
    ? newsListData?.content?.slice(0, 10)
    : [];

  return (
    <>
      {/* 툴바 */}
      <section
        className={cn(
          "w-[720px] min-h-[120px] rounded-t-[5px] mt-2",
          "tablet:max-w-full tablet:w-auto tablet:mt-3",
          "mobile:w-full mobile:max-w-full mobile:min-h-[56px] mobile:mt-4"
        )}
        aria-label="뉴스 툴바"
      >
        <NewsTalkToolbar
          newsType={category}
          pageInfo={newsListData?.pageInfo}
        />
      </section>

      <NewsListSection
        isLoading={isLoading}
        newsListData={newsListData}
        sliceNewsListData={sliceNewsListData}
        searchParams={searchParams}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default NewsRecommend;
