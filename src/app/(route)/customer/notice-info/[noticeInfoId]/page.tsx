"use client";

import React, { useState } from "react";
import NoticeInfoItem from "./_components/NoticeInfoItem";
import CustomerTalkToolbar from "../../_components/CustomerTalkToolbar";
import NoticeItem from "../../_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import NoticeItemSkeleton from "../../_components/NoticeItemSkeleton";
import EmptyNoticeItem from "../../_components/EmptyNoticeItem";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { useParams } from "next/navigation";
import NoticeInfoItemSkeleton from "./_components/NoticeInfoItemSkeleton";

const Page = () => {
  const params = useParams();
  const id = params;
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");

  const {
    data: noticeInfoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useGetNoticeInfoData({ id });
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
      <div className="w-[720px] h-auto rounded-[5px] bg-white">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : noticeListData?.content?.length === 0 || isError ? (
          <EmptyNoticeItem />
        ) : (
          noticeListData?.content?.map(
            (noticeListData: NoticeContentType, index) => {
              <NoticeItem noticeData={noticeListData} />;
            }
          )
        )}
      </div>
    </>
  );
};

export default Page;
