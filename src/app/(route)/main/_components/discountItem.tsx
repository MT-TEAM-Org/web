import React from "react";
import Image from "next/image";

const discountItem = () => {
  return (
    <div>
      {/* 목 데이터 */}
      <div className="w-[298px] min-h-[84px] flex items-center border border-[#EEEEEE] rounded-[10px] p-3 gap-3 cursor-pointer">
        <Image
          src="/Fake_discount_game.png"
          alt="game disc"
          width={60}
          height={60}
          className="min-w-[60px] min-h-[60px] rounded-[3.75px]"
        />
        <div className="max-w-[202px] min-h-[58px]">
          <p className="text-[12px] font-[700] leading-[18px] text-[#DC2800]">
            20% 할인
          </p>
          <p className="text-[14px] font-[500] leading-5 text-[#656565]">
            어쌔신 크리드 확장팩2
          </p>
          <p className="text-[14px] font-[700] leading-5 text-[#424242]">
            11,000원
          </p>
        </div>
      </div>
    </div>
  );
};

export default discountItem;
