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
    { label: "최신순", value: "CREATE", logo: <Blue_outline_logo />, w: 77.27 },
    {
      label: "인기순",
      value: "RECOMMEND",
      logo: <Red_outline_logo />,
      w: 77.27,
    },
    { label: "댓글 많은 순", value: "COMMENT", logo: <Mini_logo />, w: 107.89 },
  ];

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";
  return (
    <div className="flex w-full items-center gap-[8px]">
      {ORDER_OPTION.map((option) => (
        <button
          key={option.value}
          className={`hover:text-gray7 hover:border-gray7 hover:font-[700] ${buttonStyle} w-[${
            option.w
          }px] ${option.value === orderType && "font-[700] border-gray7"}`}
          onClick={() => onOrderType(option.value as ListConfig["orderType"])}
        >
          {option.logo}
          <span className="text-nowrap">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default OrderButtons;
