"use client";

import React, { useState } from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import FeedbackNoticeItem from "../_components/FeedbackNoticeItem";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import EmptyItem from "../_components/EmptyNoticeItem";

const page = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");
  const [order, setOrder] = useState<"CREATE">("CREATE");

  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList({ pageNum, order, searchType });

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
        {Array.from({ length: 2 }).map((_, index) => {
          return <FeedbackNoticeItem key={index} />;
        })}
        {Array.from({ length: 20 }).map((_, index) => (
          <FeedbackItem
            key={index}
            completed={index % 2 === 0}
            number={index + 1}
          />
        ))}
      </div>
      <EmptyItem title="개선요청 사항이" />
    </>
  );
};

export default page;
