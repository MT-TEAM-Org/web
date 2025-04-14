"use client";

import { useEffect, useState } from "react";
import CustomIcon from "../../IconComponents/Icon";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils";
import { Search } from "../../icon/Search";

const NavSearch = () => {
  const [isValue, setIsValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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
        "w-full max-w-[414px] h-[48px] rounded-full bg-white border-[0.5px] px-4 flex items-center gap-[10px] relative transition-all focus-within:ring-1 focus-within:ring-gray9",
        "tablet:w-full tablet:max-w-[292px]"
      )}
    >
      <div className="cursor-pointer" onClick={handleToSearch}>
        <Search />
      </div>
      <input
        className="w-full h-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none placeholder:text-gray5"
        placeholder="검색어를 입력해주세요"
        value={isValue}
        onChange={(e) => setIsValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            handleToSearch();
          }
        }}
      />
      {isValue && (
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => setIsValue("")}
        >
          <CustomIcon icon="SEARCH_X_ICON" className="w-[20px] h-[20px]" />
        </button>
      )}
    </div>
  );
};

export default NavSearch;
