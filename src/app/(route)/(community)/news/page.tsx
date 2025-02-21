"use client";

import React, { useEffect, useState } from "react";
import { NewsTalkToolbar } from "../_components/NewsTalkToolbar";
import EmptyNews from "./_components/EmptyNews";
import NewsPostItem from "./_components/NewsPostItem";
import NewsItem from "../../main/_components/newsItem";
import useGetNewsDataList from "@/_hooks/useGetNewsDataList";

const Page = () => {
  // 전체 데이터 불러오는 방법을 몰라서 임시로 야구 로 설정해뒀음. 수정필요
  const { data, isLoading, isError } = useGetNewsDataList();

  console.log("NewsListData: ", data);

  return (
    <div className="w-[720px] h-auto flex flex-col justify-start bg-[#FAFAFA] rounded-[5px] overflow-hidden">
      <div className="w-[720px] min-h-[120px] rounded-tl-[5px] rounded-tr-[5px] bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar data={data} />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error...</p>
        ) : data.length === 0 ? (
          <EmptyNews />
        ) : (
          data.map((newsItem: NewsItem) => (
            <NewsPostItem key={newsItem.id} newsItem={newsItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
