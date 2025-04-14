import React from "react";
import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { cn } from "@/utils";

interface EmptyNoticeItemProps {
  title: string;
}

const EmptyItem = ({ title }: EmptyNoticeItemProps) => {
  return (
    <div
      className={cn(
        "w-[720px] h-[248px] rounded-b-[10px] flex items-center",
        "tablet:w-[688px]",
        "mobile:min-w-[360px] mobile:w-auto"
      )}
    >
      <div className="w-full min-h-[80px] flex flex-col gap-4 items-center justify-center">
        <LogoWhite />
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
