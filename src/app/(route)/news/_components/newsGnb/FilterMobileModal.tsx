"use client";

import CustomIcon from "@/app/_components/IconComponents";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FilterMobileModalProps {
  onClose: () => void;
  type?: "news" | "totalSearch";
}

const FilterMobileModal = ({
  onClose,
  type = "news",
}: FilterMobileModalProps) => {
  const [animate, setAnimate] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const currentTime =
    searchParams.get("time") || (type === "news" ? "DAILY" : "ALL");

  const filterOption = [
    ...(type === "totalSearch" ? [{ link: "ALL", name: "전체", id: "5" }] : []),
    { link: "DAILY", name: "일간", id: "1" },
    { link: "WEEKLY", name: "주간", id: "2" },
    { link: "MONTHLY", name: "월간", id: "3" },
    { link: "YEARLY", name: "연간", id: "4" },
  ];

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
        {filterOption.map((item) => (
          <Link
            key={item.id}
            href={{
              pathname,
              query: {
                ...Object.fromEntries(searchParams.entries()),
                time: item.link,
                page: "1",
              },
            }}
            className={`flex items-center justify-center w-full h-[48px] py-[16px] px-[12px] border-b border-gray2 last:border-none cursor-pointer ${
              currentTime === item.link ? "text-gra" : "text-black"
            }`}
          >
            <p className="w-full h-[20px] mr-[8px] font-bold text-[14px] leading-[20px]">
              {item.name}
            </p>
            <div className="flex items-center justify-center w-[24px] h-[24px]">
              {currentTime === item.link && (
                <CustomIcon
                  icon="MOBILE_BLUE_CHECK"
                  className="w-[12px] h-[8px] text-white"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterMobileModal;
