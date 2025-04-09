"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModalPopup from "@/app/_components/ModalPopup";
import { cn } from "@/utils";

const CustomerLeftSidebar = () => {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const boardList = [
    { name: "공지사항", id: 0, path: `/${basePath}` },
    { name: "개선요청", id: 1, path: `/${basePath}/feedback` },
    { name: "이용약관", id: 2, path: `/${basePath}/terms` },
    { name: "개인정보 취급방침", id: 3, path: `/${basePath}/privacy-policy` },
  ];

  const isCurrentPath = (boardPath: string) => {
    const boardCategory = boardPath.split("/")[2] || "";

    if (boardCategory === "") {
      return (
        pathname === `/${basePath}` ||
        pathname.startsWith(`/${basePath}/notice`)
      );
    } else {
      return pathname === boardPath || pathname.startsWith(`${boardPath}/`);
    }
  };

  const currentPathStyle =
    "font-bold text-gra bg-bg0 mobile:bg-transparent mobile:text-gray7 mobile:border-b-2 mobile:border-gray7";
  const defaultStyle =
    "font-[400] text-gray7 bg-white mobile:text-gray5 mobile:border-b-2 mobile:border-gray3";

  return (
    <div
      className={cn(
        "w-[160px] bg-white",
        "tablet:flex tablet:min-w-[688px] tablet:h-[52px]",
        "mobile:w-full mobile:min-h-[50px] mobile:overflow-x-auto mobile:whitespace-nowrap mobile:scrollbar-hide"
      )}
    >
      <div
        className={cn(
          "w-full flex flex-col justify-center",
          "tablet:flex-row",
          "mobile:flex-row mobile:min-w-[360px] mobile:justify-start"
        )}
      >
        {boardList.map((board) => (
          <Link key={board.id} href={board.path}>
            <div
              className={cn(
                `w-full h-[52px] px-4 py-3 cursor-pointer ${
                  isCurrentPath(board.path) && !show
                    ? currentPathStyle
                    : defaultStyle
                }`,
                "tablet:min-w-[137.6px] tablet:items-center tablet:justify-center tablet:text-center tablet:px-4 tablet:py-3",
                "mobile:min-w-[122px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-center"
              )}
            >
              <p className="whitespace-nowrap">{board.name}</p>
            </div>
          </Link>
        ))}
        <div
          className={cn(
            `w-full h-[52px] px-[20px] py-[12px] text-center cursor-pointer ${
              show ? currentPathStyle : defaultStyle
            }`,
            "tablet:min-w-[137.6px] tablet:items-center tablet:justify-center tablet:px-4 tablet:py-3",
            "mobile:min-w-[98px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:px-4 mobile:py-[13px]"
          )}
          onClick={() => setShow(true)}
        >
          <p
            className={cn(
              "whitespace-nowrap text-start",
              "tablet:text-center",
              "mobile:text-center"
            )}
          >
            1:1 문의하기
          </p>
        </div>
      </div>
      {show && <ModalPopup show={show} setShow={setShow} />}
    </div>
  );
};

export default CustomerLeftSidebar;
