"use client";

import { cn } from "@/utils";
import CustomIcon from "../../IconComponents/Icon";
import { Logo } from "../../icon/Logo";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HamburgerContents from "./hambugerContents";

const MobileGnb = () => {
  const [isValue, setIsValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isSign = pathname.includes("/sign");
  const isShow = isHome || isSign;

  const handleToSearch = () => {
    const trimmedValue = isValue.trim();
    if (!trimmedValue) return;

    const searchPath = `/total-search/board?search=${encodeURIComponent(
      trimmedValue
    )}`;
    setIsSearching(true);
    router.push(searchPath);
  };

  const handleHamburgerClick = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  const closeHamburger = () => {
    setIsHamburgerOpen(false);
  };

  useEffect(() => {
    if (isSearching) {
      setIsValue("");
      setIsSearching(false);
    }
  }, [pathname, isSearching]);

  return (
    <>
      {isShow && (
        <div
          className={cn(
            "hidden",
            isShow && "sticky top-0 z-50",
            "mobile:w-full mobile:min-w-[360px] mobile:min-h-[60px] mobile:py-[8px] mobile:bg-white mobile:block"
          )}
        >
          <div className="flex justify-between items-center mx-auto w-full min-w-[360px] h-[44px] px-[16px]">
            <div
              className={cn(
                "flex items-center h-[40px] flex-1 border border-gray-300 rounded-full gap-x-[12px] focus-within:border-gray-600",
                isHamburgerOpen && "border-none"
              )}
            >
              <div
                onClick={() => router.push("/")}
                className={cn(
                  "cursor-pointer flex gap-[2px] items-center justify-center",
                  !isHamburgerOpen && "ml-4"
                )}
              >
                <CustomIcon
                  icon="MOBILE_LOGO"
                  className={cn(
                    isHamburgerOpen ? "h-[26px]" : "h-[16px]",
                    "text-white"
                  )}
                />
                <CustomIcon
                  icon="MOBILE_PLAYHIVE"
                  className={cn(isHamburgerOpen ? "h-[20px]" : "h-[14px]")}
                />
              </div>
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
                className={cn(
                  "w-full h-[28px] bg-transparent border-none outline-none placeholder:text-gray5",
                  isHamburgerOpen && "hidden"
                )}
                style={{ outline: "none", border: "none", boxShadow: "none" }}
              />
            </div>
            <div
              onClick={handleHamburgerClick}
              className="flex items-center justify-center w-[44px] h-[44px] cursor-pointer"
            >
              {isHamburgerOpen ? (
                <CustomIcon icon="CLOSE_X" className="w-[18px] h-[18px]" />
              ) : (
                <CustomIcon
                  icon="GNB_HAMBURGER_ICON"
                  className="w-[18px] h-[18px]"
                />
              )}
            </div>
          </div>
          {isHamburgerOpen && <HamburgerContents onClose={closeHamburger} />}
        </div>
      )}
    </>
  );
};

export default MobileGnb;
