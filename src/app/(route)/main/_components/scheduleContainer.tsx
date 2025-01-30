import React from 'react';
import ScheduleItem from "@/app/(route)/main/_components/scheduleItem";

const ScheduleContainer = () => {
  return (
    <div className="max-w-[1136px] max-h-[96px] flex gap-2 my-6">
      {Array.from({ length: 5 }).map((_, index) => (
          <ScheduleItem key={index} />
        ))}
    </div>
  );
};

export default ScheduleContainer;