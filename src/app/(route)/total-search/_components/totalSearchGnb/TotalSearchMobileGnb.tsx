"use client";

import SearchFilter from "@/app/(route)/mypage/_components/SearchFilter";
import FilterMobileModal from "@/app/(route)/news/_components/newsGnb/FilterMobileModal";
import Small_Search from "@/app/_components/icon/Small_Search";
import CustomIcon from "@/app/_components/IconComponents";
import { TOTAL_NAVBAR } from "@/app/_constants/navigation";
import { cn } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import TotalSearchMobileGnbModal from "./TotalSearchMobileGnbModal";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

const TotalSearchMobileGnb = () => {
  const [searchType, setSearchType] = useState("TITLE");
  const [uiState, setUiState] = useState({
    isModalOpen: false,
    isSearching: false,
    isFilterOpen: false,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const NavPath = pathname.split("/").slice(1, 2)[0];

  const nowCategory = () => {
    const selectedCategory = TOTAL_NAVBAR.find(
      (navbar) => navbar.id === NavPath
    );
    return selectedCategory ? selectedCategory.name : "카테고리 없음";
  };

  const currentCategory = nowCategory();

  const toggleState = (stateName: keyof typeof uiState, value?: boolean) => {
    setUiState((prev) => ({
      ...prev,
      [stateName]: value !== undefined ? value : !prev[stateName],
    }));
  };

  const handleSearchClick = () => toggleState("isSearching");
  const openModal = () => toggleState("isModalOpen", true);
  const closeModal = () => toggleState("isModalOpen", false);

  const handleNavLeftIconClick = () => {
    if (uiState.isSearching) {
      toggleState("isSearching", false);
    } else {
      router.back();
    }
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = e.target[1].value;
    if (inputValue.trim() === "") return;

    let totalSearchParams = changeURLParams(
      searchParams,
      "searchType",
      searchType
    );
    totalSearchParams = changeURLParams(
      new URLSearchParams(totalSearchParams.split("?")[1]),
      "search",
      inputValue
    );

    const params = new URLSearchParams(totalSearchParams.split("?")[1]);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={cn(
        "w-full max-w-[768px] h-[48px] flex items-center justify-around bg-white border-b border-gray2",
        "pc:hidden",
        "tablet:hidden"
      )}
    >
      <div className={cn("w-full flex items-center", uiState && "gap-2")}>
        <div
          onClick={handleNavLeftIconClick}
          className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer"
        >
          {uiState.isSearching ? (
            <CustomIcon
              icon="CLOSE_X"
              className="w-[18px] h-[18px] text-gray7"
            />
          ) : (
            <CustomIcon
              icon="MOBILE_ARROW_LEFT"
              className="w-[18px] h-[18px] text-white"
            />
          )}
        </div>
        {uiState.isSearching ? (
          <div className="w-full flex items-center justify-center">
            <SearchFilter
              searchType={searchType}
              searchOptions={SEARCH_OPTION}
              onSearchTypeChange={handleSearchTypeChange}
              onSubmit={handleSubmit}
              isMobileGnb={true}
            />
            <div
              onClick={() => toggleState("isFilterOpen", true)}
              className="w-[48px] h-[48px] cursor-pointer flex items-center"
            >
              <CustomIcon icon="FILTER_ICON" className="w-[24px] h-[24px]" />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="w-full">
              <div
                onClick={openModal}
                className="flex items-center min-w-[175px] font-bold text-[16px] leading-[26px]"
              >
                통합검색
                <div className="flex items-center justify-center w-[24px] h-[24px]">
                  <CustomIcon
                    icon="BLACK_MOBILE_ARROW_DOWN"
                    className="w-[8px] h-[5.71px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center min-w-[96px] gap-x-[16px]">
              <div
                onClick={() => toggleState("isFilterOpen", true)}
                className="w-[24px] h-[24px] cursor-pointer"
              >
                <CustomIcon icon="FILTER_ICON" className="w-[24px] h-[24px]" />
              </div>
              <div
                onClick={handleSearchClick}
                className="w-[24px] h-[24px] cursor-pointer"
              >
                <Small_Search />
              </div>
            </div>
          </div>
        )}
      </div>
      {uiState.isModalOpen && (
        <TotalSearchMobileGnbModal
          currentCategory={currentCategory}
          onClose={closeModal}
        />
      )}
      {uiState.isFilterOpen && (
        <FilterMobileModal
          type="totalSearch"
          onClose={() => toggleState("isFilterOpen", false)}
        />
      )}
    </div>
  );
};

export default TotalSearchMobileGnb;

const SEARCH_OPTION = [
  { label: "제목+내용", value: "TITLE_CONTENT" },
  { label: "제목", value: "TITLE" },
  { label: "내용", value: "CONTENT" },
  { label: "댓글", value: "COMMENT" },
];
