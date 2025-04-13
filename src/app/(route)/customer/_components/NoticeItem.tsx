"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import useTimeAgo from "@/utils/useTimeAgo";
import { highlightText } from "@/utils/searchHighlightText";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { cn } from "@/utils";
import CustomIcon from "@/app/_components/IconComponents/Icon";

interface NoticeItemProps {
  noticeData: NoticeContentType;
  isFeedback?: boolean;
  searchString?: string;
  searchType?: string;
}

const NoticeItem = ({
  noticeData,
  isFeedback = false,
  searchString,
  searchType,
}: NoticeItemProps) => {
  const [isNew, setIsNew] = useState(false);
  const timeAgo = useTimeAgo(noticeData?.createdAt);
  const router = useRouter();

  useEffect(() => {
    if (noticeData?.createdAt) {
      const createdDate = new Date(noticeData.createdAt);
      const now = new Date();
      const timeDiff = now.getTime() - createdDate.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      setIsNew(hoursDiff <= 24);
    }
  }, [noticeData?.createdAt]);

  const getMinHeightClass = () => {
    if (
      noticeData?.commentSearchList?.imageUrl ||
      noticeData?.commentSearchList?.comment
    ) {
      return "h-[88px]";
    } else {
      return "h-[66px]";
    }
  };

  const handleNoticeClick = () => {
    if (noticeData?.commentSearchList?.commentId) {
      router.push(
        `/customer/notice/notice-info/${noticeData?.id}?commentId=${noticeData?.commentSearchList?.commentId}`
      );
    } else {
      router.push(`/customer/notice/notice-info/${noticeData?.id}`);
    }
  };

  return (
    <div
      onClick={handleNoticeClick}
      className={cn(
        `${
          isFeedback ? "bg-bg0" : "hover:bg-bg0"
        } w-full ${getMinHeightClass()} border-b p-3 flex gap-3 border-gray1 items-center justify-start cursor-pointer`,
        "mobile:p-2"
      )}
    >
      <div className="w-[32px] h-[32px] rounded-[2px] bg-gray1 flex items-center justify-center text-center text-gray7 flex-shrink-0">
        <p className="w-[25px] font-bold text-[14px] leading-5 whitespace-nowrap">
          {!isFeedback ? noticeData?.id : "공지"}
        </p>
      </div>
      <div className="relative w-[56px] h-[42px]  rounded-[5px] overflow-hidden bg-gray1 flex-shrink-0">
        {noticeData?.thumbnail ? (
          <Image
            src={noticeData.thumbnail}
            alt="post-preview-image"
            fill
            className="object-contain rounded-[5px]"
          />
        ) : (
          <CustomIcon
            icon="DEFAULT_THUMBNAIL_ICON"
            className="w-[56px] h-[42px]"
          />
        )}
      </div>
      <div className="w-full min-h-[42px] flex gap-1 flex-col">
        <div className="w-full min-h-[20px] flex items-center gap-[2px]">
          <p className="text-[14px] leading-5 text-gray7 text-ellipsis overflow-hidden line-clamp-1">
            {searchType === "TITLE" || searchType === "TITLE_CONTENT"
              ? highlightText(noticeData?.title, searchType, searchString)
              : noticeData?.title}
          </p>
          {noticeData?.commentCount >= 1 && (
            <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-gra flex-shrink-0">
              [<span>{noticeData?.commentCount}</span>]
            </p>
          )}
          {(isNew || noticeData?.isHot) && (
            <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center flex-shrink-0">
              {isNew && <p className="text-gra">N</p>}
              {noticeData?.isHot && <p className="text-warning">H</p>}
            </div>
          )}
        </div>
        <div className="min-w-[109px] min-h-[18px] flex gap-1 text-[12px] leading-[18px] tracking-[-0.02em] text-gray5 align-center justify-start">
          <p className="font-bold">공지사항</p>
          <p>{timeAgo}</p>
          <p>{noticeData?.nickname}</p>
        </div>

        {noticeData?.commentSearchList?.comment && (
          <div className="w-full flex items-center justify-start gap-1 text-ellipsis overflow-hidden whitespace-nowrap">
            <div className="w-4 h-4 flex-shrink-0">
              <Arrow_reply size={12} />
            </div>
            <div className="w-full flex gap-[2px] font-medium text-[12px] text-gray7 leading-[18px] tracking-[-0.02em] truncate">
              {noticeData?.commentSearchList?.imageUrl && <span>(이미지)</span>}
              <p>
                {searchType === "COMMENT"
                  ? highlightText(
                      noticeData?.commentSearchList?.comment,
                      searchType,
                      searchString
                    )
                  : noticeData?.commentSearchList?.comment}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeItem;
