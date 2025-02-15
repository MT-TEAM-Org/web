import React from "react";

type infoData = {
  title: string;
  num1: string;
  num2: string;
};

const BaseballStrengthInfo = ({ title, num1, num2 }: infoData) => {
  return (
    <div className="w-full min-h-[36px] px-2 py-1 flex gap-3 justify-center items-center">
      <div className="w-[280px] h-[4px] rounded-[5px] flex">
        <div className="w-[168px] h-full bg-[#EEEEEE]" />
        <div className="w-[122px] h-full bg-[#00ADEE]" />
      </div>
      <div className="w-[200px] min-h-[28px] flex justify-between items-center">
        <div className="w-[43px] h-[20px] flex gap-1 justify-end items-center font-bold text-[14px] leading-5 text-[#424242]">
          {num1}
        </div>
        <div className="w-[78px] min-h-[28px] rounded-[5px] px-2 py-1 flex items-center justify-center gap-[10px] bg-[#FAFAFA] text-[14px] leading-5 text-[#A6A6A6]">
          {title}
        </div>
        <div className="w-[43px] h-[20px] flex gap-1 justify-start items-center font-bold text-[14px] leading-5 text-[#424242]">
          {num2}
        </div>
      </div>
      <div className="w-[280px] h-[4px] rounded-[5px] flex">
        <div className="w-[165px] h-full bg-[#00516F]" />
        <div className="w-[115px] h-full bg-[#EEEEEE]" />
      </div>
    </div>
  );
};

export default BaseballStrengthInfo;
