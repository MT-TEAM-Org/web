"use client";

import CustomIcon from "@/app/_components/IconComponents/Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BoardMobile = () => {
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const router = useRouter();

  return (
    <div className="w-full min-w-[360px] max-w-[687px] h-[48px] flex items-center justify-between border-b border-gray2">
      <div className="flex items-center">
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          &lt;
        </div>
        <div className="flex items-center min-w-[175px] font-bold text-[16px] leading-[26px]">
          카테고리
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <CustomIcon
              icon="BLACK_MOBILE_ARROW_DOWN"
              className="w-[8px] h-[5.71px]"
            />
          </div>
        </div>
      </div>
      <div className="flex min-w-[137px] gap-x-[16px]">
        <div>검색</div>
        <div>글쓰기 버튼</div>
      </div>
    </div>
  );
};

export default BoardMobile;
