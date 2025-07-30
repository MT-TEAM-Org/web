"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { NAVBARS } from "@/app/_constants/navigation";
import NavSearch from "./_components/NavSearch";
import { cn } from "@/utils";
import CustomIcon from "../IconComponents";

export default function Navbar() {
  const pathname = usePathname();

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
        <div className="max-w-[447px] min-h-[60px] flex justify-around">
          {NAVBARS.map((item, index) => (
            <Link key={item.id} href={item.link}>
              <div
                className={cn(
                  navbarClass,
                  "flex justify-around items-center hover:text-gra",
                  isCurrentPath(item.id)
                    ? "font-normal text-gra"
                    : "font-normal text-gray7",
                  index === 0 ? "pl-0" : "",
                  item.id === "matchBroadcast" && "relative"
                )}>
                {item.name}
                {item.id === "matchBroadcast" && (
                  <div className="absolute top-0 right-0 rounded-[2px] p-1 bg-Primary text-white">
                    <CustomIcon icon="NEW_ICON" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-end items-center mb-2 w-full">
          <NavSearch />
        </div>
      </div>
    </>
  );
}
