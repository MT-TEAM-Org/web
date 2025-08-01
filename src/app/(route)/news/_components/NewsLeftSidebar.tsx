"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

  const boardList = [
    { name: "전체", id: 0, path: `/${basePath}/ALL`, category: "ALL" },
    {
      name: "E스포츠",
      id: 1,
      path: `/${basePath}/ESPORTS`,
      category: "ESPORTS",
    },
    {
      name: "축구",
      id: 2,
      path: `/${basePath}/FOOTBALL`,
      category: "FOOTBALL",
    },
    {
      name: "야구",
      id: 3,
      path: `/${basePath}/BASEBALL`,
      category: "BASEBALL",
    },
    {
      name: "개선요청",
      id: 6,
      path: `/customer/feedback`,
      category: "feedback",
    },
  ];

  const isCurrentPath = (boardCategory: string) => {
    const pathParts = pathname.split("/");

    if (pathParts.includes("news-detail")) {
      return pathParts[2].toUpperCase() === boardCategory;
    }

    const currentCategory = pathParts[2] || "";
    return currentCategory === boardCategory;
  };

  const inDetail = () => {
    if (pathname.includes("news-detail")) {
      return "tablet:sticky tablet:z-20";
    } else {
      return "tablet:static";
    }
  };

  return (
    <aside
      className={cn(
        "w-[160px] pc:h-[260px] sticky top-0 rounded-[5px] overflow-hidden",
        "tablet:w-full tablet:h-auto tablet:min-h-[52px] tablet:overflow-x-auto",
        inDetail(),
        "mobile:w-full mobile:h-auto mobile:min-h-[48px] mobile:static mobile:overflow-x-auto"
      )}
      aria-label="뉴스 왼쪽 사이드바"
    >
      <div
        className={cn(
          "w-full h-[260px] bg-white overflow-x-hidden",
          "tablet:flex tablet:max-w-full tablet:h-[52px]",
          "mobile:flex mobile:w-full mobile:h-[48px] mobile:overflow-x-auto mobile:whitespace-nowrap mobile:scrollbar-hide"
        )}
      >
        <div
          className={cn(
            "w-full flex flex-col",
            "tablet:flex-row",
            "mobile:flex-row mobile:inline-flex mobile:min-w-fit"
          )}
          aria-label="뉴스 카테고리"
        >
          {boardList.map((board) => (
            <Link
              href={board.path}
              key={board.id}
              className={cn(
                "block w-full",
                "tablet:max-w-full tablet:flex tablet:flex-1",
                "mobile:inline-block"
              )}
              aria-label={`뉴스 ${board.name} 카테고리로 이동`}
            >
              <div
                className={cn(
                  `w-full h-[52px] px-4 py-3 cursor-pointer ${
                    isCurrentPath(board.category)
                      ? "font-[700] text-gra bg-bg0 mobile:text-gray7 mobile:border-b-2 mobile:border-b-gray7 mobile:bg-transparent"
                      : "font-[400] text-gray7 bg-white pc:hover:text-gra mobile:text-gray5 mobile:border-b-2 mobile:border-b-gray3"
                  }`,
                  "tablet:w-full tablet:flex tablet:flex-1 tablet:items-center tablet:justify-center tablet:text-center tablet:text-[16px] tablet:leading-7 tablet:tracking-[-0.02em]",
                  "mobile:inline-flex mobile:min-w-[72px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-center mobile:text-[14px] mobile:leading-5"
                )}
              >
                <p
                  className={cn(
                    "text-[16px] leading-7 tracking-[-0.02em] whitespace-nowrap",
                    "mobile:text-[14px] mobile:leading-5"
                  )}
                >
                  {board.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default React.memo(LeftSidebar);
