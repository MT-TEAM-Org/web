import { cn } from "@/utils";
import React from "react";
import { benefitImages } from "../../../_constants/BENEFIT_IMAGES";
import SecondServiceBenefitItem from "../elements/SecondServiceBenefitItem";

const SecondBenefitItemBox = () => {
  return (
    <div
      className={cn(
        "relative w-[464.42px] h-[480px] flex items-center justify-center",
        "mobile:w-[296px] h-[305px]"
      )}
    >
      {benefitImages.map((image, index) => (
        <SecondServiceBenefitItem key={index} image={image} />
      ))}
    </div>
  );
};

export default SecondBenefitItemBox;
