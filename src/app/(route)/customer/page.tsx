"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "./_components/CustomerTalkToolbar";
import NoticeItem from "./_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import EmptyItem from "./_components/EmptyItem";
import NoticeItemSkeleton from "./_components/NoticeItemSkeleton";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import { noticeListConfig } from "./_types/noticeListConfig";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import changeURLParams from "../mypage/util/changeURLParams";
import Pagination from "../mypage/_components/Pagination";

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
  const router = useRouter();

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > noticeListData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-[720px] min-h-[120px] rounded-[5px] mx-auto",
        "mobile:max-w-[768px]",
        noticeListData?.content?.length === 0 || !noticeListData
          ? "bg-transparent"
          : "bg-white"
      )}
    >
      <div className={cn("sticky top-0 z-10", "mobile:hidden")}>
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          adminChecker={adminChecker}
        />
      </div>

      <div
        className={cn(
          "w-full max-w-[720px] h-auto rounded-b-[5px]",
          "tablet:max-w-[688px]",
          "mobile:max-w-[768px]",
          !!noticeListData?.content?.length &&
            "shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
        )}
      >
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : noticeListData?.content?.length === 0 || isError ? (
          <EmptyItem title="공지사항이" />
        ) : (
          noticeListData?.content?.map((noticeListData: NoticeContentType) => (
            <NoticeItem
              key={noticeListData?.id}
              noticeData={noticeListData}
              searchString={searchParams.get("search")}
              searchType={searchParams.get("search_type")}
            />
          ))
        )}
        {noticeListData?.pageInfo?.totalPage > 0 && (
          <div
            className={cn(
              "hidden",
              "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
            )}
          >
            <Pagination
              pageInfo={noticeListData?.pageInfo}
              onPageChangeAction={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
