"use client";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";

interface MatchPredictionProps {
  matchId: number;
}

const MatchPrediction = ({ matchId }: MatchPredictionProps) => {
  const { data: matchData } = useGetMatchPrediction(matchId);
  console.log("matchData", matchData);
  return (
    <div className="w-[800px] min-h-[148px]">
      <p>승부예측 </p>
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
