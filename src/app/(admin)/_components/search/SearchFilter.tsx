import { cn } from "@/utils";
import React from "react";
import RadioGroup from "./RadioGroup";
import SearchGroup from "./SearchGroup";
import DateGroup from "./DateGroup";
import {
  FilterConfig,
  SEARCH_FILTER_CONFIG,
} from "../../_type/SearchFilter/searchFilterConfig";

const searchFilterStyles = {
  actionButtonStyle:
    "w-[120px] h-[40px] rounded-[5px] border text-center border-gray3 font-bold text-[14px] text-gray7 transition-colors",
  filterBox: "w-full rounded-[5px] border border-gray2 border-b-0",
};

interface SearchFilterProps {
  isContent?: boolean;
  isUser?: boolean;
}

const SearchFilter = ({
  isContent = false,
  isUser = false,
}: SearchFilterProps) => {
  // 검색 필터 버튼 핸들러
  const handleButton = (value: string) => {
    console.log("버튼 클릭", value);
  };

  const filterActions = [
    {
      name: "초기화",
      value: "init",
      style: "bg-white border-gray3 hover:bg-gray1",
    },
    {
      name: "검색",
      value: "search",
      style: "bg-Primary text-white hover:bg-primary/80",
    },
  ];

  // 필터 컴포넌트 렌더링
  const renderFilterComponent = (config: FilterConfig) => {
    switch (config.type) {
      case "radio":
        return (
          <RadioGroup
            key={config.name}
            label={config.label}
            name={config.name}
            options={config.options!}
          />
        );
      case "search":
        return (
          <SearchGroup
            key={config.name}
            label={config.label}
            name={config.name}
            placeholder={config.placeholder!}
          />
        );
      default:
        return null;
    }
  };

  const currentConfig = isContent
    ? SEARCH_FILTER_CONFIG.content
    : isUser
    ? SEARCH_FILTER_CONFIG.user
    : SEARCH_FILTER_CONFIG.default;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex h-[56px] justify-between items-center">
        <h2 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          검색 필터
        </h2>
        <div className="flex gap-2">
          {filterActions.map((button) => (
            <button
              key={button.value}
              className={cn(searchFilterStyles.actionButtonStyle, button.style)}
              onClick={() => handleButton(button.value)}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex">
        {/* 왼쪽 필터 영역 */}
        <div
          className={cn(
            searchFilterStyles.filterBox,
            "rounded-r-none border-r-0"
          )}
        >
          {currentConfig.left.map(renderFilterComponent)}
          {isUser && <DateGroup />}
        </div>

        {/* 오른쪽 필터 영역 */}
        <div
          className={cn(
            searchFilterStyles.filterBox,
            "rounded-l-none border-l-0"
          )}
        >
          {!isUser && <DateGroup />}
          {currentConfig.right.map(renderFilterComponent)}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
