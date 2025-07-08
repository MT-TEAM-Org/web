"use client";

import React from "react";
import SearchFilter from "../../_components/SearchFilter";
import DetailTable from "../../_components/DetailTable";
import OverviewStatBox from "../../_components/OverviewStatBox";

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10">
      {/* 개선요청 현황 */}
      <OverviewStatBox title="개선요청 현황" />

      {/* 검색 필터 */}
      <SearchFilter />

      {/* 하단 내역 테이블 */}
      <DetailTable
        type="suggestions"
        isList
        title="개선요청 내역"
        totalCount="165"
      />
    </div>
  );
};

export default Page;
