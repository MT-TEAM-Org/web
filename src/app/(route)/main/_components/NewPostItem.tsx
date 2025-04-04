import CustomIcon from "@/app/_components/IconComponents/Icon";
import { GetNewContentItem } from "@/services/main/getNewContent";
import { getKoreanBoardType } from "@/utils/boardType/boardTypeKorean";
import { numberOverThousand } from "@/utils/boardType/numberOfThousand";
import Link from "next/link";
import React from "react";

type NewPostItemProps = {
  newPosts: GetNewContentItem;
};

const NewPostItem = ({ newPosts }: NewPostItemProps) => {
  return (
    <Link
      href={`/board/${newPosts?.boardType}/${newPosts?.categoryType}/${newPosts?.id}`}
    >
      <div className="w-full h-[36px] border-b border-gray1 py-2 pr-[8px] flex justify-start items-center text-center cursor-pointer">
        <div className="min-w-[20px] h-[20px] rounded-[2px] p-[4px] flex bg-gray1 items-center mr-[8px]">
          <p className="w-full text-bold text-[12px] leading-[18px] tracking-[-0.02em] text-gray7 whitespace-nowrap">
            {numberOverThousand(newPosts?.id ?? 0)}
          </p>
        </div>
        <div className="max-w-[40px] min-h-[18px] font-[700] text-[12px] leading-[18px] text-gray5 tracking-[-0.02em] mr-[8px]">
          {getKoreanBoardType(newPosts?.boardType)}
        </div>
        <div className="max-w-[300px] min-h-[20px] flex gap-[2px] items-center font-[500] text-[14px] leading-5 mr-[2px]">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {newPosts?.title}
          </span>
          {newPosts?.isImage ? (
            <div className="w-[14px] h-[14px] object-cover">
              <CustomIcon icon="ISPHOTO_ICON" className="text-white" />
            </div>
          ) : null}
        </div>
        <div className="flex justify-center text-center items-center gap-x-[2px]">
          <p className="w-[22px] h-[18px] [font-[500] text-[12px] leading-[18px] text-primary">
            [{newPosts?.commentCount}]
          </p>
          <p className="font-[900] w-[10px] h-[18px] text-[10px] leading-[18px] text-[#00ADEE]">
            N
          </p>
          <p className="font-[900] w-[10px] h-[18px] text-[10px] leading-[18px] text-[#DC2800]">
            {newPosts?.isHot ? "H" : ""}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewPostItem;
