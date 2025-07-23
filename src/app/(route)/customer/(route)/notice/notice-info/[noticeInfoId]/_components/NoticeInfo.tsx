"use client";

import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import NoticeMetaContainer from "./templates/NoticeMetaContainer";
import NoticeListContainer from "./templates/NoticeListContainer";
import { useScrollToComment } from "../../../../feedback/_hooks/useScrollToComment";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <NoticeInfo />
    </Suspense>
  );
};

const NoticeInfo = () => {
  const params = useParams();
  const id = params.noticeInfoId;
  const searchParams = useSearchParams();
  const adminRole = useAdminRole();

  useScrollToComment(searchParams);

  const {
    data: noticeInfoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useGetNoticeInfoData({ id });

  return (
    <>
      {/* 공지사항 상세 */}
      <NoticeMetaContainer
        infoIsLoading={infoIsLoading}
        infoIsError={infoIsError}
        noticeInfoData={noticeInfoData}
        id={id}
      />

      {/* 하단 리스트 */}
      <NoticeListContainer searchParams={searchParams} adminRole={adminRole} />
    </>
  );
};

export default Page;
