// MyPageInquirieCommentItem.tsx
import Image from "next/image";
import { CalculateTime } from "@/app/_components/CalculateTime";
import { ParentsComment } from "../_types/inquiries";
import ReplyCommentItem from "./ReplyCommentItem";

interface MyPageInquirieCommentItemProps {
  comment: ParentsComment;
  publicId: string;
  setParentsComment: (comment: ParentsComment) => void;
}

const MyPageInquirieCommentItem = ({
  comment,
  publicId,
  setParentsComment,
}: MyPageInquirieCommentItemProps) => {
  const isMyComment = comment?.publicId === publicId;

  const myCommentOrAdminCommentButton = isMyComment
    ? "bg-gray7"
    : "bg-[#00ADEE]";

  return (
    <>
      <div className="flex flex-col gap-[12px] min-h-[112px] p-[12px] border-b border-gray1 bg-white">
        <div className="flex flex-col gap-[12px] min-h-[52px]">
          <div className="flex items-center gap-[8px]">
            <div
              className={`flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white ${myCommentOrAdminCommentButton}`}
            >
              {isMyComment ? "작성자" : "관리자"}
            </div>
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
        <div className="flex justify-start">
          <button
            className="flex justify-center items-center min-w-[60px] h-[24px] rounded-[5px] px-[8px] py-[6px] border-1 border-gray3 text-[12px] text-gray7"
            onClick={() => setParentsComment(comment)}
          >
            답글 달기
          </button>
        </div>
      </div>
      {comment.replyList &&
        comment.replyList.map((reply) => (
          <div key={reply.commentId}>
            <ReplyCommentItem
              key={reply.commentId}
              reply={reply}
              publicId={publicId}
              setParentsComment={setParentsComment}
              parentNickname={comment.nickname}
            />
          </div>
        ))}
    </>
  );
};

export default MyPageInquirieCommentItem;
