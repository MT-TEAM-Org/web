import React from "react";
import { cn } from "@/utils";

interface BenefitsDescriptionsProps {
  label: string;
  title: string;
  mobileTitle: string;
  description: string;
}

const BenefitsDescriptions = ({
  label,
  title,
  mobileTitle,
  description,
}: BenefitsDescriptionsProps) => {
  return (
    <div
      className={cn(
        "w-[560px] min-h-[294px] flex gap-6 flex-col",
        "tablet:w-full",
        "mobile:w-full mobile:min-h-[166px] mobile:h-auto mobile:gap-2"
      )}
    >
      <div
        className={cn(
          "w-full h-[158px] flex gap-1 flex-col",
          "mobile:h-0 mobile:min-h-[70px]"
        )}
      >
        <p
          className={cn(
            "font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-gra",
            "mobile:text-[12px] mobile:leading-[18px]"
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black",
            "tablet:hidden",
            "mobile:hidden"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-black",
            "mobile:text-[16px] mobile:leading-6",
            "pc:hidden"
          )}
        >
          {mobileTitle}
        </p>
      </div>
      <p
        className={cn(
          "font-medium text-[18px] leading-7 tracking-[-0.04em] text-gray7",
          "mobile:text-[12px] mobile:leading-[18px]"
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default BenefitsDescriptions;
