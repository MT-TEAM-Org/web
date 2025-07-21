import { cn } from "@/utils";
import React from "react";
import EmptyItem from "../../../_components/common/EmptyItem";
import { FeedbackContentType } from "../../../_types/FeedbackItemType";
import { NoticeContentType } from "../../../_types/NoticeItemType";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";
import FeedbackListLoading from "../status/FeedbackListLoading";
import FeedbackListRenderer from "../FeedbackListRender";
import { usePageChangeHandler } from "../../../_hooks/usePageChangeHandler";

type LoadingType = {
  isLoading: boolean;
  noticeIsLoading: boolean;
};

type ErrorType = {
  isError: boolean;
  noticeIsError: boolean;
};

interface FeedbackItemBoxProps {
  feedbackDataList: {
    content: FeedbackContentType[];
    pageInfo: PageInfo;
  };
  loading: LoadingType;
  error: ErrorType;
  slicedNoticeDataList: NoticeContentType[];
  searchParams: URLSearchParams;
}

const FeedbackItemBox = ({
  feedbackDataList,
  loading,
  error,
  slicedNoticeDataList,
  searchParams,
}: FeedbackItemBoxProps) => {
  // 페이지네이션 핸들러
  const handlePageChange = usePageChangeHandler(
    feedbackDataList?.pageInfo?.totalPage
  );

  return (
    <div
      className={cn(
        "w-full max-w-[720px] h-auto rounded-b-[5px] overflow-hidden bg-white",
        "tablet:max-w-full",
        "mobile:max-w-[768px]",
        !!feedbackDataList?.content?.length &&
          "shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
      )}
    >
      {loading.noticeIsLoading || loading.isLoading ? (
        <FeedbackListLoading />
      ) : error.isError ||
        error.noticeIsError ||
        feedbackDataList?.content?.length === 0 ? (
        <EmptyItem title="개선요청 사항이" />
      ) : (
        <FeedbackListRenderer
          notices={slicedNoticeDataList}
          feedbacks={feedbackDataList.content}
          search={searchParams.get("search")}
          searchType={searchParams.get("search_type")}
        />
      )}
      {feedbackDataList?.pageInfo.totalPage > 0 && (
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
  );
};

export default FeedbackItemBox;
