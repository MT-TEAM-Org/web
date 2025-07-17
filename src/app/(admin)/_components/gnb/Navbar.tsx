"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSidebarStore } from "@/utils/Store";
import { cn } from "@/utils";
import { ADMIN_ROUTE } from "@/app/(admin)/_constants/adminRoute";
import CustomIcon from "../../../_components/IconComponents/Icon";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isMini } = AdminSidebarStore();

  return (
    <aside
      className={cn(
        "bg-Fifth h-[calc(100vh-74px)] text-white flex flex-col transition-all duration-300 ease-in-out",
        isMini ? "w-[60px]" : "w-[180px]"
      )}
    >
      {/* 메뉴 아이콘 */}
      <nav className="flex flex-col">
        {ADMIN_ROUTE.map((item) => (
          <Link key={item.id} href={item.link}>
            <div
              className={cn(
                "h-[52px] group flex items-center px-3 py-4 gap-4 cursor-pointer hover:bg-quaternary transition-colors",
                isMini ? "justify-center" : "px-4",
                pathname === item.link
                  ? "bg-quaternary font-semibold"
                  : "text-white"
              )}
            >
              <div
                className={cn(
                  "transition-opacity duration-200",
                  pathname === item.link ? "opacity-100" : "opacity-60"
                )}
              >
                <CustomIcon icon={item.icon} />
              </div>

              {!isMini && (
                <span
                  className={cn(
                    "transition-all duration-200 text-nowrap",
                    isMini
                      ? "opacity-0 -translate-x-2 w-0 overflow-hidden"
                      : "opacity-100 translate-x-0 w-auto"
                  )}
                >
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* 구분선 */}
      <div className="w-full h-[40px] px-4 py-2">
        <hr className="border-quaternary opacity-30" />
      </div>

      {/* 사용자 페이지 이동 버튼 */}
      <div className="flex justify-center">
        <Link href="/">
          <div
            className={cn(
              "h-[42px] group flex items-center text-white transition-all duration-400 text-nowrap",
              isMini
                ? "justify-center p-[18px] hover:bg-quaternary"
                : "gap-2 w-full text-base leading-[26px] tracking-[-0.02em] text-white px-4 py-2 bg-quaternary rounded-full hover:bg-Primary"
            )}
          >
            {!isMini && <span>사용자 페이지</span>}
            <CustomIcon icon="LINK_OUT" />
          </div>
        </Link>
      </div>
    </aside>
  );
}
