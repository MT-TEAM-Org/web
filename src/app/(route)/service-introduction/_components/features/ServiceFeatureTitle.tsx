import React from "react";
import { cn } from "@/utils";

const ServiceFeatureTitle = () => {
  return (
    <div
      className={cn(
        "min-w-[621px] min-h-[94px] flex flex-col gap-1",
        "mobile:min-h-[46px]"
      )}
    >
      <p
        className={cn(
          "font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-center text-gra",
          "mobile:text-[12px] mobile:leading-[18px]"
        )}
      >
        Features
      </p>
      <p
        className={cn(
          "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-center text-black",
          "mobile:text-[16px] mobile:leading-6"
        )}
      >
        서로 존중하는 커뮤니티, 플레이하이브
      </p>
    </div>
  );
};

export default ServiceFeatureTitle;
