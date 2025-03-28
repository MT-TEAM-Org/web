"use client";

import useGetCommentList from "@/_hooks/fetcher/comment/useGetCommentList";
import { CommentItem, CommentResponse } from "@/_types/comment";
import CommentEmpty from "@/app/_components/_comment/CommentEmpty";
import CommentMoreButton from "@/app/_components/_comment/CommentMoreButton";
import Refresh from "@/app/_components/icon/Refresh";
import { useState } from "react";
import BoardCommentItem from "./BoardCommentItem";
import ToggleButton from "@/app/_components/_gnb/_components/ToggleButton";
import useGetBestComment from "@/_hooks/fetcher/comment/useGetBestComment";

interface BoardCommentProps {
  ref: React.RefObject<HTMLDivElement>;
  id: string | undefined;
  publicId: string;
  setParentsComment: (comment: CommentItem) => void;
}

const BoardComment = ({
  ref,
  id,
  publicId,
  setParentsComment,
}: BoardCommentProps) => {
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useGetCommentList(id, "BOARD");

  const {
    data: bestComment,
    refetch: bestRefetch,
    isLoading: bestIsLoading,
  } = useGetBestComment({ id, type: "BOARD" });

  const { pageInfo: bestPageInfo, content: bestContent } =
    (bestComment?.data?.content as CommentResponse) || {};

  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 모든 댓글
  const allComments =
    commentList?.pages.flatMap((page) => page.data.content.content) || [];

  const totalComments =
    commentList?.pages[0]?.data?.content?.pageInfo?.totalElement || 0;

  const refetchComment = () => {
    setIsFocused(true);
    refetch();
    bestRefetch();
    setTimeout(() => {
      setIsFocused(false);
    }, 550);
  };

  return (
    <>
      <div className="bg-gray1 rounded-t-[5px] rounded-b-[10px]" ref={ref}>
        <div className="flex justify-between items-center min-h-[48px] py-[4px] pl-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="font-[700] text-[18px] leading-[28px] text-gray8">
              댓글
            </span>
            <span className="text-[14px] leading-[20px] text-gray5">
              총 {totalComments}개
            </span>
          </div>
          <div className="flex">
            <div className="max-w-[101px] min-h-[40px] flex items-center px-[12px] py-[10px] gap-[8px] bg-[#FAFAFA] rounded-md">
              <button
                className={`cursor-pointer ${isFocused && "animate-spin"}`}
                onClick={refetchComment}
                disabled={isLoading || bestIsLoading}
              >
                <Refresh />
              </button>
              <p className="font-bold text-[14px] leading-[14px] text-gray6">
                새로고침
              </p>
            </div>
            <div className="w-auto h-auto rounded-[5px] px-3 py-[10px] flex gap-2 items-center text-center">
              <div className="flex gap-2 items-center justify-center">
                <p className="font-bold text-[14px] leading-[14px] text-gray6">
                  클린봇 활성화
                </p>
                <ToggleButton />
              </div>
            </div>
          </div>
        </div>
        {bestPageInfo?.totalElement
          ? bestContent.map((comment) => (
              <BoardCommentItem
                key={comment.commentId}
                comment={comment}
                publicId={publicId}
                setParentsComment={setParentsComment}
                best
              />
            ))
          : null}
        {!totalComments ? (
          <CommentEmpty />
        ) : (
          allComments.map((comment) => (
            <BoardCommentItem
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

export default BoardComment;
