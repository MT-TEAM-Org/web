"use client";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";
import {
  MatchItem,
  MatchScheduleResponse,
} from "@/services/match-controller/getMatchSchedule";

interface MatchPredictionProps {
  matchId: number;
  scheduleData: MatchScheduleResponse;
  matchData?: MatchItem[];
  matchType?: string;
}

const MatchPrediction = ({ matchId, scheduleData }: MatchPredictionProps) => {
  const { data: matchData } = useGetMatchPrediction(matchId);

  return (
    <div className="w-[800px] min-h-[148px] mt-[24px]">
      <p className="font-[700] text-[24px] leading-[38px] text-black">
        승부예측
      </p>
      <div className="w-full h-[102px]">
        <div className="w-full h-[40px] flex justify-between items-center">
          <p className="w-[388px] h-full font-[700] text-[18px] leading-[28px]">
            T1
          </p>
          <p className="w-[388px] h-full text-right font-[700] text-[18px] leading-[28px]">
            젠지
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
