"use client";

import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import React from "react";

interface MainRightPaginationProps {
  buttonActive: boolean;
  filteredNewsData: any; // TODO: 타입 정의
  currentPage: string;
  setCurrentPage: (value: string) => void;
}

const style = {
  pageButtonStyle:
    "w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex justify-center items-center",
  disabledStyle: "opacity-50 cursor-not-allowed",
};

const MainRightPagination = ({
  buttonActive,
  filteredNewsData,
  currentPage,
  setCurrentPage,
}: MainRightPaginationProps) => {
  const handleToPage = (type: "prev" | "next") => {
    const current = Number(currentPage);
    const total = filteredNewsData?.pageInfo?.totalPage ?? 1;
    if (type === "prev" && current > 1) {
      setCurrentPage(String(current - 1));
    } else if (type === "next" && current < total) {
      setCurrentPage(String(current + 1));
    }
  };

  const getNavButtonClass = (isDisabled: boolean) => {
    return `${style.pageButtonStyle} ${isDisabled ? style.disabledStyle : ""}`;
  };

  return (
    <>
      {buttonActive && filteredNewsData?.pageInfo?.totalPage > 1 && (
        <div className="w-[160px] min-h-[32px] flex mx-auto gap-4">
          <button
            onClick={() => handleToPage("prev")}
            className={getNavButtonClass(Number(currentPage) === 1)}
            disabled={currentPage === "1"}
            aria-label="이전 페이지">
            <Arrow_left width={18} height={18} />
          </button>
          <div className="w-[64px] h-[32px] font-[500] text-[14px] text-gray6 flex justify-center items-center">
            {currentPage} / {filteredNewsData?.pageInfo?.totalPage}
          </div>
          <button
            onClick={() => handleToPage("next")}
            className={getNavButtonClass(
              Number(currentPage) ===
                Number(filteredNewsData?.pageInfo?.totalPage)
            )}
            disabled={
              Number(currentPage) === filteredNewsData?.pageInfo?.totalPage
            }
            aria-label="다음 페이지">
            <Arrow_right width={18} height={18} />
          </button>
        </div>
      )}
    </>
  );
};

export default MainRightPagination;
