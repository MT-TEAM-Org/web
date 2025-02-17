import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";

interface ScheduleItemProps {
  match: {
    id: string;
    date: string;
    time: string;
    category: string;
    team1: string;
    team2: string;
    imageUrl?: string;
  };
}

const ScheduleItem = ({ match }: ScheduleItemProps) => {
  const isNoSchedule = match.id === "경기 일정 없음";

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[275px] h-[126px] p-2   bg-[#ffffff] rounded-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05) ">
      {isNoSchedule ? (
        <div className="text-gray-500 font-semibold">경기 일정 없음</div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-3 rounded-[5px] w-[275px] h-[126px] bg-[#ffffff] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center w-[251px] h-[26px] gap-1 text-xs text-[#A6A6A6] font-[500] leading-[18px]  ">
            <p className="w-[37px] h-[26px] bg-slate-200 rounded-md text-center flex items-center justify-center ">
              예정
            </p>
            <span className="truncate flex-shrink-0">
              {new Intl.DateTimeFormat("en-US", {
                month: "2-digit",
                day: "2-digit",
              })
                .format(new Date(match.date))
                .replace("/", ".")}
            </span>
            <span className="truncate flex-shrink-0">{match.time}</span>
            <span className="truncate flex-shrink-0">{match.category}</span>
          </div>

          <div className="flex flex-col justify-center gap-3 min-h-[26px] min-w-[251px]">
            <div className="flex items-center">
              <Fake_scheduleItem />
              <span className="font-[700] text-[16px] leading-6">
                {match.team1}
              </span>
            </div>
            <div className="flex items-center">
              <Fake_scheduleItem2 />
              <span className="font-[700] text-[16px] leading-6">
                {match.team2}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleItem;
