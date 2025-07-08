"use client";

import React from "react";
import SearchFilter from "../_components/SearchFilter";
import DetailTable from "../_components/DetailTable";
import OverviewStatBox from "../_components/OverviewStatBox";

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10">
      {/* 문의현황 */}
      <OverviewStatBox title="문의현황" />

      {/* 검색 필터 */}
      <SearchFilter />

      {/* 하단 내역 테이블 */}
      <DetailTable />
    </div>
  );
};

export default Page;
