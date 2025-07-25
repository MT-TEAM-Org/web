"use client";

import { CommentItem, CommentType } from "@/_types/comment";
import { CalculateTime } from "@/app/_components/CalculateTime";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import Single_logo from "@/app/_components/icon/Single_logo";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteComment from "@/_hooks/fetcher/comment/useDeleteComment";
import { useToast } from "@/_hooks/useToast";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { useEffect, useState } from "react";
import ConfirmModal from "@/app/_components/ConfirmModal";
import useRecommendComment from "@/_hooks/fetcher/comment/useRecommendComment";
import useDeleteRecommendComment from "@/_hooks/fetcher/comment/useDeleteRecommendComment";
import CommentReportModal from "./CommentReportModal";
import { ReportType } from "@/services/board/types/report";
import { cn } from "@/utils";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import { useAuthStore } from "@/utils/Store";
import { cleanContent } from "@/utils/secure/sanitize";

interface BoardReplyCommentItemProps {
  reply: CommentItem;
  publicId?: string;
  setParentsComment: (comment: CommentItem) => void;
  parentNickname: string;
  boardId: string;
  depth?: number;
  type: CommentType;
}

const BoardReplyCommentItem = ({
  reply,
  publicId,
  setParentsComment,
  parentNickname,
  boardId,
  depth = 1,
  type,
}: BoardReplyCommentItemProps) => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const { mutate: deleteComment, isPending: deleteCommentIsPending } =
    useDeleteComment(boardId);
  const { data: authCheck } = useAuthCheck();
  const { mutate: recommendComment, isPending: recommendIsPending } =
    useRecommendComment();
  const {
    mutate: deleteRecommendComment,
    isPending: deleteRecommendIsPending,
  } = useDeleteRecommendComment();
  const [show, setShow] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [isRecommend, setIsRecommend] = useState({
    recommend: reply?.recommended,
    recommendCount: reply?.recommendCount,
  });
  const reportData = {
    reportedPublicId: reply?.publicId,
    reportType: "COMMENT" as ReportType,
    reportedContentId: reply?.commentId,
  };
  const [guestModal, setGuestModal] = useState(false);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    setIsRecommend({
      recommend: reply?.recommended,
      recommendCount: reply?.recommendCount,
    });
  }, [reply]);

  // publicId: 게시글 작성자의 publicId
  // authCheck?.data?.data?.publicId: 로그인한 사용자의 publicId
  // comment.publicId: 댓글 작성자의 publicId
  const isCommentAuthor =
    isLoggedIn && authCheck?.data?.data?.publicId === reply?.publicId; // 댓글 작성자와 로그인한 사용자가 같은지 확인
  const isBoardAuthor =
    type !== "NEWS" ? reply?.publicId === publicId : undefined; // 게시글 작성자와 댓글 작성자가 같은지 확인

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [show]);

  const handleDeleteComment = () => {
    deleteComment(
      { commentId: reply.commentId.toString(), type },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["commentList", type, boardId],
          });
          queryClient.invalidateQueries({
            queryKey: ["bestComment", { id: boardId, type }],
          });
          success("댓글이 삭제되었습니다.", "");
        },
      }
    );
  };

  const handleRecommendComment = (commentId: number) => {
    if (!isLoggedIn) {
      setGuestModal(true);
      return;
    }

    setIsRecommend((prev) => {
      const nextRecommend = !prev.recommend;
      const nextRecommendCount = nextRecommend
        ? prev.recommendCount + 1
        : prev.recommendCount - 1;

      if (nextRecommend) {
        recommendComment(commentId, {
          onSuccess: () => {
            success("추천되었습니다.", "");
            queryClient.invalidateQueries({
              queryKey: ["bestComment", { id: boardId, type }],
            });
          },
          onError: () => {
            setIsRecommend(prev);
            error("추천에 실패했습니다.", "");
          },
        });
      } else {
        deleteRecommendComment(commentId, {
          onSuccess: () => {
            error("추천이 취소되었습니다.", "");
            queryClient.invalidateQueries({
              queryKey: ["bestComment", { id: boardId, type }],
            });
          },
          onError: () => {
            setIsRecommend(prev);
            error("추천 취소에 실패했습니다.", "");
          },
        });
      }

      return { recommend: nextRecommend, recommendCount: nextRecommendCount };
    });
  };

  const handleReportComment = () => {
    if (!isLoggedIn) {
      setGuestModal(true);
      return;
    }
    setActiveModal(true);
  };

  const recommendDivStyle =
    isRecommend.recommendCount >= 1 ? "min-w-[61px]" : "w-[53px]";
  return (
    <>
      <div
        id={reply?.commentId.toString()}
        className="flex gap-[12px] min-h-[112px] p-[12px] bg-gray1"
      >
        <Arrow_reply size={18} />
        <div className="flex flex-col gap-[8px] flex-grow">
          <div className="flex flex-col gap-[12px] min-h-[52px]">
            <div className="flex justify-between items-center">
              <div
                className={cn(
                  "flex items-center gap-[8px] min-h-[20px]",
                  "items-start"
                )}
              >
                {reply?.admin && (
                  <div className="flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white bg-gra">
                    관리자
                  </div>
                )}
                {isBoardAuthor && !reply?.admin && type !== "NEWS" && (
                  <div
                    className={`flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white bg-gray7`}
                  >
                    작성자
                  </div>
                )}
                <Image
                  alt="profile-image"
                  src={
                    cleanContent(reply?.commenterImg) ||
                    "/userProfileIsNull.png"
                  }
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] rounded-full object-cover"
                />
                <div
                  className={cn(
                    "flex items-center gap-[8px]",
                    "mobile:flex-col mobile:gap-0 mobile:items-start mobile:justify-center"
                  )}
                >
                  <h2 className="text-[14px] leading-[20px] text-gray6">
                    {reply?.nickname}
                  </h2>
                  <div
                    className={cn(
                      "flex items-center gap-[8px]",
                      "mobile:gap-[4px]"
                    )}
                  >
                    <span className="text-[12px] leading-[18px] text-gray5">
                      {CalculateTime(reply?.createDate)}
                    </span>
                    <span className="text-[12px] leading-[18px] text-gray4">
                      {reply?.createdIp}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="text-[14px] text-gray5"
                onClick={() =>
                  isCommentAuthor ? setShow(true) : handleReportComment()
                }
                disabled={deleteCommentIsPending}
              >
                {isCommentAuthor ? "삭제" : "신고"}
              </button>
            </div>
            {reply?.imageUrl && (
              <Image
                alt="comment-image"
                src={cleanContent(reply?.imageUrl)}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-cover rounded-[5px]"
              />
            )}
            <p className="text-[14px] leading-[20px] text-gray7">
              {depth > 1 && (
                <span className="text-[#00ADEE] mr-[4px]">
                  @{parentNickname}
                </span>
              )}
              {reply?.comment}
            </p>
          </div>
          <div className="flex gap-[8px]">
            <button
              className={`${recommendDivStyle} h-[24px] rounded-[5px] border border-gray3 p-1 flex gap-1 justify-center items-center text-[12px] leading-[18px] font-medium tracking-[-0.02em]`}
              onClick={() => handleRecommendComment(reply?.commentId)}
              disabled={recommendIsPending || deleteRecommendIsPending}
            >
              <Single_logo width="12" height="12" fill="#00ADEE" />
              <div
                className={`flex gap-[2px] ${
                  isRecommend.recommend &&
                  "text-[#00ADEE] bg-white border-[#00ADEE]"
                }`}
              >
                추천
                {isRecommend.recommendCount >= 1 && (
                  <span>{isRecommend.recommendCount}</span>
                )}
              </div>
            </button>
            {depth !== 3 && (
              <button
                className="inline-flex h-6 items-center justify-center rounded-[5px] border border-gray3 bg-white px-2 py-[6px] gap-[10px] text-[12px] font-medium leading-none tracking-[-0.02em] text-gray7"
                onClick={() => {
                  if (!isLoggedIn) {
                    setGuestModal(true);
                    return;
                  }
                  setParentsComment(reply);
                }}
              >
                답글 달기
              </button>
            )}
          </div>
        </div>
        <ConfirmModal
          closeText="취소"
          confirmText="네, 삭제할게요."
          isPending={deleteCommentIsPending}
          show={show}
          onClose={() => setShow(false)}
          title="댓글을 삭제하시겠습니까?"
          message="삭제된 댓글은 복구할 수 없습니다."
          onConfirm={handleDeleteComment}
        />
        {activeModal && (
          <CommentReportModal
            setActiveModal={setActiveModal}
            reportData={reportData}
          />
        )}
        <SignInModalPopUp
          isOpen={guestModal}
          onClose={() => setGuestModal(false)}
        />
      </div>
      {reply.replyList && reply.replyList.length > 0 && (
        <>
          {reply.replyList.map((nestedReply) => (
            <BoardReplyCommentItem
              key={nestedReply.commentId}
              reply={nestedReply}
              publicId={publicId}
              setParentsComment={setParentsComment}
              parentNickname={reply.nickname}
              boardId={boardId}
              depth={depth + 1}
              type={type}
            />
          ))}
        </>
      )}
    </>
  );
};

export default BoardReplyCommentItem;
