"use client";

import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const FeedbackInfoSkeleton = () => {
  return (
    <div
      className={cn(
        "w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-soft-md",
        "tablet:max-w-[687px]",
        "mobile:max-w-full"
      )}
    >
      {/* 상단 정보 영역 */}
      <div className="w-full min-h-[96px] flex gap-2 flex-col">
        {/* 상태 태그 */}
        <Skeleton className="w-[50px] h-[20px] rounded-md" />
        {/* 제목 */}
        <Skeleton
          className={cn("w-[80%] h-[24px] rounded-md", "mobile:h-[36px]")}
        />
        {/* 메타데이터 */}
        <div
          className={cn(
            "w-full max-h-[20px] flex gap-4",
            "mobile:flex-col mobile:max-h-[40px]"
          )}
        >
          <div className="w-full min-h-full flex gap-2">
            <Skeleton className="w-[60px] h-[16px] rounded-md" />{" "}
            {/* 고객센터 */}
            <Skeleton className="w-[70px] h-[16px] rounded-md" />{" "}
            {/* 개선요청 */}
            <Skeleton className="w-[50px] h-[16px] rounded-md" /> {/* 시간 */}
          </div>
          <div className="min-w-[235px] min-h-[20px] flex gap-1">
            <Skeleton
              className={cn("w-[80px] h-[16px] rounded-md", "mobile:hidden")}
            />{" "}
            {/* 닉네임 */}
            <Skeleton
              className={cn("w-[100px] h-[16px] rounded-md", "mobile:w-[30%]")}
            />{" "}
            {/* IP */}
          </div>
        </div>
      </div>

      <hr />

      {/* 콘텐츠 영역 */}
      <div className="w-full min-h-auto flex flex-col gap-3">
        {/* 이미지 */}
        <Skeleton className="w-full h-[128px] rounded-md" />
        {/* 텍스트 */}
        <Skeleton className="w-full h-[36px] rounded-md" />
      </div>
    </div>
  );
};

export default FeedbackInfoSkeleton;
