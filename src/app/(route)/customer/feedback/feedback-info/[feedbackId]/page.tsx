"use client";

import React from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CustomerTalkToolbar from "../../../_components/CustomerTalkToolbar";
import NoticeItemSkeleton from "../../../_components/NoticeItemSkeleton";
import NoticeItem from "../../../_components/NoticeItem";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import EmptyItem from "../../../_components/EmptyItem";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import { useParams, useSearchParams } from "next/navigation";
import useTimeAgo from "@/utils/useTimeAgo";
import FeedbackInfoSkeleton from "./_components/FeedbackInfoSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { feedbackListConfig } from "../../../_types/feedbackListConfig";
import { getAdminRole } from "../../../_utils/adminChecker";
import StatusSaver from "./_components/StatusSaver";
import EmptyComment from "@/app/(route)/(community)/gameboard/_components/EmptyComment";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import PostAction from "@/app/(route)/(community)/_components/PostAction";

const Page = () => {
  const params = useParams();
  const id = params.feedbackId;
  const infoId = Number(id);
  const queryClient = useQueryClient();
  const adminRole = getAdminRole(queryClient);
  const searchParams = useSearchParams();
  const adminChecker = getAdminRole(queryClient);

  const feedbackOption: feedbackListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    orderType: searchParams.get(
      "order_type"
    ) as feedbackListConfig["orderType"],
    searchType: searchParams.get(
      "search_type"
    ) as feedbackListConfig["searchType"],
    search: searchParams.get("search"),
  };

  const {
    data: feedbackInfoData,
    isLoading: feedbackIsLoading,
    isError: feedbackIsError,
  } = useGetFeedbackInfoData({ id: infoId });

  const timeAgo = useTimeAgo(feedbackInfoData?.createdAt);

  const {
    data: feedbackDataList,
    isLoading,
    isError,
  } = useGetFeedbackDataList(feedbackOption);

  const infoItems = [
    { label: "조회수", value: feedbackInfoData?.viewCount },
    { label: "댓글", value: feedbackInfoData?.recommendCount },
    { label: "추천", value: feedbackInfoData?.commentCount },
  ];

  const statusBoxClass =
    "w-[65px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px]";

  const statusContent = {
    RECEIVED: (
      <div className={`${statusBoxClass} bg-gray1`}>
        <p className="font-bold text-[14px] leading-5">접수 완료</p>
      </div>
    ),
    COMPLETED: (
      <div className={`${statusBoxClass} bg-bg0`}>
        <p className="font-bold text-[14px] leading-5 text-gra">개선 완료</p>
      </div>
    ),
  };

  return (
    <>
      {feedbackIsLoading || feedbackIsError ? (
        <FeedbackInfoSkeleton />
      ) : (
        <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md">
          {adminChecker === "ADMIN" && <StatusSaver />}
          <div className="w-full h-[96px] flex gap-2 flex-col">
            {adminChecker === "ADMIN" &&
              statusContent[feedbackInfoData?.status]}
            <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
              {feedbackInfoData?.title}
            </h1>
            <div className="w-full max-h-[20px] flex gap-4">
              <div className="w-full min-h-full flex gap-2 text-[14px] leading-5 text-gray6">
                <p className="font-bold">고객센터</p>
                <p>개선요청</p>
                <p>{timeAgo}</p>
                {infoItems.map((item, index) => (
                  <div key={index} className="min-w-auto min-h-full flex gap-2">
                    <p className="font-bold">{item.label}</p>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="w-auto min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6">
                <p>{feedbackInfoData?.nickname}</p>
                <p>{feedbackInfoData?.clientIp}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full min-h-aut flex flex-col gap-3">
            <Image
              src={
                feedbackInfoData?.imgUrl
                  ? feedbackInfoData?.imgUrl
                  : "/Empty_news.png"
              }
              alt="Feedback img"
              width={672}
              height={128}
            />
            <p className="text-[16px] leading-6 tracking-[-0.02em] text-gray7">
              {feedbackInfoData?.content}
            </p>
          </div>
          <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
            <button className="flex items-center text-[14px] justify-center gap-2 min-w-[120px] w-auto h-[40px] px-4 py-[13px] mt-4 bg-[#00ADEE] text-white rounded-[5px]">
              <Single_logo />
              추천 13
            </button>
          </div>
          <PostAction type="community" />
          <div className="w-full max-w-[800px] flex flex-col">
            <CommentBar />
            <EmptyComment />
          </div>
          <PostNavigation />
        </div>
      )}
      <CustomerTalkToolbar
        showOptions={true}
        adminChecker={adminRole}
        paginationData={feedbackDataList?.pageInfo}
      />
      <div className="w-full h-auto rounded-[5px] shadow-md bg-white">
        <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <NoticeItemSkeleton key={index} />
            ))
          ) : feedbackDataList?.content?.length === 0 || isError ? (
            <EmptyItem title="공지사항이" />
          ) : (
            feedbackDataList?.content?.map(
              (noticeListData: NoticeContentType) => (
                <NoticeItem
                  noticeData={noticeListData}
                  key={noticeListData?.id}
                />
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
