import { FeedbackItemType } from "@/app/(route)/customer/_types/FeedbackItemType";
import React from "react";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";

interface FeedbackItemErrorProps {
  isError: boolean;
  feedbackDataList: FeedbackItemType;
}

const FeedbackItemError = ({
  isError,
  feedbackDataList,
}: FeedbackItemErrorProps) => {
  return (
    (feedbackDataList?.content?.length === 0 || isError) && (
      <>
        <EmptyItem title="개선요청이" />
      </>
    )
  );
};

export default FeedbackItemError;
