"use client";

import { Skeleton } from "@heroui/react";

const FeedbackInfoSkeleton = () => {
  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md">
      {/* 상단 정보 영역 */}
      <div className="w-full min-h-[96px] flex gap-2 flex-col">
        {/* 상태 태그 */}
        <div className="max-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-gray1">
          <Skeleton className="w-[50px] h-[20px] rounded-md" />
        </div>
        {/* 제목 */}
        <Skeleton className="w-[80%] h-[24px] rounded-md" />
        {/* 메타데이터 */}
        <div className="w-full max-h-[20px] flex gap-4">
          <div className="w-full min-h-full flex gap-2">
            <Skeleton className="w-[60px] h-[16px] rounded-md" />{" "}
            {/* 고객센터 */}
            <Skeleton className="w-[70px] h-[16px] rounded-md" />{" "}
            {/* 개선요청 */}
            <Skeleton className="w-[50px] h-[16px] rounded-md" /> {/* 시간 */}
          </div>
          <div className="min-w-[235px] min-h-[20px] flex gap-1">
            <Skeleton className="w-[80px] h-[16px] rounded-md" /> {/* 닉네임 */}
            <Skeleton className="w-[100px] h-[16px] rounded-md" /> {/* IP */}
          </div>
        </div>
      </div>

      <hr />

      {/* 콘텐츠 영역 */}
      <div className="w-full min-h-auto flex flex-col gap-3">
        {/* 이미지 */}
        <Skeleton className="w-[672px] h-[128px] rounded-md" />
        {/* 텍스트 */}
        <Skeleton className="w-full h-[16px] rounded-md" />
        <Skeleton className="w-[90%] h-[16px] rounded-md" />
        <Skeleton className="w-[70%] h-[16px] rounded-md" />
      </div>

      {/* 추천 버튼 */}
      <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
        <Skeleton className="w-[120px] h-[40px] rounded-[5px]" />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-between mb-4">
        <Skeleton className="w-[104px] h-[32px] rounded-[5px]" />{" "}
        {/* 기사 원문 보기 */}
        <div className="flex gap-2">
          <Skeleton className="w-[138px] h-[32px] rounded-[5px]" />{" "}
          {/* URL 복사 */}
          <Skeleton className="w-[91px] h-[32px] rounded-[5px]" />{" "}
          {/* 공유하기 */}
        </div>
      </div>
    </div>
  );
};

export default FeedbackInfoSkeleton;
