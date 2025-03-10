"use client";

import Pg_double_left from "@/app/_components/icon/Pg_double_left";
import { PageInfo } from "../_types/toolbarType";
import Pg_left from "@/app/_components/icon/Pg_left";
import Pg_right from "@/app/_components/icon/Pg_right";
import Pg_double_right from "@/app/_components/icon/Pg_double_right";

interface PaginationProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pageInfo, onPageChange }: PaginationProps) => {
  const pageButtonStyle =
    "flex justify-center items-center w-[32px] h-[32px] rounded-[5px] border p-[9px]";
  return (
    <div className="flex">
      <div className="flex items-center gap-[10px]">
        {pageInfo?.totalPage > 1 && (
          <button className={pageButtonStyle} onClick={() => onPageChange(1)}>
            <Pg_double_left />
          </button>
        )}
        <button
          className={pageButtonStyle}
          onClick={() => onPageChange(pageInfo.currentPage - 1)}
        >
          <Pg_left />
        </button>
      </div>

      <div className="flex gap-[8px] mx-[8px]">
        {pageInfo?.totalPage > 0 ? (
          Array.from({ length: pageInfo?.totalPage }, (_, index) => (
            <button
              key={index + 1}
              className={`${pageButtonStyle} ${
                index + 1 === pageInfo?.currentPage &&
                "font-[700] border-1 border-gray7"
              } text-[14px] leading-[20px] text-[#424242]`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <button
            className={`${pageButtonStyle} font-[700] text-[14px] leading-[20px] text-[#424242] border-1 border-gray7`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        )}
      </div>

      <div className="flex items-center gap-[10px]">
        <button
          className={pageButtonStyle}
          onClick={() => onPageChange(pageInfo.currentPage + 1)}
        >
          <Pg_right />
        </button>
        {pageInfo?.totalPage > 1 && (
          <button
            className={pageButtonStyle}
            onClick={() => onPageChange(pageInfo.totalPage)}
          >
            <Pg_double_right />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
