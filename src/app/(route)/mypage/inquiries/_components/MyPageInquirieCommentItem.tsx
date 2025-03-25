import Image from "next/image";
import { CalculateTime } from "@/app/_components/CalculateTime";

interface InquirieCommentReply {
  inquiryReplyId: number;
  inquiryCommentId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  imageUrl: string;
  comment: string;
  recommendCount: number;
  mentionedPublicId: string;
  mentionedNickname: string;
  createDate: string;
  lastModifiedDate: string;
}

interface InquirieCommentContent {
  commentId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  imageUrl: string;
  comment: string;
  recommendCount: number;
  mentionedPublicId: string;
  mentionedNickname: string;
  createDate: string;
  lastModifiedDate: string;
  boardReplyList: InquirieCommentReply[];
}

interface MyPageInquirieCommentItemProps {
  comment: InquirieCommentContent;
  publicId: string;
}

const MyPageInquirieCommentItem = ({
  comment,
  publicId,
}: MyPageInquirieCommentItemProps) => {
  const isMyComment = comment?.publicId === publicId;

  const myCommentOrAdminCommentButton = isMyComment
    ? "bg-gray7"
    : "bg-[#00ADEE]";
  const myCommentOrAdminCommentBg = isMyComment ? "bg-[#FAFAFA]" : "bg-white";
  return (
    <div
      className={`flex flex-col gap-[12px] min-h-[112px] p-[12px] border-b border-gray1 ${myCommentOrAdminCommentBg}`}
    >
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
        <button className="flex justify-center items-center min-w-[60px] h-[24px] rounded-[5px] px-[8px] py-[6px] border-1 border-gray3 text-[12px] text-gray7">
          답글 달기
        </button>
      </div>
    </div>
  );
};

export default MyPageInquirieCommentItem;
