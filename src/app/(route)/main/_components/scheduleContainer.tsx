import React from 'react';
import ScheduleItem from "@/app/(route)/main/_components/scheduleItem";

const ScheduleContainer = () => {
  return (
    <div className="w-[1136px] h-[96px] flex gap-2 m-2">
      <ScheduleItem/>
      <ScheduleItem/>
      <ScheduleItem/>
      <ScheduleItem/>
      <ScheduleItem/>
    </div>
  );
};

export default ScheduleContainer;