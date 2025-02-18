"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CustomerLeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

  const boardList = [
    { name: "공지사항", id: 0, path: `/${basePath}` },
    { name: "개선요청", id: 1, path: `/${basePath}/feedback` },
    { name: "이용약관", id: 2, path: `/${basePath}/terms` },
    { name: "개인정보 취급방침", id: 3, path: `/${basePath}/privacy-policy` },
    { name: "1:1 문의하기", id: 6, path: `/${basePath}/contact` },
  ];

  console.log("basePath: ", basePath);

  const isCurrentPath = (boardPath: string) => {
    const pathParts = pathname.split("/");
    const currentCategory = pathParts.includes("ALL") ? "" : pathParts[2] || "";
    const boardCategory = boardPath.split("/")[2] || "";

    return currentCategory === boardCategory;
  };

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-[160px] h-[260px]">
      <div className="w-full bg-[#FFFFFF]">
        {boardList.map((board) => (
          <div
            onClick={() => board.path && handleRoute(board.path)}
            key={board.id}
            className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
              isCurrentPath(board.path)
                ? "font-[700] text-[#00ADEE] bg-[#F8FDFF]"
                : "font-[400] text-[#424242] bg-[#FFFFFF]"
            }`}
          >
            <p>{board.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerLeftSidebar;
