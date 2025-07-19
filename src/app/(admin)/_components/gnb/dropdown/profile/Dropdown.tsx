"use client";

import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoutModal from "../../../modal/LogoutModal";

const style = {
  divStyle: cn(
    "w-full h-[48px] border-b px-4 py-1 border-gray2 flex items-center justify-start cursor-pointer font-medium text-[16px] leading-[26px] tracking-[-0.02em] text-gray7",
    "hover:bg-gray1 transition-colors duration-200"
  ),
};

const Dropdown = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    {
      name: "내 정보 수정",
      fn: () => router.push("/dashBoard/my-page"),
    },
    {
      name: "로그아웃",
      fn: () => setIsLogoutModalOpen(true),
    },
  ];

  return (
    <div className="w-[252px] h-[138px] rounded-[10px] border py-4 flex flex-col items-center justify-center gap-4 bg-white border-gray3 shadow-xl">
      {menuItems.map((item, index) => (
        <div className={style.divStyle} key={index} onClick={item.fn}>
          <p>{item.name}</p>
        </div>
      ))}
      {isLogoutModalOpen && (
        <LogoutModal show={isLogoutModalOpen} setShow={setIsLogoutModalOpen} />
      )}
    </div>
  );
};

export default Dropdown;
