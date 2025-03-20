"use client";

import { useState } from "react";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import { NoticePageInfoType } from "@/app/_constants/customer/NoticeItemType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../mypage/_components/Pagination";
import changeURLParams from "../../mypage/util/changeURLParams";
import React from "react";
import Link from "next/link";
import SearchFilter from "../../mypage/_components/SearchFilter";

interface DropdownOption {
  label: string;
  value: string;
}

interface ToolbarProps {
  showOptions?: boolean;
  paginationData?: NoticePageInfoType;
  adminChecker?: "USER" | "ADMIN" | undefined;
}

const CustomerTalkToolbar = ({
  showOptions = true,
  paginationData,
  adminChecker,
}: ToolbarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState("TITLE");

  const options: DropdownOption[] = [
    { label: "제목+내용", value: "both" },
    { label: "제목", value: "title" },
    { label: "내용", value: "content" },
    { label: "댓글", value: "comment" },
    { label: "작성자", value: "writer" },
  ];

  const handlePageChange = (page: number) => {
    if (paginationData && paginationData.totalPage) {
      if (page < 1 || page > paginationData.totalPage) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement)[0] as HTMLInputElement;
    router.push(
      changeURLParams(searchParams, "search", inputValue.value, searchType),
      {
        scroll: false,
      }
    );
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
          <Link href={"/customer/feedback/write"}>
            <button className="w-[120px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-gra font-bold text-[14px] text-white items-center justify-center">
              글쓰기
            </button>
          </Link>
        )}

        <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px]">
          <SearchFilter
            searchType={searchType}
            searchOptions={options}
            onSearchTypeChange={handleSearchTypeChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="flex justify-between items-center p-[12px]">
        <div className="flex w-full items-center gap-[4px]">
          {showOptions && (
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
          )}
        </div>

        <Pagination
          pageInfo={paginationData}
          onPageChangeAction={handlePageChange}
        />
      </div>
    </div>
  );
};

export default React.memo(CustomerTalkToolbar);
