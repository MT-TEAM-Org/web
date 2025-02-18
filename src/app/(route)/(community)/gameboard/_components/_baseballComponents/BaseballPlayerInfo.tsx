import React from "react";
import Image from "next/image";

type TeamType = {
  teamLogo: React.ReactNode;
  title: string;
  photo: string;
};

const BaseballPlayerInfo = ({ title, teamLogo, photo }: TeamType) => {
  return (
    <div className="w-full max-w-[359px] min-h-[1306px] flex flex-col">
      <div className="w-full min-h- [46px] p-1 flex gap-1 items-center">
        {teamLogo}
        <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-[#303030]">
          {title}
        </p>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="w-full min-h-[126px] border-b py-3 flex gap-4 border-[#DBDBDB] justify-start items-center"
        >
          <div className="w-[38px] h-[28px] rounded-[10px] border p-1 flex gap-1 text-center">
            <p className="text-[14px] leading-5">선발</p>
          </div>
          <div>
            <Image src={photo} alt="player img" width={82} height={102} />
          </div>
          <div className="w-[38px] h-[44px] flex flex-col gap-1 justify-center items-center">
            <p className="text-[14px] leading-5 text-[#303030]">레예스</p>
            <p className="text-[14px] leading-5 text-[#A6A6A6]">우투</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseballPlayerInfo;
