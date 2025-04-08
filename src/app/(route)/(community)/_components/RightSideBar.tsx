"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import RightNewsItem from "./RightNewsItem";
import RightNewsItemSkeleton from "./RightNewsItemSkeleton";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

export const RightSideBar = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const [totalPage, setTotalPage] = useState(1);
  const [content, setContent] = useState<NewsItemType[]>([]);
  const [isPaginating, setIsPaginating] = useState(false);

  const pathname = usePathname();
  const categoryFromPath = pathname?.split("/")[2]?.toUpperCase();
  const isValidCategory = ["BASEBALL", "FOOTBALL", "ESPORTS"].includes(
    categoryFromPath
  );
  const category: "" | "BASEBALL" | "FOOTBALL" | "ESPORTS" = isValidCategory
    ? (categoryFromPath as "BASEBALL" | "FOOTBALL" | "ESPORTS")
    : "";

  const { data: newsData, isLoading } = useGetNewsDataList({
    page: currentPage,
    withPageInfo: true,
    category,
  });

  useEffect(() => {
    if (newsData && !Array.isArray(newsData)) {
      setContent(newsData.content);
      setTotalPage(newsData.pageInfo.totalPage);
      setIsPaginating(false);
    }
  }, [newsData]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToPage = (type: "prev" | "next") => {
    const currentPageNum = Number(currentPage);

    if (type === "prev" && currentPageNum > 1) {
      setIsPaginating(true);
      setCurrentPage((currentPageNum - 1).toString());
    } else if (type === "next" && currentPageNum < totalPage) {
      setIsPaginating(true);
      setCurrentPage((currentPageNum + 1).toString());
    }
  };

  return (
    <div className="w-[288px] h-auto max-h-[880px] top-[250px] left-[1272px] flex flex-col gap-6">
      <div className="w-full h-auto max-h-[808px] flex flex-col gap-4 pb-6 shadow-md rounded-[10px] bg-white">
        <div className="w-full h-auto max-h-[736px] rounded-[10px]">
          {/* 깜빡임 방지를 위한 조건 */}
          {content.length === 0 && isLoading && !isPaginating
            ? Array.from({ length: 5 }).map((_, index) => (
                <RightNewsItemSkeleton key={index} />
              ))
            : content.map((data: NewsItemType) => (
                <RightNewsItem
                  key={data.id}
                  newsItem={data}
                  customClass="w-full h-[92px] rounded-[5px] bg-white p-3 box-border"
                />
              ))}
        </div>

        {(isLoading || totalPage > 1) && (
          <div className="w-[160px] h-[32px] flex gap-4 items-center justify-center m-auto">
            <button
              onClick={() => handleToPage("prev")}
              className="w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex justify-center items-center"
            >
              <Arrow_left width={18} height={18} />
            </button>
            <div className="w-[64px] h-[32px] font-[500] text-[14px] leading-[20px] text-gray6 flex items-center justify-center">
              {currentPage} / {totalPage}
            </div>
            <button
              onClick={() => handleToPage("next")}
              className="w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex justify-center items-center"
            >
              <Arrow_right width={18} height={18} />
            </button>
          </div>
        )}
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
