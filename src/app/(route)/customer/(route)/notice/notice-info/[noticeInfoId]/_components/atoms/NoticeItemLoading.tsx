import React from "react";
import NoticeItemSkeleton from "../../../../_components/status/NoticeItemSkeleton";

interface NoticeItemLoadingProps {
  isLoading: boolean;
}

const NoticeItemLoading = ({ isLoading }: NoticeItemLoadingProps) => {
  return (
    isLoading && (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <NoticeItemSkeleton key={index} />
        ))}
      </>
    )
  );
};

export default NoticeItemLoading;
