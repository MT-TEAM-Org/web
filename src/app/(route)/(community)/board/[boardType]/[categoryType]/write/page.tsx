"use client";

import { Write } from "@/app/(route)/(community)/_components/Write";
import { use } from "react";

export default function WritePage({
  params,
}: {
  params: Promise<{ boardType: string; categoryType: string }>;
}) {
  const unwrappedParams = use(params);
  const { boardType, categoryType } = unwrappedParams;

  const category = boardType.toUpperCase();
  const subCategory = categoryType || "ALL";

  const modalId = `write-guide-global`;

  return (
    <div className="flex justify-center bg-white">
      <div className="max-w-[720px] w-full min-h-[120px] rounded-[5px] bg-[#FFFFFF] mx-auto">
        <Write
          category={category}
          subCategory={subCategory}
          modalId={modalId}
        />
      </div>
    </div>
  );
}
