"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadNews } from "@/app/(route)/news/_utils/useReadNews";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import CustomIcon from "@/app/_components/IconComponents";
import { cn } from "@/utils";

interface NewsPostItemProps {
  newsItem: NewsListType;
}

const NewsItem = ({ newsItem }: NewsPostItemProps) => {
  const updatedImgUrl = updateImageUrl(newsItem?.thumbImg, "w68");
  const { handleRead } = useReadNews(newsItem?.id, false);
  const categoryPath = newsItem?.category?.toLowerCase() || "";

  return (
    <Link
      href={`/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        newsItem?.id
      }`}
    >
      <div
        className={cn(
          "flex items-center w-full max-w-[436px] h-[68px] border-gray-300 cursor-pointer gap-4 overflow-hidden",
          "mobile:w-full mobile:max-w-[calc(100vw-32px)]"
        )}
        onClick={handleRead}
      >
        <div className="flex-shrink-0 w-[68px] h-[68px] rounded">
          {newsItem?.thumbImg ? (
            <Image
              src={updatedImgUrl}
              alt="News img"
              width={68}
              height={68}
              className="w-full h-full rounded-[5px] object-cover"
            />
          ) : (
            <CustomIcon
              icon="DEFAULT_THUMBNAIL_ICON"
              className="w-full h-full border rounded-none"
            />
          )}
        </div>
        <div
          className={cn(
            "flex-1 h-[68px] flex flex-col justify-center gap-1 overflow-hidden",
            "mobile:min-w-0"
          )}
        >
          <h2
            className={cn(
              "w-full h-[24px] font-[700] text-[16px] leading-6 text-ellipsis overflow-hidden whitespace-nowrap",
              "mobile:w-full"
            )}
          >
            {newsItem?.title}
          </h2>
          <p
            className={cn(
              "w-full h-[40px] font-[500] text-[14px] leading-5 overflow-hidden line-clamp-2",
              "mobile:w-full"
            )}
          >
            {newsItem?.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
