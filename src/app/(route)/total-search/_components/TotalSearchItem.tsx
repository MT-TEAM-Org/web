"use client";

import Image from "next/image";
import { CalculateTime } from "@/app/_components/CalculateTime";
import { SearchListType } from "../_types/searchType";
import { highlightText } from "@/utils/searchHighlightText";
import Arrow_reply from "@/app/_components/icon/Arrow_reply";
import { cn } from "@/utils";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { useTotalSearchClick } from "../_utils/useTotalSearchClick";
import {
  getKoreanBoardType,
  getKoreanCategoryType,
} from "../_types/SearchItemType";

interface TotalSearchItemProps {
  searchType: string;
  searchString: string;
  data: SearchListType;
}

const commentBaseStyle =
  "font-medium text-[12px] text-gray5 leading-[18px] tracking-[-0.02em] text-ellipsis overflow-hidden whitespace-nowrap";

const TotalSearchItem = ({
  searchType,
  searchString,
  data,
}: TotalSearchItemProps) => {
  const handleClick = useTotalSearchClick(data);

  const itemMeta = [
    { value: getKoreanBoardType(data?.boardType), bold: true },
    { value: getKoreanCategoryType(data?.categoryType) },
    { value: CalculateTime(data?.createdAt) },
    { value: data?.nickname },
    { value: data?.createdIp },
  ];

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-start w-full cursor-pointer"
    >
      <div
        className={cn(
          "flex items-center justify-start min-w-[720px] min-h-[66px] max-h-[88px] gap-[12px] border-b p-[12px] hover:bg-bg0",
          "tablet:max-w-[1279px] tablet:w-full",
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
            <h2 className="max-w-[535px] text-[14px] leading-[20px] text-gray7 text-ellipsis overflow-hidden whitespace-nowrap">
              {searchType === "TITLE" || searchType === "TITLE_CONTENT"
                ? highlightText(data?.title, searchType, searchString)
                : data?.title}
            </h2>
            {data?.commentCount > 0 && (
              <p className="text-gra font-medium text-[12px] leading-[18px]">
                [{data?.commentCount}]
              </p>
            )}
            {data?.isNew && (
              <span className="font-black text-[10px] leading-[18px] text-gra">
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
            {itemMeta.map((item, index) =>
              item.bold ? (
                <p
                  key={index}
                  className="font-semibold text-[12px] leading-[18px] text-gray5"
                >
                  {item.value}
                </p>
              ) : (
                <span key={index}>{item.value}</span>
              )
            )}
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
