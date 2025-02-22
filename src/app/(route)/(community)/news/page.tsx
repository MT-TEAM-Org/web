"use client";

import React, { useEffect, useState } from "react";
import { NewsTalkToolbar } from "../_components/NewsTalkToolbar";
import EmptyNews from "./_components/EmptyNews";
import NewsPostItem from "./_components/NewsPostItem";
import NewsItem from "../../main/_components/newsItem";
import useGetNewsDataList from "@/_hooks/useGetNewsDataList";

const Page = () => {
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );
  const [category, setCategory] = useState<"BASEBALL" | "FOOTBALL" | "ESPORTS">(
    "BASEBALL"
  );
  const [newsData, setNewsData] = useState([]);

  // 테스트 코드
  useEffect(() => {
    async function fetchNews() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/news?size=10&page=1&category=BASEBALL&orderType=${orderType}`
      );
      const responseData = await response.json();
      const newsListData = responseData.data.list.content;
      console.log("newsListData: ", newsListData);
      setNewsData(newsListData);
    }
    fetchNews();
  }, [orderType]);

  // 전체 데이터 불러오는 방법을 몰라서 임시로 야구로 설정. 수정필요
  // const { data, isLoading, isError } = useGetNewsDataList();

  // console.log("NewsListData: ", data);

  return (
    <div className="w-[720px] h-auto flex flex-col justify-start bg-[#FAFAFA] rounded-[5px] overflow-hidden">
      <div className="w-[720px] min-h-[120px] rounded-tl-[5px] rounded-tr-[5px] bg-[#FFFFFF] mx-auto">
        <NewsTalkToolbar setOrderType={setOrderType} />
      </div>
      <div>
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error...</p>
        ) : data.length === 0 ? (
          <EmptyNews />
        ) : (
          newsData.map((newsItem: NewsItem) => (
            <NewsPostItem key={newsItem.id} newsItem={newsItem} />
          ))
        )} */}
        {newsData.map((newsItem: NewsItem) => (
          <NewsPostItem key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
    </div>
  );
};

export default Page;
