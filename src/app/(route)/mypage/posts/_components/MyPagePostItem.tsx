"use client";

import Image from "next/image";
import Link from "next/link";
import { CalculateTime } from "@/app/_components/CalculateTime";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { useSearchParams } from "next/navigation";
import { highlightText } from "@/utils/searchHighlightText";
import { cn } from "@/utils";
import isWithin24Hours from "@/utils/isWithIn24Hours";

interface MyPagePostItemProps {
  data: {
    id: number;
    boardType: string;
    categoryType: string;
    title: string;
    createdIp: string;
    thumbnail: string;
    publicId: string;
    nickname: string;
    commentCount: number;
    createdAt: string;
    lastModifiedDate: string;
    isHot: boolean;
    boardCommentSearchList: {
      comment: string;
      commentId: number;
      imageUrl: string;
    };
  };
}

const MyPagePostItem = ({ data }: MyPagePostItemProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const searchType = searchParams.get("search_type") || null;
  const isWithIn24Hours = isWithin24Hours(data?.createdAt);

  const boardTypeMap: { [key: string]: string } = {
    FOOTBALL: "축구",
    BASEBALL: "야구",
    ESPORTS: "E스포츠",
  };

  const categoryTypeMap: { [key: string]: string } = {
    FREE: "자유",
    QUESTION: "질문",
    ISSUE: "이슈",
    VERIFICATION: "리뷰",
    TIP: "플레이 팁",
  };
  const getKoreanBoardType = (type: string) => {
    return boardTypeMap[type] || type;
  };

  const getKoreanCategoryType = (type: string) => {
    return categoryTypeMap[type] || type;
  };

  return (
    <Link
      href={`/board/${data.boardType}/${data.categoryType}/${data.id}`}
      className={cn(
        "flex min-h-[66px] gap-[12px] border-b border-gray1 p-[12px] hover:bg-bg0",
        "mobile:w-full"
      )}
    >
      <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1 font-[700]">
        <span className="text-[14px]">{data.id}</span>
      </div>
      <Image
        src={data?.thumbnail || "/Preview_loading_image.png"}
        alt="post-preview-image"
        width={56}
        height={42}
        className="w-[56px] h-[42px] rounded-[5px] object-cover"
        blurDataURL="/Preview_loading_image.png"
      />
      <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
        <div className={cn("w-full flex items-center gap-[2px]")}>
          <h2 className="text-[14px] leading-[20px] text-gray7 overflow-hidden text-ellipsis line-clamp-1">
            {highlightText(data?.title, searchType, search)}
          </h2>
          {data?.commentCount ? (
            <p className="text-gra font-medium text-[12px] leading-[18px] whitespace-nowrap">
              [{data?.commentCount}]
            </p>
          ) : null}
          {isWithIn24Hours && (
            <span className="font-black text-[10px] leading-[18px] text-gra">
              N
            </span>
          )}
          {data?.isHot && (
            <span className="font-black text-[10px] leading-[18px] text-new">
              H
            </span>
          )}
        </div>
        <div className="flex gap-1 items-center text-gray5 text-[12px] leading-[18px]">
          <p className="text-[12px] leading-[18px] font-[700] whitespace-nowrap">
            {getKoreanBoardType(data?.boardType)}
          </p>
          <span className="whitespace-nowrap">
            {getKoreanCategoryType(data?.categoryType)}
          </span>
          <span className="whitespace-nowrap">
            {CalculateTime(data?.createdAt)}
          </span>
          <span
            className="overflow-hidden text-ellipsis line-clamp-1"
            title={data?.nickname}
          >
            {data?.nickname}
          </span>
          <span className="text-gray4 whitespace-nowrap">
            IP {data?.createdIp}
          </span>
        </div>
        {data?.boardCommentSearchList && (
          <div className="flex items-center min-h-[18px]">
            <div className="flex justify-center items-center w-[16px] h-[16px]">
              <Arrow_reply size={12} />
            </div>
            <div className="text-[12px] leading-[18px] text-gray7 overflow-hidden text-ellipsis line-clamp-1">
              {data?.boardCommentSearchList.imageUrl && "(이미지)"}{" "}
              {highlightText(
                data?.boardCommentSearchList.comment,
                searchType,
                search
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MyPagePostItem;
