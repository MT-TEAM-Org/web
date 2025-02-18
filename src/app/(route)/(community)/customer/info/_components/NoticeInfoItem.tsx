import React from "react";
import PostNavigation from "../../../_components/PostNavigation";
import Image from "next/image";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import CommentItem from "../../../_components/CommentItem";
import WriterComment from "../../_components/WriterComment";
import LoadMoreComment from "../../../_components/LoadMoreComment";

const NoticeInfoItem = () => {
  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-[#FFFFFF] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
      <div className="w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col">
        <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
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

      <hr />

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
        <LoadMoreComment />
      </div>
      <PostNavigation />
    </div>
  );
};

export default NoticeInfoItem;
