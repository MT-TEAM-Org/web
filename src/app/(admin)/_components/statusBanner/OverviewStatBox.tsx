"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StatusOptions from "./StatusOptions";
import StatusBanner from "./StatusBanner";
import { StatusBannerItemType } from "../../_type/StatusItem/ItemTypes";

interface OverviewStatBoxProps {
  title: string;
  type: StatusBannerItemType;
}

const OverviewStatBox = ({ title, type }: OverviewStatBoxProps) => {
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
        <h1 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          {title}
        </h1>
        <StatusOptions selected={selected} handleOption={handleOption} />
      </div>
      <StatusBanner type={type} />
    </div>
  );
};

export default OverviewStatBox;
