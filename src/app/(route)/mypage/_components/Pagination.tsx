"use client";

import Pg_double_left from "@/app/_components/icon/Pg_double_left";
import { PageInfo } from "../_types/toolbarType";
import Pg_left from "@/app/_components/icon/Pg_left";
import Pg_right from "@/app/_components/icon/Pg_right";
import Pg_double_right from "@/app/_components/icon/Pg_double_right";
import useIsMobile from "@/utils/useIsMobile";

interface PaginationProps {
  pageInfo: PageInfo;
  onPageChangeAction: (page: number) => void;
}

const Pagination = ({ pageInfo, onPageChangeAction }: PaginationProps) => {
  const { currentPage, totalPage } = pageInfo || {
    currentPage: 1,
    totalPage: 1,
  };
  const isMobile = useIsMobile();

  const getPageNumbers = () => {
    const maxVisiblePage = isMobile ? 4 : 5;
    if (totalPage <= maxVisiblePage) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePage / 2));
    let endPage = startPage + maxVisiblePage - 1;
    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(1, endPage - maxVisiblePage + 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
  const pageNumbers = getPageNumbers();

  const pageButtonStyle =
    "flex justify-center items-center w-[32px] h-[32px] rounded-[5px] border p-[7px]";
  const disabledStyle = "opacity-50 cursor-not-allowed";

  const getNavButtonClass = (isDisabled: boolean) => {
    return `${pageButtonStyle} ${isDisabled ? disabledStyle : ""}`;
  };

  return (
    <div className="flex">
      <div className="flex items-center gap-[8px]">
        {totalPage > 1 && (
          <button
            className={getNavButtonClass(currentPage === 1)}
            onClick={() => onPageChangeAction(1)}
            disabled={currentPage === 1}
            aria-label="첫 페이지로 이동"
          >
            <Pg_double_left />
          </button>
        )}
        <button
          className={getNavButtonClass(currentPage === 1)}
          onClick={() => onPageChangeAction(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="이전 페이지로 이동"
        >
          <Pg_left />
        </button>
      </div>

      <div className="flex gap-[8px] mx-[8px]">
        {totalPage > 0 ? (
          pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${pageButtonStyle} ${
                pageNumber === currentPage && "font-[700] border-1 border-gray7"
              } text-[14px] leading-[20px] text-[#424242]`}
              onClick={() => onPageChangeAction(pageNumber)}
              aria-label={`페이지 ${pageNumber}로 이동`}
            >
              {pageNumber}
            </button>
          ))
        ) : (
          <button
            className={`${pageButtonStyle} font-[700] text-[14px] leading-[20px] text-[#424242] border-1 border-gray7`}
            onClick={() => onPageChangeAction(1)}
          >
            1
          </button>
        )}
      </div>

      <div className="flex items-center gap-[8px]">
        <button
          className={getNavButtonClass(currentPage === totalPage)}
          onClick={() => onPageChangeAction(currentPage + 1)}
          disabled={currentPage === totalPage}
          aria-label="다음 페이지로 이동"
        >
          <Pg_right />
        </button>
        {totalPage > 1 && (
          <button
            className={getNavButtonClass(currentPage === totalPage)}
            onClick={() => onPageChangeAction(totalPage)}
            disabled={currentPage === totalPage}
            aria-label="마지막 페이지로 이동"
          >
            <Pg_double_right />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
