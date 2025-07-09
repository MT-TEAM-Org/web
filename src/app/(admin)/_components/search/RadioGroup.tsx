import Icon from "@/app/_components/IconComponents";
import React from "react";

const RadioGroup = ({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { id: string; label: string }[];
}) => (
  <div className="flex h-[56px] border-b border-gray2">
    <div className="w-[100px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
      <p>{label}</p>
    </div>
    <div className="px-3 py-2 flex gap-3 items-center">
      {options.map((option) => (
        <React.Fragment key={option.id}>
          <label className="relative flex items-center">
            <input
              type="radio"
              name={name}
              id={option.id}
              className="appearance-none w-6 h-6 pr-6 border border-gray4 rounded-none checked:bg-primary checked:border-transparent"
            />
            <Icon
              icon="FILTER_CHECKER"
              className="absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </label>
          <label
            htmlFor={option.id}
            className="text-[14px] leading-[22px] tracking-[-0.02em] cursor-pointer select-none"
          >
            {option.label}
          </label>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default RadioGroup;
