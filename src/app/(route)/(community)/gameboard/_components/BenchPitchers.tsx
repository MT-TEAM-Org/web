import React from "react";
import BenchPlayerItem from "./BenchPlayerItem";

const benchPlayerC = [
  { name: "이병헌", info: "포수, 우타" },
  { name: "김민수", info: "포수, 우타" },
  { name: "안주형", info: "2루수, 좌타" },
  { name: "류지혁", info: "2루수, 좌타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
];

const benchPlayerD = [
  { name: "김범석", info: "포수, 우타" },
  { name: "허도환", info: "포수, 우타" },
  { name: "이주헌", info: "포수, 우타" },
  { name: "류지혁", info: "2루수, 좌타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
];

const BenchPitchers = () => {
  return (
    <div className="w-full min-h-[360px] flex gap-6 flex-col items-center justify-center">
      <div className="w-full min-h-[28px] text-center">
        <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-[#303030]">
          볼펜투수
        </p>
      </div>
      <div className="w-full min-h-[572px] flex gap-10 justify-center">
        <div className="w-[347px] min-h-[572px]">
          {benchPlayerC.map((player, index) => (
            <BenchPlayerItem
              key={index}
              name={player.name}
              info={player.info}
            />
          ))}
        </div>
        <div className="min-w-[2px] h-[572px] bg-[#EEEEEE]" />
        <div className="w-[347px] min-h-[572px]">
          {benchPlayerD.map((player, index) => (
            <BenchPlayerItem
              key={index}
              name={player.name}
              info={player.info}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenchPitchers;
