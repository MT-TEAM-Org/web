"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
export default function MatchTypePage({
  params,
}: {
  params: Promise<{ matchType: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { matchType } = unwrappedParams;

  const { data: scheduleResponse, isLoading } = useGetMatchSchedule(matchType);
  const scheduleData = scheduleResponse?.data?.list || [];

  useEffect(() => {
    if (!isLoading && scheduleData.length > 0) {
      const firstMatchId = scheduleData[0].id;
      router.replace(`/matchBroadcast/${matchType}/${firstMatchId}`);
    }
  }, [isLoading, scheduleData, matchType, router]);

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return <div className="flex justify-center items-center"></div>;
}
