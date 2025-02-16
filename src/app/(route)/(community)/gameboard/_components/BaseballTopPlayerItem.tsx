import React from "react";
import Image from "next/image";

const BaseballTopPlayerItem = ({ player }) => {
  return (
    <div className="w-full min-h-[104px] rounded-[5px] p-3 flex gap-3 items-center text-start bg-[#FAFAFA]">
      <div className="w-[60px] h-[60px] rounded-[5px] flex flex-col justify-center items-center">
        <Image
          src={"/Fake_BaseballLineupPlayer.png"}
          alt="player"
          width={60}
          height={62}
        />
        <div className="w-full min-h-[18px] rounded-br-[5px] rounded-bl-[5px] px-[10px] bg-[#EEEEEE] text-center">
          <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#303030]">
            승리
          </p>
        </div>
      </div>

      <div className="w-[103px] min-h-[68px] flex flex-col gap-1">
        <div className="w-full min-h-[20px]">
          <p>레예스</p>
        </div>

        <div className="w-full min-h-[20px] flex gap-1">
          <p className="text-[14px] leading-5 text-[#A6A6A6]">이닝</p>
          <p className="text-[14px] leading-5 text-[#424242]">7</p>
        </div>

        <div className="w-full min-h-[20px] flex gap-1 items-center justify-center">
          <div className="min-w-[49px] min-h-[20px] flex">
            <p className="text-[14px] leading-5 text-[#A6A6A6]">피안타</p>
            <span className="text-[14px] leading-5">&nbsp;3</span>
          </div>
          <div className="w-[1px] h-[12px] bg-[#D9D9D9] flex" />
          <div className="min-w-[37px] min-h-[20px] flex">
            <p className="text-[14px] leading-5 text-[#A6A6A6]">자책</p>
            <span className="text-[14px] leading-5">&nbsp;0</span>
          </div>

          <div className="w-[1px] h-[12px]" />
        </div>
      </div>
    </div>
  );
};

export default BaseballTopPlayerItem;
