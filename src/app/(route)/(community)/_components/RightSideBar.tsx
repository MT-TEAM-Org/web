"use client";

import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import { NewsItemType } from "@/app/_constants/newsItemType";
import useGetNewsDataList from "@/_hooks/useGetNewsDataList";
import RightNewsItem from "./RightNewsItem";
import { useMemo, useState } from "react";

export const RightSideBar = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const { data: newsData } = useGetNewsDataList({ page: currentPage });

  const slicedNewsData = useMemo(() => {
    return newsData?.slice(0, 5);
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
          {slicedNewsData?.map((data: NewsItemType) => (
            <RightNewsItem key={data.id} newsItem={data} />
          ))}
        </div>

        <div className="w-[160px] h-[32px] flex gap-4 items-center justify-center m-auto">
          <button
            onClick={() => handleToPage("prev")}
            className="w-[32px] h-[32px] rounded-[5px] border border-[#EEEEEE] p-[9px] flex gap-[10px] justify-center items-center"
          >
            <Arrow_left />
          </button>
          <div className="w-[64px] h-[32px] font-[500] text-[14px] leading-[20px] tracking-[0%] text-[#656565] flex items-center justify-center align-center">
            {currentPage} / 3
          </div>
          <button
            onClick={() => handleToPage("next")}
            className="w-[32px] h-[32px] rounded-[5px] border border-[#EEEEEE] p-[9px] flex gap-[10px] justify-center items-center"
          >
            <Arrow_right />
          </button>
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className="w-[48px] h-[48px] bg-[#FFFFFF] rounded-[5px] shadow-md flex justify-center items-center p-[10px] gap-[10px] cursor-pointer"
      >
        <Arrow_up />
      </div>
    </div>
  );
};
