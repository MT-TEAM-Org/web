"use client";

import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import { cn } from "@/utils";
import useFeedbackQueryParams from "../../../_hooks/useFeedbackQueryParams";
import { useScrollToComment } from "../../../_hooks/useScrollToComment";
import FeedbackMetaContainer from "./FeedbackMetaContainer";
import FeedbackListContainer from "./FeedbackListContainer";

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

  return (
    <>
      <FeedbackMetaContainer
        feedbackInfoData={feedbackInfoData}
        id={id}
        adminRole={adminRole}
        isLoading={feedbackIsLoading}
        isError={feedbackIsError}
      />
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
      <FeedbackListContainer
        feedbackDataList={feedbackDataList}
        isLoading={isLoading}
        isError={isError}
        searchParams={searchParams}
      />
    </>
  );
};

export default Page;
