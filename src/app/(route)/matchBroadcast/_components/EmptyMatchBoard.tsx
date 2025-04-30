import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import CustomIcon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";
import React from "react";

const EmptyMatchBoard = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "w-[1200px] h-[660px] flex items-center justify-center bg-gray1",
        "tablet:max-w-[769px] tablet:h-[494px]",
        "mobile:max-w-[768px] mobile:h-[328px]"
      )}
    >
      <div
        className={cn(
          "w-full flex flex-col gap-4 items-center justify-center",
          "mobile:gap-1"
        )}
      >
        {!isMobile ? (
          <LogoWhite />
        ) : (
          <div className="flex gap-[6px] items-center">
            <CustomIcon icon="EMPTY_LOGO" className="h-[38px]" />
            <CustomIcon icon="EMPTY_PLAYHIVE" className="h-[28px]" />
          </div>
        )}

        <div className="w-full min-h-[24px] flex gap-1 text-center items-center justify-center">
          <p className="font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray7">
            경기일정이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyMatchBoard;
