import React from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import Copy from "@/app/_components/icon/Copy";
import Share from "@/app/_components/icon/Share";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import WriterComment from "../../_components/WriterComment";
import LoadMoreComment from "../../../_components/LoadMoreComment";
import PostNavigation from "../../../_components/PostNavigation";
import { CustomerTalkToolbar } from "../../_components/CustomerTalkToolbar";
import FeedbackNoticeItem from "../../_components/FeedbackNoticeItem";
import FeedbackItem from "../../_components/FeedbackItem";
import CustomerCommentItem from "../../_components/CustomerCommentItem";

const infoItems = [
  { label: "조회수", value: "161" },
  { label: "댓글", value: "22" },
  { label: "추천", value: "13" },
];

const page = () => {
  return (
    <>
      <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex gap-4 flex-col shadow-md">
        <div className="w-full min-h-[96px] flex gap-2 flex-col">
          <div className="max-w-[69px] h-[32px] rounded-[2px] py-1 px-2 flex gap-[10px] bg-[#FAFAFA]">
            <p className="font-bold text-[14px] leading-5">접수 완료</p>
          </div>
          <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
            개선요청 사항입니다.
          </h1>
          <div className="w-full max-h-[20px] flex gap-4">
            <div className="w-full min-h-full flex gap-2 text-[14px] leading-5 text-[#656565]">
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
            <div className="min-w-[235px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-[#656565]">
              <p>스포츠가조아여여진심</p>
              <p>IP 106.101.**.***</p>
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
          <p className="text-[16px] leading-6 tracking-[-0.02em] text-[#424242]">
            승부예측 개선요청 사항할것들 입니다.승부예측 개선요청 사항할것들
            입니다.승부예측 개선요청 사항할것들 입니다.승부예측 개선요청
            사항할것들 입니다.승부예측 개선요청 사항할것들 입니다.
          </p>
        </div>
        <div className="w-full min-h-[40px] flex gap-2 items-center justify-center">
          <button className="flex items-center text-[14px] justify-center gap-2 min-w-[120px] w-auto h-[40px] px-4 py-[13px] mt-4 bg-[#00ADEE] text-[#FFFFFF] rounded-[5px]">
            <Single_logo />
            추천 13
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
        <div className="w-full max-w-[800px] flex flex-col">
          <CommentBar />
          <div className="w-full h-auto">
            <CustomerCommentItem bestComment={true} />
            <CustomerCommentItem
              bestComment={true}
              data={{ commentImg: "/Fake_comment_img.png" }}
            />
            <CustomerCommentItem
              bestComment={true}
              data={{ nestedComments: "@댓글유저디자인이렇게" }}
            />
            <WriterComment />
            <CustomerCommentItem />
            <CustomerCommentItem
              data={{ commentImg: "/Fake_comment_img.png" }}
            />
          </div>
          <LoadMoreComment />
        </div>
        <PostNavigation />
      </div>
      <CustomerTalkToolbar showOptions={true} />
      <div className="w-full h-auto rounded-[5px] shadow-md bg-[#FFFFFF]">
        <div className="w-[720px] h-auto rounded-b-[5px] mb-10 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
          {Array.from({ length: 2 }).map((_, index) => {
            return <FeedbackNoticeItem key={index} />;
          })}
          {Array.from({ length: 20 }).map((_, index) => (
            <FeedbackItem
              key={index}
              completed={index % 2 === 0}
              number={index + 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
