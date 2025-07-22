import { cn } from "@/utils";
import React from "react";
import FeedbackItemSkeleton from "../../../_components/status/FeedbackItemSkeleton";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import NoticeItem from "../../../../notice/_components/items/NoticeItem";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import FeedbackItem from "../../../_components/items/FeedbackItem";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import useNoticeItems from "../../../_hooks/useNoticeItems";
import { usePageChangeHandler } from "@/app/(route)/customer/_hooks/usePageChangeHandler";

interface FeedbackListContainerProps {
  feedbackDataList: any; // TODO: 타입 변경
  isLoading: boolean;
  isError: boolean;
  searchParams: any;
}

const FeedbackListContainer = ({
  feedbackDataList,
  isLoading,
  isError,
  searchParams,
}: FeedbackListContainerProps) => {
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
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <FeedbackItemSkeleton key={index} />
          ))
        ) : feedbackDataList?.content?.length === 0 || isError ? (
          <EmptyItem title="개선요청이" />
        ) : (
          slicedNoticeDataList?.map((noticeData) => (
            <NoticeItem
              isFeedback={true}
              noticeData={noticeData}
              key={noticeData.id}
            />
          ))
        )}
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <FeedbackItemSkeleton key={index} />
            ))
          : feedbackDataList?.content?.map(
              (feedbackDataList: FeedbackContentType) => (
                <FeedbackItem
                  feedbackData={feedbackDataList}
                  key={feedbackDataList?.id}
                  searchString={searchParams.get("search")}
                  searchType={searchParams.get("search_type")}
                />
              )
            )}
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

export default FeedbackListContainer;
