"use client";

import { use } from "react";
import LiveSection from "../../_components/LiveSection";
import MatchPrediction from "../../_components/MatchPrediction";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
import MatchDetailSkeleton from "../../_components/matchSkeleton";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchType: string; matchId: number }>;
}) {
  const unwrappedParams = use(params);
  const { matchType, matchId } = unwrappedParams;
  const matchIdNum = matchId;

  const { data: matchSchedule, isLoading } = useGetMatchSchedule(matchType);

  if (isLoading) {
    return <MatchDetailSkeleton matchType={matchType} />;
  }

  return (
    <div className="flex justify-start w-full max-w-[1200px] items-center mx-auto gap-x-[40px]">
      <div className="flex flex-col w-[800px] ">
        {matchType === "ESPORTS" && (
          <div className="w-full">
            <LiveSection matchId={matchIdNum} />
          </div>
        )}
        <div className="w-full ">
          <MatchPrediction scheduleData={matchSchedule} matchId={matchIdNum} />
        </div>
      </div>
      {/* <div className="w-[360px]">채팅 구역</div> */}
    </div>
  );
}
