"use client";

import { CommentItem } from "@/_types/comment";
import { CalculateTime } from "@/app/_components/CalculateTime";
import Single_logo from "@/app/_components/icon/Single_logo";
import Image from "next/image";
import BoardReplyCommentItem from "./BoardReplyCommentItem";
import { usePathname } from "next/navigation";
import useDeleteComment from "@/_hooks/fetcher/comment/useDeleteComment";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/_hooks/useToast";
import useAuthCheck from "@/_hooks/useAuthCheck";
import ConfirmModal from "@/app/_components/ConfirmModal";
import { useEffect, useState } from "react";

interface BoardCommentItemProps {
  comment: CommentItem;
  publicId: string;
  setParentsComment: (comment: CommentItem) => void;
  best?: boolean;
}

const BoardCommentItem = ({
  comment,
  publicId,
  setParentsComment,
  best = false,
}: BoardCommentItemProps) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const boardId = pathname.split("/").pop();
  const { success } = useToast();
  const { mutate: deleteComment, isPending: deleteCommentIsPending } =
    useDeleteComment(boardId);
  const { data: authCheck } = useAuthCheck();
  const [show, setShow] = useState(false);
  // publicId: 게시글 작성자의 publicId
  // authCheck?.data?.data?.publicId: 로그인한 사용자의 publicId
  // comment.publicId: 댓글 작성자의 publicId
  const isCommentAuthor = authCheck?.data?.data?.publicId === comment?.publicId; // 댓글 작성자와 로그인한 사용자가 같은지 확인
  const isBoardAuthor = comment?.publicId === publicId; // 게시글 작성자와 댓글 작성자가 같은지 확인

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
      { commentId: comment.commentId.toString(), type: "BOARD" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["commentList", "BOARD", boardId],
          });
          queryClient.invalidateQueries({
            queryKey: ["bestComment", { id: boardId, type: "BOARD" }],
          });
          success("댓글이 삭제되었습니다.", "");
        },
      }
    );
  };

  const handleReportComment = () => {
    alert("신고하기");
  };

  const recommendDivStyle =
    comment?.recommendCount >= 1 ? "min-w-[61px]" : "w-[53px]";

  return (
    <>
      <div className="flex flex-col gap-[8px] min-h-[112px] p-[12px] bg-white border-b border-gray1">
        <div className="flex flex-col gap-[12px] min-h-[52px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[8px] min-h-[20px]">
              {comment?.admin && (
                <div className="flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white bg-gra">
                  관리자
                </div>
              )}
              {isBoardAuthor && (
                <div
                  className={`flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white bg-gray7`}
                >
                  작성자
                </div>
              )}
              {best && (
                <div className="flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white bg-gra">
                  Best
                </div>
              )}
              <Image
                alt="profile-image"
                src={comment?.commenterImg || "/userProfileIsNull.png"}
                width={20}
                height={20}
                className="w-[20px] h-[20px] rounded-full object-cover"
              />
              <h2 className="text-[14px] leading-[20px] text-gray6">
                {comment?.nickname}
              </h2>
              <span className="text-[12px] leading-[18px] text-gray5">
                {CalculateTime(comment?.createDate)}
              </span>
              <span className="text-[12px] leading-[18px] text-gray4">
                {comment?.createdIp}
              </span>
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
          {comment?.imageUrl && (
            <Image
              alt="comment-image"
              src={comment?.imageUrl}
              width={200}
              height={200}
              className="w-[200px] h-[200px] object-cover rounded-[5px]"
            />
          )}
          <p className="text-[14px] leading-[20px] text-gray7">
            {comment?.comment}
          </p>
        </div>
        <div className="flex gap-[8px]">
          <button
            className={`${recommendDivStyle} h-[24px] rounded-[5px] border border-gray3 p-1 flex gap-1 justify-center items-center text-[12px] leading-[18px] font-medium tracking-[-0.02em]`}
          >
            <Single_logo width="12" height="12" fill="#00ADEE" />
            <div
              className={`flex gap-[2px] ${
                comment?.recommended &&
                "text-[#00ADEE] bg-white border-[#00ADEE]"
              }`}
            >
              추천
              {comment?.recommendCount >= 1 && (
                <span>{comment?.recommendCount}</span>
              )}
            </div>
          </button>
          <button
            className="inline-flex h-6 items-center justify-center rounded-[5px] border border-gray3 bg-white px-2 py-[6px] gap-[10px] text-[12px] font-medium leading-none tracking-[-0.02em] text-gray7"
            onClick={() => setParentsComment(comment)}
          >
            답글 달기
          </button>
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
      </div>
      {comment.replyList &&
        comment.replyList.map((reply) => (
          <div key={reply.commentId}>
            <BoardReplyCommentItem
              key={reply.commentId}
              reply={reply}
              publicId={publicId}
              boardId={boardId}
              setParentsComment={setParentsComment}
              parentNickname={comment.nickname}
            />
          </div>
        ))}
    </>
  );
};

export default BoardCommentItem;
