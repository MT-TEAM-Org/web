"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import SearchFilter from "@/app/(route)/mypage/_components/SearchFilter";
import OrderButtons from "@/app/(route)/mypage/_components/OrderButtons";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";
import { NewsListPageInfoType } from "@/app/(route)/news/_types/newsListItemType";
import { POST_SEARCH_OPTIONS } from "@/app/(route)/mypage/_constants/toolbarObject";
import { newsListConfig } from "../_types/newsListConfig";

interface NewsTalkToolbarProps {
  boardType?: string; // NewsPage에서 전달받은 category 사용 가능
  pageInfo?: NewsListPageInfoType; // Pagination 데이터
}

const NewsTalkToolbar = ({ boardType, pageInfo }: NewsTalkToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 검색 타입 상태 관리 (URL에서 초기값 가져오기)
  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") || "both" // 기본값은 "제목+내용"에 해당
  );

  // URL 파라미터에서 현재 상태 가져오기
  const paramsConfig = {
    orderType: searchParams.get("order_type") || "DATE", // 기본값: 최신순
    timePeriod: searchParams.get("time") || "DAILY", // 기본값: 일간
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || "1",
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (pageInfo && pageInfo.totalPage) {
      if (page < 1 || page > pageInfo.totalPage) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  // 검색 타입 변경 핸들러
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  // 검색 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement)[0] as HTMLInputElement;
    if (inputValue.value.trim() === "") return;
    router.push(
      changeURLParams(searchParams, "search", inputValue.value, searchType),
      { scroll: false }
    );
  };

  // 정렬 및 시간 필터 버튼 클릭 핸들러
  const handleOrderButtonClick = (
    type: "order_type" | "time",
    value: string
  ) => {
    router.push(changeURLParams(searchParams, type, value), { scroll: false });
  };

  return (
    <div className="rounded-[5px]">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b bg-[#FFFFFF]">
        <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
          뉴스
        </h1>
        <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px]">
          <SearchFilter
            searchType={searchType}
            searchOptions={POST_SEARCH_OPTIONS} // 재사용 가능한 상수
            onSearchTypeChange={handleSearchTypeChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="flex justify-between items-center p-[12px]">
        <div className="flex w-full items-center gap-[4px]">
          {/* 정렬 버튼 */}
          <OrderButtons
            orderType={paramsConfig.orderType as newsListConfig["orderType"]}
            onOrderType={(value) => handleOrderButtonClick("order_type", value)}
          />
        </div>
        <Pagination pageInfo={pageInfo} onPageChangeAction={handlePageChange} />
      </div>
    </div>
  );
};

export default React.memo(NewsTalkToolbar);
