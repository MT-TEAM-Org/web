import React from "react";
import { getKoreanBoardType } from "@/utils/boardType/boardTypeKorean";
import { GetNewContentItem } from "@/services/main/getNewContent";
import { numberOverThousand } from "@/utils/boardType/numberOfThousand";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import Link from "next/link";
import { cn } from "@/utils";

type NewPostItemProps = {
  newPosts: GetNewContentItem;
};

const NewPostItem = ({ newPosts }: NewPostItemProps) => {
  return (
    <Link
      href={{
        pathname: `/board/${newPosts?.boardType}/${newPosts?.categoryType}/${newPosts?.id}`,
      }}>
      <div
        className={cn(
          "w-full h-[36px] border-b border-gray1 py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer hover:bg-bg0",
          "mobile:w-full mobile:max-w-[calc(100vw-32px)] mobile:mx-auto"
        )}>
        <div className="w-[20px] h-[20px] rounded-sm font-bold text-[12px] leading-[20px] text-gray7 flex items-center justify-center flex-shrink-0">
          {numberOverThousand(newPosts?.id ?? 0)}
        </div>
        <div className="max-w-[40px] h-[20px] font-[700] text-[12px] leading-[20px] text-gray5 whitespace-nowrap overflow-hidden text-ellipsis flex-shrink-0 line-clamp-1">
          {getKoreanBoardType(newPosts?.boardType)}
        </div>
        <div className="flex items-center gap-[2px] min-w-0">
          <div
            className={cn(
              "h-[20px] flex gap-[2px] items-center font-[500] text-[14px] leading-[20px] flex-1",
              "pc:max-w-[300px]",
              "tablet:flex-1 tablet:max-w-[640px]",
              "mobile:flex-1 mobile:max-w-[600px] mobile:min-w-0"
            )}>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray7">
              {newPosts?.title}
            </span>
            {newPosts?.isImage && (
              <div className="w-[14px] h-[14px] flex items-center justify-center flex-shrink-0">
                <CustomIcon icon="ISPHOTO_ICON" className="text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-[2px] flex-shrink-0 h-[20px]">
            {(newPosts?.commentCount ?? 0) > 0 && (
              <p className="font-[500] text-[12px] leading-[20px] text-gra flex items-center">
                [{newPosts.commentCount}]
              </p>
            )}
            {newPosts?.isNew && (
              <p className="font-[900] w-[10px] h-[20px] text-[10px] leading-[20px] text-gra flex items-center">
                N
              </p>
            )}
            {newPosts?.isHot && (
              <p className="font-[900] w-[10px] h-[20px] text-[10px] leading-[20px] text-new flex items-center">
                H
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewPostItem;
