import { getDay, format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import Icon from "@/app/_components/IconComponents";

// 날짜 클래스 이름
export const getDayClassName = (date: Date) => {
  const day = getDay(date);
  if (day === 0) return "force-sunday";
  if (day === 6) return "force-saturday";
  return "force-weekday";
};

// 날짜 헤더 컴포넌트
export const renderHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  IconComponent,
}: {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  IconComponent: typeof Icon;
}) => (
  <div className="flex items-center justify-between gap-2 mb-4">
    <button
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="p-1">
      <IconComponent icon="CALENDAR_LEFT" />
    </button>
    <div className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
      {format(date, "yyyy.MM", { locale: ko })}
    </div>
    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="p-1">
      <IconComponent icon="CALENDAR_RIGHT" />
    </button>
  </div>
);
