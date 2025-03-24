"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModalPopup from "@/app/_components/ModalPopup";

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

  const currentPathStyle = "font-bold text-gra bg-bg0";
  const defaultStyle = "font-[400] text-gray7 bg-white";
  return (
    <div className="w-[160px]">
      <div className="w-full bg-white">
        {boardList.map((board) => (
          <Link key={board.id} href={board.path}>
            <div
              className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer ${
                isCurrentPath(board.path) && !show
                  ? currentPathStyle
                  : defaultStyle
              }`}
            >
              <p>{board.name}</p>
            </div>
          </Link>
        ))}
        <div
          className={`w-full h-[52px] px-[20px] py-[12px] cursor-pointer font-[400] ${
            show ? currentPathStyle : defaultStyle
          }`}
          onClick={() => setShow(true)}
        >
          <p>1:1 문의하기</p>
        </div>
      </div>
      {show && <ModalPopup show={show} setShow={setShow} />}
    </div>
  );
};

export default CustomerLeftSidebar;
