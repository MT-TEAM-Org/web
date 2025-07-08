"use client";

import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const buttonStyle =
  "w-[120px] min-h-[40px] rounded-[5px] border px-4 py-[13px] text-center border-gray3 font-bold text-[14px] text-gray7";

const Page = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("day");

  const options = [
    { name: "1일", value: "day" },
    { name: "1주일", value: "week" },
    { name: "1개월", value: "1month" },
    { name: "3개월", value: "3month" },
    { name: "6개월", value: "6month" },
    { name: "1년", value: "year" },
  ];

  const button = [
    {
      name: "초기화",
      value: "init",
      style: "bg-white border-gray3",
    },
    {
      name: "검색",
      value: "search",
      style: "bg-Primary text-white",
    },
  ];

  // 문의현황 옵션 핸들러
  const handleOption = (value: string) => {
    router.push(`?option=${value}`);
    setSelected(value);
  };

  // 검색 필터 버튼 핸들러
  const handleButton = (value: string) => {
    console.log("버튼클릭됨", value);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center justify-start">
          <h1 className="font-bold text-[24px] leading-[34px] tracking-[-0.04em] text-black">
            문의현황
          </h1>
          <div className="flex gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "min-w-[42px] h-[40px] rounded-[5px] px-3 py-2 text-center border",
                  "font-bold text-[14px] tracking-[-0.02em] text-gray7",
                  selected === option.value ? "border-gray7" : "border-gray3"
                )}
                onClick={() => handleOption(option.value)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-[142px] bg-gray1 rounded-[10px] flex items-center justify-center">
          <p>배너 들어갈 부분</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
            검색 필터
          </h2>
          <div className="flex gap-2">
            {button.map((button) => (
              <button
                key={button.value}
                className={cn(buttonStyle, button.style)}
                onClick={() => handleButton(button.value)}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full rounded-[5px] border border-gray2"></div>
      </div>
    </div>
  );
};

export default Page;
