"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import useTimeAgo from "@/utils/useTimeAgo";
import FeedbackItemStatus from "./FeedbackItemStatus";
import { highlightText } from "@/utils/searchHighlightText";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import CustomIcon from "@/app/_components/IconComponents/Icon";

interface FeedbackItemProps {
  feedbackData: FeedbackContentType;
  searchType: string;
  searchString: string;
}

const FeedbackItem = ({
  feedbackData,
  searchType,
  searchString,
}: FeedbackItemProps) => {
  const [isNew, setIsNew] = useState(false);
  const timeAgo = useTimeAgo(feedbackData?.createdAt);
  const router = useRouter();

  useEffect(() => {
    if (feedbackData?.createdAt) {
      const createdDate = new Date(feedbackData.createdAt);
      const now = new Date();
      const timeDiff = now.getTime() - createdDate.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      setIsNew(hoursDiff <= 24);
    }
  }, [feedbackData?.createdAt]);

  const getMinHeightClass = () => {
    if (
      feedbackData?.improvementCommentSearchList?.imageUrl ||
      feedbackData?.improvementCommentSearchList?.comment
    ) {
      return "h-[88px]";
    } else {
      return "h-[66px]";
    }
  };

  const handleFeedbackClick = () => {
    if (feedbackData?.improvementCommentSearchList?.commentId) {
      router.push(
        `/customer/feedback/feedback-info/${feedbackData?.id}?commentId=${feedbackData?.improvementCommentSearchList?.commentId}`
      );
    } else {
      router.push(`/customer/feedback/feedback-info/${feedbackData?.id}`);
    }
  };

  const hasStatus =
    feedbackData?.status === "RECEIVED" || feedbackData?.status === "COMPLETED";
  const titleWidthClass = hasStatus ? "w-[503px]" : "w-[584px]";

  return (
    <div
      onClick={handleFeedbackClick}
      className={cn(
        `w-full ${getMinHeightClass()} border-b p-3 flex border-gray1 items-center justify-between cursor-pointer hover:bg-bg0`,
        "mobile:p-2"
      )}
    >
      <div className="flex items-center gap-3 w-full overflow-hidden">
        <div className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] bg-gray1 items-center justify-center flex-shrink-0">
          <p className="font-bold text-[14px] leading-5">{feedbackData?.id}</p>
        </div>
        <div className="relative w-[56px] h-[42px] rounded-[5px] bg-gray1 overflow-hidden flex-shrink-0">
          {feedbackData?.thumbnail ? (
            <Image
              src={feedbackData.thumbnail}
              alt="post-preview-image"
              fill
              className="object-cover rounded-[5px]"
            />
          ) : (
            <CustomIcon
              icon="DEFAULT_THUMBNAIL_ICON"
              className="w-[56px] h-[42px]"
            />
          )}
        </div>

        <div
          className={cn(
            "w-full min-h-[42px] flex gap-1 flex-col overflow-hidden",
            "tablet:max-w-[552px]",
            "mobile:max-w-[720px] mobile:gap-0"
          )}
        >
          <div className="w-full min-h-[20px] flex items-center gap-[4px]">
            <div
              className={cn(
                "flex items-center gap-[4px] overflow-hidden",
                titleWidthClass
              )}
            >
              <p className="text-[14px] leading-5 text-gray7 text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
                {searchType === "TITLE" || searchType === "TITLE_CONTENT"
                  ? highlightText(feedbackData?.title, searchType, searchString)
                  : feedbackData?.title}
              </p>
              {feedbackData?.commentCount >= 1 && (
                <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-gra flex-shrink-0">
                  [<span>{feedbackData?.commentCount}</span>]
                </p>
              )}
              <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center flex-shrink-0">
                {isNew && <p className="text-gra">N</p>}
                {feedbackData?.isHot && <p className="text-warning">H</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="min-w-[109px] min-h-[18px] flex gap-1 text-[12px] leading-[18px] tracking-[-0.02em] text-gray5 align-center justify-start">
              <p className="font-bold">개선요청</p>
              <p>{timeAgo}</p>
              <p>{feedbackData?.nickname}</p>
              <p>{feedbackData?.createdIp}</p>
            </div>

            {feedbackData?.improvementCommentSearchList?.comment && (
              <div className="w-full flex items-center justify-start gap-1 text-ellipsis overflow-hidden whitespace-nowrap">
                <div className="w-4 h-4 flex-shrink-0">
                  <Arrow_reply size={16} />
                </div>
                <div className="w-full flex gap-[2px] font-medium text-[12px] text-gray7 leading-[18px] tracking-[-0.02em] truncate">
                  {feedbackData?.improvementCommentSearchList?.imageUrl && (
                    <span>(이미지)</span>
                  )}
                  <p>
                    {searchType === "COMMENT"
                      ? highlightText(
                          feedbackData?.improvementCommentSearchList?.comment,
                          searchType,
                          searchString
                        )
                      : feedbackData?.improvementCommentSearchList?.comment}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasStatus && (
        <div className="mobile:hidden ml-2">
          <FeedbackItemStatus status={feedbackData?.status} />
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;
