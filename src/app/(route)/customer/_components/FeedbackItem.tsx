"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import useTimeAgo from "@/utils/useTimeAgo";
import FeedbackItemStatus from "./FeedbackItemStatus";
import { highlightText } from "@/utils/searchHighlightText";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";

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

  return (
    <Link href={`/customer/feedback/feedback-info/${feedbackData?.id}`}>
      <div
        className={`w-full ${getMinHeightClass()} border-b p-3 flex gap-3 border-gray1 items-start justify-between cursor-pointer hover:bg-[#F8FDFF]`}
      >
        <div className="w-[32px] h-[32px] rounded-[2px] p-1 flex gap-[10px] bg-gray1 items-center justify-center">
          <p className="font-bold text-[14px] leading-5">{feedbackData?.id}</p>
        </div>
        <div className="w-[56px] h-[42px] rounded-[5px] bg-gray1 overflow-hidden">
          <Image
            src={feedbackData?.thumbnail || "/Preview_loading_image.png"}
            alt="img"
            width={56}
            height={42}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-[503px] min-h-[42px] flex gap-1 flex-col">
          <div className="w-full min-h-[20px] flex gap-[2px] items-center">
            <p className="text-[14px] leading-5 text-gray7">
              {searchType === "TITLE" || searchType === "TITLE_CONTENT"
                ? highlightText(feedbackData?.title, searchType, searchString)
                : feedbackData?.title}
            </p>
            {feedbackData?.commentCount >= 1 && (
              <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-gra">
                [<span>{feedbackData?.commentCount}</span>]
              </p>
            )}
            <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center">
              {(isNew || feedbackData?.isHot) && (
                <div className="min-w-[22px] min-h-[18px] flex gap-[2px] font-black text-[10px] leading-[18px] tracking-[-0.02em] text-center">
                  {isNew && <p className="text-gra">N</p>}
                  {feedbackData?.isHot && <p className="text-warning">H</p>}
                </div>
              )}
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
              <div className="w-[584px] flex items-center justify-start gap-1 text-ellipsis overflow-hidden whitespace-nowrap">
                <div className="w-4 h-4 flex-shrink-0">
                  <Arrow_reply size={16} />
                </div>
                <div className="w-full flex gap-[2px] font-medium text-[12px] text-gray7 leading-[18px] tracking-[-0.02em]">
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
        <FeedbackItemStatus status={feedbackData?.status} />
      </div>
    </Link>
  );
};

export default FeedbackItem;
