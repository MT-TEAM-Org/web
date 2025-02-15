"use client";

import React from "react";

const FootballNavbar = () => {
  const onClick = (category: string) => {
    console.log("category : ", category);
  };

  return (
    <div className="w-full max-w-[800px] min-h-[52px] flex justify-center items-center">
      <div className="w-full max-w-[800px] min-h-[52px] flex justify-center items-center">
        <div
          onClick={() => onClick("라인업")}
          className="w-[266.67px] h-[52px] rounded-tl-[5px] rounded-tr-[5px] border-x border-t border-[#303030] px-4 py-[18px] flex justify-center items-center text-[16px] leading-[26px] text-[#424242] cursor-pointer"
        >
          라인업
        </div>
        <div
          onClick={() => onClick("기록")}
          className="w-[266.67px] h-[52px] border-b-[2px] border-[#DBDBDB] px-4 py-[18px] flex justify-center items-center text-[16px] leading-[26px] text-[#A6A6A6] cursor-pointer"
        >
          기록
        </div>
        <div
          onClick={() => onClick("승부예측")}
          className="w-[266.67px] h-[52px] border-b-[2px] border-[#DBDBDB] px-4 py-[18px] flex justify-center items-center text-[16px] leading-[26px] text-[#A6A6A6] cursor-pointer"
        >
          승부예측
        </div>
      </div>
    </div>
  );
};

export default FootballNavbar;
