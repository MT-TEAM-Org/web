import React from "react";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import ScheduleItem from "./scheduleItem";
import EmptyScheduleItem from "./EmptyScheduleItem";

const ScheduleContainer = () => {
  return (
    <div className="w-full h-full min-h-[174px] p-6 flex gap-3 bg-[#FAFAFA] justify-center">
      <div className="w-[1200px] h-full min-h-[126px] flex gap-6 justify-center items-center">
        <div className="w-[1136px] h-auto min-h-[126px] flex justify-between items-center gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ScheduleItem key={index} />
          ))}
          <EmptyScheduleItem />
        </div>
        <button className="w-[40px] h-[40px] rounded-[999px] flex justify-center items-center bg-[#FAFAFA] shadow-[0px_4px_4px_-2px_rgba(24,39,75,0.08),0px_2px_4px_-2px_rgba(24,39,75,0.1)]">
          <Arrow_right />
        </button>
      </div>
    </div>
  );
};

export default ScheduleContainer;
