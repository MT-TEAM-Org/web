"use client";

import { use } from "react";
import { Write } from "../../_components/Write";

export default function WritePage({
  params,
}: {
  params: Promise<{ boardType: string }>;
}) {
  const unwrappedParams = use(params);
  const { boardType } = unwrappedParams;

  const category = boardType.toUpperCase();
  const subCategory = "ALL"; // 기본값

  return (
    <div className="flex justify-center bg-white">
      <div className="max-w-[720px] w-full min-h-[120px] rounded-[5px] bg-[#FFFFFF] mx-auto p-4">
        <Write category={category} subCategory={subCategory} />
      </div>
    </div>
  );
}
