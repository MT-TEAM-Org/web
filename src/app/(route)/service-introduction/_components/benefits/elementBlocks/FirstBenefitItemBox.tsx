import React from "react";
import { serviceBenefits } from "../../../_constants/SERVICE_BENEFITS";
import FirstServiceBenefitItem from "../elements/FirstServiceBenefitItem";
import { cn } from "@/utils";

const FirstBenefitItemBox = () => {
  return (
    <div
      className={cn(
        "max-w-[640px] min-h-[368px] flex gap-4 flex-col items-center justify-center",
        "tablet:w-full tablet:order-1",
        "mobile:w-full mobile:min-h-[208px] mobile:order-1"
      )}
    >
      {serviceBenefits.map((item, index) => (
        <FirstServiceBenefitItem key={index} {...item} />
      ))}
    </div>
  );
};

export default FirstBenefitItemBox;
