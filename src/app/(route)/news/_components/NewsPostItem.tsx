"use client";

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
import { useRouter } from "next/navigation";
import { cn } from "@/utils";

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
      ? "font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray5 text-ellipsis overflow-hidden whitespace-nowrap mobile:text-[14px] leading-5"
      : "font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray9 text-ellipsis overflow-hidden whitespace-nowrap mobile:text-[14px] leading-5",
    content: isRead
      ? "w-[524px] h-[40px] font-medium text-[14px] leading-5 text-gray5 overflow-hidden line-clamp-2 mobile:text-[12px] mobile:leading-[18px] tracking-[-0.02em]"
      : "w-[524px] h-[40px] font-medium text-[14px] leading-5 text-gray7 overflow-hidden line-clamp-2 mobile:text-[12px] mobile:leading-[18px] tracking-[-0.02em]",
    text: isRead
      ? "font-medium text-[12px] text-gray5 leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap"
      : "font-medium text-[12px] text-gray7 leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap",
    info: "font-medium text-[12px] leading-[18px] letter-[-0.02em] text-gray5",
    category:
      "font-bold text-[12px] leading-[18px] letter-[-0.02em] text-gray5",
  };

  const getMinHeightClass = () => {
    if (
      newsItem?.newsCommentSearchDto?.imageUrl ||
      newsItem?.newsCommentSearchDto?.comment ||
      newsItem?.commentSearchList?.imageUrl ||
      newsItem?.commentSearchList?.commentId
    ) {
      return "h-[136px] mobile:h-[136px]";
    } else {
      return "h-[116px] mobile:h-[116px]";
    }
  };

  const handleToInfo = () => {
    handleRead();

    const commentId =
      newsItem?.newsCommentSearchDto?.newsCommentId ||
      newsItem?.commentSearchList?.commentId;

    const basePath = `/news${
      categoryPath ? `/${categoryPath}` : ""
    }/news-detail/${newsItem?.id}`;

    if (commentId) {
      router.push(`${basePath}?commentId=${commentId}`);
    } else {
      router.push(basePath);
    }
  };

  const newsComment =
    newsItem?.newsCommentSearchDto?.comment ||
    newsItem?.commentSearchList?.comment;
  const newsCommentImage =
    newsItem?.newsCommentSearchDto?.imageUrl ||
    newsItem?.commentSearchList?.imageUrl;

  return (
    <div
      onClick={handleToInfo}
      className={cn(
        `min-w-[720px] ${getMinHeightClass()} flex justify-start items-center gap-3 border-b border-gray1 p-3 bg-white cursor-pointer hover:bg-bg0`,
        "tablet:w-[688px] tablet:min-w-0",
        "mobile:min-w-0 mobile:w-[360px]"
      )}
    >
      <div
        className={cn(
          "w-[160px] h-[92px] rounded-[3.83px] relative",
          "mobile:w-[80px] mobile:h-[80px]"
        )}
      >
        {newsItem?.thumbImg ? (
          <Image
            src={updatedImgUrl}
            alt="Thumbnail"
            width={160}
            height={92}
            className="w-full h-full object-cover rounded-[5px] gap-[10px]"
          />
        ) : (
          <LogoWhite />
        )}
      </div>
      <div
        className={cn(
          "w-[524px] h-auto min-h-[90px] flex flex-col justify-start gap-1",
          "tablet:w-[492px]",
          "mobile:w-[236px] mobile:max-w-full"
        )}
      >
        <div
          className={cn(
            "w-[524px] h-auto min-h-[24px] flex gap-[2px] text-start items-center justify-start",
            "w-[492px]",
            "mobile:w-full"
          )}
        >
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
          <p className={cn(styles.content, "tablet:w-full", "mobile:w-full")}>
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
        {newsComment && (
          <div className="w-full flex items-center justify-start gap-1">
            <div className="w-[16px] h-[16px] flex-shrink-0">
              <Arrow_reply size={12} />
            </div>
            <div
              className={`${styles.text} min-w-0 flex gap-[2px] items-center justify-start`}
            >
              {newsCommentImage && <span>(이미지)</span>}
              <p>
                {searchType === "COMMENT"
                  ? highlightText(newsComment, searchType, searchString)
                  : newsComment}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPostItem;
