import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import React from "react";

const EmptyScheduleItem = () => {
  return (
    <div className="w-[275px] h-[126px] rounded-[5px] border py-[29px] px-3 flex flex-col gap-2 justify-center items-center bg-[#FAFAFA]">
      <div className="w-auto min-w-[118.49px] h-auto min-h-[32px] gap-[4.09px]">
        <LogoWhite />
      </div>
    </div>
  );
};

export default EmptyScheduleItem;
