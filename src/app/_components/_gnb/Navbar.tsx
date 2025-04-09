"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search } from "../icon/Search";
import Link from "next/link";
import { NAVBARS } from "@/app/_constants/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
  const isCurrentPath = (Id: string) => {
    if (!pathname) return false;
    return pathname.includes(Id);
  };

  const navbarClass =
    "min-h-[60px] p-[16px] whitespace-nowrap font-medium text-[18px] leading-7 tracking-[-0.04em] text-center cursor-pointer";

  return (
    <div className="w-full max-w-[1200px] min-h-[60px] flex justify-between items-center mx-auto">
      <div className="max-w-[447px] min-h-[60px] flex justify-around gap-2.5">
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
      <div className="flex items-center mb-2">
        <div className="w-[414px] h-[48px] rounded-full bg-gray1 border-[0.5px] px-4 flex items-center gap-[16px] relative transition-all focus-within:ring-1 focus-within:ring-gray9">
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
              className="absolute right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setIsValue("")}
            >
              <X
                size={16}
                className="bg-gray border rounded-xl bg-gray5 text-white"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
