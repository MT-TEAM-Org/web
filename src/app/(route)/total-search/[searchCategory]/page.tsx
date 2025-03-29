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
import { NewsItemType } from "../../news/_types/newsItemType";
import NewsPostItemSkeleton from "../../news/_components/NewsPostItemSkeleton";
import NoticeItem from "../../customer/_components/NoticeItem";
import { NoticeContentType } from "../../customer/_types/NoticeItemType";
import NoticeItemSkeleton from "../../customer/_components/NoticeItemSkeleton";

const Page = () => {
  const params = useParams<{ totalSearchType: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchType = pathname.split("/")[2];

  console.log(searchType);

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
      (searchParams.get("domain_type") as searchListConfig["domainType"]) || "",
    orderType: searchParams.get("orderType") as searchListConfig["orderType"],
    searchType:
      (searchParams.get("search_type") as searchListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
    timePeriod:
      (searchParams.get("time") as searchListConfig["timePeriod"]) || "DAILY",
  };

  const {
    data: searchData,
    isLoading,
    isError,
  } = useGetSearchDataList(searchOptions);

  console.log(searchData);

  return (
    <div className="w-[720px] h-auto">
      <SearchToolbar
        totalSearchType={category}
        pageInfo={searchData?.data?.pageInfo}
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

        {searchType === "news" ? (
          searchData?.data?.length === 0 || isError ? (
            <SearchEmptyBox />
          ) : (
            searchData?.content?.map((newsItem: NewsItemType) => (
              <NewsPostItem
                key={newsItem?.id}
                newsItem={newsItem}
                searchType={searchParams.get("search_type")}
                searchString={searchParams.get("search")}
              />
            ))
          )
        ) : searchType === "board" ? (
          searchData?.data?.length === 0 || isError ? (
            <SearchEmptyBox />
          ) : (
            searchData?.content?.map((noticeItem: NoticeContentType) => (
              <NoticeItem
                key={noticeItem?.id}
                noticeData={noticeItem}
                searchType={searchParams.get("search_type")}
                searchString={searchParams.get("search")}
              />
            ))
          )
        ) : null}
      </div>
    </div>
  );
};

export default Page;
