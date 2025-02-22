"use client";

import { useRef } from "react";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Pg_double_left from "@/app/_components/icon/Pg_double_left";
import Pg_double_right from "@/app/_components/icon/Pg_double_right";
import Pg_left from "@/app/_components/icon/Pg_left";
import Pg_right from "@/app/_components/icon/Pg_right";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import Small_Search from "@/app/_components/icon/Small_Search";

interface DropdownOption {
  label: string;
  value: string;
}

interface ToolbarProps {
  showOptions?: boolean;
}

export const CustomerTalkToolbar = ({ showOptions = true }: ToolbarProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

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
    { label: "작성자", value: "writer" },
  ];

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";

  const pageButtonStyle =
    "flex justify-center items-center w-[32px] h-[32px] rounded-[5px] border p-[9px]";

  return (
    <div className="rounded-[5px]">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b bg-[#FFFFFF] ">
        <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
          공지사항
        </h1>
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
            />
            <button className="absolute top-2 left-[12px]">
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

        <div className="flex">
          <div className="flex items-center gap-[10px]">
            <button className={pageButtonStyle}>
              <Pg_double_left />
            </button>
            <button className={pageButtonStyle}>
              <Pg_left />
            </button>
          </div>

          <div className="flex gap-[8px] mx-[8px]">
            {pagination.map((page) => (
              <button
                key={page.value}
                className={`${pageButtonStyle} ${
                  page.value === "1" && "font-[700]"
                } text-[14px] leading-[20px] text-[#424242]`}
              >
                {page.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[10px]">
            <button className={pageButtonStyle}>
              <Pg_right />
            </button>
            <button className={pageButtonStyle}>
              <Pg_double_right />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
