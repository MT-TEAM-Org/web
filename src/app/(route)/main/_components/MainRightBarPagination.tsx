import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import React from "react";

interface MainRightBarPaginationProps {
  pageNum: number;
  setPageNum: (page: number) => void;
  currentPage: number;
  totalPage: number;
}

const MainRightBarPagination = ({
  pageNum,
  setPageNum,
  currentPage,
  totalPage,
}: MainRightBarPaginationProps) => {
  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "left" && currentPage > 1) {
      setPageNum(currentPage - 1);
    } else if (direction === "right" && currentPage < totalPage) {
      setPageNum(currentPage + 1);
    }
  };
  const ButtonStyle =
    "w-[32px] h-[32px] rounded-[5px] border border-gray2 p-[9px] flex gap-[10px] justify-center items-center";

  return (
    <div className="w-[160px] min-h-[32px] flex mx-auto gap-4">
      <button
        className={ButtonStyle}
        onClick={() => handleArrowClick("left")}
        disabled={currentPage <= 1}
      >
        <Arrow_left />
      </button>
      <div className="w-[64px] h-[32px] font-[500] text-[14px] leading-[20px] tracking-[0%] text-gray6 flex items-center justify-center align-center">
        {currentPage} / {totalPage}
      </div>
      <button
        className={ButtonStyle}
        onClick={() => handleArrowClick("right")}
        disabled={currentPage >= totalPage}
      >
        <Arrow_right />
      </button>
    </div>
  );
};

export default MainRightBarPagination;
