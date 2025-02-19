"use client";

import React from "react";
import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";

const FeedbackNoticeItem = () => {
  // const pathName = usePathname();
  // const router = useRouter();

  const handleToInfo = () => {
    console.log("router.push");
  };

  return (
    <div
      onClick={handleToInfo}
      className="w-full min-h-[66px] border-b p-3 flex gap-3 border-[#FAFAFA] bg-[#F8FDFF] items-center justify-start cursor-pointer"
    >
      <div className="w-[32px] h-[32px] rounded-[2px] flex gap-[10px] items-center justify-center">
        <p className="font-bold text-[14px] leading-5">공지</p>
      </div>
      <Image
        src="/Empty_news.png"
        alt="img"
        width={56}
        height={42}
        className="w-[56px] h-[42px] rounded-[5px] p-4 flex gap-[10px] bg-[#FAFAFA]"
      />
      <div className="w-full min-h-[42px] flex gap-1 flex-col">
        <div className="w-full min-h-[20px] flex gap-[2px]">
          <p className="font-bold text-[14px] leading-5 text-[#424242]">
            개선요청을 희망하는 내용을 적어주세요! 플레이하이브 팀이
            개선하겠습니다!
            {/* 목 데이터 */}
          </p>
          <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#00ADEE]">
            [24]
          </p>
          <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center">
            <p className="text-[#00ADEE]">N</p>
            <p className="text-[#DC2800]">H</p>
          </div>
        </div>
        <div className="min-w-[109px] min-h-[18px] flex gap-1 text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6] align-center justify-start">
          <p className="font-bold">개선요청</p>
          <p>1분 전</p>
          <p>플레이하이브 관리자</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackNoticeItem;
