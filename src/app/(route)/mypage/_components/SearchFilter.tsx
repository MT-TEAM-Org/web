"use client";

import Small_Search from "@/app/_components/icon/Small_Search";
import { useRef, useState } from "react";
import { COMMENT_COMMENT_TYPE_OPTIONS } from "../_constants/toolbarObject";
import { Clear } from "@/app/_components/icon/Clear";
import { cn } from "@/utils";
import Icon from "@/app/_components/IconComponents";

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

const textStyle =
  "font-[500] text-[14px] leading-[20px] text-black mobile:leading-[22px] mobile:tracking-[-0.02em]";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [isCommentTypeOpen, setIsCommentTypeOpen] = useState(false);
  const [isSearchTypeOpen, setIsSearchTypeOpen] = useState(false);

  const handleInput = () => setHasValue(!!inputRef.current?.value);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setHasValue(false);
      inputRef.current.focus();
    }
  };

  const handleCommentTypeSelect = (option: {
    label: string;
    value: string;
  }) => {
    if (onCommentTypeChange) {
      const mockEvent = {
        target: { value: option.value },
      } as React.ChangeEvent<HTMLSelectElement>;
      onCommentTypeChange(mockEvent);
    }
    setIsCommentTypeOpen(false);
  };

  const handleSearchTypeSelect = (option: { label: string; value: string }) => {
    const mockEvent = {
      target: { value: option.value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onSearchTypeChange(mockEvent);
    setIsSearchTypeOpen(false);
  };

  const selectedCommentTypeLabel =
    COMMENT_COMMENT_TYPE_OPTIONS.find((opt) => opt.value === commentType)
      ?.label || "";
  const selectedSearchTypeLabel =
    searchOptions.find((opt) => opt.value === searchType)?.label || "";

  return (
    <div
      className={cn(
        "flex items-center gap-[8px] min-w-[356px] h-[40px]",
        isMobileGnb ? "justify-start" : "justify-end",
        "mobile:w-full"
      )}
    >
      {/* 댓글 타입 드롭다운 */}
      {mode === "comments" && (
        <div
          className={cn(
            "relative inline-block text-left w-[120px]",
            "mobile:hidden mobile:w-[114px]"
          )}
          onMouseEnter={() => setIsCommentTypeOpen(true)}
          onMouseLeave={() => setIsCommentTypeOpen(false)}
        >
          <button
            onClick={() => setIsCommentTypeOpen(!isCommentTypeOpen)}
            className={cn(
              "w-full h-[40px] border rounded-[5px] px-4 py-2 bg-white flex justify-between items-center gap-2 text-nowrap",
              isCommentTypeOpen
                ? "border-black border-b-0 rounded-b-none"
                : "border-gray3 hover:border-black"
            )}
          >
            <span className={textStyle}>{selectedCommentTypeLabel}</span>
            {isCommentTypeOpen ? (
              <Icon icon="SELECT_ARROW_DOWN" />
            ) : (
              <Icon icon="SELECT_ARROW_UP" />
            )}
          </button>

          {/* 구분선 */}
          {isCommentTypeOpen && (
            <div className="relative w-full h-[1px]">
              <hr className="border-gray3" />
              <div className="absolute top-0 left-0 w-[1px] h-px bg-black" />
              <div className="absolute top-0 right-0 w-[1px] h-px bg-black" />
            </div>
          )}

          {/* 드롭다운 목록 */}
          {isCommentTypeOpen && (
            <ul
              className={cn(
                "absolute w-full bg-white border border-t-0 rounded-[5px] rounded-t-none shadow-lg z-10 border-black"
              )}
            >
              {COMMENT_COMMENT_TYPE_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleCommentTypeSelect(option)}
                  className={cn(
                    "w-full h-[40px] px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center",
                    textStyle
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 검색 타입 드롭다운 */}
      <div
        className={cn(
          "relative inline-block text-left w-[120px]",
          "mobile:w-full"
        )}
        onMouseEnter={() => setIsSearchTypeOpen(true)}
        onMouseLeave={() => setIsSearchTypeOpen(false)}
      >
        <button
          onClick={() => setIsSearchTypeOpen(!isSearchTypeOpen)}
          className={cn(
            "w-full h-[40px] border rounded-[5px] px-4 py-2 bg-white flex justify-between items-center gap-2 text-nowrap",
            isSearchTypeOpen
              ? "border-black border-b-0 rounded-b-none"
              : "border-gray3 hover:border-black"
          )}
        >
          <span
            className={cn(
              textStyle,
              "mobile:leading-[22px] mobile:tracking-[-0.02em]"
            )}
          >
            {selectedSearchTypeLabel}
          </span>
          {isSearchTypeOpen ? (
            <Icon icon="SELECT_ARROW_DOWN" />
          ) : (
            <Icon icon="SELECT_ARROW_UP" />
          )}
        </button>

        {/* 구분선 */}
        {isSearchTypeOpen && (
          <div className="relative w-full h-[1px]">
            <hr className="border-gray3" />
            <div className="absolute top-0 left-0 w-[1px] h-px bg-black" />
            <div className="absolute top-0 right-0 w-[1px] h-px bg-black" />
          </div>
        )}

        {/* 드롭다운 목록 */}
        {isSearchTypeOpen && (
          <ul
            className={cn(
              "absolute w-full bg-white border border-t-0 rounded-[5px] rounded-t-none shadow-lg z-50 border-black"
            )}
          >
            {searchOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSearchTypeSelect(option)}
                className={cn(
                  "w-full h-[40px] px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center",
                  textStyle
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
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
