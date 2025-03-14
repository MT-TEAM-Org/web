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
  const ButtonStyle = "w-[32px] h-[32px] px-2 py-1 border border-gray2 rounded";

  return (
    <div className="flex items-center justify-center gap-7 py-4 space-x-4">
      <button
        className={ButtonStyle}
        onClick={() => handleArrowClick("left")}
        disabled={currentPage <= 1}
      >
        <Arrow_left />
      </button>
      <div>
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
