"use client";

import React from "react";
import NewsListContent from "./_components/NewsListContent";
import useSortedNewsDataList from "@/_hooks/useSortedPosts";
import { useNewsListLogic } from "@/_hooks/useNewsListLogic";
import NewsTalkToolbar from "./_components/NewsTalkToolbar";

const Page = () => {
  const { orderType, setOrderType, pageNum, onPageChange } = useNewsListLogic();
  const {
    data: newsListData,
    isLoading,
    isError,
  } = useSortedNewsDataList({
    orderType,
    pageNum,
  });

  console.log("NewsListData: ", newsListData);

  return (
    <div className="w-[720px] h-auto flex flex-col justify-start bg-gray1 rounded-[5px] overflow-hidden">
      <NewsTalkToolbar
        setOrderType={setOrderType}
        onPageChange={onPageChange}
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
