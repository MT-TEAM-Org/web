import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import React from "react";

const ActiveChatTwo = () => {
  return (
    <div className="w-full min-h-[56px] px-3 py-2 flex gap-1 items-center justify-center text-start">
      <div className="w-full min-h-[40px] flex gap-2">
        <div className="min-w-[114px] min-h-[20px] flex items-start gap-2">
          <div className="w-[20px] h-[20px] flex items-center">
            <Fake_scheduleItem />
          </div>
          <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6]">
            12:24
          </p>
          <p className="text-[14px] leading-5 text-[#656565]">이직고고</p>
        </div>
        <div className="w-full max-w-[172px] min-h-[40px]">
          <p className="text-[14px] leading-5 text-[#424242]">
            2줄이상일때 채팅 ui는2줄일때 채팅 ui는2줄이
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveChatTwo;
