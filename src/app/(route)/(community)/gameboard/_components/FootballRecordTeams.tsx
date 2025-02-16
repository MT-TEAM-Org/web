import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";
import BaseballStrengthInfo from "./BaseballStrengthInfo";

const recordTeams = [
  { title: "볼점유율", num1: "43%", num2: "57%" },
  { title: "슈팅", num1: "8", num2: "13" },
  { title: "유효슈팅", num1: "2", num2: "5" },
  { title: "패스시도", num1: "416", num2: "558" },
  { title: "패스성공", num1: "315", num2: "454" },
  { title: "키패스", num1: "4", num2: "9" },
  { title: "코너킥", num1: "3", num2: "9" },
  { title: "프리킥", num1: "14", num2: "11" },
  { title: "오프사이드", num1: "2", num2: "0" },
  { title: "선방", num1: "4", num2: "2" },
  { title: "골킥", num1: "12", num2: "8" },
  { title: "선수교체", num1: "5", num2: "5" },
  { title: "파울", num1: "11", num2: "14" },
  { title: "경고", num1: "5", num2: "1" },
  { title: "퇴장", num1: "0", num2: "0" },
  { title: "기대득점", num1: "0.22", num2: "2.57" },
  { title: "기대도움", num1: "0.53", num2: "2.3" },
];

const FootballRecordTeams = () => {
  return (
    <div className="w-full min-h-[662px] flex gap-3 flex-col">
      <div className="w-full min-h-[38px] flex gap-[18px]">
        <div className="w-full max-w-[343px] min-h-[38px] flex gap-2 items-center justify-center">
          <div className="w-full max-w-[297px] min-h-[28px] text-[18px] leading-7 tracking-[-0.04em] flex justify-end">
            아우크스부르크
          </div>
          <div className="w-[38px] h-[38px]">
            <Fake_scheduleItem />
          </div>
        </div>
        <div className="w-[78px] min-h-[38px] font-bold text-[24px] leading-[38px] tracking-[-0.04em] flex align-center text-[#CBCBCB] justify-center text-center">
          VS
        </div>
        <div className="w-full max-w-[343px] min-h-[38px] flex gap-2 items-center justify-start">
          <div className="w-[38px] h-[38px]">
            <Fake_scheduleItem2 />
          </div>
          <div className="w-full max-w-[297px] min-h-[28px] text-[18px] leading-7 tracking-[-0.04em] align-right">
            아우크스부르크
          </div>
        </div>
      </div>
      <div className="w-full min-h-[612px] flex flex-col">
        {recordTeams.map((record, index) => (
          <BaseballStrengthInfo
            key={index}
            title={record.title}
            num1={record.num1}
            num2={record.num2}
          />
        ))}
      </div>
    </div>
  );
};

export default FootballRecordTeams;
