import React from "react";
import BaseballBestPlayerItem from "./BaseballBestPlayerItem";

const BaseballBestPlayer = () => {
  return (
    <div className="w-full min-h-[196px] flex flex-col gap-3">
      <p className="text-bold font-[18px] leading-7 tracking-[-0.04em] text-[#181818]">
        베스트 플레이어 투표 결과
      </p>
      <div className="w-full min-h-[156px] flex flex-col gap-2">
        <div className="w-full min-h-[74px] flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <BaseballBestPlayerItem key={index} />
          ))}
        </div>
        <div className="w-full min-h-[74px] flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <BaseballBestPlayerItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaseballBestPlayer;
