import React from 'react';

const discountItem = () => {
  return (
    <div>
      <div className="w-[298px] h-[84px] flex items-center p-4 border border-[#EEEEEE] rounded-lg">
        {/* img 들어갈 부분 */}
        <div
            className="w-16 h-16 rounded-md bg-black"
          />
          <div className="ml-4 flex-1">
            <p className="text-[12px] font-bold text-[#DC2800]">20% 할인</p>
            <p className="text-[14px] text-[#656565]">어쌔신 크리드 확장팩2</p>
            <p className="text-[14px] font-bold">11,000원</p>
          </div>
        </div>
    </div>
  );
};

export default discountItem;