"use client";

import React, { useState } from "react";
import NoticeInfoItem from "./_components/NoticeInfoItem";
import CustomerTalkToolbar from "../../../_components/CustomerTalkToolbar";
import NoticeItem from "../../../_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import NoticeItemSkeleton from "../../../_components/NoticeItemSkeleton";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { useParams } from "next/navigation";
import NoticeInfoItemSkeleton from "./_components/NoticeInfoItemSkeleton";
import EmptyItem from "../../../_components/EmptyItem";

const Page = () => {
  const params = useParams();
  const id = params.noticeInfoId;
  const numericId = Number(id);
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");

  const {
    data: noticeInfoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useGetNoticeInfoData({ id: numericId });
  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(pageNum, searchType);

  const onPageChange = (newPage: number) => {
    setPageNum(Number(newPage));
  };

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
          onPageChange={onPageChange}
          setSearchType={setSearchType}
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
