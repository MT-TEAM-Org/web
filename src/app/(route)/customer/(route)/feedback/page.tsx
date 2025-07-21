"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "../../_components/ui/CustomerTalkToolbar";
import { useSearchParams } from "next/navigation";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import { useAdminRole } from "../../_utils/adminChecker";
import { cn } from "@/utils";
import ItemContainer from "../../_components/ui/ItemContainer";
import useFeedbackQueryParams from "./_hooks/useFeedbackQueryParams";
import useNoticeItems from "./_hooks/useNoticeItems";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <FeedbackPage />
    </Suspense>
  );
};

const FeedbackPage = () => {
  const adminRole = useAdminRole();
  const searchParams = useSearchParams();
  const feedbackOption = useFeedbackQueryParams();

  // 공지사항 데이터 호출 커스텀 훅 (최상단 2개 표시)
  const { slicedNoticeDataList, noticeIsError, noticeIsLoading } =
    useNoticeItems();

  // 개선요청 데이터 호출
  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList(feedbackOption);

  return (
    <div
      className={cn(
        "w-full max-w-[720px] min-h-[120px] rounded-t-[5px] mx-auto",
        "tablet:max-w-full",
        "mobile:max-w-[768px]",
        feedbackDataList?.content?.length === 0 || !feedbackDataList
          ? "bg-transparent"
          : "bg-white"
      )}
    >
      {/* 고객센터 툴바 */}
      <CustomerTalkToolbar
        showOptions={true}
        adminChecker={adminRole}
        paginationData={feedbackDataList?.pageInfo}
      />

      {/* 개선요청 리스트 */}
      <ItemContainer
        type="feedback"
        dataList={feedbackDataList}
        loading={{
          isLoading,
          loading: noticeIsLoading,
        }}
        error={{
          isError,
          error: noticeIsError,
        }}
        slicedDataList={slicedNoticeDataList}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Page;
