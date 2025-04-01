"use client";

import Image from "next/image";
import Link from "next/link";
import { CalculateTime } from "@/app/_components/CalculateTime";
import { SearchListType } from "../_types/searchType";
import { highlightText } from "@/utils/searchHighlightText";
import { useEffect, useState } from "react";
import useTimeAgo from "@/utils/useTimeAgo";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { useRouter } from "next/navigation";

interface totalSearchProps {
  searchType: string;
  searchString: string;
  data: SearchListType;
  href: string;
}

const TotalSearchItem = ({
  searchType,
  searchString,
  data,
  href,
}: totalSearchProps) => {
  const [isNew, setIsNew] = useState(false);
  const date = useTimeAgo(data?.createdAt);
  const router = useRouter();

  useEffect(() => {
    if (date.includes("시간 전") && parseInt(date) <= 24) {
      setIsNew(true);
    } else {
      setIsNew(false);
    }
  }, [date]);

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

  const handleNoticeClick = () => {
    if (data?.boardCommentSearchList?.commentId) {
      router.push(
        `/board/${data?.boardType}/${data?.categoryType}/${data?.id}?commentId=${data?.boardCommentSearchList?.commentId}`
      );
    } else {
      router.push(
        `/board/${data?.boardType}/${data?.categoryType}/${data?.id}`
      );
    }
  };

  const commentBaseStyle =
    "font-medium text-[12px] text-gray5 leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap";

  return (
    <div
      onClick={handleNoticeClick}
      className="flex flex-col items-center w-full cursor-pointer"
    >
      <div className="flex items-start w-[720px] min-h-[66px] gap-[12px] border-b p-[12px]">
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
          <span>{data.id}</span>
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
          <div className="flex items-center gap-[2px]">
            <h2 className="text-[14px] leading-[20px] text-gray7 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {searchType === "TITLE" || searchType === "TITLE_CONTENT"
                ? highlightText(data?.title, searchType, searchString)
                : data?.title}
            </h2>
            {data?.commentCount > 0 && (
              <p className="text-gra font-medium text-[12px] leading-[18px]">
                [{data?.commentCount}]
              </p>
            )}
            {isNew && (
              <span className="font-black text-[10px] leading-[18px] text-primary">
                N
              </span>
            )}
            {data?.isHot && (
              <span className="font-black text-[10px] leading-[18px] text-warning">
                H
              </span>
            )}
          </div>
          <div className="flex font-semibold gap-1 items-center">
            <p className="text-[12px] leading-[18px] text-gray5">
              {getKoreanBoardType(data?.boardType)}
            </p>
            <span className="font-medium text-[12px] leading-[18px] text-gray5">
              {getKoreanCategoryType(data?.categoryType)}
            </span>
            <span className="font-medium text-[12px] leading-[18px] text-gray5">
              {CalculateTime(data?.createdAt)}
            </span>
            <span className="font-medium text-[12px] leading-[18px] text-gray5">
              {data?.nickname}
            </span>
            <span className="font-medium text-[12px] leading-[18px] text-gray5">
              {data?.createdIp}
            </span>
          </div>
          {data?.boardCommentSearchList?.comment && (
            <div className="w-full flex items-start justify-start gap-1">
              <div className="w-[16px] h-[16px] flex-shrink-0">
                <Arrow_reply size={16} />
              </div>
              <div
                className={`${commentBaseStyle} min-w-0 flex gap-[2px] items-center justify-start`}
              >
                {data?.boardCommentSearchList?.imageUrl && (
                  <span>(이미지)</span>
                )}
                {data?.boardCommentSearchList?.comment && (
                  <p>
                    {searchType === "COMMENT"
                      ? highlightText(
                          data?.boardCommentSearchList?.comment,
                          searchType,
                          searchString
                        )
                      : data?.boardCommentSearchList?.comment}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalSearchItem;
