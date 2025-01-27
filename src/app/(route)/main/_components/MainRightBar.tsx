"use client";

import React, { useState } from "react";
import EventItem from "./EventItem";
import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import DiscountItem from "./discountItem";

const MainRightBar = () => {
  const btnStyle =
    "w-1/2 h-10 flex gap-[10px] px-[16px] py-[13px] items-center justify-center rounded-t-[5px] cursor-pointer border-[#303030]";
  const activeBtnStyle =
    "border-[1px] border-b-0 font-[700] text-[14px] leading-[21px] text-[#424242]";
  const passiveBtnStyle =
    "border-b-2 border-[#A6A6A6] font-[500] text-[14px] leading-[22px] text-[#A6A6A6]";

  const [buttonActive, setButtonActive] = useState(true);

  const onClick = (value: boolean) => {
    setButtonActive(value);
  };

  return (
    <div className="flex flex-col w-[298px] h-[668px] gap-6 bg-white rounded-lg">
      <div className="flex justify-center items-center min-w-[298px] min-h-[40px] h-auto">
        <button
          onClick={() => onClick(true)}
          className={`${btnStyle} ${
            buttonActive ? activeBtnStyle : passiveBtnStyle
          }`}
        >
          게임 할인정보
        </button>
        <button
          onClick={() => onClick(false)}
          className={`${btnStyle} ${
            !buttonActive ? activeBtnStyle : passiveBtnStyle
          }`}
        >
          게임 이벤트
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {buttonActive ? (
          Array.from({ length: 6 }).map((_, index) => (
            <DiscountItem key={index} />
          ))
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <EventItem key={index} />
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-7 py-4 space-x-4">
        <button className="w-[32px] h-[32px] px-2 py-1 text-gray-500 border border-[#EEEEEE] rounded">
          <Arrow_left />
        </button>
        <div>1 / 3</div>
        <button className="w-[32px] h-[32px] px-2 py-1 text-gray-500 border border-[#EEEEEE] rounded">
          <Arrow_right />
        </button>
      </div>
    </div>
  );
};

export default MainRightBar;