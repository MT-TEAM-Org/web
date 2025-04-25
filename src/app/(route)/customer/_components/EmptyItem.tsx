import React from "react";
import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";
import CustomIcon from "@/app/_components/IconComponents";

interface EmptyNoticeItemProps {
  title: string;
}

const EmptyItem = ({ title }: EmptyNoticeItemProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "w-[720px] h-[248px] rounded-b-[10px] flex items-center bg-transparent",
        "tablet:w-[688px] tablet:shadow-md",
        "mobile:min-w-[360px] mobile:w-auto mobile:bg-gray1"
      )}
    >
      <div
        className={cn(
          "w-full min-h-[80px] flex flex-col gap-4 items-center justify-center",
          "mobile:gap-0"
        )}
      >
        {!isMobile ? (
          <LogoWhite />
        ) : (
          <div className="flex gap-[6px] items-center">
            <CustomIcon icon="EMPTY_LOGO" className="h-[30px]" />
            <CustomIcon icon="EMPTY_PLAYHIVE" className="h-[23px]" />
          </div>
        )}

        <div className="w-full min-h-[24px] flex gap-1 text-center items-center justify-center">
          <p className="text-bold text-[16px] leading-6 tracking-[-0.02em] text-gray7">
            등록된 <span>{title}</span> 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyItem;
