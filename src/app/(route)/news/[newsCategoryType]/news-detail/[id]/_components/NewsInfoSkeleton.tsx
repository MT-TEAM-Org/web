"use client";

import React from "react";
import { Skeleton } from "@heroui/react";
import { cn } from "@/utils";

const NewsInfoSkeleton = () => {
  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-4 w-[720px] h-auto bg-white p-6 rounded-[5px] border-b border-white shadow-sm mb-2",
          "tablet:max-w-full tablet:w-full",
          "mobile:max-w-full"
        )}
      >
        {/* 제목 및 정보 */}
        <div className="w-full h-auto flex flex-col gap-2">
          <Skeleton className={cn("w-[400px] h-[30px]", "mobile:w-full")} />
          <div
            className={cn(
              "w-full h-auto min-h-[20px] flex justify-between text-gray2",
              "mobile:flex-col mobile:gap-1"
            )}
          >
            <Skeleton className={cn("w-[150px] h-[20px]", "mobile:w-[40%]")} />
            <Skeleton className={cn("w-[100px] h-[20px]", "mobile:w-[20%]")} />
          </div>
        </div>
        <hr />

        {/* 뉴스 이미지 및 본문 */}
        <div className="w-full h-auto flex flex-col gap-3">
          <Skeleton className="w-full h-[338px]" />
          <Skeleton className="w-full h-[32px]" />
        </div>
      </div>
    </>
  );
};

export default NewsInfoSkeleton;
