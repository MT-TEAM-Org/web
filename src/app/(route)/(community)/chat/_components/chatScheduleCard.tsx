import React from 'react';
import Image from 'next/image';

const ChatScheduleCard = () => {
  return (
    <div className="w-[291px] h-[120px] flex flex-col items-center justify-center border rounded-lg p-4 shadow-sm cursor-pointer">
      <div className="text-sm text-[#A6A6A6]">FA컵</div>

      <div className="flex justify-center items-center gap-2">
        {/* 탐워스 */}
        <div className="w-[85px] h-[66px] flex flex-col justify-center items-center">
          <Image
            src="/team_fake1.png"
            alt="team1"
            width={48}
            height={42}
            className="w-[48px] h-[42px] object-cover mb-1"
          />
        <span className="font-[700] text-[14px] leading-[20px] text-center">탐워스</span>
        </div>
        {/* 중앙 */}
        <div className="flex flex-col justify-center items-center">
          <span className="text-[#A6A6A6] mx-2 text-sm mt-4 font-semibold">VS</span>
          <div className="text-[#656565] text-xs">19:00 예정</div>
        </div>
        {/* 토트넘 */}
        <div className="w-[85px] h-[66px] flex flex-col justify-center items-center">
          <Image
            src="/team_fake2.png"
            alt="team2"
            width={48}
            height={42}
            className="w-[48px] h-[42px] object-cover mb-1"
          />
          <span className="font-[700] text-[14px] leading-[20px] text-center">토트넘</span>
        </div>

      </div>
    </div>
  );
};

export default ChatScheduleCard;