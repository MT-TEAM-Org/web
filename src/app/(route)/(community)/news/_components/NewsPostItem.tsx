"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NewsItemType } from "@/app/_constants/newsItemType";

interface NewsPostItemProps {
  newsItem?: NewsItemType;
}

const NewsPostItem = ({ newsItem }: NewsPostItemProps) => {
  const router = useRouter();

  const handleToPage = () => {
    router.push(`/news/news-detail/${newsItem?.id}`);
  };

  return (
    <div
      className="min-w-[720px] min-h-[116px] flex justify-start gap-3 border-b border-[#FAFAFA] p-3 bg-[#FFFFFF] cursor-pointer"
      onClick={handleToPage}
    >
      <div className="w-[160px] h-[92px] rounded-[3.83px] relative">
        <Image
          src={newsItem?.thumbImg ? newsItem.thumbImg : "/Empty_news.png"}
          alt="thumbImg"
          width={newsItem?.thumbImg ? 160 : 94.39}
          height={newsItem?.thumbImg ? 92 : 26}
          className={`
            ${
              newsItem?.thumbImg
                ? "w-full h-full object-cover rounded-[5px] gap-[10px]"
                : "absolute top-[33.5px] left-[33.05px] gap-[3.24px] rounded-[3.83px]"
            }
          `}
        />
      </div>

      <div className="w-[524px] h-auto min-h-[90px] flex flex-col gap-1">
        <div className="w-[524px] h-auto min-h-[24px] flex gap-[2px] text-center items-center justify-start">
          <h1 className="font-bold text-[16px] leading-6 tracking-[-2%] text-[#181818]">
            {newsItem?.title}
          </h1>
          <p className="font-medium text-[14px] leading-5 text-[#00ADEE]">
            [24]
          </p>
          <p className="font-black text-[10px] leading-[18px] align-center text-[#00ADEE]">
            N
          </p>
        </div>

        <div>
          <p className="w-[524px] h-[40px] font-medium text-[14px] leading-5 text-[#424242]">
            {/* {newsItem.comment} */}
          </p>
        </div>

        <div className="flex gap-1">
          <p className="font-bold text-[12px] leading-[18px] letter-[-2%] text-[#A6A6A6]">
            {newsItem?.category}
          </p>
          <p className="font-medium text-[12px] leading-[18px] letter-[-2%] text-[#A6A6A6]">
            {newsItem?.postDate}
          </p>
          <p className="font-medium text-[12px] leading-[18px] letter-[-2%] text-[#A6A6A6]">
            네이버 스포츠 {/* 목 데이터 */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsPostItem;
