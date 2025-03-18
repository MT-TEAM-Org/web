"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import Small_Search from "@/app/_components/icon/Small_Search";
import { NoticePageInfoType } from "@/app/_constants/customer/NoticeItemType";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../mypage/_components/Pagination";
import changeURLParams from "../../mypage/util/changeURLParams";
import React from "react";
import Link from "next/link";

interface DropdownOption {
  label: string;
  value: string;
}

interface ToolbarProps {
  showOptions?: boolean;
  paginationData?: NoticePageInfoType;
  onPageChange?: (page: number) => void;
  setSearchType?: (value: string) => void;
  adminChecker?: "USER" | "ADMIN" | undefined;
}

const CustomerTalkToolbar = ({
  showOptions = true,
  paginationData,
  onPageChange,
  setSearchType,
  adminChecker,
}: ToolbarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectRef = useRef<HTMLSelectElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const options: DropdownOption[] = [
    { label: "제목+내용", value: "both" },
    { label: "제목", value: "title" },
    { label: "내용", value: "content" },
    { label: "댓글", value: "comment" },
    { label: "작성자", value: "writer" },
  ];

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setSearchType(inputValue);
    console.log("검색기능");
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > paginationData.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";

  return (
    <div className="rounded-[5px]">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b bg-[#FFFFFF] ">
        {showOptions === false ? (
          adminChecker === "ADMIN" ? (
            <Link href={"/customer/notice/write"}>
              <button className="w-[120px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-gra font-bold text-[14px] text-white items-center justify-center">
                글쓰기
              </button>
            </Link>
          ) : adminChecker === "USER" || adminChecker === undefined ? (
            <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
              공지사항
            </h1>
          ) : null
        ) : (
          <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
            공지사항
          </h1>
        )}

        <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px]">
          <div className="relative" onClick={handleDivClick}>
            <select
              className="appearance-none w-[120px] h-[40px] rounded-[5px] px-[12px] border text-[14px] leading-[22px] cursor-pointer [&>option]:h-[40px] [&>option]:px-[12px] [&>option]:py-[16px]"
              ref={selectRef}
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="h-[40px] px-[12px] py-[16px]"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute top-2 right-2 pointer-events-none">
              <Arrow_down />
            </div>
          </div>
          <form className="relative" onSubmit={handleSearch}>
            <input
              type="text"
              className="w-[228px] h-[40px] rounded-[5px] border pl-[36px] pr-[12px] py-[6px] text-[14px] leading-[22px] placeholder-[#CBCBCB]"
              placeholder="검색어를 입력해주세요."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button
              className="absolute top-2 left-[12px]"
              onClick={handleSearch}
            >
              <Small_Search />
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-between items-center p-[12px]">
        <div className="flex w-full items-center gap-[4px]">
          {showOptions ? (
            <>
              <button className={`${buttonStyle} font-[700]`}>
                <Blue_outline_logo />
                최신순
              </button>
              <button className={buttonStyle}>
                <Red_outline_logo />
                인기순
              </button>
              <button className={buttonStyle}>
                <Mini_logo />
                댓글 많은 순
              </button>
            </>
          ) : null}
        </div>

        <Pagination pageInfo={paginationData} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default React.memo(CustomerTalkToolbar);
