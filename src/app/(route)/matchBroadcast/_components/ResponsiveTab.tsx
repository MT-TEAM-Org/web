"use client";

import { cn } from "@/utils";
import React from "react";

interface ResponsiveTabProps {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

const tabList = [
  { label: "승부예측", value: "prediction" },
  { label: "하이브챗", value: "chat" },
];

const ResponsiveTab = ({ activeValue, setActiveValue }: ResponsiveTabProps) => {
  return (
    <div className="w-full h-[52px] rounded-t-[5px] flex justify-center items-center">
      {tabList.map((tab) => (
        <div
          key={tab.value}
          onClick={() => setActiveValue(tab.value)}
          className={cn(
            "w-full h-full flex items-center justify-center px-4 py-3 font-bold leading-[28px] tracking-[-0.02em] cursor-pointer",
            activeValue === tab.value
              ? cn(
                  "bg-bg0 text-gra",
                  "mobile:bg-transparent mobile:text-gray7 mobile:border-b-[2px] mobile:border-gray7"
                )
              : cn(
                  "bg-white text-gray7",
                  "mobile:bg-transparent mobile:text-gray5 mobile:border-b-[2px] mobile:border-gray3"
                )
          )}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default ResponsiveTab;
