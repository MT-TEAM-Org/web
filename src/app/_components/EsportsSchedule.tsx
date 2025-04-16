"use client";
import React, { useState, useEffect } from "react";
import useGetEsportsSchedule from "@/_hooks/fetcher/match-controller/useGetEsportsSchedule";
import { MatchItem } from "@/services/match-controller/getMatchSchedule";
import { formatDate } from "@/utils/formatData";
import Image from "next/image";
import EmptyEsportsBox from "../(route)/main/_components/EmptyEsportsBox";
import { motion, AnimatePresence } from "framer-motion";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/utils";

interface EsportsScheduleProps {
  onMatchClick?: (matchId: number) => void;
}

const EsportsSchedule = ({ onMatchClick }: EsportsScheduleProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isGameboard =
    pathname === "/matchBroadcast" ||
    pathname.startsWith("/matchBroadcast/ESPORTS");

  const { data: esportsSchedule, isLoading } = useGetEsportsSchedule();
  const [currentPage, setCurrentPage] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const totalGroups = esportsSchedule?.data?.length || 0;
  const currentGroup = esportsSchedule?.data?.[currentPage] || null;

  useEffect(() => {
    if (
      isGameboard &&
      pathname === "/matchBroadcast/ESPORTS" &&
      !isLoading &&
      currentGroup?.list?.length > 0
    ) {
      const firstMatchId = currentGroup.list[0].id;
      router.push(`/matchBroadcast/ESPORTS/${firstMatchId}`);
    }
  }, [isLoading, currentGroup, pathname, isGameboard]);

  const getMatchStatus = (match: MatchItem) => {
    const now = new Date();
    const startTime = new Date(match.startTime);

    if (now < startTime) {
      return "예정";
    } else {
      return "경기중";
    }
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "예정":
        return "bg-gray2";
      case "경기중":
        return "bg-gra text-white";
      default:
        return "bg-gray2";
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalGroups - 1) {
      setCurrentPage(currentPage + 1);
    } else if (totalGroups > 0) {
      setCurrentPage(0);
    }
    setSelectedItemId(null); // 페이지 변경 시 선택 초기화
  };

  const handleMatchClick = (matchId: number) => {
    setSelectedItemId(matchId);
    setIsSelected(true);
    if (onMatchClick) {
      onMatchClick(matchId);
    } else {
      router.push(`/matchBroadcast/ESPORTS/${matchId}`);
    }
  };

  const handleDetailMatchClick = () => {
    if (selectedItemId) {
      router.push(`/matchBroadcast/ESPORTS/${selectedItemId}`);
    }
  };

  if (isLoading || !esportsSchedule?.data || totalGroups === 0) {
    return (
      <div className="w-full max-w-[1136px] h-auto min-h-[126px] flex justify-start items-center mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <EmptyEsportsBox key={`empty-no-data-${i}`} />
        ))}
      </div>
    );
  }

  const itemCount = currentGroup?.list?.length || 0;
  const emptyItemCount = Math.max(0, 4 - itemCount);

  return (
    <div
      className={cn(
        "w-[1200px] h-auto flex flex-col justify-center items-center",
        "mobile:w-screen mobile:overflow-x-auto mobile:scrollbar-hide"
      )}
    >
      <div className="w-full max-w-[1200px] flex items-center">
        <div
          onClick={() => handleMatchClick(currentGroup.id)}
          className="w-full mx-auto cursor-pointer"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentPage}
              initial={{ x: "3%" }}
              animate={{ x: 0 }}
              exit={{ opacity: 0.5, x: "0%" }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.1,
              }}
              className="w-full h-[126px] overflow-hidden flex justify-start items-center mx-auto p-[12px] border shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] bg-white"
            >
              {currentGroup?.list?.map((item: MatchItem) => {
                const status = getMatchStatus(item);
                const formattedData = formatDate(item.startTime);

                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMatchClick(item.id);
                    }}
                    key={item?.id}
                    className="w-full max-w-[272px] h-[126px] flex flex-col justify-center gap-y-[4px] mr-[8px] cursor-pointer"
                  >
                    <div className="flex w-full min-w-[248px] h-[26px] gap-x-[8px] text-[12px] leading-[18px] text-gray5">
                      <p
                        className={`flex items-center justify-center min-w-[37px] h-[26px] rounded-[5px] ${statusClass(
                          status
                        )}`}
                      >
                        {status}
                      </p>
                      <p className="flex justify-center items-center">
                        {formattedData}
                      </p>
                      <p className="flex justify-center items-center">
                        {item?.leagueName}
                      </p>
                    </div>
                    <div className="flex gap-x-[8px] font-[700] text-[14px] leading-[20px] text-gray7 items-center">
                      <Image
                        src={item?.homeTeam?.logo}
                        width={32}
                        height={32}
                        alt="TeamLogo"
                      />
                      <p>{item?.homeTeam?.name}</p>
                    </div>
                    <div className="flex gap-x-[8px] font-[700] text-[14px] leading-[20px] text-gray7 items-center">
                      <Image
                        src={item?.awayTeam?.logo}
                        width={32}
                        height={32}
                        alt="TeamLogo"
                      />
                      <p>{item.awayTeam?.name}</p>
                    </div>
                  </div>
                );
              })}

              {Array.from({ length: emptyItemCount }).map((_, i) => (
                <EmptyEsportsBox key={`empty-${currentPage}-${i}`} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={handleNextPage}
          disabled={totalGroups <= 1}
          className="w-[40px] h-[40px] rounded-[999px] flex items-center justify-center bg-gray1 shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)] cursor-pointer hover:bg-gray2 ml-6"
        >
          <Arrow_right
            width="24"
            height="24"
            viewBox="0 0 24 24"
            d="M7 21 L17 12 L7 3"
          />
        </button>
      </div>
    </div>
  );
};

export default EsportsSchedule;
