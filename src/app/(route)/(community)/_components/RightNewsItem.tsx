"use client";

import React from "react";
import Image from "next/image";
import { NewsItemType } from "@/app/_constants/newsItemType";
import { useRouter } from "next/navigation";

interface NewsItemProps {
  newsItem: NewsItemType;
}

const RightNewsItem = ({ newsItem }: NewsItemProps) => {
  const router = useRouter();

  const handleToInfo = () => {
    router.push(`/news/news-detail/${newsItem?.id}`);
  };

  return (
    <div
      onClick={handleToInfo}
      className="min-w-[288px] min-h-[92px] flex justify-start items-center border-b border-[#EEEEEE] p-3 cursor-pointer gap-3"
    >
      <Image
        src={
          newsItem?.thumbImg ? newsItem?.thumbImg : "/Preview_loading_image.png"
        }
        alt="news img"
        width={68}
        height={68}
        className="w-[68px] h-[68px] rounded-[4.25px]"
      />
      <div className="min-w-[184px] h-auto min-h-[68px] flex flex-col justify-center items-start gap-1">
        <div className="w-[184px] h-[24px] font-[700] text-[16px] text-[#181818] leading-6 tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap">
          {newsItem.title}
        </div>
        <div className="w-[184px] h-[40px] text-[14px] text-[#424242] leading-5 tracking-[0%] opacity-90 line-clamp-2 overflow-hidden">
          {/* {NewsItemType.} */}
          컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
        </div>
      </div>
    </div>
  );
};

export default RightNewsItem;
