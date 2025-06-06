"use client";

import { cn } from "@/utils";
import Header from "./Header";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function Gnb() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <div
        className={cn(
          isHome && "fixed",
          "w-full top-0 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] z-50 h-[120px]",
          "tablet:px-[16px]",
          "mobile:hidden"
        )}
      >
        <Header />
        <Navbar />
      </div>
      {isHome && <div className="pt-[120px] mobile:pt-0"></div>}
    </>
  );
}
