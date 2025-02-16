import React from "react";
import Image from "next/image";

const BaseballBestPlayerItem = () => {
  return (
    <div className="w-full max-w-[262.6px] min-h-[74px] rounded-[5px] p-2 flex justify-between items-center bg-[#FAFAFA]">
      <div className="min-w-[123px] min-h-[58px] flex gap-[14px]">
        <Image
          src={"/Fake_BaseballLineupPlayer.png"}
          alt="player"
          width={60}
          height={58}
        />
        <div className="w-[49px] min-h-[58px] flex flex-col items-start justify-center">
          <p className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-[#00ADEE]">
            BEST
          </p>
          <p className="text-[14px] leading-5 text-[#424242]">레예스</p>
          <p className="text-[14px] leading-5 text-[#A6A6A6]">9,347표</p>
        </div>
      </div>
      <p className="min-w-[40px] min-h-[28px] text-bold font-[18px] leading-7 tracking-[-0.04em] text-center text-[#181818]">
        65%
      </p>
    </div>
  );
};

export default BaseballBestPlayerItem;
