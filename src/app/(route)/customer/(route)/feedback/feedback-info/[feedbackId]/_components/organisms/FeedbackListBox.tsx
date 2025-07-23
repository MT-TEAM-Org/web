import { cn } from "@/utils";
import React from "react";
import { FeedbackItemType } from "@/app/(route)/customer/_types/FeedbackItemType";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import useNoticeItems from "../../../../_hooks/useNoticeItems";
import { usePageChangeHandler } from "@/app/(route)/customer/_hooks/usePageChangeHandler";
import FeedbackItemLoading from "../atoms/itemState/FeedbackItemLoading";
import FeedbackItemError from "../atoms/itemState/FeedbackItemError";
import FeedbackList from "../atoms/itemState/FeedbackList";

interface FeedbackListBoxProps {
  feedbackDataList: FeedbackItemType;
  isLoading: boolean;
  isError: boolean;
  searchParams: URLSearchParams;
}

const FeedbackListBox = ({
  feedbackDataList,
  isLoading,
  isError,
  searchParams,
}: FeedbackListBoxProps) => {
  const { slicedNoticeDataList } = useNoticeItems();

  // 페이지네이션 핸들러
  const handlePageChange = usePageChangeHandler(
    feedbackDataList?.pageInfo?.totalPage
  );

  return (
    <div
      className={cn(
        "w-full h-auto rounded-[5px] shadow-soft-md bg-white",
        "tablet:max-w-full",
        "mobile:max-w-full"
      )}
    >
      <div
        className={cn(
          "w-[720px] h-auto rounded-b-[5px] mb-10",
          "tablet:w-full",
          "mobile:w-full mobile:max-w-full mobile:mb-0"
        )}
      >
        <FeedbackItemLoading isLoading={isLoading} />
        <FeedbackItemError
          isError={isError}
          feedbackDataList={feedbackDataList}
        />
        <FeedbackList
          noticeDataList={slicedNoticeDataList}
          feedbackDataList={feedbackDataList}
          searchParams={searchParams}
        />
        {feedbackDataList?.pageInfo?.totalPage > 0 && (
          <div
            className={cn(
              "hidden",
              "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
            )}
          >
            <Pagination
              pageInfo={feedbackDataList?.pageInfo}
              onPageChangeAction={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackListBox;
