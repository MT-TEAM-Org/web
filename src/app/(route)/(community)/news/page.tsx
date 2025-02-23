"use client";

import React, { useState } from "react";
import { NewsTalkToolbar } from "../_components/NewsTalkToolbar";
import EmptyNews from "./_components/EmptyNews";
import NewsPostItem from "./_components/NewsPostItem";
import NewsItem from "../../main/_components/newsItem";
import useSortedNewsDataList from "@/_hooks/useSortedPosts";

const Page = () => {
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );
  const [pageNum, setPageNum] = useState(1);

  // 전체 데이터 불러오는 방법을 몰라서 임시로 야구로 설정. 수정필요
  const { data, isLoading, isError } = useSortedNewsDataList({
    orderType,
    pageNum,
  });

  console.log("NewsListData: ", data);

  const onPageChange = (newPage: string) => {
    setPageNum(Number(newPage));
  };

  // 테스트 코드
  const [input, setInput] = useState("");
  const callInputValue = (value: string) => {
    setInput(value);
    console.log("callInputValue: ", value);
  };

  return (
    <div className="w-[720px] h-auto flex flex-col justify-start bg-[#FAFAFA] rounded-[5px] overflow-hidden">
      <div className="w-[720px] min-h-[120px] rounded-tl-[5px] rounded-tr-[5px] bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar
          setOrderType={setOrderType}
          onPageChange={onPageChange}
          callInputValue={callInputValue}
        />
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
