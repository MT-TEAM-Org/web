"use client";

import Small_Search from "@/app/_components/icon/Small_Search";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { NEWS_NAVBAR } from "@/app/_constants/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchFilter from "@/app/(route)/mypage/_components/SearchFilter";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";
import NewsMobileGnbModal from "./NewsMobileGnbModal";
import FilterMobileModal from "./FilterMobileModal";
import { cn } from "@/utils";

const NewsMobileGnb = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchType, setSearchType] = useState("TITLE");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDetail = () => {
    const newsDetail = pathname.split("/").slice(3, 4)[0];
    if (newsDetail === "news-detail") {
      return "hidden";
    }
  };

  const NavPath = pathname.split("/").slice(2, 3)[0];

  const nowCategory = () => {
    const selectedCategory = NEWS_NAVBAR.find(
      (navbar) => navbar.id === NavPath
    );
    if (selectedCategory) {
      return selectedCategory.name;
    }
    return "카테고리 없음";
  };

  const currentCategory = nowCategory();

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onOpen = () => {
    setIsModalOpen(true);
  };

  const FilterOnClose = () => {
    setIsFilterOpen(false);
  };
  const FilterOnOpen = () => {
    setIsFilterOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearching((prev) => !prev);
  };

  const handleNavLeftIconClick = () => {
    if (isSearching) {
      setIsSearching(false);
    } else {
      router.back();
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

  return (
    <div
      className={cn(
        "w-full max-w-[768px] h-[48px] flex items-center justify-around bg-white",
        "pc:hidden",
        "tablet:hidden",
        isDetail()
      )}
    >
      <div className="w-full flex items-center">
        <div
          onClick={handleNavLeftIconClick}
          className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer"
        >
          {isSearching ? (
            <CustomIcon
              icon="CLOSE_X"
              className="w-[18px] h-[18px] text-gray7"
            />
          ) : (
            <CustomIcon
              icon="MOBILE_ARROW_LEFT"
              className="w-[18px] h-[18px] text-white "
            />
          )}
        </div>
        {isSearching ? (
          <div className="w-full flex items-center justify-center">
            <SearchFilter
              searchType={searchType}
              searchOptions={SEARCH_OPTION}
              onSearchTypeChange={handleSearchTypeChange}
              onSubmit={handleSubmit}
              isMobileGnb={true}
            />
            <div
              onClick={FilterOnOpen}
              className="w-[48px] h-[48px] cursor-pointer flex items-center"
            >
              <CustomIcon icon="FILTER_ICON" className="w-[24px] h-[24px]" />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between ">
            <div className="w-full">
              <div
                onClick={onOpen}
                className="flex items-center min-w-[175px] font-bold text-[16px] leading-[26px]"
              >
                뉴스톡톡
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
                onClick={FilterOnOpen}
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
      {isModalOpen && (
        <NewsMobileGnbModal
          currentCategory={currentCategory}
          onClose={onClose}
        />
      )}
      {isFilterOpen && <FilterMobileModal onClose={FilterOnClose} />}
    </div>
  );
};

export default NewsMobileGnb;

const SEARCH_OPTION = [
  { label: "제목+내용", value: "TITLE_CONTENT" },
  { label: "제목", value: "TITLE" },
  { label: "내용", value: "CONTENT" },
  { label: "댓글", value: "COMMENT" },
];
