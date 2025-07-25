import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { CommentItem } from "@/_types/comment";
import { CalculateTime } from "@/app/_components/CalculateTime";
import Image from "next/image";
import { cn } from "@/utils";
import { cleanContent } from "@/utils/secure/sanitize";

interface ReplyCommentItemProps {
  reply: CommentItem;
  publicId: string;
  setParentsComment: (comment: CommentItem) => void;
  parentNickname: string;
  depth?: number;
}

const ReplyCommentItem = ({
  reply,
  publicId,
  setParentsComment,
  parentNickname,
  depth = 1,
}: ReplyCommentItemProps) => {
  return (
    <>
      <div className="flex gap-[12px] min-h-[112px] p-[12px] border-b border-gray1 bg-gray1">
        <Arrow_reply size={18} />
        <div className="flex flex-col gap-[12px] min-h-[52px]">
          <div
            className={cn("flex items-center gap-[8px]", "mobile:items-start")}
          >
            <div
              className={`flex justify-center items-center h-[20px] rounded-[2px] p-[6px] font-[700] text-[12px] leading-[18px] text-white ${
                reply?.publicId === publicId ? "bg-gray7" : "bg-[#00ADEE]"
              }`}
            >
              {reply?.publicId === publicId ? "작성자" : "관리자"}
            </div>
            {reply?.publicId === publicId && (
              <Image
                alt="profile-image"
                src={
                  cleanContent(reply?.commenterImg) || "/userProfileIsNull.png"
                }
                width={20}
                height={20}
                className="w-[20px] h-[20px] rounded-full object-cover"
              />
            )}
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
                {reply?.publicId === publicId && (
                  <span className="text-[12px] leading-[18px] text-gray4">
                    {reply?.createdIp}
                  </span>
                )}
              </div>
            </div>
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
              <span className="text-[#00ADEE] mr-[4px]">@{parentNickname}</span>
            )}
            {reply?.comment}
          </p>
          <div className="flex justify-start">
            <button
              className="flex justify-center items-center min-w-[60px] h-[24px] rounded-[5px] px-[8px] py-[6px] border-1 border-gray3 text-[12px] text-gray7"
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
            <ReplyCommentItem
              key={nestedReply.commentId}
              reply={nestedReply}
              publicId={publicId}
              setParentsComment={setParentsComment}
              parentNickname={reply.nickname}
              depth={depth + 1}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ReplyCommentItem;
