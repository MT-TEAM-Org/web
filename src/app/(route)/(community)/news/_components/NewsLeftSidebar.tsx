"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1]; // "news"

  const boardList = [
    { name: "전체", id: 0, path: `/${basePath}`, category: "" },
    {
      name: "E스포츠",
      id: 1,
      path: `/${basePath}/esports`,
      category: "esports",
    },
    {
      name: "축구",
      id: 2,
      path: `/${basePath}/football`,
      category: "football",
    },
    {
      name: "야구",
      id: 3,
      path: `/${basePath}/baseball`,
      category: "baseball",
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
      const currentCategory = pathParts[2] || "";
      return currentCategory === boardCategory;
    }

    const currentCategory = pathParts[2] || "";
    return currentCategory === boardCategory;
  };

  return (
    <div className="w-full bg-white">
      {boardList.map((board) => (
        <Link href={board.path} key={board.id}>
          <div
            className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
              isCurrentPath(board.category)
                ? "font-[700] text-[#00ADEE] bg-[#F8FDFF]"
                : "font-[400] text-gray7 bg-white"
            }`}
          >
            <p>{board.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(LeftSidebar);
