import React from "react";
import { getKoreanBoardType } from "@/utils/boardType/boardTypeKorean";
import { GetHotContentItem } from "@/services/main/getHotContent";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import Link from "next/link";

interface HotPostItemProps {
  number: number;
  hotPosts: GetHotContentItem;
}

const HotPostItem = ({ number, hotPosts }: HotPostItemProps) => {
  return (
    <Link
      href={{
        pathname: `/board/${hotPosts?.boardType}/${hotPosts?.categoryType}/${hotPosts?.id}`,
      }}
    >
      <div className="min-w-[419px] h-[36px] border-b border-gray1 py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer">
        <div className="w-[20px] h-[20px] rounded-sm gap-[10px] font-bold text-[12px] leading-[18px] text-gray7">
          {number}
        </div>
        <div className="max-w-[40px] min-h-[18px] font-[700] text-[12px] leading-[18px] text-gray5">
          {getKoreanBoardType(hotPosts?.boardType)}
        </div>
        <div className="flex justify-center align-center items-center text-center gap-[2px]">
          <div className="max-w-[300px] min-h-[20px] flex gap-[2px] items-center font-[500] text-[14px] leading-5">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray7">
              {hotPosts?.title}
            </span>
            <div className="w-[14px] h-[14px] object-cover">
              {hotPosts?.isImage && (
                <CustomIcon icon="ISPHOTO_ICON" className="text-white" />
              )}
            </div>
          </div>

          <div className="flex justify-center text-center items-center gap-x-[2px]">
            <p className="w-[22px] h-[18px] [font-[500] text-[12px] leading-[18px] text-primary">
              [{hotPosts?.commentCount}]
            </p>
            <p className="font-[900] w-[10px] h-[18px] text-[10px] leading-[18px] text-[#00ADEE]">
              N
            </p>
            <p className="font-[900] w-[10px] h-[18px] text-[10px] leading-[18px] text-[#DC2800]">
              {hotPosts?.isHot ? "H" : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotPostItem;
