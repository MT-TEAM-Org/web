"use client";

import React from "react"
import OverviewStatBox from "../_components/statusBanner/OverviewStatBox";
import LeftDetail from "./_components/dashBoardDetail/Graph";
import RightDetail from "./_components/dashBoardDetail/RightDetail";


const Page = () => {
  return (
    <div className="min-w-[1100px]">
      {/* 운영 현황 */}
      <OverviewStatBox title="운영현황" type="dashBoard" />

      <div className="w-full h-[452px] flex gap-[40px]">

        {/* 왼쪽 상자 */}
        <LeftDetail />

        {/* 오른쪽 상자 */}
        <RightDetail />

      </div>
    </div>
  )
    ;
}

export default Page;