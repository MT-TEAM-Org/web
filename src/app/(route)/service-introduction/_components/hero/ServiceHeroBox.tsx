import React from "react";
import ServiceAnimation from "./ServiceAnimation";
import ServiceMainBox from "./ServiceMainBox";
import { cn } from "@/utils";

const ServiceHeroBox = () => {
  return (
    <div
      className={cn(
        "w-full h-[480px] flex items-center justify-center bg-gradient-to-r from-gra to-[#006388]",
        "mobile:h-[236px]"
      )}
    >
      <ServiceAnimation />
      <ServiceMainBox />
    </div>
  );
};

export default ServiceHeroBox;
