"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Small_Search from "@/app/_components/icon/Small_Search";
import { useRef } from "react";
import { COMMENT_COMMENT_TYPE_OPTIONS } from "../_constants/toolbarObject";

interface SearchFilterProps {
  searchType: string;
  searchOptions: { label: string; value: string }[];
  onSearchTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  commentType?: string;
  onCommentTypeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  mode?: "posts" | "inquries" | "comments";
}

const SearchFilter = ({
  searchType,
  searchOptions,
  onSearchTypeChange,
  onSubmit,
  commentType,
  onCommentTypeChange,
  mode,
}: SearchFilterProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px]">
      {mode === "comments" && (
        <div className="relative" onClick={() => selectRef.current?.click()}>
          <select
            className="appearance-none w-[120px] h-[40px] rounded-[5px] px-[12px] border text-[14px] leading-[22px] cursor-pointer [&>option]:h-[40px] [&>option]:px-[12px] [&>option]:py-[16px]"
            ref={selectRef}
            onChange={onCommentTypeChange}
            value={commentType}
          >
            {COMMENT_COMMENT_TYPE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="h-[40px] px-[12px] py-[16px]"
                defaultValue={commentType}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute top-2 right-2 pointer-events-none">
            <Arrow_down />
          </div>
        </div>
      )}

      <div className="relative" onClick={() => selectRef.current?.click()}>
        <select
          className="appearance-none w-[120px] h-[40px] rounded-[5px] px-[12px] border text-[14px] leading-[22px] cursor-pointer [&>option]:h-[40px] [&>option]:px-[12px] [&>option]:py-[16px]"
          ref={selectRef}
          onChange={onSearchTypeChange}
          value={searchType}
        >
          {searchOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="h-[40px] px-[12px] py-[16px]"
              defaultValue={searchType}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute top-2 right-2 pointer-events-none">
          <Arrow_down />
        </div>
      </div>
      <form className="relative" onSubmit={onSubmit}>
        <input
          type="text"
          className="w-[228px] h-[40px] rounded-[5px] border pl-[36px] pr-[12px] py-[6px] text-[14px] leading-[22px] placeholder-[#CBCBCB]"
          placeholder="검색어를 입력해주세요."
        />
        <button className="absolute top-2 left-[12px]">
          <Small_Search />
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
