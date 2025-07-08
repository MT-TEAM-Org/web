"use client";

import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React, { useState } from "react";

const radioClassNames = `
  w-6 
  h-6 
  border
  border-gray3
  rounded-full
  relative
  flex
  items-center
  justify-center
  mobile:w-[16px]
  mobile:h-[16px]
`;

const selectedRadioClassNames = `
  bg-black
  after:content-['']
  after:absolute
  after:top-1/2
  after:left-1/2
  after:w-[12px]
  after:h-[12px]
  after:mobile:w-[8px]
  after:mobile:h-[8px]
  after:bg-white
  after:rounded-full
  after:-translate-x-1/2
  after:-translate-y-1/2
`;

interface RadioGroupProps {
  label: string;
  name: string;
  options: { id: string; label: string }[];
  type?: "radio" | "checkbox";
}

const RadioGroup = ({
  label,
  name,
  options,
  type = "checkbox",
}: RadioGroupProps) => {
  const [selectedOption, setSelectedOption] = useState("option");

  return (
    <div className="flex h-[56px] border-b border-gray2">
      <div className="w-[100px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
        <p>{label}</p>
      </div>
      <div className="px-3 py-2 flex gap-3 items-center">
        {options.map((option) => (
          <div key={option.id} className="flex gap-2">
            <label className="relative flex items-center">
              <input
                type="radio"
                name={name}
                id={option.id}
                className={cn(
                  "appearance-none w-6 h-6 pr-6 border border-gray4 rounded-none",
                  type === "checkbox"
                    ? "checked:bg-primary checked:border-transparent"
                    : radioClassNames,
                  type === "radio" &&
                    selectedOption === option.id &&
                    selectedRadioClassNames
                )}
                onClick={() => setSelectedOption(option.id)}
              />
              {type === "checkbox" && (
                <Icon
                  icon="FILTER_CHECKER"
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              )}
            </label>
            <label
              htmlFor={option.id}
              className="text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
