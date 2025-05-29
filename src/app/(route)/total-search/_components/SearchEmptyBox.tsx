import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import { cn } from "@/utils";
import React from "react";

const SearchEmptyBox = () => {
  return (
    <div
      className={cn(
        "w-full h-[248px] rounded-b-[10px] bg-gray1 flex flex-col items-center justify-center gap-4",
        "tablet:w-full tablet:h-[230px] tablet:shadow-soft-md",
        "mobile:h-[444px] mobile:min-h-auto"
      )}
    >
      <LogoWhite />
      <p className="font-bold text-[16px] leading-6 tracking-[-0.02em] text-gray7">
        해당 검색어의 검색결과가 없습니다.
      </p>
    </div>
  );
};

export default SearchEmptyBox;
