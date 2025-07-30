"use client";

import React from "react";
import DateElement from "./DateElement";
import { useDateRange } from "../../_hooks/date/useDateRange";
import { format } from "date-fns";

interface DateGroupProps {
  isUser?: boolean;
}

const DateGroup = ({ isUser = false }: DateGroupProps) => {
  const { selectedStartDate, selectedEndDate, handleDateChange } =
    useDateRange();

  // 날짜 변경 핸들러
  const handleDateElementChange =
    (type: "start" | "end") => (date: Date | null) => {
      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
      const fakeEvent = {
        target: { value: formattedDate },
      } as React.ChangeEvent<HTMLInputElement>;
      handleDateChange(type, fakeEvent);
    };

  return (
    <div className="flex h-[56px] border-b border-gray2">
      <div className="w-[100px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
        <p>{isUser ? "가입기간" : "작성기간"}</p>
      </div>

      {/* 시작 날짜 */}
      <DateElement
        placeholder="시작 날짜"
        value={selectedStartDate ? new Date(selectedStartDate) : null}
        onChange={handleDateElementChange("start")}
      />

      <span className="flex items-center justify-center text-center mx-3 font-normal text-[16px] leading-7 tracking-[-0.02em] text-gray7 select-none">
        ~
      </span>

      {/* 종료 날짜 */}
      <DateElement
        placeholder="종료 날짜"
        value={selectedEndDate ? new Date(selectedEndDate) : null}
        onChange={handleDateElementChange("end")}
      />
    </div>
  );
};

export default DateGroup;
