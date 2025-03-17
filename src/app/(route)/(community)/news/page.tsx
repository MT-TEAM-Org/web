"use client";

import { useNewsPageLogic } from "@/utils/newsUtils/useNewsPageLogic";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NewsTalkToolbar from "./_components/NewsTalkToolbar";
import NewsListContent from "./_components/NewsListContent";
import useSortedNewsDataList from "@/_hooks/fetcher/news/useSortedNewsDataList";

const Page = () => {
  const router = useRouter();

  const {
    orderType,
    setOrderType,
    timePeriod,
    setTimePeriod,
    page,
    onPageChange,
    searchType,
    setSearchType,
  } = useNewsPageLogic();

  const {
    data: newsListData,
    isLoading,
    isError,
  } = useSortedNewsDataList({
    orderType,
    timePeriod,
    searchType,
    page,
  });

  useEffect(() => {
    router.push("/news/all");
  }, [router]);

  return (
    <div className="w-[720px] h-auto flex flex-col justify-start bg-gray1 rounded-[5px] overflow-hidden">
      <NewsTalkToolbar
        setOrderType={setOrderType}
        onPageChange={onPageChange}
        setTimeType={setTimePeriod}
        setSearchType={setSearchType}
        paginationData={newsListData?.pageInfo}
      />

      <NewsListContent
        data={newsListData}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Page;
