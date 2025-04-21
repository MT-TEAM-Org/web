"use client";

import Small_Search from "@/app/_components/icon/Small_Search";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { NAVBARS } from "@/app/_constants/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import MobileNavModal from "./mobileNavModal";
import SearchFilter from "@/app/(route)/mypage/_components/SearchFilter";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

const BoardMobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState("TITLE");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const NavPath = pathname.split("/").slice(2, 3)[0];

  const nowCategory = () => {
    const seletedCategory = NAVBARS.find((navbar) => navbar.id === NavPath);
    if (seletedCategory) {
      return seletedCategory.name;
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
    <div className="w-full min-w-[360px] max-w-[687px] h-[48px] flex items-center justify-between border-b border-gray2 pc:hidden tablet:hidden">
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
          <div className="w-full">
            <SearchFilter
              searchType={searchType}
              searchOptions={SEARCH_OPTION}
              onSearchTypeChange={handleSearchTypeChange}
              onSubmit={handleSubmit}
              isMobileGnb={true}
            />
          </div>
        ) : (
          <div className="w-full flex items-center justify-between ">
            <div className="w-full">
              <div
                onClick={onOpen}
                className="flex items-center min-w-[175px] font-bold text-[16px] leading-[26px]"
              >
                {currentCategory}
                <div className="flex items-center justify-center w-[24px] h-[24px]">
                  <CustomIcon
                    icon="BLACK_MOBILE_ARROW_DOWN"
                    className="w-[8px] h-[5.71px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center min-w-[137px] gap-x-[16px]">
              <div
                onClick={handleSearchClick}
                className="w-[24px] h-[24px] cursor-pointer"
              >
                <Small_Search />
              </div>
              <button
                onClick={() => router.push(`${pathname}/write`)}
                className="flex items-center justify-center w-[65px] h-[32px] bg-[#00ADEE] text-white rounded-[5px] py-[9px] px-[12px] text-[14px] whitespace-nowrap"
              >
                글쓰기
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <MobileNavModal currentCategory={currentCategory} onClose={onClose} />
      )}
    </div>
  );
};

export default BoardMobile;

const SEARCH_OPTION = [
  { label: "제목+내용", value: "TITLE_CONTENT" },
  { label: "제목", value: "TITLE" },
  { label: "내용", value: "CONTENT" },
  { label: "댓글", value: "COMMENT" },
  { label: "작성자", value: "NICKNAME" },
];
