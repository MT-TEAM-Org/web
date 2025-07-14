"use client";

import DetailTable from "@/app/(admin)/_components/table/DetailTable";
import React from "react";

interface UserDetailFeedbackListProps {
  totalCount: string;
  type: "suggestions" | "inquiry" | "detailContent";
  title: string;
}

const UserDetailFeedbackList = ({
  totalCount,
  type,
  title,
}: UserDetailFeedbackListProps) => {
  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h3 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
          {title}
        </h3>
        <p className="font-bold text-[16px] leading-7 tracking-[-0.02em] text-gray7">
          총 {totalCount}건
        </p>
      </div>
      <div>
        <DetailTable type={type} isList={false} />
      </div>
    </div>
  );
};

export default UserDetailFeedbackList;
