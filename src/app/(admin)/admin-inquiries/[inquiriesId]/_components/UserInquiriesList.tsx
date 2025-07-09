"use client";

import DetailTable from "@/app/(admin)/_components/DetailTable";
import React from "react";

const UserInquiriesList = () => {
  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h3 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
          해당 유저의 문의 내역
        </h3>
        <p className="font-bold text-[16px] leading-7 tracking-[-0.02em] text-gray7">
          총 165건
        </p>
      </div>
      <div>
        <DetailTable type="detail" />
      </div>
    </div>
  );
};

export default UserInquiriesList;
