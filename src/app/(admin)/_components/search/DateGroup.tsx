"use client";

import React, { useRef } from "react";
import DateElement from "./DateElement";

const DateGroup = () => {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex h-[56px] border-b border-gray2">
      <div className="w-[100px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
        <p>작성기간</p>
      </div>

      {/* 시작 날짜 */}
      <DateElement placeholder="시작 날짜" ref={startRef} />
      <span className="flex items-center justify-center text-center mx-3 font-normal text-[16px] leading-7 tracking-[-0.02em] text-gray7 select-none">
        ~
      </span>
      {/* 종료 날짜 */}
      <DateElement placeholder="종료 날짜" ref={endRef} />
    </div>
  );
};

export default DateGroup;
