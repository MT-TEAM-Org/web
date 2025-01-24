import React from 'react';
import DiscountItem from './discountItem';

const gameDiscountInfo = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg flex flex-col gap-6">
      <div className="flex">
        <button className="w-1/2 flex items-center justify-center rounded-t-[5px] cursor-pointe border-[#303030] text-[#424242] border-[1px] border-b-0 font-[700]">
          게임 할인정보
        </button>
        <button className="flex-1 py-2 text-center border-b-2 border-[#A6A6A6] text-gray-500">
          게임 이벤트
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <DiscountItem key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-7 py-4 space-x-4">
        <button className="w-[32px] h-[32px] px-2 py-1 text-gray-500 border border-[#EEEEEE] rounded">
          &lt;
        </button>
        <div>1 / 3</div>
        <button className="w-[32px] h-[32px] px-2 py-1 text-gray-500 border border-[#EEEEEE] rounded">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default gameDiscountInfo;