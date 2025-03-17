"use client";

import React, { useState } from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import FeedbackNoticeItem from "../_components/FeedbackNoticeItem";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import EmptyItem from "../_components/EmptyItem";
import NoticeItemSkeleton from "../_components/NoticeItemSkeleton";
import { FeedbackContentType } from "@/app/_constants/customer/FeedbackItemType";

const Page = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");
  const [order, setOrder] = useState<"CREATE">("CREATE");

  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList({ pageNum, order, searchType });

  console.log("feedbackDataList: ", feedbackDataList);

  const onPageChange = (newPage: number) => {
    setPageNum(newPage);
  };

  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px]">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={feedbackDataList?.pageInfo}
          onPageChange={onPageChange}
          setSearchType={setSearchType}
        />
      </div>

      <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : feedbackDataList?.content?.length === 0 || isError ? (
          <EmptyItem title="개선요청 사항이" />
        ) : (
          feedbackDataList?.content?.map(
            (feedbackListData: FeedbackContentType) => {
              <FeedbackItem feedbackData={feedbackListData} />;
            }
          )
        )}
      </div>
    </>
  );
};

export default Page;
