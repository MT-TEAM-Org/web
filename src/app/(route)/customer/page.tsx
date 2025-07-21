"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "./_components/ui/CustomerTalkToolbar";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useSearchParams } from "next/navigation";
import useNoticeQueryParams from "./_hooks/useNoticeQueryParams";
import ItemContainer from "./_components/ui/ItemContainer";
import ListLayout from "./_components/common/ListLayout";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <NoticePageContent />
    </Suspense>
  );
};

const NoticePageContent = () => {
  const searchParams = useSearchParams();
  const adminChecker = useAdminRole();
  const noticeOption = useNoticeQueryParams();

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  return (
    <ListLayout data={noticeListData?.content}>
      <CustomerTalkToolbar
        showOptions={false}
        paginationData={noticeListData?.pageInfo}
        adminChecker={adminChecker}
      />

      <ItemContainer
        type="notice"
        dataList={noticeListData}
        loading={{
          isLoading,
          loading: false,
        }}
        error={{
          isError,
          error: false,
        }}
        slicedDataList={noticeListData?.content}
        searchParams={searchParams}
      />
    </ListLayout>
  );
};

export default Page;
