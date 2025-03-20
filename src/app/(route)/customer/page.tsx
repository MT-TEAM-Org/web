"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "./_components/CustomerTalkToolbar";
import NoticeItem from "./_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import EmptyItem from "./_components/EmptyItem";
import NoticeItemSkeleton from "./_components/NoticeItemSkeleton";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import { useSearchParams } from "next/navigation";
import { noticeListConfig } from "./_types/noticeListConfig";
import { useQueryClient } from "@tanstack/react-query";
import { getAdminRole } from "@/app/(route)/customer/_utils/adminChecker";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <NoticePageContent />
    </Suspense>
  );
};

const NoticePageContent = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const adminChecker = getAdminRole(queryClient);

  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px]">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          adminChecker={adminChecker}
        />
      </div>

      <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : noticeListData?.content?.length === 0 || isError ? (
          <EmptyItem title="공지사항이" />
        ) : (
          noticeListData?.content?.map((noticeListData: NoticeContentType) => (
            <NoticeItem key={noticeListData?.id} noticeData={noticeListData} />
          ))
        )}
      </div>
    </>
  );
};

export default Page;
