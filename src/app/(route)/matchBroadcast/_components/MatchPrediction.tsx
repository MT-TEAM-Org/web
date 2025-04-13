"use client";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";
import usePatchMatchPrediction from "@/_hooks/fetcher/match-controller/usePatchMatchPrediction";
import { useToast } from "@/_hooks/useToast";
import {
  MatchItem,
  MatchScheduleResponse,
} from "@/services/match-controller/getMatchSchedule";
import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface MatchPredictionProps {
  matchId: number;
  scheduleData: MatchScheduleResponse;
  matchData?: MatchItem[];
  matchType?: string;
}

const MatchPrediction = ({ matchId, scheduleData }: MatchPredictionProps) => {
  const toast = useToast();
  const { data: matchData } = useGetMatchPrediction(matchId);
  const votePrediction = usePatchMatchPrediction();

  console.log(matchData, "matchData");

  const now = new Date();
  const startTime = new Date(matchData?.data?.startTime);
  const isStart = startTime ? now >= startTime : false;

  const isVoted = matchData?.data?.vote === true;
  const voteHome = matchData?.data?.side === "HOME";
  const voteAway = matchData?.data?.side === "AWAY";
  console.log(voteHome, "voteHome");

  const isLoggedIn = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  const handleVote = (side: "HOME" | "AWAY") => {
    if (!isLoggedIn()) {
      toast.error("로그인 후 이용해주세요.", "");
    } else {
      votePrediction.mutate({
        matchPredictionId: matchData?.data?.id,
        side: side,
      });
    }
  };

  return (
    <div className="w-full max-w-[800px] min-h-[148px] mt-[24px]">
      <div className="w-full max-w-[171px] min-h-[38px] flex items-center gap-x-[8px] mb-[8px]">
        <p className="font-[700] text-[24px] leading-[38px] text-black whitespace-nowrap">
          승부예측
        </p>
        <p
          className={`text-center min-w-[81px] h-[28px] font-[700] text-[14px] leading-[20px] py-[4px] px-[8px] rounded-[5px] ${
            isStart ? "bg-gray2 text-gray5" : "bg-warning text-white "
          }`}
        >
          {isStart ? "예측 종료" : "예측 진행중"}
        </p>
      </div>
      <div className="w-full h-[40px] mb-[8px]">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center w-[388px] gap-[6px]">
            {matchData?.data?.homeTeam?.logo ? (
              <Image
                src={matchData.data.homeTeam.logo}
                width={40}
                height={40}
                alt="homeTeam Logo"
              />
            ) : (
              <Skeleton className="w-[388px] h-[40px] rounded-md" />
            )}
            <p className="w-full h-full font-[700] text-[18px] leading-[28px]">
              {matchData?.data?.homeTeam?.name}
            </p>
          </div>
          <div className="flex items-center w-[388px]  gap-[8px]">
            <p className="w-full h-full text-right font-[700] text-[18px] leading-[28px]">
              {matchData?.data?.awayTeam?.name}
            </p>
            {matchData?.data?.awayTeam?.logo ? (
              <Image
                src={matchData.data.awayTeam.logo}
                width={40}
                height={40}
                alt="awayTeam Logo"
              />
            ) : (
              <Skeleton className="w-[388px] h-[40px] rounded-md" />
            )}
          </div>
        </div>
      </div>
      <div
        className={`relative w-full min-h-[54px] rounded-[5px] overflow-hidden mb-[12px] ${
          isStart ? "pointer-events-none" : ""
        }`}
      >
        {isVoted && (
          <div className="absolute inset-0 flex w-full h-full">
            <div
              className={`h-full ${voteHome ? "bg-gray8" : "bg-gray6"}`}
              style={{ width: `${matchData?.data?.home}%` }}
            ></div>
            <div
              className={`h-full ${voteAway ? "bg-gray8" : "bg-gray6"}`}
              style={{ width: `${matchData?.data?.away}%` }}
            ></div>
          </div>
        )}
        <div
          className={`flex justify-between items-center text-white w-full min-h-[54px] relative z-10 font-[700] text-[24px] leading-[38px] ${
            isVoted ? "pointer-events-none" : ""
          } ${!isVoted ? "bg-gray3" : ""}`}
        >
          <div
            onClick={() => handleVote("HOME")}
            className="flex items-center w-[400px] h-[54px] cursor-pointer hover:bg-gray4 group py-[8px] px-[16px]"
          >
            {isVoted ? matchData?.data?.home : 0}%
            <span className="w-full flex items-center ml-[16px] opacity-0 group-hover:opacity-100 text-[16px] leading-[28px] text-white">
              투표하기
            </span>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
            VS
          </div>
          <div
            onClick={() => handleVote("AWAY")}
            className="flex justify-end items-center w-[400px] h-[54px] cursor-pointer hover:bg-gray4 group py-[8px] px-[16px]"
          >
            <span className="w-full flex justify-end items-center mr-[16px] opacity-0 group-hover:opacity-100 text-[16px] leading-[28px] text-white">
              투표하기
            </span>
            {isVoted ? matchData?.data?.away : 0}%
          </div>
        </div>
        {!isVoted && (
          <div className="absolute inset-0 bg-gray3 opacity-20 rounded-[5px]"></div>
        )}
      </div>
    </div>
  );
};

export default MatchPrediction;
