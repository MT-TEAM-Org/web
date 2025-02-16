import React from "react";
import Image from "next/image";
import TeamStrengthInfo from "../TeamStrengthInfo";
import GameboardFooter from "../GameboardFooter";

const BaseballStrengthPlayerItem = () => {
  return (
    <div className="w-full max-w-[800px] min-h-[494px] flex flex-col gap-6">
      <div className="w-full min-h-[150px] border-b px-3 py-6 flex gap-8">
        <div className="w-full max-w-[317px] min-h-[102px] flex gap-[50px] justify-end items-center">
          <p className="text-[18px] leading-7 tracking-[-0.04em] text-[#DBDBDB]">
            구자욱
          </p>
          <Image
            src="/Fake_baseballPlayer.png"
            alt="baseball player"
            width={82}
            height={102}
          />
        </div>
        <div className="w-[78px] min-h-[58px] flex flex-col align-center justify-center items-center">
          <p className="text-[14px] leading-5 text-[#DBDBDB]">카플레이어</p>
          <p className="text-[24px] leading-[38px] tracking-[-0.04em] text-[#CBCBCB]">
            VS
          </p>
        </div>
        <div className="w-full max-w-[317px] min-h-[102px] flex gap-[50px] justify-start items-center">
          <Image
            src="/Fake_baseballPlayer2.png"
            alt="baseball player"
            width={82}
            height={102}
          />
          <p className="text-[18px] leading-7 tracking-[-0.04em] text-[#DBDBDB]">
            김태군
          </p>
        </div>
      </div>
      <div className="w-full min-h-[216px]">
        <TeamStrengthInfo title="평균자책" num1="0.343" num2="0.264" />
        <TeamStrengthInfo title="안타" num1="169" num2="62" />
        <TeamStrengthInfo title="홈런" num1="33" num2="7" />
        <TeamStrengthInfo title="타점" num1="115" num2="34" />
        <div className="w-full min-h-[36px] px-2 py-1 flex gap-3 justify-center items-center">
          <div className="w-full max-w-[341px] min-h-[20px] flex gap-3 justify-end items-center font-bold text-[14px] leading-5 text-[#424242]">
            <p>타율 0.321</p>
            <p>안타 9</p>
            <p>홈런 3</p>
          </div>
          <div className="w-[78px] min-h-[28px] rounded-[5px] px-2 py-1 flex items-center justify-center gap-[10px] bg-[#FAFAFA] text-[14px] leading-5 text-[#A6A6A6]">
            상대전적
          </div>
          <div className="w-full max-w-[341px] min-h-[20px] flex gap-3 justify-start items-center font-bold text-[14px] leading-5 text-[#424242]">
            <p>타율 0.321</p>
            <p>안타 9</p>
            <p>홈런 3</p>
          </div>
        </div>
        <div className="w-full min-h-[36px] px-2 py-1 flex gap-3 justify-center items-center">
          <div className="w-full max-w-[341px] min-h-[20px] flex gap-3 justify-end items-center font-bold text-[14px] leading-5 text-[#424242]">
            <p>타율 0.800</p>
            <p>안타 4</p>
            <p>홈런 1</p>
          </div>
          <div className="w-[78px] h-auto min-h-[28px] rounded-[5px] px-2 py-1 flex items-center justify-center gap-[10px] bg-[#FAFAFA] text-[13px] leading-5 text-[#A6A6A6]">
            최근 5 경기
          </div>
          <div className="w-full max-w-[341px] min-h-[20px] flex gap-3 justify-start items-center font-bold text-[14px] leading-5 text-[#424242]">
            <p>타율 0.667</p>
            <p>안타 4</p>
            <p>홈런 0</p>
          </div>
        </div>
      </div>
      <GameboardFooter />
    </div>
  );
};

export default BaseballStrengthPlayerItem;
