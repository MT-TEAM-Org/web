import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React from "react";

const CheckBoxIcon = () => {
  return (
    <th className="w-[48px] h-[36px]">
      <div className="w-full h-full flex items-center justify-center">
        <label className="relative block w-6 h-6">
          <input
            type="checkbox"
            className={cn(
              "peer appearance-none w-full h-full border-[2px] border-gray3 rounded-[2px] cursor-pointer",
              "checked:bg-primary checked:border-transparent focus:border-gray3 checked:border-none"
            )}
          />
          <Icon
            icon="FILTER_CHECKER"
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none",
              "text-gray4 peer-checked:text-white"
            )}
          />
        </label>
      </div>
    </th>
  );
};

export default CheckBoxIcon;
