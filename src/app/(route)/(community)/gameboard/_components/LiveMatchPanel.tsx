import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";

const LiveMatchPanel = () => {
  return (
    <div className="w-full min-h-[148px] flex flex-col gap-2">
      <div className="min-w-[171px] min-h-[38px] flex items-center gap-2">
        <h1 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em]">
          승부예측
        </h1>
        <div className="min-w-[81px] h-[28px] rounded-[5px] py-1 px-2 flex gap-1 bg-[#D1504B] text-[#FFFFFF]">
          <p className="font-bold text-[14px] leading-5 align-center">
            예측 진행중
          </p>
        </div>
      </div>
      <div className="w-full max-w-[800px] min-h-[102px] flex flex-col gap-2">
        <div className="w-full min-h-[40px] flex gap-6 items-center">
          <div className="w-[388px] max-h-[40px] flex gap-2">
            <Fake_scheduleItem />
            <div className="flex gap-2">
              <p className="font-bold text-[18px] leading-7 tracking-[-0.04em]">
                T1
              </p>
              {/* 목 데이터 */}
            </div>
          </div>
          <div className="w-[388px] max-h-[40px] flex gap-2 justify-end">
            <div className="flex gap-2">
              <p className="font-bold text-[18px] leading-7 tracking-[-0.04em]">
                젠지
              </p>
            </div>
            <Fake_scheduleItem2 />
          </div>
        </div>
        <div className="w-full min-h-[54px] rounded-[5px] overflow-hidden flex">
          <div className="w-full max-w-[400px] min-h-[54px] py-2 px-4 flex gap-1 bg-[#DBDBDB] justify-start items-center cursor-pointer">
            <p className="text-bold text-[24px] leading-[38px] tracking-[-0.04em] text-[#FFFFFF]">
              0 %
            </p>
          </div>
          <p className="absolute left-[636px] mt-[5px] font-bold text-[24px] leading-[38px] align-center text-[#FFFFFF]">
            VS
            {/* 수정필요 */}
          </p>
          <div className="w-full max-w-[400px] min-h-[54px] py-2 px-4 flex gap-1 bg-[#DBDBDB] justify-end items-center cursor-pointer">
            <p className="text-bold text-[24px] leading-[38px] tracking-[-0.04em] text-[#FFFFFF]">
              0 %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatchPanel;
