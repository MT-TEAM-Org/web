"use client";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";

interface MatchPredictionProps {
  matchId: number;
}

const MatchPrediction = ({ matchId }) => {
  const { data: response } = useGetMatchPrediction(1204);
  return <div className="w-[800px]">승부 예측</div>;
};

export default MatchPrediction;
