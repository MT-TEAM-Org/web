import React from "react";
import Image from "next/image";

type NewsItemType = {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
};

type NewsItemProps = {
  newsItem: NewsItemType;
};

const NewsItem = ({ newsItem }: NewsItemProps) => {
  return (
    <div className="min-w-[288px] min-h-[92px] flex justify-start items-center border-b border-[#EEEEEE] p-3 cursor-pointer gap-3">
      <Image
        src={newsItem?.thumbImg ? newsItem?.thumbImg : "/NewsItem_fake2.png"}
        alt="news img"
        width={68}
        height={68}
        className="w-[68px] h-[68px] rounded-[4.25px]"
      />
      <div className="min-w-[184px] h-auto min-h-[68px] flex flex-col justify-center items-start gap-1">
        <div className="w-[184px] h-[24px] font-[700] text-[16px] text-[#181818] leading-6 tracking-[-0.02em] color-[#181818]">
          {newsItem.title}
        </div>
        <div className="w-[184px] h-[40px] text-[14px] text-[#424242] leading-5 tracking-[0%] opacity-90">
          제42대 대한체육회 회장 선거에 출마한 유승민(42) 전 IOC...
          {/* 목 데이터 */}
          {/* {NewsItemType.} */}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
