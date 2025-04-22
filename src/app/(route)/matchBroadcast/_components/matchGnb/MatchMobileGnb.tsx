"use client";

import CustomIcon from "@/app/_components/IconComponents/Icon";
import { MATCH_NAVBAR } from "@/app/_constants/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils";
import MatchMobileGnbModal from "./MatchMobileGnbModal";

const MatchMobileGnb = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const NavPath = pathname.split("/").slice(1, 2)[0];

  const nowCategory = () => {
    const selectedCategory = MATCH_NAVBAR.find(
      (navbar) => navbar.id === NavPath
    );

    if (selectedCategory) {
      return selectedCategory.name;
    }
    return "카테고리 없음";
  };

  const currentCategory = nowCategory();

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onOpen = () => {
    setIsModalOpen(true);
  };

  const handleNavLeftIconClick = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "w-full max-w-[768px] h-[48px] flex items-center justify-around bg-white",
        "pc:hidden",
        "tablet:hidden"
      )}
    >
      <div className="w-full flex items-center">
        <div
          onClick={handleNavLeftIconClick}
          className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer"
        >
          <CustomIcon
            icon="MOBILE_ARROW_LEFT"
            className="w-[18px] h-[18px] text-white "
          />
        </div>

        <div className="w-full flex items-center justify-between ">
          <div className="w-full">
            <div
              onClick={onOpen}
              className="flex items-center min-w-[175px] font-bold text-[16px] leading-[26px] tracking-[-0.02em] text-black"
            >
              경기중계
              <div className="flex items-center justify-center w-[24px] h-[24px]">
                <CustomIcon
                  icon="BLACK_MOBILE_ARROW_DOWN"
                  className="w-[8px] h-[5.71px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <MatchMobileGnbModal
          currentCategory={currentCategory}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default MatchMobileGnb;
