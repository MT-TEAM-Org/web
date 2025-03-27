"use client";

import Refresh from "@/app/_components/icon/Refresh";
import useGetCommentList from "@/_hooks/fetcher/comment/useGetCommentList";
import CommentEmpty from "../../../../_components/_comment/CommentEmpty";
import MyPageInquirieCommentItem from "./MyPageInquirieCommentItem";
import { useState } from "react";
import { CommentItem, CommentResponse } from "@/_types/comment";
import CommentMoreButton from "@/app/_components/_comment/CommentMoreButton";

interface MyPageInquirieCommentProps {
  ref: React.RefObject<HTMLDivElement>;
  id: string;
  publicId: string;
  setParentsComment: (comment: CommentItem) => void;
}

const MyPageInquirieComment = ({
  ref,
  id,
  publicId,
  setParentsComment,
}: MyPageInquirieCommentProps) => {
  const [page, setPage] = useState<number>(1);
  const [commentTotalList, setCommentTotalList] = useState<CommentItem[]>();
  const {
    data: commentList,
    refetch,
    isLoading,
  } = useGetCommentList(id?.toString(), "INQUIRY", page);
  const { total, content } = (commentList?.data as CommentResponse) || {};
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const refetchComment = () => {
    setIsFocused(true);
    refetch();
    setTimeout(() => {
      setIsFocused(false);
    }, 550);
  };

  return (
    <>
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
            <button
              className={`cursor-pointer ${isFocused && "animate-spin"}`}
              onClick={refetchComment}
              disabled={isLoading}
            >
              <Refresh />
            </button>
            <p className="font-bold text-[14px] leading-[14px] text-gray6">
              새로고침
            </p>
          </div>
        </div>
        {!total ? (
          <CommentEmpty />
        ) : (
          content.map((comment) => (
            <MyPageInquirieCommentItem
              key={comment.commentId}
              comment={comment}
              publicId={publicId}
              setParentsComment={setParentsComment}
            />
          ))
        )}
      </div>
      <CommentMoreButton />
    </>
  );
};

export default MyPageInquirieComment;
