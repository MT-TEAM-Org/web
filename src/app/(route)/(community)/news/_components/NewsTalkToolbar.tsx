"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Arrow_down from "@/app/_components/icon/Arrow_down";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import Small_Search from "@/app/_components/icon/Small_Search";
import React from "react";
import { NewsListPageInfoType } from "@/app/_constants/newsListItemType";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

interface DropdownOption {
  label: string;
  value: string;
}

interface NewsTalkToolbarProps {
  setOrderType: (value: "DATE" | "COMMENT" | "VIEW") => void;
  setTimeType: (value: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY") => void;
  onPageChange: (page: string) => void;
  setSearchType: Dispatch<SetStateAction<string>>;
  paginationData: NewsListPageInfoType;
}

const NewsTalkToolbar = ({
  setOrderType,
  setTimeType,
  onPageChange,
  setSearchType,
  paginationData,
}: NewsTalkToolbarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeBtn, setActiveBtn] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  >("DAILY");
  const [activeSorted, setActiveSorted] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );
  const selectRef = useRef<HTMLSelectElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || "1"
  );

  const options: DropdownOption[] = [
    { label: "제목+내용", value: "both" },
    { label: "제목", value: "title" },
    { label: "내용", value: "content" },
    { label: "댓글", value: "comment" },
  ];

  const timeButtons = [
    { label: "일간", value: "DAILY" },
    { label: "주간", value: "WEEKLY" },
    { label: "월간", value: "MONTHLY" },
    { label: "연간", value: "YEARLY" },
  ];

  const sortOptions = [
    { value: "DATE", logo: <Blue_outline_logo />, label: "최신순" },
    { value: "VIEW", logo: <Red_outline_logo />, label: "인기순" },
    { value: "COMMENT", logo: <Mini_logo />, label: "댓글 많은 순" },
  ];

  const handleDivClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const handleSortChange = (value: "DATE" | "COMMENT" | "VIEW") => {
    setActiveSorted(value);
    setOrderType(value);
    setCurrentPage("1");
    let newUrl = changeURLParams(searchParams, "sort", value);
    newUrl = changeURLParams(
      new URLSearchParams(newUrl.split("?")[1]),
      "page",
      "1"
    ).split("?")[1]
      ? `${newUrl.split("?")[0]}?${
          changeURLParams(
            new URLSearchParams(newUrl.split("?")[1]),
            "page",
            "1"
          ).split("?")[1]
        }`
      : newUrl;
    router.push(newUrl, { scroll: false });
  };

  const handleDaySortChange = (
    value: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  ) => {
    setActiveBtn(value);
    setTimeType(value);
    setCurrentPage("1");
    let newUrl = changeURLParams(searchParams, "time", value);
    newUrl = changeURLParams(
      new URLSearchParams(newUrl.split("?")[1]),
      "page",
      "1"
    ).split("?")[1]
      ? `${newUrl.split("?")[0]}?${
          changeURLParams(
            new URLSearchParams(newUrl.split("?")[1]),
            "page",
            "1"
          ).split("?")[1]
        }`
      : newUrl;
    router.push(newUrl, { scroll: false });
  };

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setSearchType(inputValue);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > paginationData.totalPage) return;
    setCurrentPage(page.toString());
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
    onPageChange(page.toString());
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page") || "1";
    const sortFromUrl =
      (searchParams.get("sort") as "DATE" | "COMMENT" | "VIEW") || "DATE";
    const timeFromUrl =
      (searchParams.get("time") as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY") ||
      "DAILY";

    setCurrentPage(pageFromUrl);
    setActiveSorted(sortFromUrl);
    setActiveBtn(timeFromUrl);
    setOrderType(sortFromUrl);
    setTimeType(timeFromUrl);
    onPageChange(pageFromUrl);
  }, [searchParams, onPageChange, setOrderType, setTimeType]);

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px] border-gray3";
  const activeSortedStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px] font-[700] border-gray7";
  const activeButtonStyle =
    "bg-[#00ADEE] text-white min-w-[57px] h-[40px] flex gap-[10px] items-center align-center rounded-[5px] px-[16px] py-[13px] font-[700] text-[14px] leading-[21px] tracking-[-2%]";
  const disableButtonStyle =
    "bg-white text-gray-700 min-w-[57px] h-[40px] flex gap-[10px] items-center align-center border border-gray3 rounded-[5px] px-[16px] py-[13px] font-[500] text-[14px] leading-[22px] tracking-[-2%]";

  return (
    <div className="w-[720px] min-h-[120px] rounded-tl-[5px] rounded-tr-[5px] bg-white mx-auto shadow-sm">
      <div className="bg-white rounded-tr-[5px] rounded-t-[5px]">
        <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b">
          <div className="flex gap-2">
            {timeButtons.map((button) => (
              <button
                key={button.value}
                onClick={() =>
                  handleDaySortChange(
                    button.value as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
                  )
                }
                className={
                  activeBtn === button.value
                    ? activeButtonStyle
                    : disableButtonStyle
                }
              >
                {button.label}
              </button>
            ))}
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
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="text"
                className="w-[228px] h-[40px] rounded-[5px] border pl-[36px] pr-[12px] py-[6px] text-[14px] leading-[22px] placeholder-gray4"
                placeholder="검색어를 입력해주세요."
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <button
                type="submit"
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
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleSortChange(option.value as "DATE" | "COMMENT" | "VIEW")
                }
                className={
                  activeSorted === option.value
                    ? activeSortedStyle
                    : buttonStyle
                }
              >
                {option.logo}
                {option.label}
              </button>
            ))}
          </div>
          <Pagination
            pageInfo={paginationData}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsTalkToolbar);
