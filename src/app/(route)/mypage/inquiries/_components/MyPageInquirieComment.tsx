"use client";

import Refresh from "@/app/_components/icon/Refresh";
import useGetCommentList from "@/_hooks/fetcher/comment/useGetCommentList";
import CommentEmpty from "../../../../_components/_comment/CommentEmpty";
import MyPageInquirieCommentItem from "./MyPageInquirieCommentItem";
import { useState } from "react";
import { CommentItem, CommentResponse } from "@/_types/comment";
import CommentMoreButton from "@/app/_components/_comment/CommentMoreButton";
import { cn } from "@/utils";

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
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useGetCommentList(id?.toString(), "INQUIRY");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // 모든 댓글
  const allComments =
    commentList?.pages.flatMap((page) => page.data.content.content) || [];

  const totalComments =
    commentList?.pages[0]?.data?.content?.pageInfo?.totalElement || 0;

  const refetchComment = () => {
    setIsFocused(true);
    refetch();
    setTimeout(() => {
      setIsFocused(false);
    }, 550);
  };

  return (
    <>
      <div className={cn("min-h-[232px]", "mobile:min-h-0")} ref={ref}>
        <div className="flex justify-between items-center min-h-[48px] py-[4px] pl-[16px] bg-gray1 rounded-t-[5px]">
          <div className="flex items-center gap-[8px]">
            <span
              className={cn(
                "font-[700] text-[18px] leading-[28px] text-gray8",
                "mobile:text-[12px]"
              )}
            >
              댓글
            </span>
            <span
              className={cn(
                "text-[14px] leading-[20px] text-gray5",
                "mobile:text-[12px]"
              )}
            >
              총 {totalComments}개
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
            <p
              className={cn(
                "font-bold text-[14px] leading-[14px] text-gray6",
                "mobile:text-[12px]"
              )}
            >
              새로고침
            </p>
          </div>
        </div>
        {!totalComments ? (
          <CommentEmpty />
        ) : (
          allComments.map((comment) => (
            <MyPageInquirieCommentItem
              key={comment.commentId}
              comment={comment}
              publicId={publicId}
              setParentsComment={setParentsComment}
            />
          ))
        )}
      </div>
      {hasNextPage && (
        <CommentMoreButton
          onClick={() => fetchNextPage()}
          disabled={isLoading}
        />
      )}
    </>
  );
};

export default MyPageInquirieComment;
