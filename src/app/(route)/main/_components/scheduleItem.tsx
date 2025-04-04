"use client";

import { MatchItem } from "@/services/match-controller/getMatchSchedule";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ScheduleDataProps {
  isSelected: boolean;
  onClick: () => void;
  data: MatchItem;
}

const ScheduleItem = ({ isSelected, onClick, data }: ScheduleDataProps) => {
  const [gameStatus, setGameStatus] = useState<string>("예정");

  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}.${day} ${hours}:${minutes}`;
  };

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
      setGameStatus("진행중");
    }
  };

  useEffect(() => {
    checkGameStatus();
  }, [data]);

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
            {gameStatus}
          </p>
        </div>
        <div className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] flex align-center text-gray5 gap-[3px]">
          {formattedData}
        </div>
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

const gameDuration = {
  FOOTBALL: 140,
  BASEBALL: 210,
  ESPORTS: 150,
};
