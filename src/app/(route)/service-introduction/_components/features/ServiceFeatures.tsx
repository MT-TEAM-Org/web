import React from "react";
import { cn } from "@/utils";
import { serviceItems } from "../../_constants/SERVICE_ITEMS";
import ServiceFeatureItem from "./ServiceFeatureItem";

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
        <div
          className={cn(
            "min-w-[621px] min-h-[94px] flex flex-col gap-1",
            "mobile:min-h-[46px]"
          )}
        >
          <p
            className={cn(
              "font-bold text-[20px] leading-[26px] tracking-[-0.02em] text-center text-gra",
              "mobile:text-[12px] mobile:leading-[18px]"
            )}
          >
            Features
          </p>
          <p
            className={cn(
              "font-bold text-[42px] leading-[64px] tracking-[-0.02em] text-center text-black",
              "mobile:text-[16px] mobile:leading-6"
            )}
          >
            서로 존중하는 커뮤니티, 플레이하이브
          </p>
        </div>
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
