"use client";

import React, { Suspense } from "react";
import NoticeInfoItem from "./_components/NoticeInfoItem";
import CustomerTalkToolbar from "../../../_components/CustomerTalkToolbar";
import NoticeItem from "../../../_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import NoticeItemSkeleton from "../../../_components/NoticeItemSkeleton";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { useParams, useSearchParams } from "next/navigation";
import NoticeInfoItemSkeleton from "./_components/NoticeInfoItemSkeleton";
import { noticeListConfig } from "../../../_types/noticeListConfig";
import EmptyItem from "../../../_components/EmptyItem";
import { useAdminRole } from "../../../_utils/adminChecker";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <NoticeInfoContent />
    </Suspense>
  );
};

const NoticeInfoContent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.noticeInfoId;
  const numberId = Number(id);
  const adminChecker = useAdminRole();

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
  } = useGetNoticeInfoData({ id: numberId });

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  return (
    <>
      {infoIsLoading || infoIsError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeInfoItem data={noticeInfoData} id={numberId} />
      )}
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] overflow-hidden">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          adminChecker={adminChecker}
        />
      </div>
      <div className="w-[720px] h-auto rounded-[5px] bg-white shadow-md mb-10">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : noticeListData?.content?.length === 0 || isError ? (
          <EmptyItem title="공지사항이" />
        ) : (
          noticeListData?.content?.map((noticeListData: NoticeContentType) => (
            <NoticeItem noticeData={noticeListData} key={noticeListData?.id} />
          ))
        )}
      </div>
    </>
  );
};

export default Page;
