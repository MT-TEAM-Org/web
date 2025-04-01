"use client";

import { use } from "react";
import LiveSection from "../../_components/LiveSection";
import MatchPrediction from "../../_components/MatchPrediction";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchType: string; matchId: string }>;
}) {
  const unwrappedParams = use(params);
  const { matchType, matchId } = unwrappedParams;
  const matchIdNum = Number(matchId);

  return (
    <div className="flex justify-center items-center mx-auto gap-x-[40px]">
      <div className="flex flex-col w-[800px] border">
        <div className="w-full">
          <LiveSection matchId={matchIdNum} />
        </div>
        <div className="w-full border">
          <MatchPrediction matchId={matchIdNum} />
        </div>
      </div>
      <div className="w-[360px]">채팅 구역</div>
    </div>
  );
}
