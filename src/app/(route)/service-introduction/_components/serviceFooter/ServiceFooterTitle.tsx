import React from "react";
import { cn } from "@/utils";
import ServiceLogo from "./elements/ServiceLogo";

const ServiceFooterTitle = () => {
  return (
    <div
      className={cn(
        "min-w-[558px] min-h-[156px] flex flex-col items-center justify-center gap-6",
        "mobile:min-w-[250px] mobile:min-h-[64px] mobile:gap-2"
      )}
    >
      <ServiceLogo />
      <p
        className={cn(
          "font-bold text-[36px] leading-[52px] tracking-[-0.02em] text-white",
          "mobile:text-[16px] mobile:leading-6"
        )}
      >
        &quot;여러분의 스포츠 이야기를 들려주세요!”
      </p>
    </div>
  );
};

export default ServiceFooterTitle;
