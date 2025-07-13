"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
import EmptyMatchBoard from "../_components/EmptyMatchBoard";
import MatchDetailSkeleton from "../_components/matchSkeleton";

export default function MatchTypePage({
  params,
}: {
  params: Promise<{ matchType: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { matchType } = unwrappedParams;

  const {
    data: scheduleResponse,
    isLoading,
    isError,
  } = useGetMatchSchedule(matchType);
  const scheduleData = scheduleResponse?.data?.list || [];

  useEffect(() => {
    if (!isLoading && scheduleData.length > 0) {
      const firstMatchId = scheduleData[0].id;
      router.replace(`/matchBroadcast/${matchType}/${firstMatchId}`);
    }
  }, [isLoading, scheduleData, matchType, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-5">
        <MatchDetailSkeleton />
      </div>
    );
  } else if (isError || scheduleData.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <EmptyMatchBoard />
      </div>
    );
  }

  return <div className="flex justify-center items-center"></div>;
}
