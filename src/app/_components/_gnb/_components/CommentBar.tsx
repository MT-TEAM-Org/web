import React from "react";
import Refresh from "../../icon/Refresh";
import ToggleButton from "./ToggleButton";

interface DataType {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
  commentCount: number;
  recommendCount: number;
  viewCount: number;
}

const CommentBar = ({ data }: { data?: DataType }) => {
  return (
    <div className="w-full max-w-[800px] min-h-[48px] flex justify-between items-center bg-[#FAFAFA] text-[#656565] rounded-md">
      <div className="flex items-center gap-2 ml-4">
        <h1 className="text-[#303030] text-[18px] leading-7 font-[700]">
          댓글
        </h1>
        <p className="text-[#A6A6A6] text-[14px] leading-5 font-[500]">
          {data?.commentCount ? `총 ${data?.commentCount}개` : "총 0개"}
        </p>
      </div>
      <div className="flex">
        <div className="max-w-[101px] min-h-[40px] flex justify-center items-center px-2 py-3 gap-2 mr-4 bg-[#FAFAFA] rounded-md cursor-pointer">
          <Refresh />
          <p className="font-bold text-[14px] leading-[14px]">새로고침</p>
        </div>
        <div className="w-auto h-auto rounded-[5px] px-3 py-[10px] flex gap-2 items-center text-center">
          <div className="flex gap-2 items-center justify-center">
            <p className="font-bold text-[14px] leading-[14px] text-[#656565]">
              클린봇 활성화
            </p>
            <ToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
