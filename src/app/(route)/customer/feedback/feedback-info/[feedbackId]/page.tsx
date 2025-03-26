"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CustomerTalkToolbar from "../../../_components/CustomerTalkToolbar";
import EmptyItem from "../../../_components/EmptyItem";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import useTimeAgo from "@/utils/useTimeAgo";
import FeedbackInfoSkeleton from "./_components/FeedbackInfoSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { feedbackListConfig } from "../../../_types/feedbackListConfig";
import { useAdminRole } from "../../../_utils/adminChecker";
import StatusSaver from "./_components/StatusSaver";
import EmptyComment from "@/app/(route)/(community)/gameboard/_components/EmptyComment";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import FeedbackItem from "../../../_components/FeedbackItem";
import FeedbackItemSkeleton from "../../../_components/FeedbackItemSkeleton";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import NoticeItem from "../../../_components/NoticeItem";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import usePostFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/usePostFeedbackRecommend";
import useDeleteFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteFeedbackRecommend";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <FeedbackInfoPage />
    </Suspense>
  );
};

const FeedbackInfoPage = () => {
  const params = useParams();
  const id = params.feedbackId;
  const infoId = Number(id);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const adminRole = useAdminRole();
  const pathname = usePathname();

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
  const {
    mutate: feedbackAddRecommend,
    isSignInModalOpen,
    setIsSignInModalOpen,
  } = usePostFeedbackRecommend();
  const { mutate: feedbackDeleteRecommend } = useDeleteFeedbackRecommend();

  const handleFeedbackCommend = () => {
    if (!feedbackInfoData?.recommend) {
      feedbackAddRecommend(infoId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["feedbackInfo", id] });
        },
      });
    } else if (feedbackInfoData?.recommend) {
      feedbackDeleteRecommend(infoId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["feedbackInfo", id] });
        },
      });
    }
  };

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

  const infoItems = [
    { label: "조회수", value: feedbackInfoData?.viewCount },
    { label: "댓글", value: feedbackInfoData?.commentCount },
    { label: "추천", value: feedbackInfoData?.recommendCount },
  ];

  const statusBoxClass = "w-[69px] h-[32px] rounded-[2px] px-2 py-[6px] flex";

  const statusContent = {
    RECEIVED: (
      <div className={`${statusBoxClass} bg-gray1`}>
        <p className="font-bold text-[14px] leading-5 text-gray7">접수 완료</p>
      </div>
    ),
    COMPLETED: (
      <div className={`${statusBoxClass} bg-bg0`}>
        <p className="font-bold text-[14px] leading-5 text-gra">개선 완료</p>
      </div>
    ),
  };

  const link = feedbackInfoData?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(link);

  return (
    <>
      {feedbackIsLoading || feedbackIsError ? (
        <FeedbackInfoSkeleton />
      ) : (
        <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md">
          {adminRole === "ADMIN" && (
            <StatusSaver id={infoId} status={feedbackInfoData?.status} />
          )}
          <div
            className={`w-full ${
              adminRole !== "ADMIN" || (adminRole === undefined && "h-[56px]")
            } flex gap-2 flex-col`}
          >
            <div>
              {(adminRole !== "ADMIN" || adminRole === undefined) &&
                statusContent[feedbackInfoData?.status]}
            </div>
            <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
              {feedbackInfoData?.title}
            </h1>
            <div className="w-full max-h-[20px] flex gap-4">
              <div className="min-w-[421px] min-h-[20px] flex gap-2 text-[14px] leading-5 text-gray6">
                <p className="font-bold">고객센터</p>
                <p>개선요청</p>
                <p>{timeAgo}</p>
                {infoItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <p className="font-bold">{item.label}</p>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="min-w-[235px] min-h-[20px] flex justify-end gap-1 text-[14px] leading-5 text-gray6">
                <p>{feedbackInfoData?.nickname}</p>
                <p>IP {feedbackInfoData?.clientIp}</p>
              </div>
            </div>
          </div>
          <hr />
          {(feedbackInfoData?.imgUrl || youtubeEmbedUrl) && (
            <div className="w-full min-h-auto flex flex-col gap-3">
              {feedbackInfoData?.imgUrl && !youtubeEmbedUrl && (
                <Image
                  src={feedbackInfoData?.imgUrl}
                  alt="Feedback img"
                  width={672}
                  height={128}
                />
              )}
              {youtubeEmbedUrl && (
                <iframe
                  width="100%"
                  height="408"
                  src={youtubeEmbedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {!youtubeEmbedUrl && feedbackInfoData?.data?.link && (
                <div className="w-[679px] min-h-[42px]">
                  <div>{feedbackInfoData?.data?.link}</div>
                </div>
              )}
            </div>
          )}
          <div
            className="text-[16px] leading-6 tracking-[-0.02em] text-gray7"
            dangerouslySetInnerHTML={{ __html: feedbackInfoData?.content }}
          />
          <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
            <RecommendButton
              handleCommend={handleFeedbackCommend}
              recommendCount={feedbackInfoData?.recommendCount}
              isRecommend={feedbackInfoData?.isRecommend}
            />
          </div>
          <PostAction type="community" />
          <div className="w-full max-w-[800px] flex flex-col">
            <CommentBar />
            <EmptyComment />
          </div>
          <PostNavigation
            nextId={feedbackInfoData?.nextId}
            previousId={feedbackInfoData?.previousId}
            currentPath={pathname}
          />
        </div>
      )}
      <CustomerTalkToolbar
        showOptions={true}
        adminChecker={adminRole}
        paginationData={feedbackDataList?.pageInfo}
      />
      <div className="w-full h-auto rounded-[5px] shadow-md bg-white">
        <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <FeedbackItemSkeleton key={index} />
              ))
            : slicedNoticeDataList?.map((noticeData) => (
                <NoticeItem
                  isFeedback={true}
                  noticeData={noticeData}
                  key={noticeData.id}
                  searchString={searchParams.get("search")}
                  searchType={searchParams.get("search_type")}
                />
              ))}
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <FeedbackItemSkeleton key={index} />
            ))
          ) : feedbackDataList?.content?.length === 0 || isError ? (
            <EmptyItem title="공지사항이" />
          ) : (
            feedbackDataList?.content?.map(
              (feedbackDataList: FeedbackContentType) => (
                <FeedbackItem
                  feedbackData={feedbackDataList}
                  key={feedbackDataList?.id}
                />
              )
            )
          )}
        </div>
        <SignInModalPopUp
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Page;
