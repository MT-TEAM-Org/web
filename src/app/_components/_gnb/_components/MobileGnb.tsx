"use client";

import { cn } from "@/utils";
import CustomIcon from "../../IconComponents/Icon";
import { Logo } from "../../icon/Logo";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const MobileGnb = () => {
  const [isValue, setIsValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleToSearch = () => {
    const trimmedValue = isValue.trim();
    if (!trimmedValue) return;

    const searchPath = `/total-search/board?search=${encodeURIComponent(
      trimmedValue
    )}`;
    setIsSearching(true);
    router.push(searchPath);
  };

  useEffect(() => {
    if (isSearching) {
      setIsValue("");
      setIsSearching(false);
    }
  }, [pathname, isSearching]);

  return (
    <div
      className={cn(
        "pc:hidden",
        "tablet:hidden",
        isHome && "sticky top-0 z-50",
        "mobile:w-full mobile:min-w-[360px] mobile:min-h-[60px] mobile:py-[8px] mobile:bg-white"
      )}
    >
      <div className="flex justify-between items-center mx-auto w-full min-w-[360px] h-[44px] px-[16px]">
        <div className="flex items-center h-[40px] flex-1 border border-gray-300 rounded-full px-[16px] gap-x-[12px] focus-within:border-gray-600">
          <Logo size="xs" />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={isValue}
            onChange={(e) => setIsValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                handleToSearch();
              }
            }}
            className="w-full h-[28px] bg-transparent border-none outline-none placeholder:text-gray5"
            style={{ outline: "none", border: "none", boxShadow: "none" }}
          />
        </div>
        <div className="flex items-center justify-center w-[44px] h-[44px]">
          <CustomIcon icon="GNB_HAMBURGER_ICON" className="w-[18px] h-[18px]" />
        </div>
      </div>
    </div>
  );
};

export default MobileGnb;
