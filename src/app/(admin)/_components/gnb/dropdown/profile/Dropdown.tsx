"use client";

import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoutModal from "../../../modal/LogoutModal";
import useAdminLogout from "@/app/(admin)/_hooks/fetcher/auth/useAdminLogout";

const style = {
  divStyle: cn(
    "w-full h-[48px] border-b px-4 py-1 border-gray2 flex items-center justify-start cursor-pointer font-medium text-[16px] leading-[26px] tracking-[-0.02em] text-gray7",
    "hover:bg-gray1 transition-colors duration-200"
  ),
};

interface DropdownProps {
  onClose: () => void;
}

const Dropdown = ({ onClose }: DropdownProps) => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const adminLogout = useAdminLogout();

  const handleToMyPage = () => {
    router.push("/dashBoard/my-page");
    onClose();
  };

  const menuItems = [
    {
      name: "내 정보 수정",
      fn: handleToMyPage,
    },
    {
      name: "로그아웃",
      fn: () => adminLogout.mutate(),
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
