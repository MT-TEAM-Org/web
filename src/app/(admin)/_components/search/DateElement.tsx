import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@/app/_components/IconComponents";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { ko } from "date-fns/locale/ko";
import { getDayClassName, renderHeader } from "../../_utils/datePickerUtils";

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
        dayClassName={getDayClassName}
        renderCustomHeader={(params) =>
          renderHeader({ ...params, IconComponent: CustomIcon })
        }
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon="CALENDAR_ICON" />
      </div>
    </div>
  );
};

export default React.memo(DateElement);
