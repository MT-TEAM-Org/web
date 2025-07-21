"use client";

import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const FeedbackItemSkeleton = () => {
  return (
    <div className="w-full min-h-[66px] border-b p-3 flex gap-3 items-center justify-start cursor-pointer">
      {/* 번호 영역 */}
      <Skeleton className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] items-center justify-center" />

      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[56px] h-[42px] rounded-[5px] flex gap-[10px] bg-gray1" />

      {/* 텍스트 영역 */}
      <div
        className={cn(
          "w-full min-h-[42px] flex gap-1 flex-col",
          "mobile:max-w-[80%]"
        )}
      >
        {/* 제목 및 정보 영역 */}
        <div className="w-full min-h-[20px] flex gap-[2px] items-center">
          <Skeleton
            className={cn(
              "h-[16px] w-[60%] rounded-md",
              "tablet:w-[80%]",
              "mobile:w-[80%]"
            )}
          />{" "}
          {/* 제목 */}
        </div>
        {/* 메타데이터 영역 */}
        <div className="min-w-[109px] min-h-[18px] flex gap-1">
          <Skeleton
            className={cn("h-[16px] w-[60px] rounded-md", "mobile:w-[10%]")}
          />
          {/* 카테고리 */}
          <Skeleton
            className={cn("h-[16px] w-[40px] rounded-md", "mobile:w-[10%]")}
          />{" "}
          {/* 시간 */}
          <Skeleton
            className={cn("h-[16px] w-[50px] rounded-md", "mobile:w-[30%]")}
          />{" "}
          {/* 닉네임 */}
          <Skeleton className="h-[16px] w-[70px] rounded-md" /> {/* IP */}
        </div>
      </div>
    </div>
  );
};

export default FeedbackItemSkeleton;
