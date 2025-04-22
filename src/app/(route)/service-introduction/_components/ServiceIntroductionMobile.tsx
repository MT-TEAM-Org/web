"use client";

import CustomIcon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";

const ServiceIntroductionMobile = () => {
  const router = useRouter();

  const handleNavLeftIconClick = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "w-full h-[48px] border border-gray2 flex items-center justify-around",
        "pc:hidden",
        "tablet:hidden"
      )}
    >
      <div
        className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer"
        onClick={handleNavLeftIconClick}
      >
        <CustomIcon
          icon="MOBILE_ARROW_LEFT"
          className="w-[18px] h-[18px] bg-white text-white"
        />
      </div>
      <h1 className="w-full font-bold text-[16px] leading-[26px] tracking-[-0.02em] text-black">
        서비스소개
      </h1>
    </div>
  );
};

export default ServiceIntroductionMobile;
