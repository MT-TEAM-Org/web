import React from "react";
import Image from "next/image";

const ChatScheduleCard = () => {
  return (
    <div className="min-w-[291px] w-auto h-[120px] flex flex-col items-center justify-center border border-[#EEEEEE] color-[#FFFFFF] rounded-[10px] p-3 cursor-pointer">
      <div className="font-[500] text-[12px] leading-[18px] tracking-[-2%] flex align-center text-[#A6A6A6]">
        FA컵
      </div>

      <div className="min-w-[267px] min-h-[66px] w-auto h-auto flex justify-center items-center gap-2">
        {/* 탐워스 */}
        <div className="min-w-[99px] min-h-[66px] w-auto h-auto flex gap-1 flex-col justify-center items-center">
          <Image
            src="/team_fake1.png"
            alt="team1"
            width={48}
            height={42}
            className="w-[48px] h-[42px]"
          />
          <span className="font-[700] text-[14px] leading-5 flex align-center">
            탐워스
          </span>
        </div>
        {/* 중앙 */}
        <div className="flex flex-col justify-center items-center">
          <span className="text-[#CBCBCB] font-[700] text-[14px] leading-5">
            VS
          </span>
          <div className="text-[#656565] font-[700] text-[12px] leading-[18px] tracking-[-2%]">19:00 예정</div>
        </div>
        {/* 토트넘 */}
        <div className="min-w-[99px] min-h-[66px] w-auto h-auto flex gap-1 flex-col justify-center items-center">
          <Image
            src="/team_fake2.png"
            alt="team2"
            width={48}
            height={42}
            className="w-[48px] h-[42px]"
          />
          <span className="font-[700] text-[14px] leading-5 flex align-center">
            토트넘
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatScheduleCard;
