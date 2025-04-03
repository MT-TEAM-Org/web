"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const OrderDateButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTimePeriod =
    (searchParams.get("time") as
      | "DAILY"
      | "WEEKLY"
      | "MONTHLY"
      | "YEARLY"
      | "ALL") || "ALL";

  const timeButtons = [
    { label: "전체", value: "ALL" },
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

  const baseButtonStyle =
    "min-w-[57px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] text-[14px]";
  const activeButtonStyle =
    "bg-gra text-white font-[700] leading-5 tracking-[-0.02em]";
  const disableButtonStyle =
    "bg-white text-gray7 font-medium leading-5 border border-gray3";

  return (
    <div className="min-w-[317px] min-h-[40px] flex gap-2 items-center justify-center">
      {timeButtons.map((button) => (
        <button
          key={button.value}
          className={`${baseButtonStyle} ${
            currentTimePeriod === button.value
              ? activeButtonStyle
              : disableButtonStyle
          }`}
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

export default OrderDateButton;
