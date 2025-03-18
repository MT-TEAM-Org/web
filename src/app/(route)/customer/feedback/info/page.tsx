"use client";

import React, { useState } from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import Copy from "@/app/_components/icon/Copy";
import Share from "@/app/_components/icon/Share";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CustomerTalkToolbar from "../../_components/CustomerTalkToolbar";
import NoticeItemSkeleton from "../../_components/NoticeItemSkeleton";
import NoticeItem from "../../_components/NoticeItem";
import { NoticeContentType } from "@/app/_constants/customer/NoticeItemType";
import EmptyItem from "../../_components/EmptyItem";
import useGetFeedbackDataList from "@/_hooks/fetcher/customer/useGetFeedbackDataList";
import useGetFeedbackInfoData from "@/_hooks/fetcher/customer/useGetFeedbackInfoData";
import { useParams } from "next/navigation";

const infoItems = [
  { label: "조회수", value: "161" },
  { label: "댓글", value: "22" },
  { label: "추천", value: "13" },
];

const Page = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchType, setSearchType] = useState("");
  const [order, setOrder] = useState("CREATE");
  const [search, setSearch] = useState("");
  const params = useParams();
  const id = params;

  const {
    data: feedbackInfoData,
    isLoading: feedbackIsLoading,
    isError: feedbackIsError,
  } = useGetFeedbackInfoData({ id });

  console.log("feedbackInfoData: ", feedbackInfoData);

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetFeedbackDataList({ pageNum, order, searchType, search });

  return (
    <>
      <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md">
        <div className="w-full min-h-[96px] flex gap-2 flex-col">
          <div className="max-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-gray1">
            <p className="font-bold text-[14px] leading-5">접수 완료</p>
          </div>
          <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
            개선요청 사항입니다.
          </h1>
          <div className="w-full max-h-[20px] flex gap-4">
            <div className="w-full min-h-full flex gap-2 text-[14px] leading-5 text-gray6">
              <p className="font-bold">고객센터</p>
              <p>개선요청</p>
              <p>1분 전</p>
              {infoItems.map((item, index) => (
                <div key={index} className="min-w-auto min-h-full flex gap-2">
                  <p className="font-bold">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="min-w-[235px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6">
              <p>스포츠가조아여여진심</p>
              <p>IP 106.101.**.***</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full min-h-aut flex flex-col gap-3">
          <Image
            src={"/Fake_noticeInfo.png"}
            alt="Fake img"
            width={672}
            height={128}
          />
          <p className="text-[16px] leading-6 tracking-[-0.02em] text-gray7">
            승부예측 개선요청 사항할것들 입니다.승부예측 개선요청 사항할것들
            입니다.승부예측 개선요청 사항할것들 입니다.승부예측 개선요청
            사항할것들 입니다.승부예측 개선요청 사항할것들 입니다.
          </p>
        </div>
        <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
          <button className="flex items-center text-[14px] justify-center gap-2 min-w-[120px] w-auto h-[40px] px-4 py-[13px] mt-4 bg-[#00ADEE] text-white rounded-[5px]">
            <Single_logo />
            추천 13
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <button className="min-w-[104px] w-auto min-h-[32px] h-[32px] rounded-[5px] text-[14px] font-[500] flex items-center justify-center bg-white px-3 py-[9px] border border-gray3">
            기사 원문 보기
          </button>
          <div className="flex gap-2">
            <button className="min-w-[138px] max-h-[32px] flex justify-center gap-1 items-center bg-white px-3 py-2 rounded-[5px] border border-gray3 text-[14px] leading-[14px] font-medium">
              <Copy />
              게시글 URL 복사
            </button>
            <button className="min-w-[91px] max-h-[32px] flex justify-center gap-1 items-center bg-white pr-[12px] pl-[10px] py-2 rounded-[5px] border border-gray3 text-[14px] leading-[14px] font-medium">
              <Share />
              공유하기
            </button>
          </div>
        </div>
        {/* <div className="w-full max-w-[800px] flex flex-col">
          댓글부분
        </div> */}
        <PostNavigation />
      </div>
      <CustomerTalkToolbar showOptions={true} />
      <div className="w-full h-auto rounded-[5px] shadow-md bg-white">
        <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <NoticeItemSkeleton key={index} />
            ))
          ) : noticeListData?.content?.length === 0 || isError ? (
            <EmptyItem title="공지사항이" />
          ) : (
            noticeListData?.content?.map(
              (noticeListData: NoticeContentType, index) => {
                <NoticeItem noticeData={noticeListData} />;
              }
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
