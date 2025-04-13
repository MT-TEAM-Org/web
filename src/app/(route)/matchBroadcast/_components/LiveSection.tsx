"use client";

import useGetEsportsLive from "@/_hooks/fetcher/match-controller/useGetEsportsLive";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";
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

  return (
    <div className="w-[800px] h-[440px]">
      {isLive ? (
        <iframe
          src={`https://www.youtube.com/embed/${esportsLiveData?.data?.videoId}`}
          width="800"
          height="440"
          allowFullScreen
        />
      ) : (
        <div className="w-[800px] h-[440px] flex justify-center items-center mx-auto text-center gap-x-[8px]">
          <p className="text-[24px] font-bold leading-[38px] text-primary whitespace-nowrap">
            {timeRemaining}
          </p>
          <p className="text-[24px] font-bold leading-[38px] text-primary">
            후
          </p>
          <p className="text-[24px] font-bold leading-[38px] text-gray7">
            경기가 시작됩니다.
          </p>
        </div>
      )}
    </div>
  );
};
export default LiveSection;
