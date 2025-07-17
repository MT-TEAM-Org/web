import React from "react";
import { cn } from "@/utils";
import { StatusBannerOptions } from "../../_constants/StatusBannerOptions";

interface StatusOptionsProps {
  selected: string;
  handleOption: (value: string) => void;
}

const StatusOptions = ({ selected, handleOption }: StatusOptionsProps) => {
  return (
    <div className="flex gap-2">
      {StatusBannerOptions.map((option) => (
        <button
          key={option.value}
          className={cn(
            "min-w-[42px] h-[40px] rounded-[5px] px-3 py-2 text-center border",
            "font-bold text-[14px] tracking-[-0.02em] text-gray7",
            selected === option.value ? "border-gray7" : "border-gray3"
          )}
          onClick={() => handleOption(option.value)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default StatusOptions;
