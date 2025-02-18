"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NoticeItem = ({ number }: { number: number }) => {
  const router = useRouter();

  const handleToInfo = () => {
    router.push("/customer/info");
  };

  return (
    <div
      onClick={handleToInfo}
      className="w-full min-h-[66px] border-b p-3 flex gap-3 border-[#FAFAFA] items-center justify-start cursor-pointer"
    >
      <div className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] bg-[#FAFAFA] items-center justify-center">
        <p className="font-bold text-[14px] leading-5">{number}</p>
      </div>
      <div className="w-[56px] h-[42px] rounded-[5px] p-4 flex gap-[10px] bg-[#FAFAFA]">
        <Image src="/Empty_news.png" alt="img" width={56} height={42} />
      </div>
      <div className="w-full min-h-[42px] flex gap-1 flex-col">
        <div className="w-full min-h-[20px] flex gap-[2px]">
          <p className="text-[14px] leading-5 text-[#424242]">
            안녕하세요 플레이하이브입니다! 공지사항입니다.
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
          <p className="font-bold">공지사항</p>
          <p>1분 전</p>
          <p>관리자</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeItem;
