"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeedbackItemProps {
  completed: boolean;
  number: number;
}

const FeedbackItem = ({ completed, number }: FeedbackItemProps) => {
  return (
    <Link href={`/customer/feedback/info`}>
      <div className="w-full min-h-[66px] border-b p-3 flex gap-3 border-[#FAFAFA] items-center justify-start cursor-pointer hover:bg-[#F8FDFF]">
        <div className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] bg-[#FAFAFA] items-center justify-center">
          <p className="font-bold text-[14px] leading-5">{number}</p>
        </div>
        <Image
          src="/Fake_feedback.png"
          alt="img"
          width={56}
          height={42}
          className="w-[56px] h-[42px] rounded-[5px] flex gap-[10px] bg-[#FAFAFA]"
        />
        <div className="w-full min-h-[42px] flex gap-1 flex-col">
          <div className="w-full min-h-[20px] flex gap-[2px]">
            <p className="text-[14px] leading-5 text-[#424242]">
              와 손흥민지리네 쩐다
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
            <p>스포츠가조아여여진심</p>
            <p>IP 106.101.**.***</p>
          </div>
        </div>
        {completed ? (
          <div className="min-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-[#FAFAFA]">
            <p className="font-bold text-[14px] leading-5">접수 완료</p>
          </div>
        ) : (
          <div className="min-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-[#F8FDFF]">
            <p className="font-bold text-[14px] leading-5 text-[#00ADEE]">
              개선 완료
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FeedbackItem;
