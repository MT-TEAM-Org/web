"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadNews } from "@/app/(route)/news/_utils/useReadNews";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import {
  NewsListDataType,
  NewsListType,
} from "@/app/(route)/news/_types/newsListItemType";
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
          "flex items-center min-w-[436px] max-h-[68px] border-gray-300 cursor-pointer gap-4",
          "mobile:max-w-[768px] mobile:min-w-0"
        )}
        onClick={handleRead}
      >
        <div className="flex-shrink-0 max-w-[68px] max-h-[68px] rounded overflow-hidden">
          {newsItem?.thumbImg ? (
            <Image
              src={updatedImgUrl}
              alt="News img"
              width={68}
              height={68}
              className="max-w-[68px] min-h-[68px] rounded-[5px] object-cover"
            />
          ) : (
            <CustomIcon
              icon="DEFAULT_THUMBNAIL_ICON"
              className="w-[68px] h-[68px] border rounded-none"
            />
          )}
        </div>
        <div
          className={cn(
            "max-w-[352px] h-[68px] flex flex-col justify-center gap-1",
            "mobile:max-w-[700px]"
          )}
        >
          <h2 className="w-full h-[24px] font-[700] text-[16px] leading-6 text-ellipsis overflow-hidden whitespace-nowrap">
            {newsItem?.title}
          </h2>
          <p className="w-full h-[40px] font-[500] text-[14px] leading-5 overflow-hidden line-clamp-2">
            {newsItem?.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
