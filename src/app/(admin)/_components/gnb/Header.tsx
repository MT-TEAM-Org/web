"use client";

import Link from "next/link";
import { AdminSidebarStore } from "@/utils/Store";
import CustomIcon from "../../../_components/IconComponents/Icon";
import Image from "next/image";
import NotificationList from "./dropdown/notification/NotificationList";
import { useState } from "react";
import { cn } from "@/utils";
import Dropdown from "./dropdown/profile/Dropdown";

export default function Header() {
  const { toggleMini } = AdminSidebarStore();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  return (
    <div className="w-full h-[74px] flex justify-between items-center bg-Fifth">
      <div className="w-full h-full flex items-center flex-shrink overflow-hidden">
        <button
          onClick={toggleMini}
          className="flex items-center justify-center w-[56px] h-full"
          aria-label="메뉴 열기"
        >
          <CustomIcon icon="MENU_ICON" className="w-[24px] h-[24px]" />
        </button>
        <Link
          href="/dashBoard"
          aria-label="관리자 페이지"
          className="max-w-[425px] flex items-center gap-4"
        >
          <div className="flex items-center gap-1">
            <CustomIcon icon="LogoWhiteWithAdmin" />
            <CustomIcon icon="PLAYHIVE_ADMIN" />
          </div>
          <p className="font-bold text-base text-white tracking-[-0.04em]">
            플레이하이브 관리자 페이지
          </p>
        </Link>
      </div>

      <div className="flex gap-4 h-[42px] whitespace-nowrap items-center mr-4">
        <div
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className={cn(
            "relative flex items-center justify-center gap-2 w-auto px-4 py-2 select-none cursor-pointer rounded-full text-white hover:bg-Primary transition-all duration-200",
            isNotificationOpen ? "bg-Primary" : "bg-quaternary"
          )}
        >
          {/* <CustomIcon icon="ALARM" /> <span> 알림 0 </span> */}
          <CustomIcon icon="ALARM_ACTIVE" /> <span> 알림 0 </span>
          {isNotificationOpen && (
            <div className="absolute top-[42px] right-[-130px]">
              <NotificationList />
            </div>
          )}
        </div>

        <button
          onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          className={cn(
            "relative min-w-[113px] h-[42px] flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white cursor-pointer",
            isAdminMenuOpen ? "bg-Primary" : "bg-quaternary"
          )}
        >
          <Image
            src="/userProfileIsNull.png"
            alt="userProfileIsNull"
            width={24}
            height={24}
          />
          <span>phph님</span>
        </button>
        {isAdminMenuOpen && (
          <div className="absolute top-[65px] right-[15px]">
            <Dropdown />
          </div>
        )}
      </div>
    </div>
  );
}
