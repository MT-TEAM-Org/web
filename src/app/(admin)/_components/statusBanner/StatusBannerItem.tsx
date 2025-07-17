import CustomIcon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React from "react";

const style = {
  mainIconStyle: "w-[32px] h-[32px]",
  iconStyle: "w-[24px] h-[24px]",
  fontStyle: "font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray7",
};

interface StatusBannerItemProps {
  meta: {
    title: string;
    count: number;
    totalCount: number;
    percentage: number;
  };
  icon: {
    mainIcon: string;
    statusIcon: boolean;
  };
}

const StatusBannerItem = ({ meta, icon }: StatusBannerItemProps) => {
  return (
    <div className="w-full h-[142px] rounded-[10px] p-4 flex flex-col gap-4 bg-white shadow-lg">
      <div className="flex items-center justify-between">
        <CustomIcon icon={icon.mainIcon} className={style.mainIconStyle} />
        <div className="flex items-center">
          <CustomIcon icon={icon.statusIcon ? "STATUS_UP" : "STATUS_DOWN"} />
          <p
            className={cn(
              "font-bold text-[18px] leading-7 tracking-[-0.04em]",
              icon.statusIcon ? "text-gra" : "text-warning"
            )}
          >
            {meta.percentage}%
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">
        <p className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          {meta.count}
          <span className={style.fontStyle}> ({meta.totalCount})</span>
        </p>
        <p className={style.fontStyle}>{meta.title}</p>
      </div>
    </div>
  );
};

export default StatusBannerItem;
