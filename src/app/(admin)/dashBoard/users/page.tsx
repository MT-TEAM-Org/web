"use client";

import React from "react";
import DetailTable from "../../_components/table/DetailTable";
import OverviewStatBox from "../../_components/statusBanner/OverviewStatBox";
import SearchFilter from "../../_components/search/SearchFilter";

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col gap-10">
      {/* 개선요청 현황 */}
      <OverviewStatBox title="회원 현황" type="users" />

      {/* 검색 필터 */}
      <SearchFilter isUser />

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
