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
import OrderDateButton from "./OrderDateButton";

interface NewsTalkToolbarProps {
  newsType?: string; // NewsPage에서 전달받은 category 사용 가능
  pageInfo?: NewsListPageInfoType; // Pagination 데이터
}

const NewsTalkToolbar = ({ newsType, pageInfo }: NewsTalkToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryFromPath = pathname.split("/")[2] || "";

  // 검색 타입 상태 관리 (URL에서 초기값 가져오기)
  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") || "both"
  );

  const paramsConfig = {
    category: categoryFromPath || searchParams.get("category") || "",
    orderType: searchParams.get("order_type") || "DATE",
    timePeriod: searchParams.get("time") || "DAILY",
    content: searchParams.get("content") || "",
    page: searchParams.get("page") || "1",
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
    const inputValue = (e.target as HTMLFormElement)[0] as HTMLInputElement;
    if (inputValue.value.trim() === "") return;
    router.push(
      changeURLParams(searchParams, "search", inputValue.value, searchType),
      {
        scroll: false,
      }
    );
  };

  const handleOrderButtonClick = (orderType: newsListConfig["orderType"]) => {
    router.push(changeURLParams(searchParams, "order_type", orderType), {
      scroll: false,
    });
  };

  const handleDaySortChange = (
    value: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  ) => {
    setActiveBtn(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("timePeriod", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="rounded-[5px] bg-white">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b bg-[#FFFFFF]">
        <OrderDateButton daySortChange={handleDaySortChange} />
        <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px]">
          <SearchFilter
            searchType={searchType}
            searchOptions={POST_SEARCH_OPTIONS}
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
            onOrderType={handleOrderButtonClick}
          />
        </div>
        <Pagination pageInfo={pageInfo} onPageChangeAction={handlePageChange} />
      </div>
    </div>
  );
};

export default React.memo(NewsTalkToolbar);
