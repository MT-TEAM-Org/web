"use client";

import React from "react";
import OverviewStatBox from "../../_components/statusBanner/OverviewStatBox";
import DetailTable from "../../_components/table/DetailTable";
import SearchFilter from "../../_components/search/SearchFilter";

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10">
      {/* 문의현황 */}
      <OverviewStatBox title="문의현황" type="inquiries" />

      {/* 검색 필터 */}
      <SearchFilter />

      {/* 하단 내역 테이블 */}
      <DetailTable type="inquiry" isList title="문의 내역" totalCount="165" />
    </div>
  );
};

export default Page;
