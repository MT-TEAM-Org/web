"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBanner from "./StatusBanner";
import StatusOptions from "./StatusOptions";

interface OverviewStatBoxProps {
  title: string;
}

const OverviewStatBox = ({ title }: OverviewStatBoxProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("day");

  // 현황 옵션 핸들러
  const handleOption = (value: string) => {
    router.push(`?option=${value}`);
    setSelected(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-start">
        <h1 className="font-bold text-[24px] leading-[34px] tracking-[-0.04em] text-black">
          {title}
        </h1>
        <StatusOptions selected={selected} handleOption={handleOption} />
      </div>
      <div className="w-full h-[142px] bg-gray1 rounded-[10px] flex items-center justify-center gap-4">
        <StatusBanner
          meta={{
            title: "가입자수",
            count: 8,
            totalCount: 165,
            percentage: 8.5,
          }}
          icon={{
            mainIcon: "USER_JOIN_COUNT",
            statusIcon: false,
          }}
        />
        <StatusBanner
          meta={{
            title: "탈퇴자수",
            count: 8,
            totalCount: 165,
            percentage: 15,
          }}
          icon={{
            mainIcon: "USER_JOIN_COUNT",
            statusIcon: false,
          }}
        />
        <StatusBanner
          meta={{
            title: "탈퇴자수",
            count: 8,
            totalCount: 165,
            percentage: 15,
          }}
          icon={{
            mainIcon: "USER_JOIN_COUNT",
            statusIcon: false,
          }}
        />
        <StatusBanner
          meta={{
            title: "경고",
            count: 8,
            totalCount: 165,
            percentage: 12.5,
          }}
          icon={{
            mainIcon: "USER_JOIN_COUNT",
            statusIcon: true,
          }}
        />
        <StatusBanner
          meta={{
            title: "정지",
            count: 8,
            totalCount: 65,
            percentage: 12.5,
          }}
          icon={{
            mainIcon: "USER_JOIN_COUNT",
            statusIcon: false,
          }}
        />
      </div>
    </div>
  );
};

export default OverviewStatBox;
