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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import FeedbackInfoSkeleton from "./FeedbackInfoSkeleton";
import StatusSaver from "./StatusSaver";
import Image from "next/image";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/CustomerTalkToolbar";
import FeedbackItemSkeleton from "@/app/(route)/customer/_components/FeedbackItemSkeleton";
import NoticeItem from "@/app/(route)/customer/_components/NoticeItem";
import EmptyItem from "@/app/(route)/customer/_components/EmptyItem";
import { FeedbackContentType } from "@/app/(route)/customer/_types/FeedbackItemType";
import FeedbackItem from "@/app/(route)/customer/_components/FeedbackItem";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import { CommentItem } from "@/_types/comment";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { cn } from "@/utils";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

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
  const pathname = usePathname();
  const router = useRouter();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const comments = useRef(null);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

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
  } = useGetFeedbackInfoData({ id: infoId, token });
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

  const infoItems = [
    { label: "조회수", value: feedbackInfoData?.viewCount },
    { label: "댓글", value: feedbackInfoData?.commentCount },
    { label: "추천", value: feedbackInfoData?.recommendCount },
  ];

  const statusBoxClass = "w-[69px] h-[32px] rounded-[2px] px-2 py-[6px] flex";

  const statusContent = {
    RECEIVED: (
      <div className={cn(statusBoxClass, "bg-gray1")}>
        <p className="font-bold text-[14px] leading-5 text-gray7">접수 완료</p>
      </div>
    ),
    COMPLETED: (
      <div className={cn(statusBoxClass, "bg-bg0")}>
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
        <>
          <div
            className={cn(
              "w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md",
              "tablet:max-w-[687px]",
              "mobile:max-w-full mobile:w-full mobile:p-4 mobile:gap-3"
            )}
          >
            {adminRole === "ADMIN" && (
              <StatusSaver id={infoId} status={feedbackInfoData?.status} />
            )}
            <div
              className={cn(
                "w-full flex gap-2 flex-col",
                adminRole !== "ADMIN" || adminRole === undefined
                  ? "min-h-[56px]"
                  : ""
              )}
            >
              <div>
                {(adminRole !== "ADMIN" || adminRole === undefined) &&
                  statusContent[feedbackInfoData?.status]}
              </div>
              <h1
                className={cn(
                  "font-bold text-[18px] leading-7 tracking-[-0.72px]",
                  "mobile:text-[16px] mobile:leading-6"
                )}
              >
                {feedbackInfoData?.title}
              </h1>
              <div
                className={cn(
                  "w-full max-h-[20px] flex gap-4",
                  "mobile:flex-wrap mobile:max-h-none"
                )}
              >
                <div
                  className={cn(
                    "min-w-[421px] min-h-[20px] flex gap-2 text-[14px] leading-5 text-gray6",
                    "mobile:min-w-0 mobile:flex-wrap mobile:text-[12px]"
                  )}
                >
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
                <div
                  className={cn(
                    "min-w-[235px] min-h-[20px] flex justify-end gap-1 text-[14px] leading-5 text-gray6",
                    "tablet:min-w-[210px]",
                    "mobile:min-w-0 mobile:w-full mobile:justify-start mobile:text-[12px] mobile:mt-2"
                  )}
                >
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
                    className="mobile:w-full mobile:h-auto"
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
                    className="mobile:h-[240px]"
                  />
                )}
                {!youtubeEmbedUrl && feedbackInfoData?.data?.link && (
                  <div className="w-[679px] min-h-[42px] mobile:w-full">
                    <div>{feedbackInfoData?.data?.link}</div>
                  </div>
                )}
              </div>
            )}
            <div
              className="text-[16px] leading-6 tracking-[-0.02em] text-gray7 mobile:text-[14px]"
              dangerouslySetInnerHTML={{ __html: feedbackInfoData?.content }}
            />
            <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
              <RecommendButton
                handleCommend={handleFeedbackCommend}
                recommendCount={feedbackInfoData?.recommendCount}
                isRecommend={feedbackInfoData?.isRecommended}
              />
            </div>
            <div className={cn("mobile:hidden")}>
              <PostAction type="community" />
            </div>
            <BoardComment
              id={id as string}
              publicId={feedbackInfoData?.publicId}
              ref={comments}
              setParentsComment={setParentsComment}
              type="IMPROVEMENT"
            />
            <PostNavigation
              nextId={feedbackInfoData?.nextId}
              previousId={feedbackInfoData?.previousId}
              currentPath={pathname}
            />
            <SignInModalPopUp
              isOpen={isSignInModalOpen}
              onClose={() => setIsSignInModalOpen(false)}
            />
          </div>
          <div className="shadow-md sticky bottom-0 z-50">
            <SendCommentBox
              id={id.toString()}
              type="NOTICE"
              parentsComment={parentsComment}
              setParentsComment={setParentsComment}
            />
          </div>
        </>
      )}
      <div
        className={cn(
          "w-[720px] min-h-[120px] rounded-t-[5px] overflow-hidden",
          "tablet:max-w-[687px]",
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
          "w-full h-auto rounded-[5px] shadow-md bg-white",
          "mobile:max-w-full"
        )}
      >
        <div
          className={cn(
            "w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
            "tablet:max-w-[687px]",
            "mobile:w-full mobile:max-w-full"
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
          {feedbackDataList?.pageInfo.totalPage > 0 && (
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
