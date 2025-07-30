import React from "react";
import SecondBenefit from "./SecondBenefit";
import FirstBenefit from "./FirstBenefit";
import { cn } from "@/utils";

const BenefitsBox = () => {
  return (
    <>
      <div
        className={cn(
          "w-full min-h-[488px] py-[60px] flex gap-[10px] items-center justify-center bg-bg0",
          "tablet:min-h-[834px] tablet:px-[40px]",
          "mobile:min-h-[446px] mobile:px-4 mobile:py-6"
        )}
      >
        <FirstBenefit />
      </div>

      <div
        className={cn(
          "w-full min-h-[600px] py-[60px] flex gap-[10px] bg-white items-center justify-center",
          "tablet:min-h-[974px] tablet:flex-col tablet:px-[40px]",
          "mobile:min-h-[619px] mobile:flex-col mobile:px-4 mobile:py-6"
        )}
      >
        <SecondBenefit />
      </div>
    </>
  );
};

export default BenefitsBox;
