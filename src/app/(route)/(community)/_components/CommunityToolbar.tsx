"use client";

import Arrow_down from "@/app/_components/icon/Arrow_down";
import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import Small_Search from "@/app/_components/icon/Small_Search";
import { useEditStore } from "@/utils/Store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Pagination from "../../mypage/_components/Pagination";

interface DropdownOption {
  label: string;
  value: string;
}

interface CommunityToolbarProps {
  boardType: string;
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
}

export const CommunityToolbar = ({
  boardType,
  pageInfo,
}: CommunityToolbarProps) => {
  const { resetEditState } = useEditStore();

  const selectRef = useRef<HTMLSelectElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleWriteClick = () => {
    const pathParts = pathname.split("/");
    const basePath = pathParts[1];
    const boardType = pathParts[2];
    const categoryType = pathParts[3] || "FREE";
    resetEditState();

    router.push(`/${basePath}/${boardType}/${categoryType}/write`);
  };

  const handleOrderClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderType", type);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    if (pageInfo && pageInfo.totalPage) {
      if (page < 1 || page > pageInfo.totalPage) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[21px]";

  return (
    <div className="w-full max-w-[720px] sticky top-[120px] bg-white z-10">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b">
        <button
          onClick={handleWriteClick}
          className="defaultButtonColor w-[120px] h-[40px] rounded-[5px] px-[16px] py-[13px] text-white font-[700] text-[14px] leading-[14px]"
        >
          글쓰기
        </button>
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
          <button
            onClick={() => handleOrderClick("CREATE")}
            className={`${buttonStyle} font-[700]`}
          >
            <Blue_outline_logo />
            최신순
          </button>
          <button
            onClick={() => handleOrderClick("RECOMMEND")}
            className={buttonStyle}
          >
            <Red_outline_logo />
            인기순
          </button>
          <button
            onClick={() => handleOrderClick("COMMENT")}
            className={buttonStyle}
          >
            <Mini_logo />
            댓글 많은 순
          </button>
        </div>

        <div className="flex gap-[8px] mx-[8px]">
          <Pagination
            pageInfo={pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
