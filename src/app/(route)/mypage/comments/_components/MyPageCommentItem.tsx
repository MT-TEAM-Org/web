"use client";

import Image from "next/image";
import { CalculateTime } from "@/app/_components/CalculateTime";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import Link from "next/link";
import { highlightText } from "@/utils/searchHighlightText";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import isWithin24Hours from "@/utils/isWithIn24Hours";

interface PostResponse {
  commentType: "BOARD" | "IMPROEMENT" | "INQUIRY" | "NEWS" | "NOTICE";
  id: number;
  thumbnail: string;
  title: string;
  boardType: "BASEBALL" | "ESPORTS" | "FOOTBALL" | "UNKNOWN";
  categoryType:
    | "FREE"
    | "QUESTION"
    | "ISSUE"
    | "VERIFICATION"
    | "TIP"
    | "UNKNOWN";
  createdIp: string;
  publicId: string;
  nickname: string;
  commentCount: number;
  createDate: string; // ISO 8601 format
  lastModifiedDate: string; // ISO 8601 format
  isHot: boolean;
}

interface CommentResponse {
  commentId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  commenterImg: string;
  imageUrl: string;
  comment: string;
  recommendCount: number;
  mentionedPublicId: string;
  mentionedNickname: string;
  createDate: string; // ISO 8601 format
  lastModifiedDate: string; // ISO 8601 format
  replyList: string[];
  recommended: boolean;
  admin: boolean;
}

interface MyPageCommentItemProps {
  data: {
    postResponse: PostResponse;
    commentResponse: CommentResponse;
  };
}

const MyPageCommentItem = ({ data }: MyPageCommentItemProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const searchType = searchParams.get("search_type") || null;
  const isWithIn24Hours = isWithin24Hours(data?.postResponse?.createDate);

  const boardTypeMap: { [key: string]: string } = {
    FOOTBALL: "축구",
    BASEBALL: "야구",
    ESPORTS: "E스포츠",
    UNKNOWN: "기타",
  };

  const categoryTypeMap: { [key: string]: string } = {
    FREE: "자유",
    QUESTION: "질문",
    ISSUE: "이슈",
    VERIFICATION: "리뷰",
    TIP: "플레이 팁",
    UNKNOWN: "기타",
  };

  const commentTypeURL = {
    BOARD: `/board/${data?.postResponse?.boardType}/${data?.postResponse?.categoryType}/${data?.postResponse?.id}?commentId=${data?.commentResponse?.commentId}`,
    IMPROVEMENT: `/customer/feedback/feedback-info/${data?.postResponse?.id}`,
    INQUIRY: `/mypage/inquiries/${data?.postResponse?.id}`,
    NEWS: `/news/${data?.postResponse?.boardType.toLowerCase()}/news-detail/${
      data?.postResponse?.id
    }`,
    NOTICE: `/customer/notice/notice-info/${data?.postResponse?.id}`,
    MATCH: "",
  };

  const getKoreanBoardType = (type: string) => {
    return boardTypeMap[type] || type;
  };

  const getKoreanCategoryType = (type: string) => {
    return categoryTypeMap[type] || type;
  };
  console.log(commentTypeURL[data?.postResponse?.commentType]);
  return (
    <Link
      href={commentTypeURL[data?.postResponse?.commentType]}
      className="flex gap-[12px] w-full min-h-[88px] p-[12px] border-b border-gray1 hover:bg-bg0"
    >
      <div className="flex justify-center items-center w-[32px] h-[32px] rounded-[2px] p-[4px] bg-gray1 font-[700] text-[14px] leading-[20px] text-gray7">
        {data?.postResponse?.id}
      </div>

      <Image
        src={data?.postResponse?.thumbnail || "/Preview_loading_image.png"}
        alt="post-preview-image"
        width={56}
        height={42}
        className="w-[56px] h-[42px] rounded-[5px] object-cover"
      />

      <div className="flex flex-col gap-[4px] min-h-[64px] flex-1">
        <div className="flex items-center gap-[2px]">
          <h2 className="text-[14px] leading-[20px] text-gray7 overflow-hidden text-ellipsis line-clamp-1">
            {highlightText(data?.postResponse?.title, searchType, search)}
          </h2>
          <span className="text-[12px] leading-[18px] text-gra">
            [{data?.postResponse?.commentCount}]
          </span>
          <div className="flex items-center gap-[2px] font-[900] text-[10px] leading-[18px]">
            {isWithIn24Hours && <span className="text-gra">N</span>}
            {data?.postResponse?.isHot && <span className="text-new">H</span>}
          </div>
        </div>

        <div className="flex items-center gap-[4px] text-[12px] leading-[18px] text-gray5">
          <span className="font-[700] whitespace-nowrap">
            {getKoreanBoardType(data?.postResponse?.boardType)}
          </span>
          <span className="whitespace-nowrap">
            {getKoreanCategoryType(data?.postResponse?.categoryType)}
          </span>
          <span className="whitespace-nowrap">
            {CalculateTime(data?.postResponse?.createDate)}
          </span>
          <span className="overflow-hidden text-ellipsis line-clamp-1">
            {data?.postResponse?.nickname}
          </span>
          {data?.postResponse?.commentType !== "NEWS" && (
            <span className={cn("text-gray4 whitespace-nowrap")}>
              IP {data?.postResponse?.createdIp}
            </span>
          )}
        </div>
        <div className="flex items-center min-h-[18px]">
          <div className="flex justify-center items-center w-[16px] h-[16px]">
            <Arrow_reply size={12} />
          </div>
          <div className="text-[12px] leading-[18px] text-gray7 overflow-hidden text-ellipsis line-clamp-1">
            {data?.commentResponse?.imageUrl && "(이미지)"}{" "}
            {highlightText(data?.commentResponse?.comment, searchType, search)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyPageCommentItem;
