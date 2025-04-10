"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const SearchLeftSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const basePath = pathname.split("/")[1];

  const searchList = [
    { name: "게시판", id: 0, path: `/${basePath}/board`, category: "board" },
    { name: "뉴스", id: 1, path: `/${basePath}/news`, category: "news" },
  ];

  const isCurrentPath = (searchCategory: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[2] || "";
    return currentCategory === searchCategory;
  };

  const currentPathStyle =
    "font-bold text-gra bg-bg0 mobile:bg-transparent mobile:text-gray7 mobile:border-b-2 mobile:border-gray7";
  const defaultStyle =
    "font-[400] text-gray7 bg-white mobile:text-gray5 mobile:border-b-2 mobile:border-gray3";

  return (
    <div
      className={cn(
        "w-[160px] bg-white",
        "tablet:w-full tablet:flex tablet:h-[52px]",
        "mobile:w-full mobile:min-h-[50px] mobile:overflow-x-auto mobile:whitespace-nowrap mobile:scrollbar-hide"
      )}
    >
      <div
        className={cn(
          "w-full flex flex-col justify-center",
          "tablet:flex-row tablet:w-full",
          "mobile:flex-row mobile:min-w-fit mobile:justify-start"
        )}
      >
        {searchList.map((search) => {
          const newPath = `${search.path}?search=${encodeURIComponent(
            searchQuery
          )}`;

          return (
            <Link
              key={search.id}
              href={newPath}
              className={cn(
                "block w-full",
                "tablet:flex tablet:flex-1",
                "mobile:inline-block"
              )}
            >
              <div
                className={cn(
                  `w-full h-[52px] px-4 py-3 cursor-pointer ${
                    isCurrentPath(search.category)
                      ? currentPathStyle
                      : defaultStyle
                  }`,
                  "tablet:flex tablet:items-center tablet:justify-center tablet:h-full tablet:w-full",
                  "mobile:inline-flex mobile:min-w-[180px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-[14px] mobile:leading-5"
                )}
              >
                <p className="whitespace-nowrap">{search.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(SearchLeftSidebar);
