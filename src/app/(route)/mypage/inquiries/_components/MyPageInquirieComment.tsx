"use client";

import Refresh from "@/app/_components/icon/Refresh";
import useGetInquiriesCommentList from "@/_hooks/fetcher/mypage/useGetInquiriesCommentList";
import MyPageInquirieCommentEmpty from "./MyPageInquirieCommentEmpty";
import MyPageInquirieCommentItem from "./MyPageInquirieCommentItem";
import { useState } from "react";

interface MyPageInquirieCommentProps {
  ref: React.RefObject<HTMLDivElement>;
  id: string | undefined;
  publicId: string;
}

interface InquirieCommentReply {
  inquiryReplyId: number;
  inquiryCommentId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  imageUrl: string;
  comment: string;
  recommendCount: number;
  mentionedPublicId: string;
  mentionedNickname: string;
  createDate: string;
  lastModifiedDate: string;
}

interface InquirieCommentContent {
  inquiryCommentId: number;
  inquiryId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  imageUrl: string;
  recommendCount: number;
  comment: string;
  createDate: string;
  boardReplyList: InquirieCommentReply[];
}

interface InquirieCommentData {
  total: number;
  content: InquirieCommentContent[];
}

const MyPageInquirieComment = ({
  ref,
  id,
  publicId,
}: MyPageInquirieCommentProps) => {
  const { data: commentList, refetch } = useGetInquiriesCommentList(id, !!id);
  const { total, content } = (commentList?.data as InquirieCommentData) || {};
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const refetchComment = () => {
    setIsFocused(true);
    refetch();
    setTimeout(() => {
      setIsFocused(false);
    }, 550);
  };

  return (
    <div
      className="min-h-[232px] bg-gray1 rounded-t-[5px] rounded-b-[10px]"
      ref={ref}
    >
      <div className="flex justify-between items-center min-h-[48px] py-[4px] pl-[16px]">
        <div className="flex items-center gap-[8px]">
          <span className="font-[700] text-[18px] leading-[28px] text-gray8">
            댓글
          </span>
          <span className="text-[14px] leading-[20px] text-gray5">
            총 {total}개
          </span>
        </div>
        <div className="max-w-[101px] min-h-[40px] flex items-center px-[12px] py-[10px] gap-[8px] bg-[#FAFAFA] rounded-md">
          <div
            className={`cursor-pointer ${isFocused && "animate-spin"}`}
            onClick={refetchComment}
          >
            <Refresh />
          </div>
          <p className="font-bold text-[14px] leading-[14px] text-gray6">
            새로고침
          </p>
        </div>
      </div>
      {!total ? (
        <MyPageInquirieCommentEmpty />
      ) : (
        content.map((comment) => (
          <MyPageInquirieCommentItem
            key={comment.inquiryCommentId}
            comment={comment}
            publicId={publicId}
          />
        ))
      )}
    </div>
  );
};

export default MyPageInquirieComment;
