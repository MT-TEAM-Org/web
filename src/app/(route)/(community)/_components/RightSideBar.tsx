"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import RightNewsItem from "./RightNewsItem";
import RightNewsItemSkeleton from "./RightNewsItemSkeleton";
import useGetNewsDataList from "@/_hooks/fetcher/news/useGetNewsDataList";
import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";
import { cn } from "@/utils";

export const RightSideBar = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const [totalPage, setTotalPage] = useState(1);
  const [content, setContent] = useState<NewsItemType[]>([]);
  const [isPaginating, setIsPaginating] = useState(false);
  const [isTopVisible, setIsTopVisible] = useState(false);

  const sidebarRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsTopVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageButtonStyle =
    "w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex justify-center items-center";
  const disabledStyle = "opacity-50 cursor-not-allowed";

  const getNavButtonClass = (isDisabled: boolean) => {
    return `${pageButtonStyle} ${isDisabled ? disabledStyle : ""}`;
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
    newsData && (
      <aside
        ref={sidebarRef}
        className={cn(
          "w-[288px] h-auto max-h-[880px] top-[250px] left-[1272px] flex flex-col gap-[24px]",
          !isLoading && content.length === 0 ? "hidden" : ""
        )}
        aria-label="뉴스 오른쪽 사이드 바"
      >
        <section
          className="w-full h-auto max-h-[808px] flex flex-col gap-4 pb-6 shadow-md rounded-[10px] bg-white"
          aria-label="오른쪽 사이드 바 뉴스 목록"
        >
          <div className="w-full h-auto max-h-[736px] rounded-[10px]">
            {content.length === 0 && isLoading && !isPaginating
              ? Array.from({ length: 5 }).map((_, index) => (
                  <RightNewsItemSkeleton key={index} />
                ))
              : content?.map((data: NewsItemType) => (
                  <RightNewsItem
                    key={data.id}
                    newsItem={data}
                    wrapperWidth={288}
                    customClass="w-full h-[92px] rounded-[5px] bg-white p-3 box-border"
                  />
                ))}
          </div>

          {(isLoading || totalPage > 1) && (
            <nav
              className="w-[160px] h-[32px] flex gap-4 items-center justify-center m-auto"
              aria-label="오른쪽 뉴스 목록 페이지네이션"
            >
              <button
                onClick={() => handleToPage("prev")}
                className={getNavButtonClass(Number(currentPage) === 1)}
                aria-label="이전 페이지로 이동"
              >
                <Arrow_left width={18} height={18} />
              </button>
              <div className="w-[64px] h-[32px] font-[500] text-[14px] leading-[20px] text-gray6 flex items-center justify-center">
                {currentPage} / {totalPage}
              </div>
              <button
                onClick={() => handleToPage("next")}
                className={getNavButtonClass(
                  Number(currentPage) === Number(totalPage)
                )}
                aria-label="다음 페이지로 이동"
              >
                <Arrow_right width={18} height={18} />
              </button>
            </nav>
          )}
        </section>

        {isTopVisible && (
          <button
            onClick={scrollToTop}
            className="w-[48px] h-[48px] bg-white rounded-[10px] shadow-md flex justify-center items-center p-[10px] gap-[10px] cursor-pointer"
            aria-label="상단으로 이동 버튼"
          >
            <Arrow_up />
          </button>
        )}
      </aside>
    )
  );
};
