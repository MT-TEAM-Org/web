"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const SearchLeftSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const searchList = [
    { name: "게시판", id: 0, path: "/total-search/board", category: "board" },
    { name: "뉴스", id: 1, path: "/total-search/news", category: "news" },
  ];

  const isCurrentPath = (searchCategory: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[2] || "";
    return currentCategory === searchCategory;
  };

  return (
    <div
      className={cn(
        "w-full h-[104px] bg-white",
        "tablet:flex tablet:w-[688px] tablet:h-[52px]",
        "mobile:flex mobile:w-[360px] mobile:h-[48px]"
      )}
    >
      {searchList.map((search) => {
        const newPath = `${search.path}?search=${encodeURIComponent(
          searchQuery
        )}`;

        return (
          <Link href={newPath} key={search.id}>
            <div
              className={cn(
                `w-full h-[52px] px-4 py-3 cursor-pointer ${
                  isCurrentPath(search.category)
                    ? "font-[700] text-gra bg-bg0 mobile:text-gray7 mobile:border-b-2 mobile:border-b-gray7"
                    : "font-[400] text-gray7 bg-white mobile:text-gray5 mobile:border-b-2 mobile:border-b-gray3"
                }`,
                "tablet:w-[344px] tablet:items-center tablet:justify-center tablet:text-center tablet:text-[16px] tablet:leading-7 tablet:tracking-[-0.02em]",
                "mobile:w-[180px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-center mobile:text-[14px] mobile:leading-5"
              )}
            >
              <p
                className={cn(
                  "text-[16px] leading-7 tracking-[-0.02em]",
                  "mobile:text-[14px] mobile:leading-5"
                )}
              >
                {search.name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default React.memo(SearchLeftSidebar);
