"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ListConfig, PageInfo } from "../_types/toolbarType";
import {
  MODE_OBJECT,
  POST_SEARCH_OPTIONS,
  INQURIES_SEARCH_OPTIONS,
} from "../_constants/toolbarObject";
import OrderButtons from "./OrderButtons";
import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";
import changeURLParams from "../util/changeURLParams";
import AnswerCheck from "./AnswerCheck";
import { useQueryClient } from "@tanstack/react-query";
import useAuthCheck from "@/_hooks/useAuthCheck";

interface MypageToolbarProps {
  mode: "posts" | "inquries";
  pageInfo: PageInfo;
}

export const MypageToolbar = ({ mode, pageInfo }: MypageToolbarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") ||
      (mode === "inquries" ? "CONTENT" : "TITLE_CONTENT")
  );
  const paramsConfig = {
    orderType: searchParams.get("order_type") || "CREATE",
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || 1,
  };
  const { data: authCheckData } = useAuthCheck();
  const userRole = authCheckData?.data?.data?.role;
  const searchOptions =
    mode === "inquries" ? INQURIES_SEARCH_OPTIONS : POST_SEARCH_OPTIONS;

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchType(e.target.value);

  const handleOrderButtonClick = (orderType: ListConfig["orderType"]) => {
    if (mode === "inquries") return;
    router.push(changeURLParams(searchParams, "order_type", orderType), {
      scroll: false,
    });
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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageInfo.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-t-[5px]">
      <div className="w-full flex justify-between items-center min-h-[64px] p-[12px] border-b">
        <h2 className="font-[700] text-[18px] leading-[28px] text-[#303030]">
          {mode === "inquries" && userRole === "ADMIN"
            ? "문의내역"
            : MODE_OBJECT[mode].title}
        </h2>
        <SearchFilter
          searchType={searchType}
          searchOptions={searchOptions}
          onSearchTypeChange={handleSearchTypeChange}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="flex justify-between items-center p-[12px]">
        {mode === "posts" ? (
          <OrderButtons
            orderType={paramsConfig.orderType as ListConfig["orderType"]}
            onOrderType={handleOrderButtonClick}
          />
        ) : (
          <AnswerCheck />
        )}
        <Pagination pageInfo={pageInfo} onPageChangeAction={handlePageChange} />
      </div>
    </div>
  );
};
