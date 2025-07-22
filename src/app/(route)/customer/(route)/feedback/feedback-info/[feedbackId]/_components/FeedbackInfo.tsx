"use client";

import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import FeedbackInfoSkeleton from "./FeedbackInfoSkeleton";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import FeedbackItemSkeleton from "@/app/(route)/customer/(route)/feedback/_components/status/FeedbackItemSkeleton";
import NoticeItem from "@/app/(route)/customer/(route)/notice/_components/items/NoticeItem";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import FeedbackItem from "@/app/(route)/customer/(route)/feedback/_components/items/FeedbackItem";
import { cn } from "@/utils";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import FeedbackMeta from "./FeedbackMeta";
import useFeedbackQueryParams from "../../../_hooks/useFeedbackQueryParams";
import { useScrollToComment } from "../../../_hooks/useScrollToComment";
import useNoticeItems from "../../../_hooks/useNoticeItems";
import { usePageChangeHandler } from "@/app/(route)/customer/_hooks/usePageChangeHandler";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <FeedbackInfo />
    </Suspense>
  );
};

const FeedbackInfo = () => {
  const params = useParams();
  const id = params.feedbackId;
  const searchParams = useSearchParams();
  const adminRole = useAdminRole();
  const feedbackOption = useFeedbackQueryParams();
  const { slicedNoticeDataList } = useNoticeItems();

  // 리스트 검색 댓글 이동 로직
  useScrollToComment(searchParams);

  // 개선요청 상세데이터
  const {
    data: feedbackInfoData,
    isLoading: feedbackIsLoading,
    isError: feedbackIsError,
  } = useGetFeedbackInfoData({ id });

  // 개선요청 리스트
  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList(feedbackOption);

  // 페이지네이션 핸들러
  const handlePageChange = usePageChangeHandler(
    feedbackDataList?.pageInfo?.totalPage
  );

  return (
    <>
      {feedbackIsLoading || feedbackIsError ? (
        <FeedbackInfoSkeleton />
      ) : (
        <FeedbackMeta
          feedbackInfoData={feedbackInfoData}
          id={id}
          adminRole={adminRole}
        />
      )}
      <div
        className={cn(
          "w-[720px] min-h-[120px] rounded-t-[5px] mt-4",
          "tablet:max-w-full tablet:w-full tablet:mt-3",
          "mobile:w-full mobile:max-w-full mobile:min-h-[56px]"
        )}
      >
        <CustomerTalkToolbar
          showOptions={true}
          adminChecker={adminRole}
          paginationData={feedbackDataList?.pageInfo}
        />
      </div>
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
    </>
  );
};

export default Page;
