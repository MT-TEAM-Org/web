import React from "react";

const LiveMatchBox = () => {
  return (
    <div className="w-full h-[400px] rounded-[5px] bg-gray1 flex justify-center items-center">
      <div className="min-w-[294px] min-h-[38px] flex gap-2">
        <p className="font-bold text-[24px] leading-[38px] align-center text-[#00ADEE]">
          02:21:35 후{/* 목 데이터 */}
        </p>
        <p className="font-bold text-[24px] leading-[38px] align-center">
          경기가 시작됩니다
        </p>
      </div>
    </div>
  );
};

export default LiveMatchBox;
