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

  return (
    <div
      className={cn(
        "w-full h-[260px] bg-white",
        "tablet:flex tablet:w-[688px] tablet:h-[52px]",
        "mobile:flex mobile:w-[360px] mobile:h-[48px]"
      )}
    >
      {boardList.map((board) => (
        <Link href={board.path} key={board.id}>
          <div
            className={cn(
              `w-full h-[52px] px-4 py-3 cursor-pointer ${
                isCurrentPath(board.category)
                  ? "font-[700] text-gra bg-bg0 mobile:text-gray7 mobile:border-b-2 mobile:border-b-gray7 mobile:bg-none"
                  : "font-[400] text-gray7 bg-white mobile:text-gray5 mobile:border-b-2 mobile:border-b-gray3"
              }`,
              "tablet:w-[137.6px] tablet:items-center tablet:justify-center tablet:text-center tablet:text-[16px] tablet:leading-7 tablet:tracking-[-0.02em]",
              "mobile:w-[180px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-center mobile:text-[14px] mobile:leading-5"
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
  );
};

export default React.memo(LeftSidebar);
