"use client";

import Icon from "@/app/_components/IconComponents";
import React, { useRef } from "react";

const DateGroup = () => {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex h-[56px] border-b border-gray2">
      <div className="w-[100px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
        <p>작성기간</p>
      </div>

      {/* 시작 날짜 */}
      <div className="relative flex flex-1 items-center px-3 py-2">
        <input
          type="text"
          placeholder="시작 날짜"
          className="w-full h-[40px] rounded-[5px] p-3 bg-white border border-gray3 text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
          onClick={() => startRef.current?.showPicker()}
        />
        <input type="date" ref={startRef} className="hidden" />
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => startRef.current?.showPicker()}
        >
          <Icon icon="CALENDAR_ICON" />
        </div>
      </div>
      <span className="flex items-center justify-center text-center mx-3 font-normal text-[16px] leading-7 tracking-[-0.02em] text-gray7 select-none">
        ~
      </span>
      {/* 종료 날짜 */}
      <div className="relative flex flex-1 items-center px-3 py-2">
        <input
          type="text"
          placeholder="종료 날짜"
          className="w-full h-[40px] rounded-[5px] p-3 bg-white border border-gray3 text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
          onClick={() => endRef.current?.showPicker()}
        />
        <input type="date" ref={endRef} className="hidden" />
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => endRef.current?.showPicker()}
        >
          <Icon icon="CALENDAR_ICON" />
        </div>
      </div>
    </div>
  );
};

export default DateGroup;
