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
    <div className={cn("w-full bg-white", "tablet:flex", "mobile:flex")}>
      {boardList.map((board) => (
        <Link href={board.path} key={board.id}>
          <div
            className={cn(
              `w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
                isCurrentPath(board.category)
                  ? "font-[700] text-gra bg-bg0 mobile:border-gray7 mobile:text-gray7 mobile:bg-transparent"
                  : "font-[400] text-gray7 bg-white mobile:text-gray5"
              }`,
              "tablet:flex tablet:w-[144px] tablet:flex-shrink tablet:justify-center tablet:items-center tablet:text-center",
              "mobile:flex mobile:flex-grow mobile:min-w-[128px] mobile:h-[48px] mobile:justify-center mobile:items-center mobile:text-center mobile:font-medium mobile:text-[14px] mobile:leading-5 mobile:border-b-2"
            )}
          >
            <p className="whitespace-nowrap">{board.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(LeftSidebar);
