"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@/app/_components/IconComponents";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { getDay } from "date-fns";

interface DateElementProps {
  placeholder: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DateElement = ({ placeholder, value, onChange }: DateElementProps) => {
  return (
    <div className="relative flex flex-1 items-center px-3 py-2">
      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        locale={ko}
        dateFormat="yyyy.MM.dd"
        className="w-full h-[40px] rounded-[5px] p-3 bg-white border border-gray3 text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
        calendarClassName="custom-calendar"
        dayClassName={(date) => {
          const day = getDay(date);
          if (day === 0) return "force-sunday";
          if (day === 6) return "force-saturday";
          return "force-weekday";
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between gap-2 mb-4">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="p-1">
              <CustomIcon icon="CALENDAR_LEFT" />
            </button>
            <div className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
              {format(date, "yyyy.MM", { locale: ko })}
            </div>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="p-1">
              <CustomIcon icon="CALENDAR_RIGHT" />
            </button>
          </div>
        )}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon="CALENDAR_ICON" />
      </div>
    </div>
  );
};

export default React.memo(DateElement);
