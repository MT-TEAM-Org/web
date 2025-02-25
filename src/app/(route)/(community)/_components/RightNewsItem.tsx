import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NewsItemType } from "@/app/_constants/newsItemType";
import Link from "next/link";

interface NewsItemProps {
  newsItem: NewsItemType;
}

const RightNewsItem = ({ newsItem }: NewsItemProps) => {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (!newsItem?.id) return;

    try {
      const readNews = JSON.parse(localStorage.getItem("readNews") || "[]");
      if (readNews.includes(newsItem.id)) {
        setIsRead(true);
      }
    } catch (error) {
      console.error("로컬스토리지 저장 실패:", error);
    }
  }, [newsItem?.id]);

  const handleRead = () => {
    if (!newsItem?.id) return;

    try {
      const readNews = JSON.parse(localStorage.getItem("readNews") || "[]");
      if (!readNews.includes(newsItem.id)) {
        readNews.push(newsItem.id);
        localStorage.setItem("readNews", JSON.stringify(readNews));
        setIsRead(true);
      }
    } catch (error) {
      console.error("로컬스토리지 저장 실패:", error);
    }
  };

  return (
    <Link href={`/news/news-detail/${newsItem?.id}`}>
      <div
        onClick={handleRead}
        className="min-w-[288px] min-h-[92px] flex justify-start items-center border-b border-[#EEEEEE] p-3 cursor-pointer gap-3"
      >
        <Image
          src={
            newsItem?.thumbImg
              ? newsItem?.thumbImg
              : "/Preview_loading_image.png"
          }
          alt="news img"
          width={68}
          height={68}
          className="w-[68px] h-[68px] rounded-[4.25px]"
        />
        <div className="min-w-[184px] h-auto min-h-[68px] flex flex-col justify-center items-start gap-1">
          <div
            className={
              isRead
                ? "w-[184px] h-[24px] font-[700] text-[16px] text-[#A6A6A6] leading-6 tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap"
                : "w-[184px] h-[24px] font-[700] text-[16px] text-[#181818] leading-6 tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap"
            }
          >
            {newsItem.title}
          </div>
          <div
            className={
              isRead
                ? "w-[184px] h-[40px] text-[14px] text-[#A6A6A6] leading-5 tracking-[0%] opacity-90 line-clamp-2 overflow-hidden"
                : "w-[184px] h-[40px] text-[14px] text-[#181818] leading-5 tracking-[0%] opacity-90 line-clamp-2 overflow-hidden"
            }
          >
            {/* {NewsItemType.} */}
            컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RightNewsItem;
