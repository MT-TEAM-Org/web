import Gallery_icon from "@/app/_components/icon/Gallery_icon";
import React from "react";

interface HotPostItemProps {
  number: number;
}

const HotPostItem = ({ number }: HotPostItemProps) => {
  return (
    <div className="min-w-[419px] h-[36px] border-b border-gray1 py-2 pr-2 flex justify-start items-center text-center gap-2 cursor-pointer">
      <div className="w-[20px] h-[20px] rounded-sm gap-[10px] font-bold text-[12px] leading-[18px] text-gray7">
        {number}
      </div>
      {/* 목 데이터 */}
      <div className="max-w-[40px] min-h-[18px] font-[700] text-[12px] leading-[18px] text-gray5">
        E스포츠
      </div>

      <div className="flex justify-center align-center items-center text-center gap-[2px]">
        <div className="max-w-[300px] min-h-[20px] flex gap-[2px] items-center font-[500] text-[14px] leading-5">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            안세영 사태는 한국 스포츠계가 얼마나 후진적인지안세영 사태는 한국
            스포츠계가 얼마나 후진적인지
          </span>
          <div className="w-[14px] h-[14px] object-cover">
            <Gallery_icon />
          </div>
        </div>

        <div className="flex justify-center text-center items-center gap-[2px]">
          <p className="font-[900] text-[10px] leading-[18px] text-[#00ADEE]">
            N
          </p>
          <p className="font-[900] text-[10px] leading-[18px] text-[#DC2800]">
            H
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotPostItem;
