import React from "react";
import Image from "next/image";
import DiscountItemSkeleton from "./discountItemSkeleton";
import Link from "next/link";

interface DiscountItemProps {
  gameDiscountData: any;
  isLoading: boolean;
}

const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const discountItem = ({ gameDiscountData, isLoading }: DiscountItemProps) => {
  return isLoading ? (
    <DiscountItemSkeleton />
  ) : (
    <Link href={gameDiscountData?.link} target="blank">
      <div className="w-[298px] min-h-[84px] flex items-center border border-gray2 rounded-[10px] p-3 gap-3 cursor-pointer">
        <Image
          src={gameDiscountData?.thumbImg}
          alt={gameDiscountData?.title}
          width={60}
          height={60}
          className="min-w-[60px] min-h-[60px] object-cover rounded-[3.75px]"
        />
        <div className="max-w-[202px] min-h-[58px]">
          <p className="text-[12px] font-[700] leading-[18px] text-new">
            {gameDiscountData?.discountPercent}
          </p>
          <p className="text-[14px] font-[500] leading-5 text-gray6 text-ellipsis overflow-hidden whitespace-nowrap">
            {gameDiscountData?.title}
          </p>
          <p className="text-[14px] font-[700] leading-5 text-gray7">
            {formatNumber(gameDiscountData?.finalPrice)}원
          </p>
        </div>
      </div>
    </Link>
  );
};

export default discountItem;
