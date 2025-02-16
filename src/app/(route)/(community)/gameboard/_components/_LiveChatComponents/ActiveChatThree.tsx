import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";

const ActiveChatThree = () => {
  return (
    <div className="w-full max-w-[328px] px-3 py-2 flex gap-1">
      <div className="w-full max-w-[294px] min-h-[60px] flex gap-2">
        <div className="min-w-[188px] min-h-[20px] flex gap-2">
          <div className="w-[20px] h-[20px] flex items-center">
            <Fake_scheduleItem2 />
          </div>
          <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6]">
            12:24
          </p>
          <p className="text-[14px] leading-5 text-[#656565]">
            손흥민페이커진짜최고
          </p>
        </div>
        <p className="text-[14px] leading-5 text-[#424242]">
          2줄이상일때 채팅 ui는2줄일때 채팅 ui는2줄이
        </p>
      </div>
    </div>
  );
};

export default ActiveChatThree;
