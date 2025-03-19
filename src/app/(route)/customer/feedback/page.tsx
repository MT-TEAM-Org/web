"use client";

import React, { useState } from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import EmptyItem from "../_components/EmptyItem";
import NoticeItemSkeleton from "../_components/NoticeItemSkeleton";
import { FeedbackContentType } from "@/app/_constants/customer/FeedbackItemType";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import NoticeItem from "../_components/NoticeItem";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import FeedbackItemSkeleton from "../_components/FeedbackItemSkeleton";

const Page = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");
  const [order, setOrder] = useState<"CREATE">("CREATE");

  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList({ pageNum, order, searchType });

  const {
    data: noticeDataList,
    isLoading: noticeIsLoading,
    isError: noticeIsError,
  } = useGetNoticeDataList(pageNum, searchType);

  const slicedNoticeDataList = noticeDataList?.content?.slice(-2);

  const onPageChange = (newPage: number) => {
    setPageNum(newPage);
  };

  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px]">
        <CustomerTalkToolbar
          showOptions={true}
          paginationData={feedbackDataList?.pageInfo}
          onPageChange={onPageChange}
          setSearchType={setSearchType}
        />
      </div>

      <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
        {noticeIsLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <NoticeItemSkeleton key={index} />
            ))
          : slicedNoticeDataList?.map((noticeListData: NoticeContentType) => (
              <NoticeItem
                key={noticeListData.id}
                noticeData={noticeListData}
                isFeedback={true}
              />
            ))}
        {isLoading || isError ? (
          Array.from({ length: 10 }).map((_, index) => (
            <FeedbackItemSkeleton key={index} />
          ))
        ) : feedbackDataList?.content?.length === 0 || noticeIsError ? (
          <EmptyItem title="개선요청 사항이" />
        ) : (
          feedbackDataList?.content?.map(
            (feedbackListData: FeedbackContentType) => (
              <FeedbackItem
                feedbackData={feedbackListData}
                key={feedbackListData?.id}
              />
            )
          )
        )}
      </div>
    </>
  );
};

export default Page;
