import { cn } from "@/utils";
import React from "react";
import FeedbackItemSkeleton from "../../_components/FeedbackItemSkeleton";
import EmptyItem from "../../_components/EmptyItem";
import NoticeItem from "../../_components/NoticeItem";
import { FeedbackContentType } from "../../_types/FeedbackItemType";
import { NoticeContentType } from "../../_types/NoticeItemType";
import FeedbackItem from "../../_components/FeedbackItem";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";
import { useRouter } from "next/navigation";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

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
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > feedbackDataList?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

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
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <FeedbackItemSkeleton key={`feedback-${index}`} />
          ))}
        </>
      ) : error.isError ||
        error.noticeIsError ||
        feedbackDataList?.content?.length === 0 ? (
        <EmptyItem title="개선요청 사항이" />
      ) : (
        <>
          {slicedNoticeDataList?.map((noticeListData: NoticeContentType) => (
            <NoticeItem
              key={noticeListData.id}
              noticeData={noticeListData}
              isFeedback={true}
            />
          ))}
          {feedbackDataList?.content?.map(
            (feedbackListData: FeedbackContentType) => (
              <FeedbackItem
                feedbackData={feedbackListData}
                key={feedbackListData?.id}
                searchString={searchParams.get("search")}
                searchType={searchParams.get("search_type")}
              />
            )
          )}
        </>
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
