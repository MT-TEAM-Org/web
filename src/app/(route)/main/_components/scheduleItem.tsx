"use client";

import { MatchItem } from "@/services/match-controller/getMatchSchedule";
import Image from "next/image";
import React from "react";

interface ScheduleDataProps {
  isSelected: boolean;
  onClick: () => void;
  data: MatchItem;
}

const ScheduleItem = ({ isSelected, onClick, data }: ScheduleDataProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-full min-h-[126px] p-[12px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] border
      ${isSelected ? "border-gray7" : "border-gray3"}
    `}
    >
      <div className="w-[275px] flex mb-[8px] items-center gap-x-[8px]">
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
      <div className="w-full min-h-[68px] flex flex-col gap-y-[4px]">
        <div className="w-full min-h-[32px] flex gap-2 justify-start items-center">
          <Image
            src={data?.homeTeam?.logo}
            width={32}
            height={32}
            alt="TeamLogo"
          />
          <div className="font-bold text-[14px] leading-5">
            {data?.homeTeam?.name}
          </div>
        </div>
        <div className="w-full min-h-[32px] flex gap-2 justify-start items-center">
          <Image
            src={data?.awayTeam?.logo}
            width={32}
            height={32}
            alt="TeamLogo"
          />
          <div className="font-bold text-[14px] leading-5">
            {data?.awayTeam?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
