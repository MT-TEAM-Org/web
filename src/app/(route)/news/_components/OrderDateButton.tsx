"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface OrderDateButtonProps {
  datSortChange: (page: string) => void;
}

const OrderDateButton = ({ datSortChange }: OrderDateButtonProps) => {
  const [activeBtn, setActiveBtn] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  >("DAILY");
  const searchParams = useSearchParams();
  const router = useRouter();

  const timeButtons = [
    { label: "일간", value: "DAILY" },
    { label: "주간", value: "WEEKLY" },
    { label: "월간", value: "MONTHLY" },
    { label: "연간", value: "YEARLY" },
  ];

  const activeButtonStyle =
    "bg-gra text-white min-w-[57px] h-[40px] flex gap-[10px] items-center justify-center rounded-[5px] px-[16px] py-[13px] font-[700] text-[14px] leading-[21px] tracking-[-0.02em]";
  const disableButtonStyle =
    "bg-white text-gray-700 min-w-[57px] h-[40px] flex gap-[10px] items-center justify-center border border-gray3 rounded-[5px] px-[16px] py-[13px] font-[500] text-[14px] leading-[22px] tracking-[-0.02em]";

  return (
    <div className="flex gap-2">
      {timeButtons.map((button) => (
        <button
          key={button.value}
          onClick={() =>
            datSortChange(
              button.value as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
            )
          }
          className={
            activeBtn === button.value ? activeButtonStyle : disableButtonStyle
          }
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default OrderDateButton;
