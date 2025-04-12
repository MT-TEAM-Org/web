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
import { cn } from "@/utils";
import CustomIcon from "@/app/_components/IconComponents/Icon";

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

  const handleTotalSearchClick = () => {
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
      onClick={handleTotalSearchClick}
      className="flex flex-col items-start w-full cursor-pointer"
    >
      <div
        className={cn(
          "flex items-center justify-start min-w-[720px] min-h-[66px] max-h-[88px] gap-[12px] border-b p-[12px] hover:bg-bg0",
          "tablet:max-w-[1279px] tablet:min-w-[687px]",
          "mobile:w-full mobile:min-w-full"
        )}
      >
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
          <span className="mobile:font-bold mobile:text-[14px] mobile:leading-5">
            {data.id}
          </span>
        </div>
        {data?.thumbnail ? (
          <Image
            src={data.thumbnail}
            alt="post-preview-image"
            width={56}
            height={42}
            className="w-[56px] h-[42px] rounded-[5px] object-cover"
            blurDataURL="/Preview_loading_image.png"
            placeholder="blur"
          />
        ) : (
          <CustomIcon
            icon="DEFAULT_THUMBNAIL_ICON"
            className="w-[56px] h-[42px]"
          />
        )}

        <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
          <div className="flex items-center gap-[2px]">
            <h2 className="max-w-[535px] text-[14px] leading-[20px] text-gray7 text-ellipsis overflow-hidden line-clamp-1">
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
          <div className="flex gap-1 items-center font-medium text-[12px] leading-[18px] text-gray5 tracking-[-0.02em] whitespace-nowrap">
            <p className="font-semibold text-[12px] leading-[18px] text-gray5">
              {getKoreanBoardType(data?.boardType)}
            </p>
            <span>{getKoreanCategoryType(data?.categoryType)}</span>
            <span>{CalculateTime(data?.createdAt)}</span>
            <span>{data?.nickname}</span>
            <span>{data?.createdIp}</span>
          </div>
          {data?.boardCommentSearchList?.comment && (
            <div className="w-full flex items-center justify-start gap-1">
              <div className="w-[16px] h-[16px] flex-shrink-0 flex items-center justify-center">
                <Arrow_reply size={12} />
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
