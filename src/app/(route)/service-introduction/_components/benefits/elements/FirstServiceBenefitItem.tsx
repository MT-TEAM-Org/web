import React from "react";
import Image from "next/image";
import { cn } from "@/utils";

interface FirstServiceBenefitItemProps {
  content: string;
  imgLink: string;
  reverse?: boolean;
}

const FirstServiceBenefitItem = ({
  content,
  imgLink,
  reverse = false,
}: FirstServiceBenefitItemProps) => {
  return (
    <div
      className={cn(
        `min-w-[361px] min-h-[80px] rounded-[200px] py-4 px-6 bg-white shadow-soft-md flex justify-center items-center gap-3 ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`,
        "mobile:min-w-[328px] mobile:min-h-[40px] mobile:px-4 mobile:py-2 mobile:gap-2"
      )}
    >
      <Image
        src={`/${imgLink}.png`}
        alt="service img"
        width={48}
        height={48}
        className={cn("w-[48px] h-[48px]", "mobile:w-[24px] mobile:h-[24px]")}
      />
      <p
        className={cn(
          "font-bold text-[18px] leading-7 tracking-[-0.04em] text-center text-gray9",
          "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
        )}
      >
        {content}
      </p>
    </div>
  );
};

export default FirstServiceBenefitItem;
