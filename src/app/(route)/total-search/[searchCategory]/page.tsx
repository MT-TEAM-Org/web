"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect } from "react";
import SearchToolbar from "../_components/SearchToolbar";
import SearchEmptyBox from "../_components/SearchEmptyBox";
import { searchListConfig } from "../_types/searchListConfig";
import useGetSearchDataList from "@/_hooks/fetcher/total-search/useGetSearchDataList";
import NewsPostItem from "../../news/_components/NewsPostItem";
import NewsPostItemSkeleton from "../../news/_components/NewsPostItemSkeleton";
import NoticeItemSkeleton from "../../customer/_components/NoticeItemSkeleton";
import { SearchListType } from "../_types/searchType";
import TotalSearchItem from "../_components/TotalSearchItem";
import { NewsListType } from "../../news/_types/newsListItemType";

const Page = () => {
  const params = useParams<{ totalSearchType: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchType = pathname.split("/")[2];

  const category =
    params.totalSearchType === "board" ? "news" : params.totalSearchType;

  useEffect(() => {
    const validTypes = ["board", "news"];
    if (!validTypes.includes(searchType)) {
      router.push("/404");
    }
  }, [searchType, router]);

  const searchOptions: searchListConfig = {
    page: Number(searchParams.get("page")) || 1,
    size: 20,
    domainType:
      (searchParams.get("domainType") as searchListConfig["domainType"]) ||
      "BOARD",
    orderType:
      (searchParams.get("orderType") as searchListConfig["orderType"]) ||
      "CREATE",
    searchType:
      (searchParams.get("searchType") as searchListConfig["searchType"]) ||
      "TITLE_CONTENT",
    search: searchParams.get("search") || "",
    timePeriod:
      (searchParams.get("time") as searchListConfig["timePeriod"]) || "ALL",
  };

  if (searchType === "news") {
    searchOptions.domainType = "NEWS";
  } else if (searchType === "board") {
    searchOptions.domainType = "BOARD";
  }

  const {
    data: searchData,
    isLoading,
    isError,
  } = useGetSearchDataList(searchOptions);

  return (
    <div className="w-[720px] h-auto">
      <SearchToolbar
        totalSearchType={category}
        pageInfo={searchData?.pageInfo}
      />
      <div className="w-full h-auto rounded-b-[5px] shadow-sm bg-white">
        {isLoading &&
          Array(10)
            .fill(0)
            .map((_, index) =>
              searchType === "news" ? (
                <NewsPostItemSkeleton key={index} />
              ) : searchType === "board" ? (
                <NoticeItemSkeleton key={index} />
              ) : null
            )}

        {["news", "board"].includes(searchType) &&
          (searchData?.content?.length === 0 || isError ? (
            <SearchEmptyBox />
          ) : (
            searchData?.content?.map((item: SearchListType | NewsListType) =>
              searchType === "news" ? (
                <NewsPostItem
                  key={item?.id}
                  newsItem={item as NewsListType}
                  searchType={searchParams.get("searchType") || "TITLE_CONTENT"}
                  searchString={searchParams.get("search") || ""}
                />
              ) : (
                <TotalSearchItem
                  key={item?.id}
                  searchType={searchParams.get("searchType") || "TITLE_CONTENT"}
                  searchString={searchParams.get("search") || ""}
                  data={item as SearchListType}
                  href={`/board/${(item as SearchListType)?.boardType}/${
                    (item as SearchListType)?.categoryType
                  }/${item?.id}`}
                />
              )
            )
          ))}
      </div>
    </div>
  );
};

export default Page;
