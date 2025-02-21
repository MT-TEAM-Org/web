"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
}

interface NewsPostItemProps {
  newsItem: NewsItem;
}

const NewsItem = ({ newsItem }: NewsPostItemProps) => {
  const router = useRouter();
  const updatedImgUrl = newsItem?.thumbImg?.replace("type=w140", "type=w68");

  const handleToNewsInfo = () => {
    router.push(`/news/news-detail/${newsItem?.id}`);
  };

  return (
    <div
      className="flex items-center min-w-[436px] max-h-[68px] p-2 border-gray-300 cursor-pointer"
      onClick={handleToNewsInfo}
    >
      <div className="flex-shrink-0 max-w-[68px] max-h-[68px] rounded overflow-hidden bg-gray-300">
        <Image
          src={newsItem?.thumbImg ? updatedImgUrl : "/Empty_news.png"}
          alt="News img"
          width={68}
          height={68}
          className="max-w-[68px] min-h-[68px] rounded-[4.25px]"
        />
      </div>
      <div className="w-[368px] h-[68px] flex flex-col justify-center px-4 gap-1">
        <h2 className="w-full h-[24px] font-[700] text-[16px] leading-6 text-ellipsis overflow-hidden whitespace-nowrap">
          {newsItem.title}
        </h2>
        <p className="w-full h-[40px] font-[500] text-[14px] leading-5 overflow-hidden line-clamp-2">
          컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
          컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
