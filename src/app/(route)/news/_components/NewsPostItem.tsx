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
    title: cn(
      "font-bold leading-6 tracking-[-0.02em] text-ellipsis overflow-hidden line-clamp-1",
      isRead ? "text-gray5" : "text-gray9",
      "text-[16px] mobile:text-[14px] mobile:leading-5"
    ),
    content: cn(
      "font-medium leading-5 tracking-[-0.02em] overflow-hidden line-clamp-2",
      isRead ? "text-gray5" : "text-gray7",
      "text-[14px] mobile:text-[12px] mobile:leading-[18px]"
    ),
    text: cn(
      "font-medium text-[12px] leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap",
      isRead ? "text-gray5" : "text-gray7"
    ),
    info: "font-medium text-[12px] leading-[18px] tracking-[-0.02em] text-gray5",
    category:
      "font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-gray5",
  };

  const newsComment =
    newsItem?.newsCommentSearchDto?.comment ||
    newsItem?.commentSearchList?.comment;
  const newsCommentImage =
    newsItem?.newsCommentSearchDto?.imageUrl ||
    newsItem?.commentSearchList?.imageUrl;

  const getMinHeightClass = () => {
    return newsComment || newsCommentImage
      ? "h-[136px] mobile:h-[136px]"
      : "h-[116px] mobile:h-[116px]";
  };

  const handleToInfo = () => {
    handleRead();
    const commentId =
      newsItem?.newsCommentSearchDto?.newsCommentId ||
      newsItem?.commentSearchList?.commentId;

    const basePath = `/news${
      categoryPath ? `/${categoryPath}` : ""
    }/news-detail/${newsItem?.id}`;

    router.push(commentId ? `${basePath}?commentId=${commentId}` : basePath);
  };

  return (
    <div
      onClick={handleToInfo}
      className={cn(
        `w-full ${getMinHeightClass()} flex items-center gap-3 border-b border-gray1 p-3 bg-white cursor-pointer hover:bg-bg0`,
        "mobile:p-2"
      )}
    >
      <div
        className={cn(
          "w-[160px] h-[92px] relative flex-shrink-0",
          "mobile:w-[80px] mobile:h-[80px]"
        )}
      >
        {newsItem?.thumbImg ? (
          <Image
            src={updatedImgUrl}
            alt="Thumbnail"
            width={160}
            height={92}
            className="w-full h-full object-cover rounded-[5px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg0 rounded-[5px]">
            <LogoWhite />
          </div>
        )}
      </div>

      <div className={cn("flex flex-col gap-1 w-full min-h-[90px]")}>
        <div className="flex items-center gap-[2px] w-full min-h-[24px]">
          <h1 className={styles.title}>
            {searchType === "TITLE" || searchType === "TITLE_CONTENT"
              ? highlightText(newsItem?.title, searchType, searchString)
              : newsItem?.title}
          </h1>
          {newsItem?.commentCount > 0 && (
            <p className="font-medium text-[14px] leading-5 text-gra">
              [{newsItem?.commentCount}]
            </p>
          )}
          {(isNew || newsItem?.hot) && (
            <div className="flex gap-[2px] font-black text-[10px] leading-[18px] ml-1">
              {isNew && <span className="text-gra">N</span>}
              {newsItem?.hot && <span className="text-warning">H</span>}
            </div>
          )}
        </div>

        <p className={styles.content}>
          {searchType === "CONTENT" || searchType === "TITLE_CONTENT"
            ? highlightText(newsItem?.content, searchType, searchString)
            : newsItem?.content}
        </p>

        <div className="flex gap-1">
          <p className={styles.category}>
            <ChangedCategory category={newsItem?.category} />
          </p>
          <p className={styles.info}>{date}</p>
          <p className={styles.info}>네이버 스포츠</p>
        </div>

        {newsComment && (
          <div className="w-full flex items-center gap-1">
            <div className="w-4 h-4 flex-shrink-0">
              <Arrow_reply size={12} />
            </div>
            <div className={cn(styles.text, "flex gap-[2px] items-center")}>
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
