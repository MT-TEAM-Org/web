"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const NewsInfoSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-[720px] h-auto bg-white p-6 rounded-[5px] border-b border-white shadow-sm mb-2">
        {/* 제목 및 정보 */}
        <div className="w-full h-auto flex flex-col gap-2">
          <Skeleton className="w-[400px] h-[28px]" />
          <div className="w-full h-auto min-h-[20px] flex justify-between text-gray2">
            <Skeleton className="w-[150px] h-[20px]" />
            <Skeleton className="w-[100px] h-[20px]" />
          </div>
        </div>
        <hr />

        {/* 뉴스 이미지 및 본문 */}
        <div className="w-full h-auto flex flex-col gap-3">
          <Skeleton className="w-[672px] h-[338px]" />
          <Skeleton className="w-full h-[16px]" />
          <Skeleton className="w-3/4 h-[16px]" />
        </div>

        {/* 추천 버튼 */}
        <div className="w-full h-auto flex justify-center gap-2">
          <Skeleton className="w-[120px] h-[40px]" />
        </div>
      </div>

      {/* 관련 뉴스 목록 */}
      <div className="w-[720px] h-auto rounded-b-[5px] overflow-hidden shadow-md">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
        </div>
      </div>

      {/* 댓글 입력란 */}
      <div className="shadow-md p-4">
        <Skeleton className="w-full h-[50px]" />
      </div>
    </>
  );
};

export default NewsInfoSkeleton;
