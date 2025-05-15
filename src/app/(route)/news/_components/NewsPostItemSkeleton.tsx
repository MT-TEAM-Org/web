"use client";

import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const NewsPostItemSkeleton = () => {
  return (
    <div
      className={cn(
        "min-w-[720px] min-h-[116px] flex items-center justify-start gap-3 border-b border-gray1 p-3 bg-white",
        "tablet:max-w-full tablet:min-w-full",
        "mobile:max-w-[768px] mobile:min-w-0 mobile:h-[114px]"
      )}
    >
      {/* 썸네일 이미지 영역 */}
      <Skeleton
        className={cn(
          "w-[160px] h-[92px] rounded-[3.83px]",
          "mobile:w-[80px] mobile:h-[80px]"
        )}
      />

      {/* 텍스트 영역 */}
      <div
        className={cn(
          "w-[524px] h-auto min-h-[90px] flex flex-col gap-1",
          "tablet:w-full",
          "mobile:w-[510px] mobile:min-h-[82px]"
        )}
      >
        {/* 제목 영역 */}
        <div
          className={cn(
            "w-[524px] h-auto min-h-[24px] flex gap-[2px] items-center justify-start",
            "tablet:w-full",
            "mobile:w-[80%]"
          )}
        >
          <Skeleton
            className={cn("h-[20px] w-[60%] rounded-md", "mobile:w-[95%]")}
          />
        </div>

        {/* 콘텐츠 영역 */}
        <div>
          <Skeleton
            className={cn(
              "w-[524px] h-[40px] rounded-md",
              "tablet:w-[90%]",
              "mobile:w-[90%]"
            )}
          />
        </div>

        {/* 메타데이터 영역 */}
        <div className="flex gap-1">
          <Skeleton className="h-[18px] w-[10%] rounded-md" /> {/* 카테고리 */}
          <Skeleton className="h-[18px] w-[20%] rounded-md" /> {/* 시간 */}
          <Skeleton className="h-[18px] w-[30%] rounded-md tablet:w-[20%]" />{" "}
          {/* 출처 */}
        </div>
      </div>
    </div>
  );
};

export default NewsPostItemSkeleton;
