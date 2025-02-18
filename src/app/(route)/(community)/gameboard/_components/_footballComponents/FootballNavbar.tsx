"use client";

import React, { useState } from "react";

interface ScheduleNavbarProps {
  setSelectedCategory: (category: string) => void;
}

const FootballNavbar = ({ setSelectedCategory }: ScheduleNavbarProps) => {
  const [activeTab, setActiveTab] = useState("라인업");

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    setSelectedCategory(tab);
    console.log("tab : ", tab);
  };

  const getTabClass = (category: string) => {
    return `w-[266.67px] h-[52px] px-4 py-[18px] flex justify-center items-center text-[16px] leading-[26px] cursor-pointer 
      ${
        activeTab === category
          ? "border-x border-t border-[#303030] text-[#424242] rounded-tl-[5px] rounded-tr-[5px]"
          : "border-b-[2px] border-[#DBDBDB] text-[#A6A6A6]"
      }`;
  };

  return (
    <div className="w-full max-w-[800px] min-h-[52px] flex justify-center items-center">
      <div
        onClick={() => handleActiveTab("라인업")}
        className={getTabClass("라인업")}
      >
        라인업
      </div>
      <div
        onClick={() => handleActiveTab("기록")}
        className={getTabClass("기록")}
      >
        기록
      </div>
      <div
        onClick={() => handleActiveTab("승부예측")}
        className={getTabClass("승부예측")}
      >
        승부예측
      </div>
    </div>
  );
};

export default FootballNavbar;
