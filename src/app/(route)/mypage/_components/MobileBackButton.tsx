"use client";

import Arrow_left from "@/app/_components/icon/Arrow_left";
import { cn } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import SearchFilter from "./SearchFilter";
import { useState } from "react";
import {
  INQURIES_SEARCH_OPTIONS,
  POST_SEARCH_OPTIONS,
} from "../_constants/toolbarObject";
import changeURLParams from "../util/changeURLParams";
import Small_Search from "@/app/_components/icon/Small_Search";
import CustomIcon from "@/app/_components/IconComponents/Icon";

interface MobileBackButtonProps {
  mode?: "posts" | "inquries" | "comments";
}

const MobileBackButton = ({ mode }: MobileBackButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchOptions =
    mode === "inquries" ? INQURIES_SEARCH_OPTIONS : POST_SEARCH_OPTIONS;

  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") ||
      (mode === "inquries" ? "CONTENT" : "TITLE_CONTENT")
  );
  const [commentType, setCommentType] = useState(
    searchParams.get("comment_type") || "BOARD"
  );
  const [showSearchType, setShowSearchType] = useState(false);

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchType(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement)[1] as HTMLInputElement;
    if (inputValue.value.trim() === "") return;
    if (mode === "comments") {
      router.push(
        changeURLParams(
          searchParams,
          "search",
          inputValue.value,
          searchType,
          commentType
        ),
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      changeURLParams(searchParams, "search", inputValue.value, searchType),
      {
        scroll: false,
      }
    );
  };

  const handleCommentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (mode !== "comments") return;
    setCommentType(e.target.value);
  };

  return (
    <div
      className={cn(
        "hidden",
        "tablet:hidden",
        "mobile:flex mobile:items-center mobile:justify-between mobile:w-full mobile:h-[48px] mobile:border-b mobile:border-gray2 mobile:absolute mobile:top-[124px] mobile:left-0"
      )}
    >
      <div className="flex items-center">
        {showSearchType ? (
          <button
            className="flex justify-center items-center w-[48px] h-[48px]"
            onClick={() => setShowSearchType(false)}
          >
            <CustomIcon icon="CLOSE_X" className="w-[18px] h-[18px]" />
          </button>
        ) : (
          <>
            <button
              className="flex justify-center items-center w-[48px] h-[48px]"
              onClick={() => router.back()}
            >
              <Arrow_left width={18} height={18} />
            </button>
            <h1 className="font-[700] leading-[26px]">마이페이지</h1>
          </>
        )}
      </div>
      {showSearchType ? (
        <div className="mx-[8px]">
          <SearchFilter
            onSearchTypeChange={handleSearchTypeChange}
            searchType={searchType}
            searchOptions={searchOptions}
            onSubmit={handleSubmit}
            commentType={commentType}
            onCommentTypeChange={handleCommentTypeChange}
            mode={mode}
          />
        </div>
      ) : (
        <button
          className={`w-[48px] h-[48px] flex justify-center items-center p-[12px] ${
            !mode && "hidden"
          }`}
          onClick={() => setShowSearchType(true)}
        >
          <Small_Search />
        </button>
      )}
    </div>
  );
};

export default MobileBackButton;
