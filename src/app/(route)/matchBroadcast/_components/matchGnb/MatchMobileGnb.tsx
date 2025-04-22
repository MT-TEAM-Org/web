"use client";

import CustomIcon from "@/app/_components/IconComponents";
import { MATCH_NAVBAR } from "@/app/_constants/navigation";
import { cn } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MatchMobileGnbModal from "./MatchMobileGnbModal";
import Link from "next/link";

interface MobileGnbProps {
  type: "match" | "service";
}

const MatchMobileGnb = ({ type }: MobileGnbProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const NavPath = pathname.split("/").slice(1, 2)[0];

  const nowCategory = () => {
    const selectedCategory = MATCH_NAVBAR.find(
      (navbar) => navbar.id === NavPath
    );
    return selectedCategory ? selectedCategory.name : "카테고리 없음";
  };

  const currentCategory = nowCategory();

  const onClose = () => setIsModalOpen(false);
  const onOpen = () => setIsModalOpen(true);

  return (
    <div
      className={cn(
        "w-full h-[48px] border-b border-gray2 flex items-center justify-around bg-white",
        "max-w-[768px]",
        "pc:hidden tablet:hidden"
      )}
    >
      <Link href={"/"}>
        <div className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer">
          <CustomIcon
            icon="MOBILE_ARROW_LEFT"
            className="w-[18px] h-[18px] text-white"
          />
        </div>
      </Link>

      {type === "match" ? (
        <div className="w-full flex items-center justify-between">
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
          {isModalOpen && (
            <MatchMobileGnbModal
              currentCategory={currentCategory}
              onClose={onClose}
            />
          )}
        </div>
      ) : (
        <h1 className="w-full text-center font-bold text-[16px] leading-[26px] tracking-[-0.02em] text-black">
          서비스소개
        </h1>
      )}
    </div>
  );
};

export default MatchMobileGnb;
