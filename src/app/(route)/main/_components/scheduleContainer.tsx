"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import ScheduleItem from "./scheduleItem";
import EmptyScheduleItem from "./EmptyScheduleItem";

const ScheduleContainer = () => {
  const pathname = usePathname();
  const isGameboard = pathname === "/gameboard";

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    isGameboard ? 0 : null
  );

  return (
    <div className="w-full h-full min-h-[126px] flex gap-3 bg-gray1 justify-center">
      <div className="w-[1200px] h-full min-h-[126px] flex gap-6 justify-center items-center">
        <div className="w-[1136px] h-auto min-h-[126px] flex justify-between items-center gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ScheduleItem
              key={index}
              isSelected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
          <EmptyScheduleItem />
        </div>

        <button className="w-[40px] h-[40px] rounded-[999px] flex items-center justify-center bg-gray1 shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)]">
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
