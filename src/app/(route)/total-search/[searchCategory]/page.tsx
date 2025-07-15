"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect } from "react";
import SearchToolbar from "../_components/SearchToolbar";
import useGetSearchDataList from "@/_hooks/fetcher/total-search/useGetSearchDataList";
import { cn } from "@/utils";
import Pagination from "../../mypage/_components/Pagination";
import SearchResultList from "../_components/SearchResultList";
import { searchOptions } from "../_types/searchOptions";
import { usePageChange } from "../_utils/usePageChange";

const Page = () => {
  const params = useParams() as { searchCategory: string };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchType = pathname.split("/")[2];
  const category = params.searchCategory || "news";

  // 타입 검증
  useEffect(() => {
    const validTypes = ["board", "news"];
    if (!validTypes.includes(searchType)) {
      router.push("/404");
    }
  }, [searchType, router]);

  // 타입에 따라 domainType 설정
  const options = searchOptions(searchParams);

  if (searchType === "news") {
    options.domainType = "NEWS";
  } else if (searchType === "board") {
    options.domainType = "BOARD";
  }

  const {
    data: searchData,
    isLoading,
    isError,
  } = useGetSearchDataList(options);

  const handlePageChange = usePageChange();

  return (
    <div
      className={cn(
        "w-full max-w-[720px] min-h-[120px] rounded-[5px] mx-auto",
        "tablet:max-w-full",
        "mobile:max-w-[768px]",
        searchData?.content?.length === 0 || !searchData
          ? "bg-transparent"
          : "bg-white"
      )}
    >
      <div className="sticky top-0 z-10">
        <SearchToolbar
          totalSearchType={category}
          pageInfo={searchData?.pageInfo}
        />
      </div>

      <div
        className={cn(
          "w-full max-w-[720px] h-auto rounded-b-[5px] bg-white",
          "tablet:max-w-full",
          "mobile:w-full mobile:max-w-[768px]",
          !!searchData?.content?.length &&
            "shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]"
        )}
      >
        {/* 통합 검색 아이템 결과 */}
        <SearchResultList
          searchType={searchType}
          searchData={searchData}
          searchParams={searchParams}
          isLoading={isLoading}
          isError={isError}
        />

        {/* 페이지네이션 */}
        {searchData?.pageInfo?.totalPage > 0 && (
          <div
            className={cn(
              "hidden",
              "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
            )}
          >
            <Pagination
              pageInfo={searchData?.pageInfo}
              onPageChangeAction={(page) => handlePageChange(page, searchData)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
