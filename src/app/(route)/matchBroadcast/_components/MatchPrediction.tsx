"use client";
import useGetMatchPrediction from "@/_hooks/fetcher/match-controller/useGetMatchPrediction";
import usePatchMatchPrediction from "@/_hooks/fetcher/match-controller/usePatchMatchPrediction";
import { useToast } from "@/_hooks/useToast";
import {
  MatchItem,
  MatchScheduleResponse,
} from "@/services/match-controller/getMatchSchedule";
import { cn } from "@/utils";
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

  const now = new Date();
  const startTime = new Date(matchData?.data?.startTime);
  const isStart = startTime ? now >= startTime : false;

  const isVoted = matchData?.data?.vote === true;
  const voteHome = matchData?.data?.side === "HOME";
  const voteAway = matchData?.data?.side === "AWAY";

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
    <div
      className={cn(
        "w-full max-w-[800px] min-h-[148px] mt-[24px] bg-white",
        "mobile:min-h-[92px] mobile:mt-0"
      )}
    >
      <div
        className={cn(
          "w-full max-w-[171px] min-h-[38px] flex items-center gap-x-[8px] mb-[8px]",
          "mobile:hidden"
        )}
      >
        <p className="font-[700] text-[24px] leading-[38px] tracking-[-0.04em] text-black whitespace-nowrap">
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
      <div className={cn("w-full h-[40px] mb-[8px]", "mobile:p-4 mobile:mb-0")}>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center w-1/2 gap-2">
            {matchData?.data?.homeTeam?.logo ? (
              <Image
                src={matchData.data.homeTeam.logo}
                width={40}
                height={40}
                alt="homeTeam Logo"
                className={cn(
                  "w-[40px] h-[40px]",
                  "mobile:w-[24px] mobile:h-[24px]"
                )}
              />
            ) : (
              <Skeleton className="w-[388px] h-[40px] rounded-md" />
            )}
            <p
              className={cn(
                "w-full h-full font-[700] text-[18px] leading-[28px] tracking-[-0.04em]",
                "text-[14px] leading-[20px]"
              )}
            >
              {matchData?.data?.homeTeam?.name}
            </p>
          </div>
          <div>
            <p
              className={cn(
                "hidden min-w-[34px] min-h-[18px] text-[10px] leading-[14px] tracking-[-0.02em] items-center justify-center rounded-[5px] p-1 whitespace-nowrap",
                isStart ? "bg-gray2 text-gray5" : "bg-warning text-white",
                "mobile:flex"
              )}
            >
              {isStart ? "종료" : "진행중"}
            </p>
          </div>
          <div className="flex items-center w-1/2 gap-2">
            <p
              className={cn(
                "w-full h-full text-right font-[700] text-[18px] leading-[28px] tracking-[-0.04em]",
                "text-[14px] leading-[20px]"
              )}
            >
              {matchData?.data?.awayTeam?.name}
            </p>
            {matchData?.data?.awayTeam?.logo ? (
              <Image
                src={matchData.data.awayTeam.logo}
                width={40}
                height={40}
                alt="awayTeam Logo"
                className={cn(
                  "w-[40px] h-[40px]",
                  "mobile:w-[24px] mobile:h-[24px]"
                )}
              />
            ) : (
              <Skeleton className="w-[388px] h-[40px] rounded-md" />
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          `relative w-full min-h-[54px] rounded-[5px] overflow-hidden mb-[12px] ${
            isStart ? "pointer-events-none" : ""
          }`,
          "mobile:h-[32px] mobile:p-4 mobile:rounded-[5px]"
        )}
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
          className={cn(
            "flex justify-between items-center text-white w-full min-h-[54px] relative z-10 font-[700] text-[24px] leading-[38px] rounded-[5px]",
            isVoted && "pointer-events-none",
            !isVoted && "bg-gray3",
            "mobile:min-h-[32px]"
          )}
        >
          <div
            onClick={() => handleVote("HOME")}
            className={cn(
              "flex items-center w-[400px] h-[54px] cursor-pointer hover:bg-gray4 group py-2 px-4 rounded-l-[5px]",
              "mobile:h-[32px] mobile:text-[14px] mobile:leading-5 mobile:font-bold"
            )}
          >
            {isVoted ? matchData?.data?.home : 0}%
            <span
              className={cn(
                "w-full flex items-center ml-[16px] opacity-0 group-hover:opacity-100 text-[16px] leading-[28px] text-white",
                "mobile:text-[14px] mobile:leading-5"
              )}
            >
              투표하기
            </span>
          </div>
          <div
            className={cn(
              "absolute left-1/2 transform -translate-x-1/2 pointer-events-none",
              "mobile:font-bold mobile:text-[12px] mobile:leading-[18px] mobile:tracking-[-0.02em]"
            )}
          >
            VS
          </div>
          <div
            onClick={() => handleVote("AWAY")}
            className={cn(
              "flex justify-end items-center w-[400px] h-[54px] cursor-pointer hover:bg-gray4 group py-[8px] px-[16px] rounded-r-[5px]",
              "mobile:h-[32px] mobile:text-[14px] mobile:leading-5 mobile:font-bold"
            )}
          >
            <span className="w-full flex justify-end items-center mr-[16px] opacity-0 group-hover:opacity-100 text-[16px] leading-[28px] text-white">
              투표하기
            </span>
            {isVoted ? matchData?.data?.away : 0}%
          </div>
        </div>
        {!isVoted && (
          <div className="absolute inset-0 opacity-20 rounded-[5px]"></div>
        )}
      </div>
    </div>
  );
};

export default MatchPrediction;
