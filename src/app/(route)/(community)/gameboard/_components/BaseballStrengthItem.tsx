import React from "react";
import BaseballMatchRecord from "./BaseballMatchRecord";
import BaseballStrengthInfo from "./BaseballStrengthInfo";

const BaseballStrengthItem = () => {
  return (
    <div>
      <div className="w-full min-h-[60px] p-4 flex gap-[10px] bg-[#FAFAFA] font-bold text-[18px] leading-7 text-[#303030] tracking-[-0.04em] items-center justify-center">
        <p>경기시작</p>
        <p>현재 3회초</p>
      </div>
      <div className="w-full min-h-[257px] flex flex-col gap-3 items-center justify-center">
        <div className="w-full min-h-[52px] flex gap-[18px] justify-center items-center text-center">
          <div className="w-[222.67px] min-h-[52px] flex flex-col gap-1 items-end text-center">
            <p className="text-[18px] leading-7 tracking-[-0.04em] text-[#303030]">
              롯데
            </p>
            <div className="w-full max-w-[226.67px] min-h-[20px] flex gap-2 justify-end items-center">
              <p className="text-[14px] leading-5">78승 2무 64패</p>
              <div className="w-[1px] h-[12px] bg-[#D9D9D9]" />
              <p className="text-[14px] leading-5 text-[#009AD4]">2위</p>
            </div>
          </div>
          <div className="w-[78px] min-h-[38px] flex justify-center items-center">
            <p className="text-[18px] leading-7 text-[#CBCBCB]">VS</p>
          </div>
          <div className="w-[222.67px] min-h-[52px] flex flex-col gap-1 items-start text-center">
            <p className="text-[18px] leading-7 tracking-[-0.04em] text-[#303030]">
              한화
            </p>
            <div className="w-full max-w-[226.67px] min-h-[20px] flex gap-2 justify-start items-center">
              <p className="text-[14px] leading-5 text-[#009AD4]">7위</p>
              <div className="w-[1px] h-[12px] bg-[#D9D9D9]" />
              <p className="text-[14px] leading-5">65승 2무 72패</p>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[180px]">
          <div className="w-full min-h-[36px] px-2 py-1 flex gap-3 justify-center items-center">
            <div className="w-full max-w-[341px] min-h-[18px] flex gap-1 justify-end items-center">
              <BaseballMatchRecord />
              <BaseballMatchRecord />
              <BaseballMatchRecord />
              <BaseballMatchRecord />
              <BaseballMatchRecord />
            </div>
            <div className="w-[78px] min-h-[28px] rounded-[5px] px-2 py-1 flex items-center justify-center gap-[10px] bg-[#FAFAFA] text-[14px] leading-5 text-[#A6A6A6]">
              최근경기
            </div>
            <div className="w-full max-w-[341px] min-h-[18px] flex gap-1 justify-start items-center">
              <BaseballMatchRecord />
              <BaseballMatchRecord />
              <BaseballMatchRecord />
              <BaseballMatchRecord />
              <BaseballMatchRecord />
            </div>
          </div>
          <div className="w-full min-h-[36px] px-2 py-1 flex gap-3 justify-center items-center">
            <div className="w-full max-w-[341px] min-h-[18px] flex gap-1 justify-end items-center font-bold text-[14px] leading-5 text-[#424242]">
              8승 0무 7패
            </div>
            <div className="w-[78px] min-h-[28px] rounded-[5px] px-2 py-1 flex items-center justify-center gap-[10px] bg-[#FAFAFA] text-[14px] leading-5 text-[#A6A6A6]">
              상대전적
            </div>
            <div className="w-full max-w-[341px] min-h-[18px] flex gap-1 justify-start items-center font-bold text-[14px] leading-5 text-[#424242]">
              7승 0무 8패
            </div>
          </div>

          <BaseballStrengthInfo title="승률" num1="0.466" num2="0.471" />
          <BaseballStrengthInfo title="타율" num1="0.284" num2="0.271" />
          <BaseballStrengthInfo title="타이틀" num1="5.07" num2="5.05" />
        </div>
      </div>
    </div>
  );
};

export default BaseballStrengthItem;
