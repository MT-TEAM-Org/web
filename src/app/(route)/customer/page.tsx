"use client";

import React, { useState } from "react";
import CustomerTalkToolbar from "./_components/CustomerTalkToolbar";
import NoticeItem from "./_components/NoticeItem";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import EmptyItem from "./_components/EmptyItem";
import NoticeItemSkeleton from "./_components/NoticeItemSkeleton";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");
  const queryClient = useQueryClient();
  const authStatus = queryClient.getQueryData(["authCheck"]) as {
    data: { data: { role: string } };
  };
  console.log("authStatus: ", authStatus);
  const adminChecker = authStatus?.data?.data?.role as "USER" | "ADMIN";
  console.log("adminChecker: ", adminChecker);

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(pageNum, searchType);

  const onPageChange = (newPage: number) => {
    setPageNum(newPage);
  };

  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px]">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          onPageChange={onPageChange}
          setSearchType={setSearchType}
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
            <NoticeItem key={noticeListData.id} noticeData={noticeListData} />
          ))
        )}
      </div>
    </>
  );
};

export default Page;
