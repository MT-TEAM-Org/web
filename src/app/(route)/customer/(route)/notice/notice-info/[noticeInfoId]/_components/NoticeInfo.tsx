"use client";

import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";
import NoticeMetaContainer from "./templates/NoticeMetaContainer";
import NoticeListContainer from "./templates/NoticeListContainer";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <NoticeInfo />
    </Suspense>
  );
};

const NoticeInfo = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.noticeInfoId;
  const numberId = Number(id);
  const adminChecker = useAdminRole();
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const {
    data: noticeInfoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useGetNoticeInfoData({ id: numberId, token: token });

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > noticeListData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <>
      {/* 공지사항 상세 */}
      <NoticeMetaContainer
        infoIsLoading={infoIsLoading}
        infoIsError={infoIsError}
        noticeInfoData={noticeInfoData}
        numberId={numberId}
      />

      {/* 하단 리스트 */}
      <NoticeListContainer
        isLoading={isLoading}
        isError={isError}
        noticeListData={noticeListData}
        adminChecker={adminChecker}
        searchParams={searchParams}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Page;
