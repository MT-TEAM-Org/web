import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const paginationStyle =
  "w-[32px] h-[32px] rounded-[5px] border bg-white border-gray2 flex items-center justify-center border";

const Pagination = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`, { scroll: false });
  };

  const navigationButtons = [
    { icon: "PAGINATION_DOUBLE_LEFT_ARROW" as const, position: "left" },
    { icon: "PAGINATION_LEFT_ARROW" as const, position: "left" },
    { icon: "PAGINATION_RIGHT_ARROW" as const, position: "right" },
    { icon: "PAGINATION_DOUBLE_RIGHT_ARROW" as const, position: "right" },
  ] as const;

  // 페이지 번호 설정 (임시)
  const pageNumbers = [1, 2, 3, 4, 5];

  // 네비게이션 버튼
  const leftNavButtons = navigationButtons.filter(
    (btn) => btn.position === "left"
  );

  const rightNavButtons = navigationButtons.filter(
    (btn) => btn.position === "right"
  );

  return (
    <div className="w-full flex items-center justify-center gap-2">
      {/* 왼쪽 네비게이션 */}
      <div className="flex gap-2">
        {leftNavButtons.map((btn, index) => (
          <button key={`left-${index}`} className={paginationStyle}>
            <Icon icon={btn.icon} />
          </button>
        ))}
      </div>

      {/* 페이지 번호 */}
      <div className="flex gap-2">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            className={cn(
              paginationStyle,
              currentPage === pageNum ? "border-gray7" : "border-gray3"
            )}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 오른쪽 네비게이션 */}
      <div className="flex gap-2">
        {rightNavButtons.map((btn, index) => (
          <button key={`right-${index}`} className={paginationStyle}>
            <Icon icon={btn.icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Pagination);
