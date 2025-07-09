"use client";

import React from "react";
import DetailTable from "../../_components/DetailTable";

const Page = () => {
  return (
    <div className="w-full">
      <DetailTable type="notice" isList title="공지 내역" totalCount="165" />
    </div>
  );
};

export default Page;
