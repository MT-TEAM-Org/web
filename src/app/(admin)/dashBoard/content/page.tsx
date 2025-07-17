"use client";

import React from "react";
import OverviewStatBox from "../../_components/statusBanner/OverviewStatBox";
import DetailTable from "../../_components/table/DetailTable";
import SearchFilter from "../../_components/search/SearchFilter";

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10">
      {/* 게시물 현황 */}
      <OverviewStatBox title="게시물 현황" />

      {/* 검색 필터 */}
      <SearchFilter isContent />

      {/* 하단 내역 테이블 */}
      <DetailTable type="content" isList title="게시물 내역" totalCount="165" />
    </div>
  );
};

export default Page;
