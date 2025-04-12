"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search } from "../icon/Search";
import Link from "next/link";
import { NAVBARS } from "@/app/_constants/navigation";
import { useState, useEffect } from "react";
import CustomIcon from "../IconComponents/Icon";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isValue, setIsValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      setIsValue("");
      setIsSearching(false);
    }
  }, [pathname, isSearching]);

  const handleToSearch = () => {
    const trimmedValue = isValue.trim();
    if (!trimmedValue) return;

    const searchPath = `/total-search/board?search=${encodeURIComponent(
      trimmedValue
    )}`;
    setIsSearching(true);
    router.push(searchPath);
  };

  const isCurrentPath = (id: string) => {
    if (!pathname) return false;
    const lowerPath = pathname.toLowerCase();
    const lowerId = id.toLowerCase();

    const isNewsPath =
      lowerPath.startsWith("/news") ||
      lowerPath.startsWith("/news/football") ||
      lowerPath.startsWith("/news/baseball");

    if (isNewsPath) return lowerId === "news";
    if (lowerPath.startsWith("/main") && lowerId === "main") return true;

    const boardMatch = lowerPath.match(
      /^\/board\/([^/]+)\/([^/]+)(?:\/(\d+))?/
    );
    if (boardMatch) {
      const category = boardMatch[1];
      const tab = boardMatch[2];
      const postId = boardMatch[3];

      if (postId) {
        return lowerId === category || (lowerId === tab && tab !== "all");
      }

      if (tab === "all") {
        return lowerId === "all" || lowerId === category;
      } else {
        return lowerId === category || lowerId === tab;
      }
    }

    if (lowerPath.startsWith("/matchbroadcast")) {
      return lowerId === "matchbroadcast" || lowerId === "경기중계";
    }

    return false;
  };

  const navbarClass =
    "min-h-[60px] p-[16px] whitespace-nowrap font-medium text-[18px] leading-7 tracking-[-0.04em] text-center cursor-pointer";

  return (
    <>
      <div className="w-full max-w-[1200px] min-h-[60px] flex justify-between items-center mx-auto">
        <div className=" max-w-[447px] min-h-[60px] flex justify-around gap-2.5">
          {NAVBARS.map((item, index) => (
            <Link key={item.id} href={item.link}>
              <div
                className={`${navbarClass} flex justify-around items-center hover:text-gra ${
                  isCurrentPath(item.id)
                    ? "font-normal text-gra"
                    : "font-normal text-gray7"
                } ${index === 0 ? "pl-0" : ""}`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        <div className=" flex justify-end items-center mb-2 w-full">
          <div className="w-[414px] h-[48px] rounded-full bg-white border-[0.5px] px-4 flex items-center gap-[10px] relative transition-all focus-within:ring-1 focus-within:ring-gray9 md:flex md:bg-gray1">
            <div
              className="cursor-pointer hidden md:block"
              onClick={handleToSearch}
            >
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
                <CustomIcon
                  icon="SEARCH_X_ICON"
                  className="w-[20px] h-[20px]"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
