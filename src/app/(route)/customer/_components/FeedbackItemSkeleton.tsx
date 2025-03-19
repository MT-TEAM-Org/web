"use client";

import { Skeleton } from "@heroui/react";

const FeedbackItemSkeleton = () => {
  return (
    <div className="w-full min-h-[66px] border-b p-3 flex gap-3 border-gray1 items-center justify-start cursor-pointer hover:bg-[#F8FDFF]">
      {/* 번호 영역 */}
      <div className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] bg-gray1 items-center justify-center">
        <Skeleton className="w-[18px] h-[18px]" />
      </div>

      {/* 썸네일 이미지 영역 */}
      <div className="w-[56px] h-[42px] rounded-[5px] flex gap-[10px] bg-gray1">
        <Skeleton className="w-[56px] h-[42px]" />
      </div>

      {/* 텍스트 영역 */}
      <div className="w-full min-h-[42px] flex gap-1 flex-col">
        {/* 제목 및 정보 영역 */}
        <div className="w-full min-h-[20px] flex gap-[2px] items-center">
          <Skeleton className="h-[16px] w-[60%] rounded-md" /> {/* 제목 */}
          <Skeleton className="h-[16px] w-[30px] rounded-md" /> {/* 추천 수 */}
          <Skeleton className="h-[16px] w-[22px] rounded-md" /> {/* N/H 태그 */}
        </div>
        {/* 메타데이터 영역 */}
        <div className="min-w-[109px] min-h-[18px] flex gap-1">
          <Skeleton className="h-[16px] w-[60px] rounded-md" /> {/* 카테고리 */}
          <Skeleton className="h-[16px] w-[40px] rounded-md" /> {/* 시간 */}
          <Skeleton className="h-[16px] w-[50px] rounded-md" /> {/* 닉네임 */}
          <Skeleton className="h-[16px] w-[70px] rounded-md" /> {/* IP */}
        </div>
      </div>

      {/* 상태 영역 */}
      <div className="min-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-[#F8FDFF]">
        <Skeleton className="h-[16px] w-[50px] rounded-md" />
      </div>
    </div>
  );
};

export default FeedbackItemSkeleton;
