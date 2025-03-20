"use client";

import React from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import FeedbackNoticeItem from "../_components/FeedbackNoticeItem";
import { useSearchParams } from "next/navigation";
import { noticeListConfig } from "../_types/noticeListConfig";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { useQueryClient } from "@tanstack/react-query";
import { getAdminRole } from "../_utils/adminChecker";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import EmptyItem from "../_components/EmptyItem";
import NoticeItemSkeleton from "../_components/NoticeItemSkeleton";
import { FeedbackContentType } from "@/app/_constants/customer/FeedbackItemType";
import NoticeItem from "../_components/NoticeItem";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import FeedbackItemSkeleton from "../_components/FeedbackItemSkeleton";
import { feedbackListConfig } from "../_types/feedbackListConfig";

const Page = () => {
  const queryClient = useQueryClient();
  const adminRole = getAdminRole(queryClient);
  const searchParams = useSearchParams();

  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const feedbackOption: feedbackListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    orderType:
      (searchParams.get("order_type") as feedbackListConfig["orderType"]) || "",
    searchType:
      (searchParams.get("search_type") as feedbackListConfig["searchType"]) ||
      "",
    search: searchParams.get("search") || "",
  };

  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList(feedbackOption);

  const {
    data: noticeListData,
    isError: noticeIsError,
    isLoading: noticeIsLoading,
  } = useGetNoticeDataList(noticeOption);

  const slicedNoticeDataList = noticeListData?.content?.slice(-2);

  return (
    <>
      <div className="w-[720px] min-h-[120px] rounded-t-[5px]">
        <CustomerTalkToolbar
          showOptions={true}
          adminChecker={adminRole}
          paginationData={feedbackDataList?.pageInfo}
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
