"use client";

import CustomIcon from "@/app/_components/IconComponents/Icon";
import { NEWS_NAVBAR } from "@/app/_constants/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MobileNavModalProps {
  currentCategory: string;
  onClose: () => void;
}

const MatchMobileGnbModal = ({
  currentCategory,
  onClose,
}: MobileNavModalProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-end z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full h-fit bg-white pb-[24px]
          transform transition-transform duration-300 ease-out
          ${animate ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {NEWS_NAVBAR.map((item) => (
          <Link
            href={item.link}
            className={`flex items-center justify-center w-full h-[48px] py-[16px] px-[12px] border-b border-gray2 last:border-none cursor-pointer ${
              currentCategory === item.name ? "text-gra" : "text-black"
            }`}
            key={item.id}
          >
            <p className="w-full h-[20px] mr-[8px] font-bold text-[14px] leading-[20px]">
              {item.name}
            </p>
            <div className="flex items-center justify-center w-[24px] h-[24px]">
              {currentCategory === item.name ? (
                <CustomIcon
                  icon="MOBILE_BLUE_CHECK"
                  className="w-[12px] h-[8px] text-white"
                />
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MatchMobileGnbModal;
