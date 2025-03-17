"use client";

import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import { ListConfig } from "../_types/toolbarType";

interface OrderButtonsProps {
  orderType: ListConfig["orderType"];
  onOrderType: (orderType: ListConfig["orderType"]) => void;
}

const OrderButtons = ({ orderType, onOrderType }: OrderButtonsProps) => {
  const ORDER_OPTION = [
    { label: "최신순", value: "CREATE", logo: <Blue_outline_logo /> },
    { label: "인기순", value: "RECOMMEND", logo: <Red_outline_logo /> },
    { label: "댓글 많은 순", value: "COMMENT", logo: <Mini_logo /> },
  ];

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";
  return (
    <div className="flex w-full items-center gap-[4px]">
      {ORDER_OPTION.map((option) => (
        <button
          key={option.value}
          className={`${buttonStyle} ${
            option.value === orderType && "font-[700] border-[#424242]"
          }`}
          onClick={() => onOrderType(option.value as ListConfig["orderType"])}
        >
          {option.logo}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default OrderButtons;
