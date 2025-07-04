"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAVBARS } from "@/app/_constants/navigation";
import { AdminSidebarStore } from "@/utils/Store";
import { cn } from "@/utils";
import Icon from "../IconComponents/Icon";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isMini } = AdminSidebarStore();
  const isActive = (link: string) => pathname?.startsWith(link);

  return (
    <aside
      className={cn(
        "bg-Fifth h-[calc(100vh-64px)] text-white flex flex-col gap-4 transition-all duration-300 ease-in-out",
        isMini ? "w-[60px]" : "w-[180px]"
      )}>
      <nav className="flex flex-col">
        {ADMIN_NAVBARS.map((item) => (
          <Link key={item.id} href={item.link}>
            <div
              className={`group flex items-center ${
                isMini ? "justify-center" : "px-4"
              } py-[18px] gap-3 cursor-pointer hover:bg-quaternary transition-colors ${
                isActive(item.link) ? "bg-Fifth font-semibold" : "text-white"
              }`}>
              <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                <Icon icon={item.icon} />
              </div>

              {!isMini && (
                <span
                  className={cn(
                    "transition-all duration-200",
                    isMini
                      ? "opacity-0 -translate-x-2 w-0 overflow-hidden"
                      : "opacity-100 translate-x-0 w-auto"
                  )}>
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {!isMini && <p className="w-auto h-[1px] mx-4 bg-quaternary " />}

      <div className="flex justify-center">
        <Link href="/">
          <div
            className={cn(
              "group flex items-center text-white transition-all duration-200",
              isMini
                ? "justify-center p-[18px] hover:bg-quaternary"
                : "gap-2 w-full text-sm px-4 py-2 bg-quaternary rounded-full hover:bg-Primary"
            )}>
            {!isMini && <span>사용자 페이지</span>}
            <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-200">
              <Icon icon="LINK_OUT" />
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
