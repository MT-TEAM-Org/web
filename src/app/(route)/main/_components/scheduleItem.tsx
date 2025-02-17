import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";

// API에서 데이터를 가져오는 함수 (임시 데이터 예제)
const matchData = [
  {
    id: 1,
    date: "02.04",
    time: "19:00",
    category: "2025 LCK CUP 그룹 배틀",
    team1: "T1",
    team2: "젠지",
  },
];

const scheduleItem = () => {
  const iconStyle =
    "w-[32px] h-[32px]  flex flex-col gap-1 justify-center items-center object-contain";
  const iconTitleStyle = "font-[700] text-[16px] leading-6 align-center";

  return (
    <div className="flex flex-col items-center justify-center min-w-[275px] min-h-[126px]  bg-[#FFFffF] rounded-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05) ">
      {matchData.map((match) => (
        <div
          key={match.id}
          className="flex flex-col w-full gap-3  items-center justify-center min-w-[226px] min-h-[126px]  "
        >
          {/* 카테고리 (예: E스포츠) */}

          <div className=" flex  items-center  gap-2 text-xs text-[#A6A6A6] font-[500] leading-[18px] align-center min-w-[251px] ">
            <p className="w-[37px] h-[26px] bg-slate-200 rounded-md text-center flex items-center justify-center">
              예정
            </p>
            <p>{match.date}</p> <p>{match.time}</p> <p>{match.category}</p>
          </div>

          {/* 팀 및 경기 정보 */}
          <div className="min-h-[26px] min-w-[251px] flex  flex-col  justify-center gap-3  ">
            {/* 왼쪽 팀 */}
            <div className="flex items-center">
              <Fake_scheduleItem />
              <span className={iconTitleStyle}>{match.team1}</span>
            </div>

            {/* 오른쪽 팀 */}
            <div className="flex items-center">
              <Fake_scheduleItem2 />
              <span className={iconTitleStyle}>{match.team2}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default scheduleItem;
