import Arrow_down from "@/app/_components/icon/Arrow_down";
import Arrow_up from "@/app/_components/icon/Arrow_up";
import Double_arrow_up from "@/app/_components/icon/Double_arrow_up";
import React from "react";

const PostNavigation = () => {
  const nextButtonStyle =
    "min-w-[120px] h-[40px] flex items-center justify-center rounded-md border border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-2 font-[700] text-[14px] leading-[14px]";
  const topButtonStyle =
    "min-w-[120px] h-[auto] min-h-[40px] flex items-center justify-center rounded-[5px] border-[1px] border-[#DBDBDB] pt-[10px] pr-[16px] pb-[10px] pl-[14px] gap-[8px] font-[700] text-[14px] leading-[14px]";

  return (
    <div className="w-full max-w-[672px] min-h-[40px] flex justify-between">
      <div className="flex gap-2">
        <button className={nextButtonStyle}>
          <Arrow_up />
          이전글
        </button>
        <button className={nextButtonStyle}>
          <Arrow_down />
          다음글
        </button>
      </div>
      <div className="flex gap-2">
        <button className={topButtonStyle}>
          <Arrow_up />
          댓글 맨위로
        </button>
        <button className={topButtonStyle}>
          <Double_arrow_up />
          게시글 맨위로
        </button>
      </div>
    </div>
  );
};

export default PostNavigation;
