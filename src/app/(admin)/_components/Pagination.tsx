import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React from "react";

const paginationStyle =
  "w-[32px] h-[32px] rounded-[5px] border bg-white border-gray2 flex items-center justify-center";

const Pagination = () => {
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <div className="flex gap-2">
        <button className={paginationStyle}>
          <Icon icon="PAGINATION_DOUBLE_LEFT_ARROW" />
        </button>
        <button className={paginationStyle}>
          <Icon icon="PAGINATION_LEFT_ARROW" />
        </button>
      </div>
      <div className="flex gap-2">
        <button className={cn(paginationStyle)}>1</button>
        <button className={paginationStyle}>2</button>
        <button className={paginationStyle}>3</button>
        <button className={paginationStyle}>4</button>
        <button className={paginationStyle}>5</button>
      </div>
      <div className="flex gap-2">
        <button className={paginationStyle}>
          <Icon icon="PAGINATION_RIGHT_ARROW" />
        </button>
        <button className={paginationStyle}>
          <Icon icon="PAGINATION_DOUBLE_RIGHT_ARROW" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
