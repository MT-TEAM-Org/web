"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Small_Search from "@/app/_components/icon/Small_Search";
import { useRef, useState } from "react";
import { COMMENT_COMMENT_TYPE_OPTIONS } from "../_constants/toolbarObject";
import { Clear } from "@/app/_components/icon/Clear";
import { cn } from "@/utils";

interface SearchFilterProps {
  searchType: string;
  searchOptions: { label: string; value: string }[];
  onSearchTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  commentType?: string;
  onCommentTypeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  mode?: "posts" | "inquries" | "comments";
  isMobileGnb?: boolean;
}

const SearchFilter = ({
  searchType,
  searchOptions,
  onSearchTypeChange,
  onSubmit,
  commentType,
  onCommentTypeChange,
  mode,
  isMobileGnb = false,
}: SearchFilterProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = () => setHasValue(!!inputRef.current?.value);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setHasValue(false);
      inputRef.current.focus(); // 포커스 유지
    }
  };

  return (
    <div
      className={cn(
        `flex ${
          isMobileGnb ? "justify-start" : "justify-end"
        } items-center gap-[8px] w-[356px] h-[40px]`,
        "mobile:w-full"
      )}
    >
      {mode === "comments" && (
        <div
          className={cn("relative", "mobile:hidden")}
          onClick={() => selectRef.current?.click()}
        >
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
          className={cn(
            "appearance-none w-[120px] h-[40px] rounded-[5px] px-[12px] border text-[14px] leading-[22px] cursor-pointer [&>option]:h-[40px] [&>option]:px-[12px] [&>option]:py-[16px]",
            "mobile:w-[100px]"
          )}
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
        <div
          className={cn(
            "absolute top-2 right-2 pointer-events-none",
            "mobile:right-1"
          )}
        >
          <Arrow_down />
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className={cn(
          `flex items-center gap-[8px] w-[228px] h-[40px] rounded-[5px] border-[1px] px-[12px] border-gray3 ${
            isFocused && "border-gray7"
          }`,
          `${
            isMobileGnb ? "mobile:w-full mobile:mr-[16px]" : "mobile:w-[180px]"
          }`
        )}
      >
        <button
          className={cn(
            "flex justify-center items-center w-[24px] h-[24px]",
            "mobile:w-[16px] mobile:h-[16px]"
          )}
          aria-label="검색 버튼"
        >
          <Small_Search />
        </button>
        <input
          type="text"
          className={cn(
            `${
              hasValue ? "w-[144px]" : "w-[172px]"
            } text-[14px] leading-[22px] placeholder-gray4 focus:outline-none focus:border-none`,
            `${isMobileGnb ? "mobile:w-full" : "mobile:w-[132px]"}`
          )}
          placeholder="검색어를 입력해주세요."
          ref={inputRef}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {hasValue && (
          <button
            className={cn("flex justify-center items-center", "mobile:hidden")}
            type="button"
            onClick={clearInput}
          >
            <Clear />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchFilter;
