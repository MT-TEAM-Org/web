"use client";

import React from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import FeedbackNoticeItem from "../_components/FeedbackNoticeItem";
import { useSearchParams } from "next/navigation";
import { noticeListConfig } from "../_types/customer";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { useQueryClient } from "@tanstack/react-query";
import { getAdminRole } from "../_utils/adminChecker";

const Page = () => {
  const queryClient = useQueryClient();
  const adminRole = getAdminRole(queryClient);
  const searchParams = useSearchParams();

  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 10,
    orderType:
      (searchParams.get("order_type") as noticeListConfig["orderType"]) || "",
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const { data: noticeListData } = useGetNoticeDataList(noticeOption);

  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px]">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          adminChecker={adminRole}
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
      {/* <EmptyNoticeItem /> 공지사항 없을 때 */}
    </>
  );
};

export default Page;
