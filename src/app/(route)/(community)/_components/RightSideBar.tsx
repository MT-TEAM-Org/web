"use client";

import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import RightNewsItem from "./RightNewsItem";
import { useMemo, useState } from "react";
import RightNewsItemSkeleton from "./RightNewsItemSkeleton";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import { NewsItemType } from "@/app/_constants/newsItemType";

export const RightSideBar = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const { data: newsData, isLoading } = useGetNewsDataList({
    page: currentPage,
  });
  const slicedNewsData = useMemo(() => {
    return newsData?.content.slice(0, 5);
  }, [newsData]); //뉴스 데이터 임시로 5개만 불러오기

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleToPage = (type: "prev" | "next") => {
    const currentPageNum = Number(currentPage);
    if (type === "prev" && currentPageNum > 1) {
      const prevPage = (currentPageNum - 1).toString();
      setCurrentPage(prevPage);
    } else if (type === "next" && currentPageNum < 3) {
      const prevPage = (currentPageNum + 1).toString();
      setCurrentPage(prevPage);
    }
  };

  return (
    <div className="w-[288px] h-auto max-h-[880px] top-[250px] left-[1272px] flex flex-col gap-6">
      <div className="w-full h-auto max-h-[808px] flex flex-col gap-4 pb-6 shadow-md rounded-[10px]">
        <div className="w-full h-auto max-h-[736px] rounded-[10px]">
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => <RightNewsItemSkeleton key={index} />)
            : slicedNewsData.map((data: NewsItemType) => (
                <RightNewsItem key={data.id} newsItem={data} />
              ))}
        </div>

        <div className="w-[160px] h-[32px] flex gap-4 items-center justify-center m-auto">
          <button
            onClick={() => handleToPage("prev")}
            className="w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex gap-[10px] justify-center items-center"
          >
            <Arrow_left />
          </button>
          <div className="w-[64px] h-[32px] font-[500] text-[14px] leading-[20px] tracking-[0%] text-gray6 flex items-center justify-center align-center">
            {currentPage} / 3
          </div>
          <button
            onClick={() => handleToPage("next")}
            className="w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex gap-[10px] justify-center items-center"
          >
            <Arrow_right />
          </button>
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className="w-[48px] h-[48px] bg-white rounded-[10px] shadow-md flex justify-center items-center p-[10px] gap-[10px] cursor-pointer"
      >
        <Arrow_up />
      </div>
    </div>
  );
};
