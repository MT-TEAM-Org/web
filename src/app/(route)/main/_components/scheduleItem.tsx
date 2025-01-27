import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";
import React from "react";

const scheduleItem = () => {
  const iconStyle =
    "w-[60px] h-[48px] flex flex-col gap-1 justify-center items-center";

  const iconTitleStyle = "font-[700] text-[16px] leading-6 align-center";

  return (
    <div className="flex flex-col items-center justify-center min-w-[214px] min-h-[98px] bg-[#FFFFFF] rounded-[10px] p-3 gap-2 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
      <div className="text-xs text-[#A6A6A6] font-[500] leading-[18px] align-center mb-4">
        E스포츠
      </div>

      <div className="w-full min-h-[48px] flex items-center justify-center gap-2">
        {/* T1 */}
        <div className={iconStyle}>
          <Fake_scheduleItem />
          <span className={iconTitleStyle}>T1</span>
        </div>
        {/* 중앙 */}
        <div className="w-[54px] h-[42px] flex flex-col gap-1 justify-center items-center">
          <div className="text-[#CBCBCB] text-sm">VS</div>
          <div className="font-[700] text-[12px] leading-[18px] text-[#656565]">19:00 예정</div>
        </div>
        {/* 젠지 */}
        <div className={iconStyle}>
          <Fake_scheduleItem2 />
          <span className={iconTitleStyle}>젠지</span>
        </div>
      </div>
    </div>
  );
};

export default scheduleItem;
