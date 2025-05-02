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
  const writePage = pathname.split("/")[3];

  const writePageHidden = () => {
    if (writePage === "write") {
      return "mobile:hidden";
    }
  };

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

  const inDetail = () => {
    if (
      pathname.includes("feedback-info") ||
      pathname.includes("notice-info")
    ) {
      return "tablet:sticky tablet:z-20";
    } else {
      return "tablet:static";
    }
  };

  const isWrite = () => {
    if (pathname.includes("write")) {
      return "mobile:hidden";
    }
  };

  const currentPathStyle =
    "font-bold text-gra bg-bg0 mobile:bg-transparent mobile:text-gray7 mobile:border-b-2 mobile:border-gray7";
  const defaultStyle =
    "font-[400] text-gray7 bg-white pc:hover:text-gra mobile:text-gray5 mobile:border-b-2 mobile:border-gray3";

  return (
    <div
      className={cn(
        "w-[160px] h-[260px] sticky top-0 rounded-t-[5px] overflow-hidden",
        "tablet:w-full tablet:h-auto tablet:min-h-[52px] tablet:overflow-x-auto",
        "mobile:w-full mobile:h-auto mobile:min-h-[48px] mobile:static mobile:overflow-x-auto",
        inDetail(),
        isWrite()
      )}
    >
      <div
        className={cn(
          "w-[160px] bg-white",
          "tablet:w-full tablet:flex tablet:h-[52px]",
          "mobile:w-full mobile:min-h-48px] mobile:overflow-x-auto mobile:whitespace-nowrap mobile:scrollbar-hide",
          writePageHidden()
        )}
      >
        <div
          className={cn(
            "w-full flex flex-col justify-center",
            "tablet:flex-row tablet:w-full",
            "mobile:flex-row mobile:min-w-fit mobile:justify-start"
          )}
        >
          {boardList.map((board) => (
            <Link
              key={board.id}
              href={board.path}
              className={cn(
                "block w-full",
                "tablet:flex tablet:flex-1",
                "mobile:inline-block"
              )}
            >
              <div
                className={cn(
                  `w-full h-[52px] px-4 py-3 cursor-pointer ${
                    isCurrentPath(board.path) && !show
                      ? currentPathStyle
                      : defaultStyle
                  }`,
                  "tablet:flex tablet:items-center tablet:justify-center tablet:h-full tablet:w-full",
                  "mobile:inline-flex mobile:min-w-[122px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-[14px]"
                )}
              >
                <p className="whitespace-nowrap">{board.name}</p>
              </div>
            </Link>
          ))}
          <div
            className={cn(
              `w-full h-[52px] px-4 py-3 cursor-pointer ${
                show ? currentPathStyle : defaultStyle
              }`,
              "tablet:flex-1 tablet:flex tablet:items-center tablet:justify-center tablet:h-full tablet:w-full",
              "mobile:inline-flex mobile:min-w-[98px] mobile:h-[48px] mobile:items-center mobile:justify-center mobile:text-[14px] mobile:leading-5"
            )}
            onClick={() => setShow(true)}
          >
            <p className="whitespace-nowrap">1:1 문의하기</p>
          </div>
        </div>
        {show && <ModalPopup show={show} setShow={setShow} />}
      </div>
    </div>
  );
};

export default CustomerLeftSidebar;
