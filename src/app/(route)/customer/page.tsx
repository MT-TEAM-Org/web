"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "./_components/ui/CustomerTalkToolbar";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import useNoticeQueryParams from "./_hooks/useNoticeQueryParams";
import ItemContainer from "./_components/ui/ItemContainer";

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
    <div
      className={cn(
        "w-full max-w-[720px] min-h-[120px] rounded-[5px] mx-auto",
        "tablet:max-w-full",
        "mobile:max-w-[768px]",
        noticeListData?.content?.length === 0 || !noticeListData
          ? "bg-transparent"
          : "bg-white"
      )}
    >
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
    </div>
  );
};

export default Page;
