import React from "react";
import Image from "next/image";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import CommentItem from "../../_components/CommentItem";
import ReplyCommentItem from "../../_components/ReplyCommentItem";
import Plus from "@/app/_components/icon/Plus";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import WriterComment from "../_components/WriterComment";
import { CustomerTalkToolbar } from "../_components/CustomerTalkToolbar";
import NoticeItem from "../_components/NoticeItem";

const page = () => {
  const nextButtonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px]";
  const topButtonStyle =
    "min-w-[120px] h-[auto] min-h-[40px] flex items-center justify-center rounded-[5px] border-[1px] border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-[8px] font-[700] text-[14px] leading-[14px]";

  return (
    <>
      <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-[#FFFFFF] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
        <div className="w-full max-w-[672px] min-h-[56px] border-b flex gap-2 flex-col">
          <h1 className="text-bold font-[18px] leading-7 tracking-[-0.72px]">
            안녕하세요 플레이 하이브입니다.
          </h1>
          <div className="w-full max-w-[672px] min-h-[20px] flex gap-4">
            <div className="w-full min-h-[20px] flex gap-2">
              <div className="min-w-[140px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-[#656565]">
                <p className="font-bold">고객센터</p>
                <p>공지사항</p>
                <p>1분 전</p>
              </div>
              <div className="min-w-[61px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-[#656565]">
                <p className="font-bold">조회수</p>
                <p>161</p>
              </div>
              <div className="min-w-[45px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-[#656565]">
                <p className="font-bold">댓글</p>
                <p>22</p>
              </div>
              <div className="min-w-[25px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-[#656565]">
                <p className="font-bold">추천</p>
                <p>13</p>
              </div>
            </div>
            <div className="min-w-[235px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-[#656565]">
              <p>스포츠가조아여여진심</p>
              <p>IP 106.101.**.***</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[672px] min-h-[188px] flex flex-col gap-3">
          <Image
            src="/Fake_noticeInfo.png"
            alt="notice img"
            width={672}
            height={128}
          />
          <p className="w-full max-w-[672px] min-h-[48px] font-medium text-[16px] leading-6 tracking-[-0.02em] text-[#424242]">
            앞으로 정말 잘부탁드리며 내용내용앞으로 정말 잘부탁드리며
            내용내용앞으로 정말 잘부탁드리며 내용내용앞으로 정말 잘부탁드리며
            내용내용앞으로 정말 잘부탁드리며 내용내용앞으로 정말 잘부탁드리며
            내용내용
          </p>
        </div>
        <div className="w-full max-w-[800px] flex flex-col">
          <CommentBar />
          <div className="w-full h-auto">
            <CommentItem bestComment={true} />
            <CommentItem
              bestComment={true}
              data={{ commentImg: "/Fake_comment_img.png" }}
            />
            <CommentItem
              bestComment={true}
              data={{ nestedComments: "@댓글유저디자인이렇게" }}
            />
            <WriterComment />
            <CommentItem />
            <CommentItem data={{ commentImg: "/Fake_comment_img.png" }} />
          </div>
          <div className="flex items-center justify-center">
            <button className="w-[160px] min-h-[40px] rounded-[5px] border px-4 py-[10px] flex gap-2 justify-center items-center font-bold text-[14px] leading-[14px] border-[#DBDBDB] bg-[#FAFAFA] text-[#424242] cursor-pointer">
              <Plus />
              댓글 더보기
            </button>
          </div>
        </div>
        <div className="w-full max-w-[672px] min-h-[40px] flex justify-between">
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
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] border-b">
        <CustomerTalkToolbar />
      </div>
      <div className="w-[720px] h-auto rounded-[5px] bg-[#FFFFFF]">
        {Array.from({ length: 20 }).map((_, index) => {
          return <NoticeItem key={index} number={20 - index} />;
        })}
      </div>
    </>
  );
};

export default page;
