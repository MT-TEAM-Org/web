import React from "react";
import Refresh from "../../icon/Refresh";
import ToggleButton from "./ToggleButton";
import { NewsInfoDataType } from "@/app/(route)/news/_types/newsInfoType";

interface CommentBarProps {
  data?: NewsInfoDataType;
  onRefresh?: () => void;
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
}

const CommentBar = ({ 
  data, 
  onRefresh, 
  isActive = true, 
  onToggle = () => {} 
}: CommentBarProps) => {
  return (
    <div className="w-full max-w-[800px] min-h-[48px] flex justify-between items-center bg-gray1 text-gray6 rounded-md">
      <div className="flex items-center gap-2 ml-4">
        <h1 className="text-gray8 text-[18px] leading-7 font-[700]">댓글</h1>
        <p className="text-gray5 text-[14px] leading-5 font-[500]">
          {data?.commentCount ? `총 ${data?.commentCount}개` : "총 0개"}
        </p>
      </div>
      <div className="flex">
        <div
          onClick={onRefresh}
          className="max-w-[101px] min-h-[40px] flex justify-center items-center px-2 py-3 gap-2 mr-4 bg-gray1 rounded-md cursor-pointer"
        >
          <Refresh />
          <p className="font-bold text-[14px] leading-[14px]">새로고침</p>
        </div>
        <div className="w-auto h-auto rounded-[5px] px-3 py-[10px] flex gap-2 items-center text-center">
          <div className="flex gap-2 items-center justify-center">
            <p className="font-bold text-[14px] leading-[14px] text-gray6">
              클린봇 활성화
            </p>
            <ToggleButton 
              isActive={isActive} 
              onToggle={onToggle || (() => {})} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
