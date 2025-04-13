"use client";

import { Skeleton } from "@heroui/react";

const MainPostItemSkeleton = () => {
  return (
    <div className="min-w-[419px] h-[36px] border-b border-gray1 py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer">
      {/* 순번 영역 */}
      <Skeleton className="w-[20px] h-[20px] rounded-sm" />

      {/* 게시판 종류 영역 */}
      <Skeleton className="max-w-[10%] min-h-[20px] w-[40px] h-[18px] rounded-sm" />

      {/* 제목 + 아이콘 + 댓글 수 + N/H 영역 */}
      <div className="flex justify-center items-center gap-[2px]">
        {/* 제목 영역 */}
        <Skeleton className="max-w-[300px] min-h-[20px] w-[300px] h-[20px] rounded-sm" />

        {/* 이미지 아이콘 자리 */}
        <Skeleton className="w-[10%] h-[20px] rounded-sm" />

        {/* 댓글 수 */}
        <Skeleton className="w-[10%] h-[20px] rounded-sm" />
      </div>
    </div>
  );
};

export default MainPostItemSkeleton;
