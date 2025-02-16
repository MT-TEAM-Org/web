"use client";

import React, { useState } from "react";

const FootballNavbar = () => {
  const [activeTab, setActiveTab] = useState("라인업");

  const onClick = (category: string) => {
    setActiveTab(category);
    console.log("category : ", category);
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
      <div onClick={() => onClick("라인업")} className={getTabClass("라인업")}>
        라인업
      </div>
      <div onClick={() => onClick("기록")} className={getTabClass("기록")}>
        기록
      </div>
      <div
        onClick={() => onClick("승부예측")}
        className={getTabClass("승부예측")}
      >
        승부예측
      </div>
    </div>
  );
};

export default FootballNavbar;
