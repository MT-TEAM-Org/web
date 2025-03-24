"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import ScheduleItem from "./scheduleItem";
import EmptyScheduleItem from "./EmptyScheduleItem";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
import { motion, AnimatePresence } from "framer-motion";

const ScheduleContainer = () => {
  const pathname = usePathname();
  const isGameboard = pathname === "/gameboard";

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    isGameboard ? 0 : null
  );

  const itemsPerPage = 4;
  const category = "ALL";
  const { data: scheduleResponse, isLoading } = useGetMatchSchedule(category);
  const scheduleData = scheduleResponse?.data?.list || [];

  const displayedItems = scheduleData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(scheduleData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (scheduleData.length > 0) {
      setCurrentPage(0);
    }
    setSelectedIndex(isGameboard ? 0 : null);
  };

  return (
    <div className="w-full h-full min-h-[126px] flex gap-3 bg-gray1 justify-center">
      <div className="w-[1200px] h-full min-h-[126px] flex gap-6 justify-center items-center">
        <div className="w-[1136px] h-auto min-h-[126px] flex justify-between items-center gap-3">
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <EmptyScheduleItem key={index} />
                  ))
                : displayedItems.length > 0
                ? displayedItems.map((item, index) => (
                    <div key={index} className="w-[275px]">
                      <ScheduleItem
                        isSelected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                        data={item}
                      />
                    </div>
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <EmptyScheduleItem key={index} />
                  ))}

              {!isLoading &&
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
          disabled={scheduleData.length <= itemsPerPage}
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
    </div>
  );
};

export default ScheduleContainer;
