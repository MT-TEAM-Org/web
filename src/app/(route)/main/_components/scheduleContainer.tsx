"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import ScheduleItem from "./scheduleItem";
import EmptyScheduleItem from "./EmptyScheduleItem";
import { motion, AnimatePresence } from "framer-motion";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
import useGetEsportsSchedule from "@/_hooks/fetcher/match-controller/useGetEsportsSchedule";
import EsportsSchedule from "@/app/_components/EsportsSchedule";

interface ScheduleContainerProps {
  showCategoryButtons?: boolean;
  showAll?: boolean;
  matchType?: string;
}

const ScheduleContainer = ({
  showCategoryButtons = false,
  showAll = false,
  matchType,
}: ScheduleContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isGameboard = pathname === "/matchBroadcast";

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    isGameboard ? 0 : null
  );

  const { data: scheduleResponse, isLoading } = useGetMatchSchedule(
    matchType || "ALL"
  );
  const regularSportsData = scheduleResponse?.data?.list || [];

  const { data: esportsSchedule, isLoading: isEsportsLoading } =
    useGetEsportsSchedule();

  const allScheduleData = useMemo(() => {
    if (showAll) {
      let allData = [...regularSportsData];

      if (esportsSchedule?.data) {
        const esportsMatches = [];

        for (const group of esportsSchedule.data) {
          if (group.list && group.list.length > 0) {
            for (const match of group.list) {
              esportsMatches.push({
                ...match,
                groupId: group.id,
                category: "ESPORTS",
              });
            }
          }
        }

        allData = [...allData, ...esportsMatches];
      }

      return allData.sort((a, b) => {
        const dateA = new Date(a.startTime || a.startTime).getTime();
        const dateB = new Date(b.startTime || b.startTime).getTime();
        return dateA - dateB;
      });
    } else {
      return regularSportsData;
    }
  }, [showAll, regularSportsData, esportsSchedule]);

  const isEsportsCategory = matchType === "ESPORTS";

  const itemsPerPage = 4;
  const totalPages = Math.ceil(allScheduleData.length / itemsPerPage);

  const displayedItems = allScheduleData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const isAllDataLoading = showAll ? isLoading || isEsportsLoading : isLoading;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (allScheduleData.length > 0) {
      setCurrentPage(0);
    }
    setSelectedIndex(isGameboard ? 0 : null);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentPage(0);
    setSelectedIndex(isGameboard ? 0 : null);
    router.push(`/matchBroadcast/${category}`);
  };

  const handleMatchClick = (index: number) => {
    setSelectedIndex(index);
    const item = displayedItems[index];

    if (item.groupId) {
      router.push(`/matchBroadcast/ESPORTS/${item.groupId}`);
    } else {
      const matchId = item.id;
      if (!matchType || matchType === "undefined" || matchType === "ALL") {
        const matchCategory = item.category || "ESPORTS";
        router.push(`/matchBroadcast/${matchCategory}/${matchId}`);
      } else {
        router.push(`/matchBroadcast/${matchType}/${matchId}`);
      }
    }
  };

  return (
    <div className="w-full h-[126px] flex flex-col bg-gray1 justify-center items-center">
      {showCategoryButtons && (
        <div className="w-[1200px] h-[40px] flex mb-[12px] gap-x-[8px]">
          {CATEGORUIES.map(({ value, name }) => (
            <button
              key={value}
              onClick={() => handleCategoryChange(value)}
              className={`${BUTTON_STYLE} ${
                matchType === value ? "border-gray7" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {isEsportsCategory ? (
        <EsportsSchedule />
      ) : (
        <div className="w-[1200px] h-[126px] flex gap-x-[24px] justify-center items-center">
          <div className="w-[1136px] h-[126px] flex justify-between items-center gap-3">
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
                className="w-full flex justify-between items-center gap-3"
              >
                {isAllDataLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <EmptyScheduleItem key={index} />
                    ))
                  : displayedItems.length > 0
                  ? displayedItems.map((item, index) => (
                      <div key={index} className="w-[275px]">
                        <ScheduleItem
                          isSelected={selectedIndex === index}
                          onClick={() => handleMatchClick(index)}
                          data={item}
                        />
                      </div>
                    ))
                  : Array.from({ length: 4 }).map((_, index) => (
                      <EmptyScheduleItem key={index} />
                    ))}

                {!isAllDataLoading &&
                  displayedItems.length > 0 &&
                  displayedItems.length < 4 &&
                  Array.from({ length: 4 - displayedItems.length }).map(
                    (_, index) => <EmptyScheduleItem key={`empty-${index}`} />
                  )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNextPage}
            disabled={allScheduleData.length <= itemsPerPage}
            className="w-[40px] h-[40px] rounded-[999px] flex items-center justify-center bg-gray1 shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)] cursor-pointer hover:bg-gray2"
          >
            <Arrow_right
              width="24"
              height="24"
              viewBox="0 0 24 24"
              d="M7 21 L17 12 L7 3"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleContainer;

const BUTTON_STYLE =
  "w-[78px] h-[40px] rounded-[5px] border py-[13px] pb-[16px] flex items-center justify-center font-[700] text-[14px] leading-[20px] text-center";

const CATEGORUIES = [
  {
    name: "E스포츠",
    value: "ESPORTS",
    style: BUTTON_STYLE,
  },
  {
    name: "축구",
    value: "FOOTBALL",
    style: BUTTON_STYLE,
  },
  {
    name: "야구",
    value: "BASEBALL",
    style: BUTTON_STYLE,
  },
];
