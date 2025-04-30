"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import ScheduleItem from "./scheduleItem";
import EmptyScheduleItem from "./EmptyScheduleItem";
import { motion, AnimatePresence } from "framer-motion";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
import useGetEsportsSchedule from "@/_hooks/fetcher/match-controller/useGetEsportsSchedule";
import EsportsSchedule from "@/app/_components/EsportsSchedule";
import { cn } from "@/utils";
import CustomIcon from "@/app/_components/IconComponents/Icon";

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

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const itemsPerPage = useMemo(() => {
    if (isMobile) return 3;
    if (isTablet) return 3;
    return 4;
  }, [isMobile, isTablet]);

  const pageStep = useMemo(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  }, [isMobile, isTablet]);

  const totalPages = Math.ceil(allScheduleData.length / pageStep);

  const displayedItems = useMemo(() => {
    const startIndex = currentPage * pageStep;
    return allScheduleData.slice(startIndex, startIndex + itemsPerPage);
  }, [allScheduleData, currentPage, pageStep, itemsPerPage]);

  const isAllDataLoading = showAll ? isLoading || isEsportsLoading : isLoading;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (allScheduleData.length > 0) {
      setCurrentPage(0);
    }
    setSelectedIndex(isGameboard ? 0 : null);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (allScheduleData.length > 0) {
      setCurrentPage(totalPages - 1);
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

    const matchId = item.id;
    if (!matchType || matchType === "undefined" || matchType === "ALL") {
      const matchCategory = item.category || "ESPORTS";
      router.push(`/matchBroadcast/${matchCategory}/${matchId}`);
    } else {
      router.push(`/matchBroadcast/${matchType}/${matchId}`);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col bg-gray1 justify-center items-center">
      {showCategoryButtons && (
        <div
          className={cn(
            "w-[1200px] h-[40px] flex mb-[12px] gap-x-[8px]",
            "tablet:max-w-[768px]",
            "mobile:flex mobile:gap-x-0 mobile:w-full"
          )}
        >
          {CATEGORUIES.map(({ value, name }) => (
            <button
              key={value}
              onClick={() => handleCategoryChange(value)}
              className={`${BUTTON_STYLE} ${
                matchType === value
                  ? "border-gray7 mobile:border-[2px]"
                  : "mobile:border-gray3 mobile:border-[2px] mobile:text-gray5"
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
        <div
          className={cn(
            "max-w-[1200px] h-[126px] flex gap-x-6 justify-between items-center",
            "tablet:max-w-[769px]",
            "mobile:w-full mobile:px-4"
          )}
        >
          <div
            className={cn(
              "max-w-[1136px] h-[126px] flex-1 flex justify-between items-center gap-3 overflow-hidden",
              "tablet:max-w-[769px]",
              "mobile:w-full mobile:overflow-x-auto mobile:scrollbar-hide"
            )}
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
                className="w-full flex justify-between items-center gap-3"
              >
                {isAllDataLoading
                  ? Array.from({ length: itemsPerPage }).map((_, index) => (
                      <EmptyScheduleItem key={index} />
                    ))
                  : displayedItems.length > 0
                  ? displayedItems.map((item, index) => (
                      <div key={index}>
                        <ScheduleItem
                          isSelected={selectedIndex === index}
                          onClick={() => handleMatchClick(index)}
                          data={item}
                        />
                      </div>
                    ))
                  : Array.from({ length: itemsPerPage }).map((_, index) => (
                      <EmptyScheduleItem key={index} />
                    ))}

                {!isAllDataLoading &&
                  displayedItems.length > 0 &&
                  displayedItems.length < itemsPerPage &&
                  Array.from({
                    length: itemsPerPage - displayedItems.length,
                  }).map((_, index) => (
                    <EmptyScheduleItem key={`empty-${index}`} />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col items-center justify-center gap-[12px]">
            <button
              onClick={handleNextPage}
              disabled={allScheduleData.length <= itemsPerPage}
              className={cn(
                "w-[40px] h-[40px] rounded-[999px] flex items-center justify-center bg-gray1 shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)] cursor-pointer hover:bg-gray2 group"
              )}
            >
              <CustomIcon
                icon="MATCH_NEXT_ICON"
                className="w-[18px] h-[18px] text-white group-hover:text-gray2"
              />
            </button>
            <button
              onClick={handlePrevPage}
              disabled={allScheduleData.length <= itemsPerPage}
              className={cn(
                "min-w-[40px] w-[40px] h-[40px] rounded-[999px] flex items-center justify-center bg-gray1 shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)] cursor-pointer hover:bg-gray2 group",
                "tablet: tablet:right-0",
                "mobile: mobile:right-0"
              )}
            >
              <CustomIcon
                icon="MATCH_PREV_ICON"
                className="w-[18px] h-[18px] text-white group-hover:text-gray2"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleContainer;

const BUTTON_STYLE = cn(
  "w-[78px] h-[40px] rounded-[5px] border py-[13px] pb-[16px] flex items-center justify-center font-[700] text-[14px] leading-[20px] text-center text-gray7",
  "mobile:w-1/3 mobile:rounded-none mobile:border-x-0 mobile:border-t-0"
);

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
