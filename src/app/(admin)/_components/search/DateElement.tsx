import Icon from "@/app/_components/IconComponents";
import React from "react";

interface DateElementProps {
  placeholder: string;
  ref: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateElement = ({
  placeholder,
  ref,
  value,
  onChange,
}: DateElementProps) => {
  return (
    <div className="relative flex flex-1 items-center px-3 py-2">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly
        className="w-full h-[40px] rounded-[5px] p-3 bg-white border border-gray3 text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer"
        onClick={() => ref.current?.showPicker()}
      />
      <input type="date" ref={ref} onChange={onChange} className="hidden" />
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => ref.current?.showPicker()}
      >
        <Icon icon="CALENDAR_ICON" />
      </div>
    </div>
  );
};

export default DateElement;
