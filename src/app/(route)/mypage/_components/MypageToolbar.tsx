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
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface DropdownOption {
  label: string;
  value: string;
}

interface ListConfig {
  page: number;
  size: number;
  orderType: "CREATE" | "RECOMMEND" | "COMMENT" | "ANSWERED";
  searchType: "TITLE" | "CONTENT" | "TITLE_CONTENT" | "COMMENT";
  search: string;
}

interface PageInfo {
  currentPage: number;
  totalPage: number;
  totalElement: number;
}

interface MypageToolbarProps {
  mode: "posts" | "inquries";
  pageInfo: PageInfo;
}

export const MypageToolbar = ({ mode, pageInfo }: MypageToolbarProps) => {
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") ||
      (mode === "inquries" ? "CONTENT" : "TITLE_CONTENT")
  );
  const paramsConfig = {
    orderType: searchParams.get("order_type") || "CREATE",
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || 1,
  };
  const router = useRouter();

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

  const orderOptions = [
    { label: "최신순", value: "CREATE", logo: <Blue_outline_logo /> },
    { label: "인기순", value: "RECOMMEND", logo: <Red_outline_logo /> },
    { label: "댓글 많은 순", value: "COMMENT", logo: <Mini_logo /> },
  ];

  const postSearchOptions: DropdownOption[] = [
    {
      label: "제목+내용",
      value: "TITLE_CONTENT" as ListConfig["searchType"],
    },
    { label: "제목", value: "TITLE" as ListConfig["searchType"] },
    { label: "내용", value: "CONTENT" as ListConfig["searchType"] },
    { label: "댓글", value: "COMMENT" as ListConfig["searchType"] },
  ];

  const inquriesSearchOptions: DropdownOption[] = [
    { label: "내용", value: "CONTENT" },
    { label: "댓글", value: "COMMENT" },
  ];

  const searchOptions =
    mode === "inquries" ? inquriesSearchOptions : postSearchOptions;

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const changeURLParams = (URLstring: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(URLstring, value);
    if (URLstring === "search")
      params.set("search_type", searchType as ListConfig["searchType"]);
    router.push(`?${params.toString()}`);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchType(e.target.value);

  const handleOrderButtonClick = (orderType: ListConfig["orderType"]) => {
    if (mode === "inquries") return;
    changeURLParams("order_type", orderType);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement)[0] as HTMLInputElement;
    if (inputValue.value.trim() === "") return;
    changeURLParams("search", inputValue.value);
  };

  const handlePageButtonClick = (page: number) =>
    changeURLParams("page", page.toString());

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageInfo.totalPage) return;
    changeURLParams("page", page.toString());
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
        {mode === "posts" ? (
          <div className="flex w-full items-center gap-[4px]">
            {orderOptions.map((option) => (
              <button
                key={option.value}
                className={`${buttonStyle} ${
                  option.value === paramsConfig.orderType &&
                  "font-[700] border-[#424242]"
                }`}
                onClick={() =>
                  handleOrderButtonClick(
                    option.value as ListConfig["orderType"]
                  )
                }
              >
                {option.logo}
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-[8px] h-[20px]">
            <p className="text-[14px] leading-[20px] text-gray7">답변 완료</p>
          </div>
        )}

        <div className="flex">
          <div className="flex items-center gap-[10px]">
            {pageInfo?.totalPage > 1 && (
              <button
                className={pageButtonStyle}
                onClick={() => handlePageChange(1)}
              >
                <Pg_double_left />
              </button>
            )}
            <button
              className={pageButtonStyle}
              onClick={() => handlePageChange(pageInfo.currentPage - 1)}
            >
              <Pg_left />
            </button>
          </div>

          <div className="flex gap-[8px] mx-[8px]">
            {pageInfo?.totalPage > 0 ? (
              Array.from({ length: pageInfo?.totalPage }, (_, index) => (
                <button
                  key={index + 1}
                  className={`${pageButtonStyle} ${
                    index + 1 === pageInfo?.currentPage &&
                    "font-[700] border-1 border-gray7"
                  } text-[14px] leading-[20px] text-[#424242]`}
                  onClick={() => handlePageButtonClick(index + 1)}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <button
                className={`${pageButtonStyle} font-[700] text-[14px] leading-[20px] text-[#424242] border-1 border-gray7`}
                onClick={() => handlePageButtonClick(1)}
              >
                1
              </button>
            )}
          </div>

          <div className="flex items-center gap-[10px]">
            <button
              className={pageButtonStyle}
              onClick={() => handlePageChange(pageInfo.currentPage + 1)}
            >
              <Pg_right />
            </button>
            {pageInfo?.totalPage > 1 && (
              <button
                className={pageButtonStyle}
                onClick={() => handlePageChange(pageInfo.totalPage)}
              >
                <Pg_double_right />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
