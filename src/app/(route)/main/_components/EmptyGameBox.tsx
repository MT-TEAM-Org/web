import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import React from "react";
interface EmptyGameBoxProps {
  title: string;
}
const EmptyGameBox = ({ title }: EmptyGameBoxProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className="max-w-[298px] min-h-[396px] bg-gray1 rounded-[10px] flex justify-center items-center">
        <div className="w-[298px] h-[160px] flex flex-col justify-center items-center gap-4">
          <LogoWhite />
          <div className="h-[48px] flex flex-col justify-center items-center gap-1 text-center text-gray7">
            <p className="text-[16px] leading-[24px] font-bold tracking-[-0.02em]">
              게임 <span>{title}</span>가 없습니다.
            </p>
            <p className="h-[20px] text-[14px] leading-[20px] font-medium tracking-[0em]">
              새로고침으로 게임 <span>{title}</span>를 받아보세요.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="w-[120px] h-[40px] rounded-[5px] border px-[16px] py-[13px] flex justify-center items-center border-gray3"
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmptyGameBox;
