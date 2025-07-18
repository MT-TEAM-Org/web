import React from "react";
import StatusBannerItem from "./StatusBannerItem";
import { StatusBannerItemType } from "../../_type/StatusItem/ItemTypes";
import { ItemTypeConfig } from "../../_type/StatusItem/ItemTypeConfig";
import { cn } from "@/utils";

interface StatusBannerProps {
  type: StatusBannerItemType;
  data?: any; // 타입 수정 필요
}

const StatusBanner = ({ type, data }: StatusBannerProps) => {
  const config = ItemTypeConfig(type);

  return (
    <div
      className={cn(
        "w-full h-[142px] bg-gray1 rounded-[10px]",
        type === "dashBoard"
          ? "grid grid-cols-4 gap-[16px]"
          : "flex items-center justify-center gap-4"
      )}
    >
      {config.map((item) => (
        <StatusBannerItem
          key={item.name}
          meta={{
            title: item.name,
            count: data?.count || 8,
            totalCount: data?.totalCount || 160,
            percentage: data?.percentage || 12.5,
          }}
          icon={{
            mainIcon: item.icon,
            statusIcon: false,
          }}
        />
      ))}
    </div>
  );
};

export default StatusBanner;
