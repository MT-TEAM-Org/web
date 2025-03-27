"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import { useSearchParams } from "next/navigation";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import EmptyItem from "../_components/EmptyItem";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import NoticeItem from "../_components/NoticeItem";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import FeedbackItemSkeleton from "../_components/FeedbackItemSkeleton";
import { feedbackListConfig } from "../_types/feedbackListConfig";
import { useAdminRole } from "../_utils/adminChecker";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <FeedbackPage />
    </Suspense>
  );
};

const FeedbackPage = () => {
  const adminRole = useAdminRole();
  const searchParams = useSearchParams();

  const feedbackOption: feedbackListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    orderType:
      (searchParams.get("order_type") as feedbackListConfig["orderType"]) ||
      "CREATE",
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
  } = useGetNoticeDataList();

  const slicedNoticeDataList = (noticeListData?.content as NoticeContentType[])
    ?.sort((a, b) => b.id - a.id)
    .slice(0, 2);

  return (
    <div className="flex justify-center bg-gray1 min-h-[calc(100vh-476px)]">
      <div className="max-w-[720px] min-h-[120px] rounded-[5px] border-b bg-white mx-auto">
        <div className="sticky top-0 z-10">
          <CustomerTalkToolbar
            showOptions={true}
            adminChecker={adminRole}
            paginationData={feedbackDataList?.pageInfo}
          />
        </div>

        <div className="w-[720px] h-auto rounded-b-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
          {noticeIsLoading || isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <FeedbackItemSkeleton key={`feedback-${index}`} />
              ))}
            </>
          ) : isError ||
            noticeIsError ||
            feedbackDataList?.content?.length === 0 ? (
            <EmptyItem title="개선요청 사항이" />
          ) : (
            <>
              {slicedNoticeDataList?.map(
                (noticeListData: NoticeContentType) => (
                  <NoticeItem
                    key={noticeListData.id}
                    noticeData={noticeListData}
                    isFeedback={true}
                    searchString={searchParams.get("search")}
                    searchType={searchParams.get("search_type")}
                  />
                )
              )}
              {feedbackDataList?.content?.map(
                (feedbackListData: FeedbackContentType) => (
                  <FeedbackItem
                    feedbackData={feedbackListData}
                    key={feedbackListData?.id}
                    searchString={searchParams.get("search")}
                    searchType={searchParams.get("search_type")}
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
