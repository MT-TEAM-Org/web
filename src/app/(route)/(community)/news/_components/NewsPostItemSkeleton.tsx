"use client";

import { Skeleton } from "@heroui/react";

const NewsPostItemSkeleton = () => {
  return (
    <div className="min-w-[720px] min-h-[116px] flex justify-start gap-3 border-b border-gray1 p-3 bg-white">
      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[160px] h-[92px] rounded-[3.83px]" />

      {/* 텍스트 영역 */}
      <div className="w-[524px] h-auto min-h-[90px] flex flex-col gap-1">
        {/* 제목 영역 */}
        <div className="w-[524px] h-auto min-h-[24px] flex gap-[2px] items-center justify-start">
          <Skeleton className="h-[20px] w-[60%] rounded-md" />
          <Skeleton className="h-[18px] w-[30px] rounded-md" /> {/* 댓글 수 */}
        </div>

        {/* 콘텐츠 영역 */}
        <div>
          <Skeleton className="w-[524px] h-[40px] rounded-md" />
        </div>

        {/* 메타데이터 영역 */}
        <div className="flex gap-1">
          <Skeleton className="h-[18px] w-[40px] rounded-md" /> {/* 카테고리 */}
          <Skeleton className="h-[18px] w-[60px] rounded-md" /> {/* 시간 */}
          <Skeleton className="h-[18px] w-[80px] rounded-md" /> {/* 출처 */}
        </div>
      </div>
    </div>
  );
};

export default NewsPostItemSkeleton;
