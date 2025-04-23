"use client";

import Small_Search from "@/app/_components/icon/Small_Search";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchFilter from "@/app/(route)/mypage/_components/SearchFilter";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";
import { cn } from "@/utils";
import { useAdminRole } from "../../_utils/adminChecker";

const CustomerMobileGnb = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState("TITLE");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const infoUrl = pathname.split("/").slice(3, 4)[0];
  const writeUrl = pathname.split("/").slice(2, 4)[0];
  const listUrl = pathname.split("/")[2];
  const adminRole = useAdminRole();

  const isDetail = () => {
    if (infoUrl === "notice-info" || infoUrl === "feedback-info") {
      return "hidden";
    }
  };

  const isWrite = () => {
    if (infoUrl === "write" && writeUrl === "notice") {
      return "공지사항 작성";
    } else if (infoUrl === "write" && writeUrl === "feedback") {
      return "개선요청 작성";
    } else {
      return "고객센터";
    }
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

  const handleWritePage = () => {
    if (listUrl === "feedback") {
      router.push("/customer/feedback/write");
    } else {
      router.push("/customer/notice/write");
    }
  };

  const shouldShowWriteButton = () => {
    if (listUrl === "feedback") {
      return true;
    }
    if (!listUrl && adminRole === "ADMIN") {
      return true;
    }
    return false;
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

  // 작성 페이지 여부 확인
  const isWritePage = () => {
    return (
      infoUrl === "write" && (writeUrl === "notice" || writeUrl === "feedback")
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
              className="w-[18px] h-[18px] text-white"
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
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="w-full">
              <div className="flex items-center min-w-[175px] font-bold text-[16px] leading-[26px]">
                {isWrite()}
              </div>
            </div>
            <div
              className={cn(
                "flex justify-center items-center min-w-[137px] gap-x-[16px]",
                !shouldShowWriteButton() && "min-w-[48px]"
              )}
            >
              {!isWritePage() && (
                <div
                  onClick={handleSearchClick}
                  className="w-[24px] h-[24px] cursor-pointer"
                >
                  <Small_Search />
                </div>
              )}
              {shouldShowWriteButton() && !isWritePage() && (
                <div
                  onClick={handleWritePage}
                  className="w-[65px] h-[32px] rounded-[5px] px-3 py-[9px] text-nowrap flex items-center justify-center cursor-pointer bg-gra text-[14px] text-white"
                >
                  글쓰기
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMobileGnb;

const SEARCH_OPTION = [
  { label: "제목+내용", value: "TITLE_CONTENT" },
  { label: "제목", value: "TITLE" },
  { label: "내용", value: "CONTENT" },
  { label: "댓글", value: "COMMENT" },
];
