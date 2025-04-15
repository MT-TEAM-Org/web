"use client";

import { Suspense, useState } from "react";
import { NoticePageInfoType } from "@/app/(route)/customer/_types/NoticeItemType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../mypage/_components/Pagination";
import changeURLParams from "../../mypage/util/changeURLParams";
import React from "react";
import Link from "next/link";
import SearchFilter from "../../mypage/_components/SearchFilter";
import OrderButtons from "../../mypage/_components/OrderButtons";
import { feedbackListConfig } from "../_types/feedbackListConfig";
import { POST_SEARCH_OPTIONS } from "../../mypage/_constants/toolbarObject";
import { cn } from "@/utils";

interface ToolbarProps {
  showOptions?: boolean;
  paginationData?: NoticePageInfoType;
  adminChecker?: "USER" | "ADMIN" | undefined;
}

const CustomerTalkToolbarContent = ({
  showOptions = true,
  paginationData,
  adminChecker,
}: ToolbarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") || "TITLE rubCONTENT"
  );
  const searchOptions = POST_SEARCH_OPTIONS;

  const paramsConfig = {
    orderType: searchParams.get("order_type") || "CREATE",
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || 1,
  };

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
    const inputValue = (e.target as HTMLFormElement)[1] as HTMLInputElement;
    if (inputValue.value.trim() === "") return;
    router.push(
      changeURLParams(searchParams, "search", inputValue.value, searchType),
      {
        scroll: false,
      }
    );
  };

  const handleOrderButtonClick = (
    orderType: feedbackListConfig["orderType"]
  ) => {
    router.push(changeURLParams(searchParams, "order_type", orderType), {
      scroll: false,
    });
  };

  const writeButton = (href: string) => (
    <Link href={href}>
      <button className="w-[120px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] bg-gra font-bold text-[14px] text-white items-center justify-center">
        글쓰기
      </button>
    </Link>
  );

  const toolbarContent =
    showOptions === false && adminChecker === "ADMIN" ? (
      writeButton("/customer/notice/write")
    ) : showOptions === false && (adminChecker === "USER" || !adminChecker) ? (
      <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
        공지사항
      </h1>
    ) : (
      writeButton("/customer/feedback/write")
    );

  return (
    <div className="rounded-[5px] overflow-hidden bg-white">
      <div
        className={cn(
          "w-full h-[64px] flex justify-between items-center min-h-[64px] p-[12px] border-b bg-white",
          "mobile:hidden"
        )}
      >
        {toolbarContent}
        <div className="flex justify-end items-center gap-[8px] w-[356px] h-[40px] z-10">
          <SearchFilter
            searchType={searchType}
            searchOptions={searchOptions}
            onSearchTypeChange={handleSearchTypeChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="flex justify-between items-center p-[12px]">
        <div className="flex w-full items-center gap-[4px]">
          {showOptions && (
            <OrderButtons
              orderType={
                paramsConfig.orderType as feedbackListConfig["orderType"]
              }
              onOrderType={handleOrderButtonClick}
            />
          )}
        </div>
        <div className={cn("mobile:hidden")}>
          <Pagination
            pageInfo={paginationData}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const CustomerTalkToolbar = (props: ToolbarProps) => {
  return (
    <Suspense fallback={""}>
      <CustomerTalkToolbarContent {...props} />
    </Suspense>
  );
};

export default React.memo(CustomerTalkToolbar);
