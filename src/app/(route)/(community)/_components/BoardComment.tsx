"use client";

import useGetCommentList from "@/_hooks/fetcher/comment/useGetCommentList";
import { CommentItem, CommentResponse, CommentType } from "@/_types/comment";
import CommentEmpty from "@/app/_components/_comment/CommentEmpty";
import CommentMoreButton from "@/app/_components/_comment/CommentMoreButton";
import Refresh from "@/app/_components/icon/Refresh";
import { useEffect, useState, useCallback, useMemo } from "react";
import BoardCommentItem from "./BoardCommentItem";
import ToggleButton from "@/app/_components/_gnb/_components/ToggleButton";
import useGetBestComment from "@/_hooks/fetcher/comment/useGetBestComment";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import BadWordFilter from "badwords-ko";

interface BoardCommentProps {
  ref: React.RefObject<HTMLDivElement>;
  id: string | undefined;
  publicId?: string;
  setParentsComment: (comment: CommentItem) => void;
  type: CommentType;
}

const BoardComment = ({
  ref,
  id,
  publicId,
  setParentsComment,
  type,
}: BoardCommentProps) => {
  const searchParams = useSearchParams();
  const commentId = searchParams.get("commentId") || null;
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useGetCommentList(id, type);

  const {
    data: bestComment,
    refetch: bestRefetch,
    isLoading: bestIsLoading,
  } = useGetBestComment({ id, type });

  const { pageInfo: bestPageInfo, content: bestContent = [] } =
    (bestComment?.data?.content as CommentResponse) || {};

  // 모든 댓글 데이터 가져오기
  const allComments = useMemo(() => {
    return (
      commentList?.pages.flatMap((page) => page.data.content.content) || []
    );
  }, [commentList]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCommentLoaded, setIsCommentLoaded] = useState<boolean>(false);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(true);

  // 비속어 필터링 함수
  const filterBadWords = useCallback(
    (text: string): string => {
      if (!isFilterActive || !text) return text || "";

      try {
        const filter = new BadWordFilter();
        return filter.clean(text);
      } catch (error) {
        console.error("비속어 필터링 중 오류 발생:", error);
        return text || "";
      }
    },
    [isFilterActive]
  );

  // 댓글 데이터에 비속어 필터링 적용
  const filteredBestComments = useMemo(() => {
    if (!bestContent) return [];
    return bestContent.map((comment) => ({
      ...comment,
      comment: isFilterActive
        ? filterBadWords(comment.comment)
        : comment.comment,
      replyList:
        comment.replyList?.map((reply) => ({
          ...reply,
          comment: isFilterActive
            ? filterBadWords(reply.comment)
            : reply.comment,
        })) || [],
    }));
  }, [bestContent, isFilterActive, filterBadWords]);

  const filteredAllComments = useMemo(() => {
    if (!allComments) return [];
    return allComments.map((comment) => ({
      ...comment,
      comment: isFilterActive
        ? filterBadWords(comment.comment)
        : comment.comment,
      replyList:
        comment.replyList?.map((reply: CommentItem) => ({
          ...reply,
          comment: isFilterActive
            ? filterBadWords(reply.comment)
            : reply.comment,
        })) || [],
    }));
  }, [allComments, isFilterActive, filterBadWords]);

  useEffect(() => {
    if (commentId && !isCommentLoaded) {
      const checkAndScrollToComment = () => {
        const commentElement = document.getElementById(commentId);
        if (commentElement) {
          commentElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setIsCommentLoaded(true);
          return true;
        }
        return false;
      };

      if (!checkAndScrollToComment() && hasNextPage !== false) {
        fetchNextPage(); // 다음 페이지 댓글 로드
      }
    }
  }, [commentId, hasNextPage]);

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
          <div className="flex">
            <div
              className="max-w-[101px] min-h-[40px] flex items-center px-[12px] py-[10px] gap-[8px] bg-[#FAFAFA] rounded-md cursor-pointer"
              onClick={refetchComment}
              aria-disabled={isLoading || bestIsLoading}
            >
              <button
                className={`${isFocused && "animate-spin"}`}
                aria-label="댓글 새로고침 버튼"
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
            <div className="w-auto h-auto rounded-[5px] px-3 py-[10px] flex gap-2 items-center text-center">
              <div className="flex gap-2 items-center justify-center">
                <p
                  className={cn(
                    "font-bold text-[14px] leading-[14px] text-gray6",
                    "mobile:text-[12px]"
                  )}
                >
                  클린봇 활성화
                </p>
                <ToggleButton
                  isActive={isFilterActive}
                  onToggle={setIsFilterActive}
                />
              </div>
            </div>
          </div>
        </div>
        {bestPageInfo?.totalElement
          ? filteredBestComments.map((comment) => (
              <BoardCommentItem
                key={comment.commentId}
                comment={comment}
                publicId={type !== "NEWS" ? publicId : undefined}
                setParentsComment={setParentsComment}
                best
                type={type}
              />
            ))
          : null}
        {!totalComments ? (
          <CommentEmpty />
        ) : (
          filteredAllComments.map((comment) => (
            <BoardCommentItem
              key={comment.commentId}
              comment={comment}
              publicId={type !== "NEWS" ? publicId : undefined}
              setParentsComment={setParentsComment}
              type={type}
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
