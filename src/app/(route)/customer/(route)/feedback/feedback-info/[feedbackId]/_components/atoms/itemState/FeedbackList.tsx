import NoticeItem from "@/app/(route)/customer/(route)/notice/_components/items/NoticeItem";
import React from "react";
import FeedbackItem from "../../../../../_components/items/FeedbackItem";
import { FeedbackItemType } from "@/app/(route)/customer/_types/FeedbackItemType";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";

interface FeedbackListProps {
  noticeDataList: NoticeContentType[];
  feedbackDataList: FeedbackItemType;
  searchParams: URLSearchParams;
}

const FeedbackList = ({
  noticeDataList,
  feedbackDataList,
  searchParams,
}: FeedbackListProps) => {
  return (
    <>
      {/* 공지사항 렌더링 */}
      {noticeDataList?.map((noticeData) => (
        <NoticeItem
          isFeedback={true}
          noticeData={noticeData}
          key={`notice-${noticeData.id}`}
        />
      ))}
      {/* 피드백 아이템 렌더링 */}
      {feedbackDataList?.content?.map((feedbackItem) => (
        <FeedbackItem
          feedbackData={feedbackItem}
          key={feedbackItem.id}
          searchString={searchParams.get("search") || ""}
          searchType={searchParams.get("search_type") || ""}
        />
      ))}
    </>
  );
};

export default FeedbackList;
