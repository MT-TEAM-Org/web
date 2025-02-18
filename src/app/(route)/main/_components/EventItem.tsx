import React from "react";
import Image from "next/image";

const EventItem = () => {
  return (
    <div>
      {/* 목 데이터 */}
      <div className="w-[298px] min-h-[84px] flex items-center border border-[#EEEEEE] rounded-[10px] p-3 gap-3 cursor-pointer">
        <Image
          src="/Fake_event_game.png"
          alt="game disc"
          width={60}
          height={60}
          className="min-w-[60px] min-h-[60px] rounded-[3.75px]"
        />
        <div className="flex flex-col max-w-[202px] min-h-[58px] gap-2">
          <div className="flex flex-col">
            <p className="text-[14px] font-[700] leading-[20px] text-[#424242]">
              슈퍼바이브 시즌 0 사전등록 시작!
            </p>
            <p className="text-[12px] font-[500] leading-[18px] text-[#656565]">
              1월 9일 시즌 0 업데이트!
            </p>
          </div>
          <p className="text-[12px] font-[500] leading-[18px] text-[#A6A6A6]">
            2024-12-23 ~ 2025-01-08
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
