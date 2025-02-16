import React from "react";
import BenchPlayerItem from "./BenchPlayerItem";

const benchPlayerA = [
  { name: "이병헌", info: "포수, 우타" },
  { name: "김민수", info: "포수, 우타" },
  { name: "안주형", info: "2루수, 좌타" },
  { name: "류지혁", info: "2루수, 좌타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
];

const benchPlayerB = [
  { name: "김범석", info: "포수, 우타" },
  { name: "허도환", info: "포수, 우타" },
  { name: "이주헌", info: "포수, 우타" },
  { name: "류지혁", info: "2루수, 좌타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
  { name: "이병헌", info: "포수, 우타" },
];

const BenchPlayers = () => {
  return (
    <div className="w-full min-h-[360px] flex gap-6 flex-col items-center justify-center">
      <div className="w-full min-h-[28px] flex items-center justify-center">
        <p className="font-bold text-[18px] leading-7 tracking-[-0.04em]">
          후보야수
        </p>
      </div>
      <div className="w-full min-h-[308px] flex gap-10">
        <div className="w-full min-h-[308px] flex flex-col gap-10">
          {benchPlayerA.map((player, index) => (
            <BenchPlayerItem
              key={index}
              name={player.name}
              info={player.info}
            />
          ))}
        </div>
        <div className="min-w-[2px] min-h-[308px] bg-[#EEEEEE]" />
        <div className="w-full min-h-[308px] flex flex-col gap-10">
          {benchPlayerB.map((player, index) => (
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

export default BenchPlayers;
