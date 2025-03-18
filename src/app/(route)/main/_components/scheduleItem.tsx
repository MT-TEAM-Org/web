"use client";

import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";

const ScheduleItem = ({
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-[275px] h-[126px] min-h-[126px] rounded-[5px] border p-3 flex flex-col gap-2 justify-center items-center bg-white cursor-pointer 
        ${isSelected ? "border-gray7" : "border-gray3"}
      `}
    >
      {/* 목 데이터 */}
      <div className="w-[251px] h-auto min-h-[26px] flex gap-2 items-center">
        <div className="w-auto min-w-[37px] h-auto min-h-[26px] rounded-[5px] py-1 px-2 flex gap-1 bg-gray2 items-center justify-center">
          <p className="font-medium text-[12px] leading-[18px] flex text-center justify-center align-center text-gray5">
            예정
          </p>
        </div>
        <div className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] flex align-center text-gray5 gap-[3px]">
          <p>02.04</p>
          <p>19:30</p>
        </div>
        <div className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] align-center text-gray5">
          <p>2025 LCK CUP 그룹 배틀</p>
        </div>
      </div>
      <div className="w-full min-h-[68px] flex flex-col gap-1">
        <div className="w-full min-h-[32px] flex gap-2 justify-start items-center">
          <Fake_scheduleItem />
          <div className="font-bold text-[14px] leading-5">T1</div>
        </div>
        <div className="w-full min-h-[32px] flex gap-2 justify-start items-center">
          <Fake_scheduleItem2 />
          <div className="font-bold text-[14px] leading-5">젠지</div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
