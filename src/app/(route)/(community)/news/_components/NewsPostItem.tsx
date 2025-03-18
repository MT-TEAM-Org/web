"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useReadNews } from "@/_hooks/useNews/useReadNews";
import useTimeAgo from "@/utils/useTimeAgo";
import ChangedCategory from "@/utils/newsUtils/changedCategory";
import { updateImageUrl } from "@/utils/newsUtils/updatedImgUrl";
import { NewsListType } from "@/app/_constants/newsListItemType";

interface NewsPostItemProps {
  newsItem: NewsListType;
}

const NewsPostItem = ({ newsItem }: NewsPostItemProps) => {
  const updatedImgUrl = updateImageUrl(newsItem?.thumbImg, "w160");
  const { isRead, handleRead } = useReadNews(newsItem?.id);
  const [isNew, setIsNew] = useState(false);
  const date = useTimeAgo(newsItem?.postDate);

  const categoryToPath = {
    esports: "esports",
    football: "football",
    baseball: "baseball",
  };
  const categoryPath = categoryToPath[newsItem?.category?.toLowerCase()] || "";

  useEffect(() => {
    if (date.includes("일 전") && parseInt(date) < 1) {
      setIsNew(true);
    } else {
      setIsNew(false);
    }
  }, [date]);

  const styles = {
    title: isRead
      ? "font-bold text-[16px] leading-6 tracking-[-2%] text-gray5 text-ellipsis overflow-hidden whitespace-nowrap"
      : "font-bold text-[16px] leading-6 tracking-[-2%] text-gray9 text-ellipsis overflow-hidden whitespace-nowrap",
    content: isRead
      ? "w-[524px] h-[40px] font-medium text-[14px] leading-5 text-gray5 overflow-hidden line-clamp-2"
      : "w-[524px] h-[40px] font-medium text-[14px] leading-5 text-gray7 overflow-hidden line-clamp-2",
    info: "font-medium text-[12px] leading-[18px] letter-[-2%] text-gray5",
    category: "font-bold text-[12px] leading-[18px] letter-[-2%] text-gray5",
  };

  return (
    <Link
      href={`/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        newsItem?.id
      }`}
    >
      <div
        onClick={handleRead}
        className="min-w-[720px] min-h-[116px] flex justify-start gap-3 border-b border-gray1 p-3 bg-white cursor-pointer hover:bg-[#F8FDFF]"
      >
        <div className="w-[160px] h-[92px] rounded-[3.83px] relative">
          <Image
            src={updatedImgUrl || "/Empty_news.png"}
            alt="thumbImg"
            width={newsItem?.thumbImg ? 160 : 94.39}
            height={newsItem?.thumbImg ? 92 : 26}
            className={
              newsItem?.thumbImg
                ? "w-full h-full object-cover rounded-[5px] gap-[10px]"
                : "absolute top-[33.5px] left-[33.05px] gap-[3.24px] rounded-[3.83px]"
            }
          />
        </div>
        <div className="w-[524px] h-auto min-h-[90px] flex flex-col gap-1">
          <div className="w-[524px] h-auto min-h-[24px] flex gap-[2px] text-start items-center justify-start">
            <h1 className={styles.title}>{newsItem?.title}</h1>
            {newsItem?.commentCount ? (
              <p className="font-medium text-[14px] leading-5 text-[#00ADEE]">
                [<span>{newsItem?.commentCount}</span>]
              </p>
            ) : null}
            {isNew && (
              <p className="font-black text-[10px] leading-[18px] align-center text-[#00ADEE]">
                N
              </p>
            )}
          </div>
          <div>
            <p className={styles.content}>{newsItem?.content}</p>
          </div>
          <div className="flex gap-1">
            <p className={styles.category}>
              <ChangedCategory category={newsItem?.category} />
            </p>
            <p className={styles.info}>{useTimeAgo(newsItem?.postDate)}</p>
            <p className={styles.info}>네이버 스포츠</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsPostItem;
