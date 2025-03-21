"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import useTimeAgo from "@/utils/useTimeAgo";

interface NoticeItemProps {
  noticeData: NoticeContentType;
  isFeedback?: boolean;
}

const NoticeItem = ({ noticeData, isFeedback = false }: NoticeItemProps) => {
  const [isNew, setIsNew] = useState(false);
  const timeAgo = useTimeAgo(noticeData?.createdAt);

  useEffect(() => {
    if (noticeData?.createdAt) {
      const createdDate = new Date(noticeData.createdAt);
      const now = new Date();
      const timeDiff = now.getTime() - createdDate.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      setIsNew(hoursDiff <= 24);
    }
  }, [noticeData?.createdAt]);

  return (
    <Link href={`/customer/notice/notice-info/${noticeData?.id}`}>
      <div
        className={`${
          isFeedback ? "bg-bg0" : "hover:bg-bg0"
        } w-full min-h-[66px] border-b p-3 flex gap-3 border-gray1 items-center justify-start cursor-pointer`}
      >
        <div className="w-[32px] h-[32px] rounded-[2px] p-1 bg-gray1 items-center justify-center text-center text-gray7">
          <p className="w-[25px] font-bold text-[14px] leading-5">
            {!isFeedback ? noticeData?.id : "공지"}
          </p>
        </div>
        <div className="w-[56px] h-[42px] rounded-[5px] bg-gray1">
          <Image
            src={noticeData?.thumbnail || "/Preview_loading_image.png"}
            alt="img"
            width={56}
            height={42}
            className="object-cover"
          />
        </div>
        <div className="min-w-[584px] min-h-[42px] flex gap-1 flex-col">
          <div className="w-auto min-h-[20px] flex items-center gap-[2px]">
            <p className="text-[14px] leading-5 text-gray7">
              {noticeData?.title}
            </p>
            {noticeData?.commentCount >= 1 && (
              <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-gra">
                {noticeData?.commentCount}
              </p>
            )}
            {isNew && (
              <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center">
                <p className="text-gra">N</p>
              </div>
            )}
          </div>
          <div className="min-w-[109px] min-h-[18px] flex gap-1 text-[12px] leading-[18px] tracking-[-0.02em] text-gray5 align-center justify-start">
            <p className="font-bold">공지사항</p>
            <p>{timeAgo}</p>
            <p>{noticeData?.nickname}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoticeItem;
