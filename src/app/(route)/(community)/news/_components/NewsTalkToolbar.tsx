"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Pg_double_left from "@/app/_components/icon/Pg_double_left";
import Pg_double_right from "@/app/_components/icon/Pg_double_right";
import Pg_left from "@/app/_components/icon/Pg_left";
import Pg_right from "@/app/_components/icon/Pg_right";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import Small_Search from "@/app/_components/icon/Small_Search";
import React from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface NewsTalkToolbarProps {
  setOrderType: (value: "DATE" | "COMMENT" | "VIEW") => void;
  onPageChange: (page: string) => void;
}

const NewsTalkToolbar = ({
  setOrderType,
  onPageChange,
}: NewsTalkToolbarProps) => {
  const [activeBtn, setActiveBtn] = useState<string>("일간");
  const [activeSorted, setActiveSorted] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );
  const selectRef = useRef<HTMLSelectElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState("1");

  const pagination = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const options: DropdownOption[] = [
    { label: "제목+내용", value: "both" },
    { label: "제목", value: "title" },
    { label: "내용", value: "content" },
    { label: "댓글", value: "comment" },
  ];

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const handleDateClick = (value: string) => {
    setActiveBtn(value);
    console.log(value);
  };

  const handleSortChange = (value: "DATE" | "COMMENT" | "VIEW") => {
    setActiveSorted(value);
    setOrderType(value);
  };

  const searchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    onPageChange(currentPage);
    console.log("현재페이지: ", currentPage);
  }, [currentPage]);

  const handlePageChange = (
    type: "prev" | "next" | "doublePrev" | "doubleNext"
  ) => {
    const currentPageNum = Number(currentPage);
    // 페이지 변경 로직을 객체로 관리
    const actions: Record<typeof type, () => number> = {
      prev: () => (currentPageNum > 1 ? currentPageNum - 1 : currentPageNum),
      next: () => (currentPageNum < 5 ? currentPageNum + 1 : currentPageNum),
      doublePrev: () =>
        currentPageNum > 2 ? currentPageNum - 2 : currentPageNum,
      doubleNext: () =>
        currentPageNum < 4 ? currentPageNum + 2 : currentPageNum,
    };
    const newsPage = actions[type]();
    if (newsPage !== currentPageNum) {
      setCurrentPage(newsPage.toString());
    }
  };

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px] border-[#DBDBDB]";

  const activeSortedStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px] font-[700] border-[#424242]";

  const pageButtonStyle =
    "flex justify-center items-center w-[32px] h-[32px] rounded-[5px] border p-[9px]";

  const activeButtonStyle =
    "bg-[#00ADEE] text-white min-w-[57px] h-[40px] flex gap-[10px] items-center align-center rounded-[5px] px-[16px] py-[13px]  font-[700] text-[14px] leading-[21px] tracking-[-2%]";

  const disableButtonStyle =
    "bg-white text-gray-700 min-w-[57px] h-[40px] flex gap-[10px] items-center align-center border border-[#DBDBDB] rounded-[5px] px-[16px] py-[13px] font-[500] text-[14px] leading-[22px] tracking-[-2%]";

  return (
    <div className="w-[720px] min-h-[120px] rounded-tl-[5px] rounded-tr-[5px] bg-white mx-auto">
      <div className="bg-white rounded-tr-[5px] rounded-t-[5px]">
        <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b">
          <div className="flex gap-2">
            <button
              onClick={() => handleDateClick("일간")}
              className={
                activeBtn === "일간" ? activeButtonStyle : disableButtonStyle
              }
            >
              일간
            </button>
            <button
              onClick={() => handleDateClick("주간")}
              className={
                activeBtn === "주간" ? activeButtonStyle : disableButtonStyle
              }
            >
              주간
            </button>
            <button
              onClick={() => handleDateClick("월간")}
              className={
                activeBtn === "월간" ? activeButtonStyle : disableButtonStyle
              }
            >
              월간
            </button>
            <button
              onClick={() => handleDateClick("연간")}
              className={
                activeBtn === "연간" ? activeButtonStyle : disableButtonStyle
              }
            >
              연간
            </button>
          </div>
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
            <form className="relative">
              <input
                type="text"
                className="w-[228px] h-[40px] rounded-[5px] border pl-[36px] pr-[12px] py-[6px] text-[14px] leading-[22px] placeholder-[#CBCBCB]"
                placeholder="검색어를 입력해주세요."
                value={inputValue}
                onChange={searchInput}
              />
              <button className="absolute top-2 left-[12px]">
                <Small_Search />
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-between items-center p-[12px]">
          <div className="flex w-full items-center gap-[4px]">
            <button
              onClick={() => handleSortChange("DATE")}
              className={
                activeSorted === "DATE" ? activeSortedStyle : buttonStyle
              }
            >
              <Blue_outline_logo />
              최신순
            </button>
            <button
              onClick={() => handleSortChange("VIEW")}
              className={
                activeSorted === "VIEW" ? activeSortedStyle : buttonStyle
              }
            >
              <Red_outline_logo />
              인기순
            </button>
            <button
              onClick={() => handleSortChange("COMMENT")}
              className={
                activeSorted === "COMMENT" ? activeSortedStyle : buttonStyle
              }
            >
              <Mini_logo />
              댓글 많은 순
            </button>
          </div>

          <div className="flex">
            <div className="flex items-center gap-[10px]">
              <button
                className={pageButtonStyle}
                onClick={() => handlePageChange("doublePrev")}
              >
                <Pg_double_left />
              </button>
              <button
                className={pageButtonStyle}
                onClick={() => handlePageChange("prev")}
              >
                <Pg_left />
              </button>
            </div>

            <div className="flex gap-[8px] mx-[8px]">
              {pagination.map((page) => (
                <button
                  key={page.value}
                  className={`${pageButtonStyle} ${
                    page.value === currentPage
                      ? "font-[700] border border-[#424242]"
                      : ""
                  } text-[14px] leading-[20px] text-[#424242]`}
                  onClick={() => {
                    onPageChange(page.label);
                    setCurrentPage(page.label);
                  }}
                >
                  {page.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-[10px]">
              <button
                className={pageButtonStyle}
                onClick={() => handlePageChange("next")}
              >
                <Pg_right />
              </button>
              <button
                className={pageButtonStyle}
                onClick={() => handlePageChange("doubleNext")}
              >
                <Pg_double_right />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsTalkToolbar);
