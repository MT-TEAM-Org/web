"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SearchLeftSidebar = () => {
  const pathname = usePathname();

  const searchList = [
    { name: "게시판", id: 0, path: `/total-search/board`, category: "board" },
    { name: "뉴스", id: 1, path: `/total-search/news`, category: "news" },
  ];

  const isCurrentPath = (searchCategory: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts[2] || "";
    return currentCategory === searchCategory;
  };

  return (
    <div className="w-full h-[104px] bg-white">
      {searchList.map((search) => (
        <Link href={search.path} key={search.id}>
          <div
            className={`w-full h-[52px] px-4 py-3 cursor-pointer ${
              isCurrentPath(search.category)
                ? "font-[700] text-gra bg-bg0"
                : "font-[400] text-gray7 bg-white"
            }`}
          >
            <p className="text-[16px] leading-7 tracking-[-0.02em]">
              {search.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(SearchLeftSidebar);
