"use client";

import { Skeleton } from "@heroui/react";

const NoticeItemSkeleton = () => {
  return (
    <div className="w-full min-h-[66px] border-b p-3 flex gap-3 border-gray1 items-center justify-start cursor-pointer">
      {/* 번호 영역 */}
      <Skeleton className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] items-center justify-center" />

      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[56px] h-[42px] rounded-[5px] p-4 flex gap-[10px]" />

      {/* 텍스트 영역 */}
      <div className="w-full min-h-[42px] flex gap-1 flex-col">
        {/* 제목 및 정보 영역 */}
        <div className="w-full min-h-[20px] flex gap-[2px]">
          <Skeleton className="h-[16px] w-[60%] rounded-md" />
        </div>
        {/* 메타데이터 영역 */}
        <div className="min-w-[109px] min-h-[18px] flex gap-1">
          <Skeleton className="h-[16px] w-[60px] rounded-md" /> {/* 카테고리 */}
          <Skeleton className="h-[16px] w-[40px] rounded-md" /> {/* 시간 */}
          <Skeleton className="h-[16px] w-[50px] rounded-md" /> {/* 관리자 */}
        </div>
      </div>
    </div>
  );
};

export default NoticeItemSkeleton;
