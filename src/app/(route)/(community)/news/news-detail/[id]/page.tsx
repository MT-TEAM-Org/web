"use client";

import React, { use } from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import Share from "@/app/_components/icon/Share";
import CommentContainer from "./_components/CommentContainer";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import { NewsTalkToolbar } from "../../../_components/NewsTalkToolbar";
import NewsPostItem from "../../_components/NewsPostItem";
import Copy from "@/app/_components/icon/Copy";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import SendCommentBox from "../../../_components/SendCommentBox";
import { NewsItemType } from "@/app/_constants/newsItemType";
import useGetNewsDataList from "@/_hooks/useGetNewsDataList";
import useGetNewsInfoData from "@/_hooks/useGetNewsInfoData";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data } = useGetNewsInfoData(id);
  console.log("data: ", data);
  const { data: newsListData } = useGetNewsDataList();
  const sliceNewsListData = newsListData ? newsListData.slice(0, 3) : [];

  const changeCategory = (category: string) => {
    switch (category) {
      case "BASEBALL":
        return "야구";
      case "FOOTBALL":
        return "축구";
      case "ESPORTS":
        return "e스포츠";
    }
  };

  const nextButtonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px]";
  const topButtonStyle =
    "min-w-[120px] h-[auto] min-h-[40px] flex items-center justify-center rounded-[5px] border-[1px] border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-[8px] font-[700] text-[14px] leading-[14px]";

  return (
    <>
      <div className="flex flex-col gap-4 w-[720px] min-h-[1051px] bg-white p-[24px] rounded-md mb-[16px]">
        <div className="flex flex-col gap-2 max-w-[672px] min-h-[84px] mb-2 rounded-sm">
          <h1 className="w-[672px] max-h-[56px] font-[700] text-[18px] leading-[28px] text-[#303030]">
            {data?.title}
          </h1>

          <div className="w-[672px] h-[20px] gap-4 flex justify-between text-[#EEEEEE] pb-4">
            <div className="flex gap-2 text-[#656565] font-[700] leading-5 text-[14px]">
              <div className="flex gap-1">
                <p className="font-bold text-[14px] leading-5">
                  {changeCategory(data?.category)}
                </p>
                <p className="font-medium text-[14px] leading-5">
                  {data?.postDate}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold text-[14px] leading-5">
                  조회수 {data?.viewCount}
                </p>
                <p className="font-medium text-[14px] leading-5">
                  댓글 {data?.commentCount}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold text-[14px] leading-5">추천</p>
                <p className="font-medium text-[14px] leading-5">
                  {data?.recommendCount}
                </p>
              </div>
            </div>
            <div className="text-[14px] flex font-[500] leading-5 gap-1 text-[#656565]">
              <p>네이버 스포츠</p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3 mt-4">
            <Image
              src={data?.thumbImg ? data?.thumbImg : "/Fake_newsInfo.png"}
              alt="News detail img"
              width={672}
              height={338}
              className="mb-3"
            />
            <p className="font-[500] text-[16px] leading-6 text-[#424242]">
              (엑스포츠뉴스 나승우 기자) 토트넘 홋스퍼가 손흥민의 귀중한
              선제골을 지키지 못하고 아스널 원정에서 역전패를 당했다. 이날 명단
              포함이 기대됐던 한국 유망주 양민혁은 직전 FA컵 경기에 이어 아예
              명단 제외됐다. 토트...
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <button className="flex items-center text-[14px] justify-center gap-1 min-w-[120px] w-auto h-[40px] px-4 py-[13px] mt-4 bg-[#00ADEE] text-[#FFFFFF] rounded-[5px]">
              <Single_logo />
              추천 12
            </button>
          </div>

          <div className="flex justify-between mb-4">
            <button className="min-w-[104px] w-auto min-h-[32px] h-[32px] rounded-[5px] text-[14px] font-[500] flex items-center justify-center bg-[#FFFFFF] px-3 py-[9px] border border-[#DBDBDB]">
              기사 원문 보기
            </button>
            <div className="flex gap-2">
              <button className="min-w-[138px] max-h-[32px] flex justify-center gap-1 items-center bg-[#FFFFFF] px-3 py-2 rounded-[5px] border border-[#DBDBDB] text-[14px] leading-[14px] font-medium">
                <Copy />
                게시글 URL 복사
              </button>
              <button className="min-w-[91px] max-h-[32px] flex justify-center gap-1 items-center bg-[#FFFFFF] pr-[12px] pl-[10px] py-2 rounded-[5px] border border-[#DBDBDB] text-[14px] leading-[14px] font-medium">
                <Share />
                공유하기
              </button>
            </div>
          </div>

          <div className="max-w-[672px] min-h-[48px]">
            <CommentBar data={data} />

            <div className="max-w-full min-h-full">
              <CommentContainer />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className={nextButtonStyle}>
                <Arrow_up />
                이전글
              </button>
              <button className={nextButtonStyle}>
                <Arrow_down />
                다음글
              </button>
            </div>
            <div className="flex gap-2">
              <button className={topButtonStyle}>
                <Arrow_up />
                댓글 맨위로
              </button>
              <button className={topButtonStyle}>
                <Double_arrow_up />
                게시글 맨위로
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <NewsTalkToolbar />
      </div>
      <div className="w-[720px] min-h-[348px] rounded-b-[5px] rounded-bl-[5px] overflow-hidden">
        {sliceNewsListData?.map((data: NewsItemType) => (
          <div key={data.id}>
            <NewsPostItem newsItem={data} />
          </div>
        ))}
      </div>
      <div>
        <SendCommentBox />
      </div>
    </>
  );
};

export default Page;
