"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const EventItemSkeleton = () => {
  return (
    <div className="w-[298px] min-h-[84px] flex items-center border border-gray2 rounded-[10px] p-3 gap-3 cursor-pointer">
      {/* 이미지 스켈레톤 */}
      <Skeleton className="min-w-[60px] min-h-[60px] rounded-[3.75px]" />

      {/* 텍스트 영역 스켈레톤 */}
      <div className="flex flex-col max-w-[202px] min-h-[58px] gap-2">
        <div className="flex flex-col gap-[2px]">
          <Skeleton className="w-[150px] h-[18px]" />
          <Skeleton className="w-[180px] h-[14px]" />
        </div>
        <Skeleton className="w-[120px] h-[14px]" />
      </div>
    </div>
  );
};

export default EventItemSkeleton;
