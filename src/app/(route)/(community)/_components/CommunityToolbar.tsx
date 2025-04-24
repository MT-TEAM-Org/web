"use client";

import Blue_outline_logo from "@/app/_components/icon/Blue_outline_logo";
import Mini_logo from "@/app/_components/icon/Mini_logo";
import Red_outline_logo from "@/app/_components/icon/Red_outline_logo";
import { useEditStore } from "@/utils/Store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Pagination from "../../mypage/_components/Pagination";
import SearchFilter from "../../mypage/_components/SearchFilter";
import changeURLParams from "../../mypage/util/changeURLParams";
import LeftSidebar from "./LeftSidebar";
import BoardMobile from "./gnb/borardMobile";

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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState("TITLE");
  const [selectedOrderType, setSelectedOrderType] = useState("CREATE");

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
    setSelectedOrderType(type);
  };

  const handlePageChange = (page: number) => {
    if (pageInfo && pageInfo.totalPage) {
      if (page < 1 || page > pageInfo.totalPage) return;

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
    const inputValue = (e.target as HTMLFormElement)[1] as HTMLInputElement;
    router.push(
      changeURLParams(searchParams, "search", inputValue.value, searchType),
      {
        scroll: false,
      }
    );
  };

  const orderOptions = [
    {
      label: "최신순",
      type: "CREATE",
      icon: <Blue_outline_logo />,
    },
    {
      label: "인기순",
      type: "RECOMMEND",
      icon: <Red_outline_logo />,
    },
    {
      label: "댓글 많은 순",
      type: "COMMENT",
      icon: <Mini_logo />,
    },
  ];

  const buttonStyle =
    "flex justify-center items-center gap-[4px] h-[32px] rounded-[5px] border px-[8px] py-[12px] text-[14px] leading-[20px] hover:font-[700] hover:text-gray7 hover:border-gray7";

  return (
    <div className="w-full max-w-[720px] sticky top-0 bg-white z-10 tablet:max-w-[768px] tablet:mx-auto mobile:w-full mobile:max-w-[768px]">
      <div className="tablet:w-full mobile:w-full mobile:max-w-[768px] mobile:min-h-[96px] mobile:flex mobile:flex-col h-[52px] pc:hidden block">
        <BoardMobile />
        <LeftSidebar />
      </div>
      <div className="mobile:hidden w-full pc:min-w-[720px] flex justify-between items-center min-h-[64px] p-[12px] border-b mobile:w-full mobile:max-w-[768px]">
        <button
          onClick={handleWriteClick}
          className="defaultButtonColor w-[120px] h-[40px] rounded-[5px] px-[16px] py-[13px] text-white font-[700] text-[14px] leading-[14px]"
        >
          글쓰기
        </button>
        <SearchFilter
          searchType={searchType}
          searchOptions={searchOptions}
          onSearchTypeChange={handleSearchTypeChange}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="w-full pc:hidden"></div>
      <div className="flex justify-between items-center p-[12px]">
        <div className="flex w-full items-center gap-[4px]">
          {orderOptions.map((button) => {
            const isActive = selectedOrderType === button.type;

            return (
              <button
                key={button.type}
                onClick={() => handleOrderClick(button.type)}
                className={`
          ${buttonStyle}
          ${
            isActive
              ? "font-[700] text-gray7 border-gray7"
              : "font-[500] text-gray7 border-gray3"
          }
        `}
              >
                {button.icon}
                <span className="whitespace-nowrap">{button.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-[8px] mx-[8px] mobile:hidden">
          <Pagination
            pageInfo={pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const searchOptions = [
  { label: "제목+내용", value: "TITLE_CONTENT" },
  { label: "제목", value: "TITLE" },
  { label: "내용", value: "CONTENT" },
  { label: "댓글", value: "COMMENT" },
  { label: "작성자", value: "NICKNAME" },
];
