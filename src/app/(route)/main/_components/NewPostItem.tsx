import React from "react";

const NewPostItem = () => {
  return (
    <div className="w-full max-w-[419px] h-[36px] border-b border-[#FAFAFA] py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer">
      <div className="w-[20px] h-[20px] rounded-[2px] p-1 flex gap-[10px] bg-[#FAFAFA] items-center justify-center">
        <p className="text-bold text-[12px] leading-[18px] tracking-[-0.02em] text-[#424242]">
          1
        </p>
      </div>
      <div className="max-w-[40px] min-h-[18px] font-[700] text-[12px] leading-[18px] text-[#A6A6A6]">
        E스포츠
        {/* 목 데이터 */}
      </div>
      <div className="max-w-[300px] min-h-[20px] flex gap-[2px] font-[500] text-[14px] leading-5">
        안세영 사태는 한국 스포츠계가 얼마나 후진적인지...
      </div>
    </div>
  );
};

export default NewPostItem;
