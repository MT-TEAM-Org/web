import React from "react";
import Image from "next/image";
import { cn } from "@/utils";

interface itemType {
  title: string;
  content: string;
  imgUrl: string;
}

const ServiceItem = ({ title, content, imgUrl }: itemType) => {
  return (
    <div
      className={cn(
        "min-w-[320px] min-h-[300px] rounded-[20px] shadow-md flex flex-col overflow-hidden",
        "mobile:min-w-[328px] w-[328px] mobile:h-[92px] mobile:min-h-0 mobile:flex-row mobile:flex mobile:items-center mobile:justify-center"
      )}
    >
      <div
        className={cn(
          "w-full h-full flex items-center justify-center",
          "mobile:min-w-[92px] mobile:min-h-[92px] mobile:w-0 mobile:h-0"
        )}
      >
        <div
          className={cn(
            "min-w-[140px] min-h-[140px] rounded-[99px] bg-bg0 p-5 flex gap-[10px]",
            "mobile:min-w-[60px] mobile:min-h-[60px]"
          )}
        >
          <Image
            src={`/${imgUrl}.png`}
            alt="service features"
            width={100}
            height={100}
            className={cn(
              "w-[100px] h-[100px]",
              "mobile:w-[42px] mobile:h-[42px]"
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "pr-4 py-2 flex flex-col items-center justify-center text-center text-[18px] leading-7 tracking-[-0.04em] text-gray9",
          "mobile:w-full mobile:h-full mobile:items-start"
        )}
      >
        <p className={cn("font-bold", "mobile:text-[14px] mobile:leading-5")}>
          {title}
        </p>
        <p
          className={cn(
            "text-gray7",
            "mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em] mobile:text-start"
          )}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default ServiceItem;
