"use client"

import React, { useState } from "react"
import { BarChartConfig } from "../../_constants/BarChartConfig";
import { cn } from "@/utils";
import BarGraph from "./BarGraph";
import { useSearchParams } from "next/navigation";

// 날짜div
const colorDiv = "w-[12px] h-[12px] rounded-full mr-[8px] text-[16px] font-bold";

const Graph = () => {
  const [selected, setSelected] = useState<string>("all");

  // 쿼리 추출
  const searchParams = useSearchParams();
  const option = searchParams.get('option');
  const today = new Date();
  const todayStr = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`

  return (
    <div className="w-1/2 h-full bg-gray1 rounded-[20px]" >

      {/* 내부 요소 */}
      <div className="h-[404px] mx-[24px] mt-[16px] mb-[32px] " >

        {/* 상단 요소 */}
        <div className="h-[38px] mb-[24px] flex flex-wrap w-full">

          {/* 그래프 선택 탭 */}
          <div className="flex gap-[8px]">
            {BarChartConfig.map((item) => (
              <button className="h-[32px] px-2 py-1 border border-gray3 rounded bg-white text-[14px] whitespace-nowrap"
                key={item.value}
                onClick={() => setSelected(item.value)}
              >{item.name}
              </button>)
            )}
          </div>

          {/* 날짜 */}
          <div className="flex items-center ml-0 [@media(min-width:1281px)]:ml-auto ">
            <div className={cn(colorDiv, "bg-Fifth")} />
            <p className="my-[6px] mr-[16.14px]">
              2024.6.3
            </p>
            <div className={cn(colorDiv, "bg-primary")} />
            <p className="my-[6px]">
              {todayStr}
            </p>
          </div>

        </div>

        {/* 표 위치 */}
        <BarGraph todayStr={todayStr} selected={selected} />

      </div>
    </div>
  );
};

export default Graph;