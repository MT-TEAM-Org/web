import React from 'react';
import Image from 'next/image';

const discountItem = () => {
  return (
    <div>
      <div className="max-w-[298px] min-h-[84px] flex items-center border border-[#EEEEEE] rounded-lg p-3 gap-3 cursor-pointer">
        <Image src="/gameItem_fake.png" alt="game disc" width={60} height={60} className="w-16 h-16 rounded-md bg-black"/>
          <div className="max-w-[202px] min-h-[58px] ml-4 flex-1">
            <p className="text-[12px] font-bold text-[#DC2800]">20% 할인</p>
            <p className="text-[14px] text-[#656565]">어쌔신 크리드 확장팩2</p>
            <p className="text-[14px] font-bold">11,000원</p>
          </div>
        </div>
    </div>
  );
};

export default discountItem;