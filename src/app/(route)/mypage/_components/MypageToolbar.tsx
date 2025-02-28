"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Pg_double_left from "@/app/_components/icon/Pg_double_left";
import Pg_double_right from "@/app/_components/icon/Pg_double_right";
import Pg_left from "@/app/_components/icon/Pg_left";
import Pg_right from "@/app/_components/icon/Pg_right";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import Small_Search from "@/app/_components/icon/Small_Search";
import { useRef } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface ListConfig {
  page: number;
  size: number;
  orderType: "CREATE" | "RECOMMEND" | "COMMENT";
  searchType: "TITLE" | "CONTENT" | "TITLE_CONTENT" | "NICKNAME" | "COMMENT";
  boardType: "ESPORTS" | "BASEBALL" | "FOOTBALL" | "";
  categoryType: "FREE" | "QUESTION" | "ISSUE" | "VERIFICATION" | "TIP" | "";
  search: string;
}

interface MypageToolbarProps {
  mode: "posts" | "comments" | "inquries";
  listConfig: ListConfig;
  setListConfig: (config: ListConfig) => void;
}

export const MypageToolbar = ({
  mode,
  listConfig,
  setListConfig,
}: MypageToolbarProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const modeObject = {
    posts: {
      title: "내가 쓴 게시물",
      button: "최신순",
    },
    comments: {
      title: "내가 쓴 댓글",
      button: "최신순",
    },
    inquries: {
      title: "나의 문의내역",
      button: "최신순",
    },
  };

  const pagenataion = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const orderOptions = [
    { label: "최신순", value: "CREATE", logo: <Blue_outline_logo /> },
    { label: "인기순", value: "RECOMMEND", logo: <Red_outline_logo /> },
    { label: "댓글 많은 순", value: "COMMENT", logo: <Mini_logo /> },
  ];

  const searchOptions: DropdownOption[] = [
    { label: "제목+내용", value: "TITLE_CONTENT" as ListConfig["searchType"] },
    { label: "제목", value: "TITLE" as ListConfig["searchType"] },
    { label: "내용", value: "CONTENT" as ListConfig["searchType"] },
    { label: "댓글", value: "COMMENT" as ListConfig["searchType"] },
    { label: "작성자", value: "NICKNAME" as ListConfig["searchType"] },
  ];

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setListConfig({
      ...listConfig,
      searchType: e.target.value as ListConfig["searchType"],
    });
  };

  const handleOrderButtonClick = (orderType: ListConfig["orderType"]) => {
    setListConfig({ ...listConfig, orderType });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setListConfig({ ...listConfig, search: e.target["0"].value });
  };

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";
  const pageButtonStyle =
    "flex justify-center items-center w-[32px] h-[32px] rounded-[5px] border p-[9px]";
  return (
    <div className="bg-[#FFFFFF] rounded-t-[5px]">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b">
        <h2 className="font-[700] text-[18px] leading-[28px] text-[#303030]">
          {modeObject[mode].title}
        </h2>
        <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px]">
          <div className="relative" onClick={handleDivClick}>
            <select
              className="appearance-none w-[120px] h-[40px] rounded-[5px] px-[12px] border text-[14px] leading-[22px] cursor-pointer [&>option]:h-[40px] [&>option]:px-[12px] [&>option]:py-[16px]"
              ref={selectRef}
              onChange={handleSearchTypeChange}
              value={listConfig.searchType}
            >
              {searchOptions.map((option) => (
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
          <form className="relative" onSubmit={handleSubmit}>
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
          {orderOptions.map((option) => (
            <button
              key={option.value}
              className={`${buttonStyle} ${
                option.value === listConfig.orderType &&
                "font-[700] border-[#424242]"
              }`}
              onClick={() =>
                handleOrderButtonClick(option.value as ListConfig["orderType"])
              }
            >
              {option.logo}
              {option.label}
            </button>
          ))}
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
            {pagenataion.map((page) => (
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
