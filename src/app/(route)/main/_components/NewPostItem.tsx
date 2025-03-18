import Gallery_icon from "@/app/_components/icon/Gallery_icon";
import React from "react";

const NewPostItem = () => {
  return (
    <div className="w-full h-[36px] border-b border-gray1 py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer">
      <div className="w-[20px] h-[20px] rounded-[2px] p-1 flex gap-[10px] bg-gray1 items-center justify-center">
        <p className="text-bold text-[12px] leading-[18px] tracking-[-0.02em] text-gray7">
          1
        </p>
      </div>
      <div className="max-w-[40px] min-h-[18px] font-[700] text-[12px] leading-[18px] text-gray5 tracking-[-0.02em]">
        E스포츠
        {/* 목 데이터 */}
      </div>
      <div className="max-w-[300px] min-h-[20px] flex gap-[2px] items-center font-[500] text-[14px] leading-5">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          안세영 사태는 한국 스포츠계가 얼마나 후진적인지안세영 사태는 한국
          스포츠계가 얼마나 후진적인지
        </span>
        <div className="w-[14px] h-[14px] object-cover">
          <Gallery_icon />
        </div>
      </div>
    </div>
  );
};

export default NewPostItem;
