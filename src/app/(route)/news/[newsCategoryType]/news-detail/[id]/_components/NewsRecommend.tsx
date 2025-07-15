import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";
import EmptyItem from "@/app/(route)/customer/_components/EmptyItem";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import NewsPostItem from "@/app/(route)/news/_components/NewsPostItem";
import NewsPostItemSkeleton from "@/app/(route)/news/_components/NewsPostItemSkeleton";
import NewsTalkToolbar from "@/app/(route)/news/_components/NewsTalkToolbar";
import { newsListConfig } from "@/app/(route)/news/_types/newsListConfig";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";

type NewsCategoryType = "" | "ESPORTS" | "FOOTBALL" | "BASEBALL";

interface NewsRecommendProps {
  isLoading: boolean;
  category: NewsCategoryType;
  searchParams: URLSearchParams;
}

const NewsRecommend = ({
  isLoading,
  category,
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

      <section
        className={cn(
          "w-full h-auto rounded-[5px] shadow-soft-md bg-white",
          "mobile:max-w-full"
        )}
        aria-label="뉴스 추천 목록"
      >
        <div
          className={cn(
            "w-[720px] h-auto rounded-b-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
            "tablet:max-w-full tablet:w-auto",
            "mobile:w-full mobile:max-w-full"
          )}
        >
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, index) => <NewsPostItemSkeleton key={index} />)
          ) : sliceNewsListData?.length === 0 ? (
            <EmptyItem title="뉴스가" />
          ) : (
            sliceNewsListData?.map((newsItem: NewsListType) => (
              <NewsPostItem
                key={newsItem?.id}
                newsItem={newsItem}
                searchType={searchParams.get("search_type")}
                searchString={searchParams.get("search")}
              />
            ))
          )}
          {newsListData?.pageInfo?.totalPage > 0 && (
            <nav
              className={cn(
                "hidden",
                "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
              )}
              aria-label="뉴스 추천 목록"
            >
              <Pagination
                pageInfo={newsListData?.pageInfo}
                onPageChangeAction={handlePageChange}
              />
            </nav>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsRecommend;
