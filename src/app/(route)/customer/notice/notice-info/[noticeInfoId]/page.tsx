"use client";

import React from "react";
import NoticeInfoItem from "./_components/NoticeInfoItem";
import CustomerTalkToolbar from "../../../_components/CustomerTalkToolbar";
import NoticeItem from "../../../_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import NoticeItemSkeleton from "../../../_components/NoticeItemSkeleton";
import EmptyNoticeItem from "../../../_components/EmptyNoticeItem";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { useParams, useSearchParams } from "next/navigation";
import NoticeInfoItemSkeleton from "./_components/NoticeInfoItemSkeleton";
import { noticeListConfig } from "../../../_types/customer";

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.noticeInfoId;
  const numericId = Number(id);

  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 10,
    orderType:
      (searchParams.get("order_type") as noticeListConfig["orderType"]) || "",
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const {
    data: noticeInfoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useGetNoticeInfoData({ id: numericId });

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
        <NoticeInfoItem data={noticeInfoData} />
      )}
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] overflow-hidden">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
        />
      </div>
      <div className="w-[720px] h-auto rounded-[5px] bg-white mb-10 shadow-sm">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : noticeListData?.content?.length === 0 || isError ? (
          <EmptyNoticeItem />
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
