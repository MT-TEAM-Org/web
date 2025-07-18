import React from "react";
import CheckBoxIcon from "../common/CheckBoxIcon";
import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import {
  DropDownControl,
  TableHeaderItem,
  TableType,
} from "../../_type/DetailTable/DetailTableHeader";
import { useRouter, useSearchParams } from "next/navigation";

interface DetailTableHeaderProps {
  type: TableType;
  dropDownControl: DropDownControl;
  tableConfig: {
    headers: TableHeaderItem[];
  };
}

const DetailTableHeader = ({
  type,
  dropDownControl,
  tableConfig,
}: DetailTableHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");
  const [currentSortKey, currentSortValue] = currentSort?.split(".") || [];

  const getNextSort = (
    currentKey: string,
    currentValue: string | null,
    sortList: string[],
    newKey: string
  ) => {
    if (currentKey !== newKey) return sortList[0];

    if (!currentValue) return sortList[0];

    const currentIndex = sortList.indexOf(currentValue);
    if (currentIndex === -1 || currentIndex === sortList.length - 1) {
      return null;
    }
    return sortList[currentIndex + 1];
  };

  // 정렬 핸들러
  const handleSort = (key: string, sortList: string[]) => {
    const params = new URLSearchParams(searchParams);

    // 정렬은 하나만 허용
    params.delete("sort");

    const nextValue = getNextSort(
      currentSortKey,
      currentSortValue,
      sortList,
      key
    );

    if (nextValue) {
      params.set("sort", `${key}.${nextValue}`);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // 드롭다운 핸들러
  const handleDropDown = (key: string, sortList: string[]) => {
    handleSort(key, sortList);
    dropDownControl.setDropDown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <thead className={cn("bg-gray1")}>
      <tr>
        {type === "notice" && (
          <th className="w-[48px]">
            <CheckBoxIcon />
          </th>
        )}
        {tableConfig.headers.map((header) => (
          <th
            key={header.key}
            onClick={() =>
              handleDropDown(header.key, header.sortValueList || [])
            }
            className={cn(
              "px-3 py-2 cursor-pointer border-b border-gray2",
              currentSortKey === header.key ? "bg-bg0" : "hover:bg-gray2",
              header.className
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center font-bold text-[14px] leading-5 select-none",
                currentSortKey === header.key ? "text-gra" : "text-gray8"
              )}
            >
              <span className="mx-auto">{header.label}</span>
              <Icon
                icon={
                  currentSortKey === header.key
                    ? "SEARCH_DROPDOWN_UP"
                    : "SEARCH_DROPDOWN_DOWN"
                }
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DetailTableHeader;
