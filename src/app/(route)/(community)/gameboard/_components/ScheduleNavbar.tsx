import React from "react";

const ScheduleNavbar = () => {
  return (
    <div className="w-[1200px] h-full min-h-[40px] flex gap-2">
      <button className="min-w-[77px] h-[40px] rounded-[5px] border px-4 py-[13px] flex gap-[10px] items-center justify-center font-bold text-[14px] leading-[21px] tracking-[-0.02em]">
        E스포츠
      </button>
      <button className="min-w-[57px] h-[40px] rounded-[5px] border px-4 py-[13px] flex gap-[10px] items-center justify-center font-bold text-[14px] leading-[21px] tracking-[-0.02em]">
        축구
      </button>
      <button className="min-w-[57px] h-[40px] rounded-[5px] border px-4 py-[13px] flex gap-[10px] items-center justify-center font-bold text-[14px] leading-[21px] tracking-[-0.02em]">
        야구
      </button>
    </div>
  );
};

export default ScheduleNavbar;
