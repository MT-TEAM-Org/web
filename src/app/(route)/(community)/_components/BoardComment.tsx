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
  const [page, setPage] = useState<number>(1);
  const [commentTotalList, setCommentTotalList] = useState<CommentItem[]>();
  const {
    data: commentList,
    refetch,
    isLoading,
  } = useGetCommentList(id, "BOARD", page);
  const {
    data: bestComment,
    refetch: bestRefetch,
    isLoading: bestIsLoading,
  } = useGetBestComment({ id, type: "BOARD" });
  const { total: bestTotal, content: bestContent } =
    (bestComment?.data as CommentResponse) || {};
  const { total, content } = (commentList?.data as CommentResponse) || {};
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        {bestTotal
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
        {!total ? (
          <CommentEmpty />
        ) : (
          content.map((comment) => (
            <BoardCommentItem
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

export default BoardComment;
