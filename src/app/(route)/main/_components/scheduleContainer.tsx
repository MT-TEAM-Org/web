import React from "react";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import ScheduleItem from "./ScheduleItem";

const ScheduleContainer = () => {
  return (
    <div className="w-full min-h-[146px] flex gap-4 bg-[#F8FDFF] justify-center items-center">
      <div className="flex justify-center items-center gap-6">
        <div className="max-w-[1136px] min-h-[98px] flex justify-between items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <ScheduleItem key={index} />
          ))}
        </div>
        <button className="w-[40px] h-[40px] rounded-[50%] flex justify-center items-center bg-[#FAFAFA] shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)]">
          <Arrow_right />
        </button>
      </div>
    </div>
  );
};

export default ScheduleContainer;