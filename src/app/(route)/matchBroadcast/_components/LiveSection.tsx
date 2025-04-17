"use client";

import useGetEsportsLive from "@/_hooks/fetcher/match-controller/useGetEsportsLive";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

interface ScheduleDataProps {
  matchId: number;
}

const LiveSection = ({ matchId }: ScheduleDataProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const { data: esportsLiveData } = useGetEsportsLive();
  const { data: esportsMatchData } = useGetMatchPrediction(matchId);

  const startTime = esportsMatchData?.data?.startTime;

  const isLive = esportsLiveData?.data?.live === true;

  useEffect(() => {
    if (!startTime) return;

    const updateRemainingTime = () => {
      const now = new Date();
      const startDate = new Date(startTime);
      const remaining = startDate.getTime() - now.getTime();

      if (remaining <= 0) {
        setTimeRemaining("곧 경기가 시작합니다!");
        return;
      }

      const hours = String(Math.floor(remaining / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((remaining % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      setTimeRemaining(`${hours}:${minutes}:${seconds}`);
    };

    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const textStyle = cn(
    "text-[24px] font-bold leading-[38px] tracking-[-0.04em]",
    "mobile:text-[20px] mobile:leading-[36px] mobile:tracking-[-0.02em]"
  );

  return (
    <div
      className={cn(
        "w-[800px] aspect-video",
        "tablet:w-[800px]",
        "mobile:w-full"
      )}
    >
      {isLive ? (
        <iframe
          src={`https://www.youtube.com/embed/${esportsLiveData?.data?.videoId}`}
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center mx-auto text-center gap-x-[8px] bg-gray1">
          <p className={cn(textStyle, "text-gra whitespace-nowrap")}>
            {timeRemaining}
            <span className={cn(textStyle, "text-gra")}> 후</span>
          </p>
          <p className={cn(textStyle, "text-gray7")}>경기가 시작됩니다.</p>
        </div>
      )}
    </div>
  );
};
export default LiveSection;
