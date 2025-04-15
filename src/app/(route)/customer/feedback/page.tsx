"use client";

import React, { Suspense } from "react";
import CustomerTalkToolbar from "../_components/CustomerTalkToolbar";
import FeedbackItem from "../_components/FeedbackItem";
import { useRouter, useSearchParams } from "next/navigation";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import EmptyItem from "../_components/EmptyItem";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import NoticeItem from "../_components/NoticeItem";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import FeedbackItemSkeleton from "../_components/FeedbackItemSkeleton";
import { feedbackListConfig } from "../_types/feedbackListConfig";
import { useAdminRole } from "../_utils/adminChecker";
import { cn } from "@/utils";
import Pagination from "../../mypage/_components/Pagination";
import changeURLParams from "../../mypage/util/changeURLParams";

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
  const router = useRouter();

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > feedbackDataList?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-[720px] min-h-[120px] rounded-t-[5px] mx-auto",
        `${
          feedbackDataList?.content?.length === 0 || !feedbackDataList
            ? "bg-transparent"
            : "bg-white"
        }`
      )}
    >
      <div className="sticky top-0 z-10">
        <CustomerTalkToolbar
          showOptions={true}
          adminChecker={adminRole}
          paginationData={feedbackDataList?.pageInfo}
        />
      </div>

      <div
        className={cn(
          "w-full max-w-[720px] h-auto rounded-b-[5px] overflow-hidden",
          "tablet:max-w-[688px]",
          "mobile:w-full",
          !!feedbackDataList?.content?.length &&
            "shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
        )}
      >
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
            {slicedNoticeDataList?.map((noticeListData: NoticeContentType) => (
              <NoticeItem
                key={noticeListData.id}
                noticeData={noticeListData}
                isFeedback={true}
              />
            ))}
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
        <div
          className={cn(
            "hidden",
            "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
          )}
        >
          <Pagination
            pageInfo={feedbackDataList?.pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
