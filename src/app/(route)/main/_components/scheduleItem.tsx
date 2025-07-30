"use client";

import { MatchItem } from "@/services/match-controller/getMatchSchedule";
import { cn } from "@/utils";
import { formatDate } from "@/utils/formatData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ScheduleDataProps {
  isSelected: boolean;
  onClick: () => void;
  data: MatchItem;
}

const ScheduleItem = ({ isSelected, onClick, data }: ScheduleDataProps) => {
  const [gameStatus, setGameStatus] = useState<string>("예정");

  const formattedData = formatDate(data.startTime);

  const checkGameStatus = () => {
    if (!data?.startTime) return;

    const currentTime = new Date();
    const startTime = new Date(data.startTime);

    if (startTime > currentTime) {
      setGameStatus("예정");
      return;
    }

    const gameDurations = {
      FOOTBALL: 140,
      BASEBALL: 210,
      ESPRTS: 150,
    };

    const gameType = "BASEBALL";

    const duration = gameDurations[gameType];
    const expectedEndTime = new Date(
      startTime.getTime() + duration * 60 * 1000
    );

    if (currentTime > expectedEndTime) {
      setGameStatus("종료");
    } else {
      setGameStatus("LIVE");
    }
  };

  useEffect(() => {
    checkGameStatus();
  }, [data]);

  return (
    <div
      onClick={onClick}
      className={`w-[275px] h-[126px] p-[12px] rounded-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] bg-white border
      ${isSelected ? "border-gray7" : "border-gray3"}
    `}>
      <div className="w-[275px] flex mb-[8px] items-center gap-x-[8px]">
        <div
          className={cn(
            "rounded-[5px] px-[6px] py-[2px] flex gap-1 bg-gray2 items-center justify-center",
            gameStatus === "LIVE" && "text-white bg-new"
          )}>
          <p
            className={cn(
              "font-medium text-[12px] leading-[18px] flex text-center justify-center align-center text-gray7",
              gameStatus === "LIVE" && "text-white"
            )}>
            {gameStatus}
          </p>
        </div>
        <div className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] flex align-center text-gray5 gap-[3px]">
          {formattedData}
        </div>
        <hr className="w-[1px] h-[8px] bg-gray3" />
        <div className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] align-center text-gray5">
          <p>{data?.leagueName}</p>
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
