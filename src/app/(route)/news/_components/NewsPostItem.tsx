"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useReadNews } from "@/app/(route)/news/_utils/useReadNews";
import useTimeAgo from "@/utils/useTimeAgo";
import ChangedCategory from "@/app/(route)/news/_utils/changedCategory";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { highlightText } from "@/utils/searchHighlightText";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewsPostItemProps {
  newsItem: NewsListType;
  searchType: string;
  searchString: string;
}

const NewsPostItem = ({
  newsItem,
  searchType,
  searchString,
}: NewsPostItemProps) => {
  const updatedImgUrl = updateImageUrl(newsItem?.thumbImg, "w160");
  const { isRead, handleRead } = useReadNews(newsItem?.id);
  const [isNew, setIsNew] = useState(false);
  const date = useTimeAgo(newsItem?.postDate);
  const router = useRouter();

  console.log(newsItem);

  const categoryToPath = {
    esports: "esports",
    football: "football",
    baseball: "baseball",
  };
  const categoryPath = categoryToPath[newsItem?.category?.toLowerCase()] || "";

  useEffect(() => {
    if (date.includes("시간 전") && parseInt(date) <= 24) {
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
    text: isRead
      ? "font-medium text-[12px] text-gray5 leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap"
      : "font-medium text-[12px] text-gray7 leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap",
    info: "font-medium text-[12px] leading-[18px] letter-[-2%] text-gray5",
    category: "font-bold text-[12px] leading-[18px] letter-[-2%] text-gray5",
  };

  const getMinHeightClass = () => {
    if (
      newsItem?.newsCommentSearchDto?.imageUrl ||
      newsItem?.newsCommentSearchDto?.comment
    ) {
      return "h-[136px]";
    } else {
      return "h-[116px]";
    }
  };

  const handleToInfo = () => {
    handleRead();
    router.push(
      `/news${categoryPath ? `/${categoryPath}` : ""}/news-detail/${
        newsItem?.id
      }`
    );
  };

  return (
    <div
      onClick={handleToInfo}
      className={`min-w-[720px] ${getMinHeightClass()} flex justify-start gap-3 border-b border-gray1 p-3 bg-white cursor-pointer hover:bg-bg0`}
    >
      <div className="w-[160px] h-[92px] rounded-[3.83px] relative">
        {newsItem?.thumbImg ? (
          <Image
            src={updatedImgUrl}
            alt="Thumbnail"
            width={60}
            height={92}
            className="w-full h-full object-cover rounded-[5px] gap-[10px]"
          />
        ) : (
          <LogoWhite />
        )}
      </div>
      <div className="w-[524px] h-auto min-h-[90px] flex flex-col justify-start gap-1">
        <div className="w-[524px] h-auto min-h-[24px] flex gap-[2px] text-start items-center justify-start">
          <h1 className={styles.title}>
            {searchType === "TITLE" || searchType === "TITLE_CONTENT"
              ? highlightText(newsItem?.title, searchType, searchString)
              : newsItem?.title}
          </h1>
          {newsItem?.commentCount > 0 && (
            <p className="font-medium text-[14px] leading-5 text-gra flex">
              [{newsItem?.commentCount}]
            </p>
          )}
          {(isNew || newsItem?.hot) && (
            <div className="font-black text-[10px] leading-[18px] align-center">
              {isNew && <p className="text-gra">N</p>}
              {newsItem?.hot && <p className="text-warning">H</p>}
            </div>
          )}
        </div>

        <div>
          <p className={styles.content}>
            {searchType === "CONTENT" || searchType === "TITLE_CONTENT"
              ? highlightText(newsItem?.content, searchType, searchString)
              : newsItem?.content}
          </p>
        </div>
        <div className="flex gap-1">
          <p className={styles.category}>
            <ChangedCategory category={newsItem?.category} />
          </p>
          <p className={styles.info}>{useTimeAgo(newsItem?.postDate)}</p>
          <p className={styles.info}>네이버 스포츠</p>
        </div>
        {newsItem?.newsCommentSearchDto?.comment && (
          <Link
            href={`/news/${newsItem?.category}/news-detail/${newsItem?.id}?commentId=${newsItem?.newsCommentSearchDto?.newsCommentId}`}
          >
            <div className="w-full flex items-start justify-start gap-1">
              <div className="w-[16px] h-[16px] flex-shrink-0">
                <Arrow_reply size={16} />
              </div>
              <div
                className={`${styles.text} min-w-0 flex gap-[2px] items-center justify-start`}
              >
                {newsItem?.newsCommentSearchDto?.imageUrl && (
                  <span>(이미지)</span>
                )}
                {newsItem?.newsCommentSearchDto?.comment && (
                  <p>
                    {searchType === "COMMENT"
                      ? highlightText(
                          newsItem?.newsCommentSearchDto?.comment,
                          searchType,
                          searchString
                        )
                      : newsItem?.newsCommentSearchDto?.comment}
                  </p>
                )}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NewsPostItem;
