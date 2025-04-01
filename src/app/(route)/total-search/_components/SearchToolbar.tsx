import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Pagination from "../../mypage/_components/Pagination";
import OrderButtons from "../../mypage/_components/OrderButtons";
import SearchFilter from "../../mypage/_components/SearchFilter";
import OrderDateButton from "./OrderDateButton";
import { POST_SEARCH_OPTIONS } from "../../mypage/_constants/toolbarObject";
import changeURLParams from "../../mypage/util/changeURLParams";
import { searchListConfig } from "../_types/searchListConfig";
import { SearchListPageInfoType } from "../_types/searchType";

interface SearchToolbarProps {
  totalSearchType: string;
  pageInfo: SearchListPageInfoType;
}

const SearchToolbar = ({ totalSearchType, pageInfo }: SearchToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsConfig = {
    category: totalSearchType,
    searchType: searchParams.get("searchType") || "TITLE_CONTENT",
    orderType: searchParams.get("orderType") || "DATE",
    timePeriod: searchParams.get("time") || "ALL",
    content: searchParams.get("search") || "",
    page: searchParams.get("page") || "1",
  };

  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || "TITLE_CONTENT"
  );

  useEffect(() => {
    setSearchType(searchParams.get("searchType") || "TITLE_CONTENT");
  }, [searchParams]);

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement)[0] as HTMLInputElement;
    if (inputValue.value.trim() === "") return;

    let newSearchParams = changeURLParams(
      searchParams,
      "searchType",
      searchType
    );

    newSearchParams = changeURLParams(
      new URLSearchParams(newSearchParams.split("?")[1]),
      "search",
      inputValue.value
    );

    const params = new URLSearchParams(newSearchParams.split("?")[1]);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleOrderButtonClick = (orderType: searchListConfig["orderType"]) => {
    const newURL = changeURLParams(searchParams, "orderType", orderType);

    const params = new URLSearchParams(newURL.split("?")[1]);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    if (pageInfo && pageInfo.totalPage) {
      if (page < 1 || page > pageInfo.totalPage) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className="w-full h-[120px] rounded-t-[5px] bg-white sticky top-0 z-10">
      <div className="w-full h-[64px] border-b flex justify-between p-3 border-gray2">
        <OrderDateButton />
        <div className="w-[356px] h-[40px] flex gap-2 items-center justify-center">
          <SearchFilter
            searchType={searchType}
            searchOptions={POST_SEARCH_OPTIONS}
            onSearchTypeChange={handleSearchTypeChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="w-full min-h-[56px] flex justify-between p-3">
        <div className="w-[279px] min-h-[32px] flex gap-2">
          <OrderButtons
            orderType={paramsConfig.orderType as searchListConfig["orderType"]}
            onOrderType={handleOrderButtonClick}
          />
        </div>
        <Pagination pageInfo={pageInfo} onPageChangeAction={handlePageChange} />
      </div>
    </div>
  );
};

export default SearchToolbar;
