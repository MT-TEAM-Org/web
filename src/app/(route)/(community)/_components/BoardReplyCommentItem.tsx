"use client";

import { CommentItem } from "@/_types/comment";
import { CalculateTime } from "@/app/_components/CalculateTime";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import Single_logo from "@/app/_components/icon/Single_logo";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteComment from "@/_hooks/fetcher/comment/useDeleteComment";
import { useToast } from "@/_hooks/useToast";
import useAuthCheck from "@/_hooks/useAuthCheck";

interface BoardReplyCommentItemProps {
  reply: CommentItem;
  publicId: string;
  setParentsComment: (comment: CommentItem) => void;
  parentNickname: string;
  boardId: string;
  depth?: number;
}

const BoardReplyCommentItem = ({
  reply,
  publicId,
  setParentsComment,
  parentNickname,
  boardId,
  depth = 1,
}: BoardReplyCommentItemProps) => {
  const queryClient = useQueryClient();
  const { success } = useToast();
  const { mutate: deleteComment, isPending: deleteCommentIsPending } =
    useDeleteComment(boardId);
  const { data: authCheck } = useAuthCheck();
  const isCommentAuthor = authCheck?.data?.data?.publicId === reply?.publicId; // 댓글 작성자와 로그인한 사용자가 같은지 확인
  const isBoardAuthor = authCheck?.data?.data?.publicId === publicId; // 게시글 작성자와 로그인한 사용자가 같은지 확인

  const handleDeleteComment = (comment: CommentItem) => {
    deleteComment(
      { commentId: comment.commentId.toString(), type: "BOARD" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["commentList", "BOARD", boardId],
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
    reply?.recommendCount >= 1 ? "min-w-[61px]" : "w-[53px]";
  return (
    <>
      <div className="flex gap-[12px] min-h-[112px] p-[12px] bg-gray1">
        <Arrow_reply size={18} />
        <div className="flex flex-col gap-[8px] flex-grow">
          <div className="flex flex-col gap-[12px] min-h-[52px]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[8px] min-h-[20px]">
                {isBoardAuthor && (
                  <div
                    className={`flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white bg-gray7`}
                  >
                    작성자
                  </div>
                )}
                <Image
                  alt="profile-image"
                  src={reply?.commenterImg || "/userProfileIsNull.png"}
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] rounded-full object-cover"
                />
                <h2 className="text-[14px] leading-[20px] text-gray6">
                  {reply?.nickname}
                </h2>
                <span className="text-[12px] leading-[18px] text-gray5">
                  {CalculateTime(reply?.createDate)}
                </span>
                <span className="text-[12px] leading-[18px] text-gray4">
                  {reply?.createdIp}
                </span>
              </div>
              <button
                className="text-[14px] text-gray5"
                onClick={() => {
                  isCommentAuthor
                    ? handleDeleteComment(reply)
                    : handleReportComment();
                }}
                disabled={deleteCommentIsPending}
              >
                {isCommentAuthor ? "삭제" : "신고"}
              </button>
            </div>
            {reply?.imageUrl && (
              <Image
                alt="comment-image"
                src={reply?.imageUrl}
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
            >
              <Single_logo width="12" height="12" fill="#00ADEE" />
              <div
                className={`flex gap-[2px] ${
                  reply?.recommended &&
                  "text-[#00ADEE] bg-white border-[#00ADEE]"
                }`}
              >
                추천
                {reply?.recommendCount >= 1 && (
                  <span>{reply?.recommendCount}</span>
                )}
              </div>
            </button>
            <button
              className="inline-flex h-6 items-center justify-center rounded-[5px] border border-gray3 bg-white px-2 py-[6px] gap-[10px] text-[12px] font-medium leading-none tracking-[-0.02em] text-gray7"
              onClick={() => setParentsComment(reply)}
            >
              답글 달기
            </button>
          </div>
        </div>
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
            />
          ))}
        </>
      )}
    </>
  );
};

export default BoardReplyCommentItem;
