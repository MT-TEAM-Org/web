import { cn } from "@/utils";
import React from "react";
import ServiceFooterTitle from "./ServiceFooterTitle";
import ServiceSignButton from "./elements/ServiceSignButton";

const ServiceFooter = () => {
  return (
    <div
      className={cn(
        "w-full h-[360px] flex items-center justify-center bg-[url('/Service_footer.png')] bg-center bg-cover relative",
        "mobile:h-[200px]"
      )}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className={cn(
          "min-w-[558px] min-h-[232px] flex gap-6 flex-col items-center justify-center relative z-10",
          "tablet:min-w-[561px]",
          "mobile:min-w-[250px] mobile:min-h-[64px] mobile:gap-4"
        )}
      >
        <ServiceFooterTitle />
        <ServiceSignButton />
      </div>
    </div>
  );
};

export default ServiceFooter;
