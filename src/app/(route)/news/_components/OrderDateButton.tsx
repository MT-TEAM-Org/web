"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OrderDateButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTimePeriod =
    (searchParams.get("time") as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY") ||
    "DAILY";

  const timeButtons = [
    { label: "일간", value: "DAILY" },
    { label: "주간", value: "WEEKLY" },
    { label: "월간", value: "MONTHLY" },
    { label: "연간", value: "YEARLY" },
  ];

  const handleTimePeriodChange = (
    timePeriod: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("time", timePeriod);
    newSearchParams.set("page", "1");

    const queryString = newSearchParams.toString();

    router.push(`${pathname}?${queryString}`, {
      scroll: false,
    });
  };

  const activeButtonStyle =
    "bg-gra text-white min-w-[57px] h-[40px] flex gap-[10px] items-center justify-center rounded-[5px] px-[16px] py-[13px] font-[700] text-[14px] leading-[21px] tracking-[-0.02em]";
  const disableButtonStyle =
    "bg-white text-gray-700 min-w-[57px] h-[40px] flex gap-[10px] items-center justify-center border border-gray3 rounded-[5px] px-[16px] py-[13px] font-[500] text-[14px] leading-[22px] tracking-[-0.02em]";

  return (
    <div className="flex gap-2">
      {timeButtons.map((button) => (
        <button
          key={button.value}
          className={
            currentTimePeriod === button.value
              ? activeButtonStyle
              : disableButtonStyle
          }
          onClick={() =>
            handleTimePeriodChange(
              button.value as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
            )
          }
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(OrderDateButton);
