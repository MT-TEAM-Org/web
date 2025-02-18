import React from "react";
import BaseballRecordItem from "./BaseballRecordItem";
import TeamStrengthInfo from "../TeamStrengthInfo";

const BaseballGameRecord = () => {
  return (
    <div className="w-full min-h-[288px] flex flex-col gap-2">
      <div className="w-full min-h-[28px] flex justify-center items-center">
        <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-center">
          경기기록
        </p>
      </div>
      <div className="w-full min-h-[252px] flex gap-2 flex-col">
        <div className="w-full min-h-[28px] flex gap-[18px] items-center justify-center">
          <p className="w-[345px] min-h-[28px] font-bold text-[18px] leading-7 tracking-[-0.04em] text-right">
            삼성
          </p>
          {/* 목 데이터 */}
          <p className="w-[78px] h-[28px] font-bold text-[18px] leading-7  tracking-[-0.04em] text-center text-[#CBCBCB]">
            vs
          </p>
          <p className="w-[345px] min-h-[28px] font-bold text-[18px] leading-7 tracking-[-0.04em] text-left">
            LG
          </p>
        </div>
        <div className="w-full min-h-[216px] flex flex-col">
          <TeamStrengthInfo title="안타" num1="18" num2="9" />
          <TeamStrengthInfo title="홈런" num1="3" num2="4" />
          <TeamStrengthInfo title="도루" num1="0" num2="2" />
          <TeamStrengthInfo title="삼진" num1="5" num2="9" />
          <TeamStrengthInfo title="병살" num1="0" num2="2" />
          <TeamStrengthInfo title="실책" num1="4" num2="0" />
        </div>
      </div>
      <div className="w-full min-h-[376px] flex flex-col">
        <div className="w-full min-h-[44px] border-t border-b p-3 flex gap-6 border-[#DBDBDB]">
          <p className="text-[14px] leading-5 text-[#303030]">결승타</p>
          <div className="min-w-[214px] min-h-[20px] flex gap-1">
            <p className="text-[14px] leading-5 text-[#303030]">소크라테스</p>
            <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6]">
              (6회 2사 2,3루서 우익수 2루타)
            </p>
          </div>
        </div>
        <BaseballRecordItem title="홈런" />
        <BaseballRecordItem title="2루타" />
        <BaseballRecordItem title="실책" />
        <BaseballRecordItem title="도루" />
        <BaseballRecordItem title="도루자" />
        <BaseballRecordItem title="병살타" />
        <div className="w-full min-h-[44px] border-t border-b p-3 flex gap-6 border-[#DBDBDB]">
          <div className="w-[37px] h-[20px] text-[14px] leading-5">
            <p>심판</p>
          </div>
          <div className="min-w-[89px] min-h-[20px] flex gap-[7px]">
            <p className="text-[14px] leading-5">이영재,</p>
            <p className="text-[14px] leading-5">문동균,</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseballGameRecord;
