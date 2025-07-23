"use client";

import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useScrollToComment } from "../../../_hooks/useScrollToComment";
import FeedbackMetaContainer from "./templates/FeedbackMetaContainer";
import dynamic from "next/dynamic";

const FeedbackListContainer = dynamic(
  () => import("./templates/FeedbackListContainer"),
  {
    ssr: false,
  }
);

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

  // 리스트 검색 댓글 이동 로직
  useScrollToComment(searchParams);

  // 개선요청 상세데이터
  const {
    data: feedbackInfoData,
    isLoading: feedbackIsLoading,
    isError: feedbackIsError,
  } = useGetFeedbackInfoData({ id });

  return (
    <>
      {/* 개선요청 상세 */}
      <FeedbackMetaContainer
        feedbackInfoData={feedbackInfoData}
        id={id}
        adminRole={adminRole}
        isLoading={feedbackIsLoading}
        isError={feedbackIsError}
      />

      {/* 하단 리스트 */}
      <FeedbackListContainer
        searchParams={searchParams}
        adminRole={adminRole}
      />
    </>
  );
};

export default Page;
