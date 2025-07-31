import React from "react";
import { cn } from "@/utils";

type tapType = {
  ariaLabel: string;
  isActive: boolean;
  label: string;
  onClick: (setButtonActive: (value: boolean) => void) => void;
};

interface MainRightTabProps {
  tap: tapType[];
  setButtonActive: (value: boolean) => void;
}

const style = {
  btnStyle:
    "w-1/2 h-10 flex gap-[10px] px-[16px] py-[13px] items-center justify-center rounded-t-[5px] cursor-pointer border-gray8",
  activeBtnStyle:
    "border-[1px] border-b-0 font-[700] text-[14px] leading-[21px] text-gray7",
  passiveBtnStyle:
    "border-b border-b-gray5 border-gray5 font-[500] text-[14px] leading-[22px] text-gray5",
};

const MainRightTab = ({ tap, setButtonActive }: MainRightTabProps) => {
  return (
    <div className="flex justify-center items-center w-full min-h-[40px]">
      {tap.map((item) => (
        <button
          key={item.label}
          onClick={() => item.onClick(setButtonActive)}
          className={cn(
            style.btnStyle,
            item.isActive ? style.activeBtnStyle : style.passiveBtnStyle
          )}
          aria-label={item.ariaLabel}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default MainRightTab;
