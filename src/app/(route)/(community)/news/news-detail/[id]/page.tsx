import React from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import Share from "@/app/_components/icon/Share";
import Coppy from "@/app/_components/icon/Coppy";
import Refresh from "@/app/_components/icon/Refresh";
import CommentContainer from "./_components/CommentContainer";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Plus from "@/app/_components/icon/Plus";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import Send_icon from "@/app/_components/icon/Send_icon";
import { NewsTalkToolbar } from "../../../_components/NewsTalkToolbar";
import NewsPostItem from "../../_components/NewsPostItem";

const page = () => {
  const nextButtonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px]";
  const topButtonStyle =
    "min-w-[120px] h-[auto] min-h-[40px] flex items-center justify-center rounded-[5px] border-[1px] border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-[8px] font-[700] text-[14px] leading-[14px]";

  return (
    <>
      <div className="flex flex-col gap-4 w-[720px] min-h-[1051px] bg-white p-[24px] rounded-md mb-[16px]">
        <div className="flex flex-col gap-2 max-w-[672px] min-h-[84px] mb-2 rounded-sm">
          <h1 className="font-[700] text-[18px] leading-[28px] text-[#303030]">
            토트넘 강등? 손흥민 선제골 '쾅'→수비 '와르르' 2실점…아스널 원정서
            1-2 역전패→충격의 13위 [PL 리뷰]
          </h1>

          <div className="flex justify-between text-[#EEEEEE] pb-4">
            <div className="flex gap-2 text-[#656565] font-[700] leading-5 text-[14px]">
              <div className="flex gap-1">
                <p>축구</p>
                <p>1분 전</p>
              </div>
              <div className="flex gap-1">
                <p>조회수 161</p>
                <p>댓글 2</p>
              </div>
              <div className="flex gap-1">
                <p>추천</p>
                <p>12</p>
              </div>
            </div>
            <div className="text-[14px] flex font-[500] leading-5 gap-1 text-[#656565]">
              <p>네이버 스포츠</p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3 mt-4">
            <Image
              src="/Fake_newsInfo.png"
              alt="Fake News"
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
                <Coppy />
                게시글 URL 복사
              </button>
              <button className="min-w-[91px] max-h-[32px] flex justify-center gap-1 items-center bg-[#FFFFFF] pr-[12px] pl-[10px] py-2 rounded-[5px] border border-[#DBDBDB] text-[14px] leading-[14px] font-medium">
                <Share />
                공유하기
              </button>
            </div>
          </div>

          <div className="max-w-[672px] min-h-[48px]">
            <div className="max-w-full min-h-full flex justify-between items-center bg-[#FAFAFA] text-[#656565] rounded-md">
              <div className="flex items-center gap-2 ml-4">
                <h1 className="text-[#303030] text-[18px] leading-7 font-[700]">
                  댓글
                </h1>
                <p className="text-[#A6A6A6] text-[14px] leading-5 font-[500]">
                  총 12개
                </p>
              </div>
              <div className="max-w-[101px] min-h-[40px] flex justify-center items-center px-2 py-3 gap-2 mr-4 bg-[#FAFAFA] rounded-md">
                <Refresh />
                <p className="text-[14px] leading-[14px] font-[700]">
                  새로고침
                </p>
              </div>
            </div>

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
      <div className="w-[720px] min-h-[348px] rounded-[5px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <NewsPostItem key={index} />
        ))}
      </div>
      <div>
        <div className="w-[720px] h-auto p-4 bg-[#FFFFFF] flex gap-4 items-center justify-between">
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-[#EEEEEE] py-[10px] gap-[10px] bg-[#FAFAFA]">
            <Plus />
          </button>
          <input
            type="text"
            placeholder="상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!"
            className="min-w-[576px] h-[40px] rounded-[5px] border border-[#181818] py-3 px-4 gap-4"
          />
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-[#EEEEEE] py-[16px] gap-[10px] bg-[#FAFAFA]">
            <Send_icon />
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
