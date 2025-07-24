import React from "react";
import FeedbackItemSkeleton from "../../../../../_components/status/FeedbackItemSkeleton";

interface FeedbackItemLoadingProps {
  isLoading: boolean;
}

const FeedbackItemLoading = ({ isLoading }: FeedbackItemLoadingProps) => {
  return (
    isLoading && (
      <>
        {Array.from({ length: 2 }).map((_, index) => (
          <FeedbackItemSkeleton key={index} />
        ))}
        {Array.from({ length: 10 }).map((_, index) => (
          <FeedbackItemSkeleton key={index} />
        ))}
      </>
    )
  );
};

export default FeedbackItemLoading;
