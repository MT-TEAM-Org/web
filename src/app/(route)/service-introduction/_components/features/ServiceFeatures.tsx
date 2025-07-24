import React from "react";
import { cn } from "@/utils";
import { serviceItems } from "../../_constants/SERVICE_ITEMS";
import ServiceFeatureItem from "./ServiceFeatureItem";
import ServiceFeatureTitle from "./ServiceFeatureTitle";

const ServiceFeatures = () => {
  return (
    <div
      className={cn(
        "w-full min-h-[902px] py-[80px] flex items-center justify-center gap-6",
        "tablet:min-h-[1226px] tablet:px-10",
        "mobile:h-[790px] mobile:min-h-0 mobile:px-4 mobile:py-6"
      )}
    >
      <div
        className={cn(
          "w-full min-h-[742px] flex flex-col items-center justify-center gap-6",
          "tablet:h-[1066px] tablet:min-h-0",
          "mobile:h-[742px] mobile:min-h-0"
        )}
      >
        {/* features title */}
        <ServiceFeatureTitle />

        {/* features items */}
        <div
          className={cn(
            "grid grid-cols-3 gap-6",
            "tablet:min-w-[688px] tablet:min-h-[948px] tablet:grid-cols-2",
            "mobile:grid-cols-1"
          )}
        >
          {serviceItems.map((item) => (
            <ServiceFeatureItem key={item.imgUrl} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
