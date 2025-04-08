"use client";

import Arrow_left from "@/app/_components/icon/Arrow_left";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";

const MobileBackButton = () => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "hidden",
        "tablet:hidden",
        "mobile:flex mobile:items-center mobile:w-full mobile:h-[48px] mobile:border-b mobile:border-gray2"
      )}
    >
      <button
        className="flex justify-center items-center w-[48px] h-[48px]"
        onClick={() => router.back()}
      >
        <Arrow_left width={18} height={18} />
      </button>
      <h1 className="font-[700] leading-[26px]">마이페이지</h1>
    </div>
  );
};

export default MobileBackButton;
