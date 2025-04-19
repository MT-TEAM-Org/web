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
      }}
    >
      <div
        className={cn(
          "w-full h-[36px] border-b border-gray1 py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer",
          "mobile:w-full mobile:max-w-[calc(100vw-32px)] mobile:mx-auto"
        )}
      >
        <div className="w-[20px] h-[20px] rounded-sm font-bold text-[12px] leading-[18px] text-gray7 flex items-center justify-center">
          {numberOverThousand(newPosts?.id ?? 0)}
        </div>
        <div className="max-w-[40px] min-h-[18px] font-[700] text-[12px] leading-[18px] text-gray5 whitespace-nowrap overflow-hidden text-ellipsis">
          {getKoreanBoardType(newPosts?.boardType)}
        </div>
        <div className="flex items-center gap-[2px] min-w-0">
          <div
            className={cn(
              "min-h-[20px] flex gap-[2px] items-center font-[500] text-[14px] leading-5",
              "pc:max-w-[300px]",
              "tablet:flex-1 tablet:max-w-[640px]",
              "mobile:flex-1 mobile:min-w-0"
            )}
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray7">
              {newPosts?.title}
            </span>
            {newPosts?.isImage && (
              <div className="w-[14px] h-[14px] flex-shrink-0">
                <CustomIcon icon="ISPHOTO_ICON" className="text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-[2px] flex-shrink-0">
            {(newPosts?.commentCount ?? 0) > 0 && (
              <p className="w-[22px] h-[18px] font-[500] text-[12px] leading-[18px] text-gra">
                [{newPosts.commentCount}]
              </p>
            )}
            <p className="font-[900] w-[10px] h-[18px] text-[10px] leading-[18px] text-gra">
              N
            </p>
            {newPosts?.isHot && (
              <p className="font-[900] w-[10px] h-[18px] text-[10px] leading-[18px] text-new">
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
