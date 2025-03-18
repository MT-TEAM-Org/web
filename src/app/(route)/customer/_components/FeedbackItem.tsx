"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeedbackContentType } from "@/app/_constants/customer/FeedbackItemType";
import useTimeAgo from "@/utils/useTimeAgo";

interface FeedbackItemProps {
  feedbackData: FeedbackContentType;
}

const FeedbackItem = ({ feedbackData }: FeedbackItemProps) => {
  const [isNew, setIsNew] = useState(false);
  const timeAgo = useTimeAgo(feedbackData?.createdAt);

  useEffect(() => {
    if (feedbackData?.createdAt) {
      const createdDate = new Date(feedbackData.createdAt);
      const now = new Date();
      const timeDiff = now.getTime() - createdDate.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      setIsNew(hoursDiff <= 24);
    }
  }, [feedbackData?.createdAt]);

  return (
    <Link href={`/customer/feedback/feedback-info/${feedbackData?.id}`}>
      <div className="w-full min-h-[66px] border-b p-3 flex gap-3 border-gray1 items-center justify-start cursor-pointer hover:bg-[#F8FDFF]">
        <div className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] bg-gray1 items-center justify-center">
          <p className="font-bold text-[14px] leading-5">{feedbackData?.id}</p>
        </div>
        <Image
          src={feedbackData?.thumbnail}
          alt="feedback img"
          width={56}
          height={42}
          className="w-[56px] h-[42px] rounded-[5px] flex gap-[10px] bg-gray1"
        />
        <div className="w-full min-h-[42px] flex gap-1 flex-col">
          <div className="w-full min-h-[20px] flex gap-[2px] items-center">
            <p className="text-[14px] leading-5 text-gray7">
              {feedbackData?.title}
            </p>
            {feedbackData?.recommendCount >= 1 && (
              <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#00ADEE]">
                {feedbackData?.recommendCount}
              </p>
            )}
            <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center">
              {isNew && (
                <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center">
                  <p className="text-[#00ADEE]">N</p>
                </div>
              )}
              {/* <p className="text-[#DC2800]">H</p> */}
            </div>
          </div>
          <div className="min-w-[109px] min-h-[18px] flex gap-1 text-[12px] leading-[18px] tracking-[-0.02em] text-gray5 align-center justify-start">
            <p className="font-bold">개선요청</p>
            <p>{timeAgo}</p>
            {feedbackData?.nickname}
            {feedbackData?.createdIp}
          </div>
        </div>
        <div className="min-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-[#F8FDFF] font-bold text-[14px] leading-5">
          {feedbackData?.status === "PENDING" ? (
            <p>접수 완료</p>
          ) : (
            <p className="text-[#00ADEE]">개선 완료</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeedbackItem;
