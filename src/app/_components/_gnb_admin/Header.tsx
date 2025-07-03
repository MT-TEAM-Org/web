"use client";

import Link from "next/link";
import { LogoWhite } from "../icon/LogoWhite";
import { cn } from "@/utils";
import Alarm from "../icon/Alarm_icon";
import { AdminSidebarStore } from "@/utils/Store";

export default function Header() {
  const { toggleMini } = AdminSidebarStore();

  return (
    <div className="w-full min-h-[64px] mx-auto px-4 flex justify-between items-center bg-Fifth">
      <div className="flex items-center gap-x-[16px] flex-shrink overflow-hidden">
        <button
          onClick={toggleMini}
          className="flex flex-col justify-between w-5 h-4 mr-2"
          aria-label="메뉴 열기">
          <span className="block h-[1.5px] w-full bg-white rounded"></span>
          <span className="block h-[1.5px] w-full bg-white rounded"></span>
          <span className="block h-[1.5px] w-full bg-white rounded"></span>
        </button>
        <Link href="/dashBoard" aria-label="관리자 페이지">
          <LogoWhite />
        </Link>
        <p
          className={cn(
            "font-bold text-base text-white tracking-[-0.04em]",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            "max-w-full"
          )}>
          플레이하이브 관리자 페이지
        </p>
      </div>

      {/* TODO : 클릭 할 경우 dropDown */}
      <div className="flex gap-4 h-[40px] whitespace-nowrap items-center">
        <button className="flex items-center justify-center gap-2 w-auto px-4 py-2 bg-quaternary rounded-full text-white  hover:bg-Primary transition-all duration-200">
          <Alarm /> <span> 알림 0 </span>
        </button>

        {/* TODO : 유저 이미지 추가 */}
        <button className="flex items-center justify-center w-auto px-4 py-2 bg-quaternary rounded-full text-white hover:bg-Primary transition-all duration-200">
          phph님
        </button>
      </div>
    </div>
  );
}
