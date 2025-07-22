"use client";

import useDeleteFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteFeedbackRecommend";
import usePostFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/usePostFeedbackRecommend";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { feedbackListConfig } from "@/app/(route)/customer/_types/feedbackListConfig";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import useTimeAgo from "@/utils/useTimeAgo";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import FeedbackInfoSkeleton from "./FeedbackInfoSkeleton";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import FeedbackItemSkeleton from "@/app/(route)/customer/(route)/feedback/_components/status/FeedbackItemSkeleton";
import NoticeItem from "@/app/(route)/customer/(route)/notice/_components/items/NoticeItem";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import FeedbackItem from "@/app/(route)/customer/(route)/feedback/_components/items/FeedbackItem";
import { cn } from "@/utils";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";
import FeedbackMeta from "./FeedbackMeta";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <FeedbackInfo />
    </Suspense>
  );
};

const FeedbackInfo = () => {
  const params = useParams();
  const id = params.feedbackId;
  const infoId = Number(id);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const adminRole = useAdminRole();
  const router = useRouter();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

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
    data: feedbackInfoData,
    isLoading: feedbackIsLoading,
    isError: feedbackIsError,
  } = useGetFeedbackInfoData({ id: infoId });

  const { mutate: feedbackAddRecommend } = usePostFeedbackRecommend();
  const { mutate: feedbackDeleteRecommend } = useDeleteFeedbackRecommend();

  const handleFeedbackCommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = feedbackInfoData?.isRecommended;
    const feedbackAction = isRecommended
      ? feedbackDeleteRecommend
      : feedbackAddRecommend;

    feedbackAction(infoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["feedbackInfo", infoId] });
      },
    });
  };

  useEffect(() => {
    const commentId = searchParams.get("commentId");
    if (commentId) {
      const commentElement = document.getElementById(commentId);
      if (commentElement) {
        commentElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [searchParams]);

  const timeAgo = useTimeAgo(feedbackInfoData?.createdAt);
  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList(feedbackOption);
  const { data: noticeListData } = useGetNoticeDataList();

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
    <>
      {feedbackIsLoading || feedbackIsError ? (
        <FeedbackInfoSkeleton />
      ) : (
        <FeedbackMeta
          feedbackInfoData={feedbackInfoData}
          infoId={infoId}
          id={id}
          adminRole={adminRole}
          timeAgo={timeAgo}
          handleFeedbackCommend={handleFeedbackCommend}
          state={{
            isSignInModalOpen,
            setIsSignInModalOpen,
          }}
        />
      )}
      <div
        className={cn(
          "w-[720px] min-h-[120px] rounded-t-[5px] mt-4",
          "tablet:max-w-full tablet:w-full tablet:mt-3",
          "mobile:w-full mobile:max-w-full mobile:min-h-[56px]"
        )}
      >
        <CustomerTalkToolbar
          showOptions={true}
          adminChecker={adminRole}
          paginationData={feedbackDataList?.pageInfo}
        />
      </div>
      <div
        className={cn(
          "w-full h-auto rounded-[5px] shadow-soft-md bg-white",
          "tablet:max-w-full",
          "mobile:max-w-full"
        )}
      >
        <div
          className={cn(
            "w-[720px] h-auto rounded-b-[5px] mb-10",
            "tablet:w-full",
            "mobile:w-full mobile:max-w-full mobile:mb-0"
          )}
        >
          {isLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <FeedbackItemSkeleton key={index} />
            ))
          ) : feedbackDataList?.content?.length === 0 || isError ? (
            <EmptyItem title="개선요청이" />
          ) : (
            slicedNoticeDataList?.map((noticeData) => (
              <NoticeItem
                isFeedback={true}
                noticeData={noticeData}
                key={noticeData.id}
              />
            ))
          )}
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <FeedbackItemSkeleton key={index} />
              ))
            : feedbackDataList?.content?.map(
                (feedbackDataList: FeedbackContentType) => (
                  <FeedbackItem
                    feedbackData={feedbackDataList}
                    key={feedbackDataList?.id}
                    searchString={searchParams.get("search")}
                    searchType={searchParams.get("search_type")}
                  />
                )
              )}
          {feedbackDataList?.pageInfo?.totalPage > 0 && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
