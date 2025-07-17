import React from "react";
import CheckBoxIcon from "../common/CheckBoxIcon";
import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import {
  DropDownControl,
  TableHeaderItem,
  TableType,
} from "../../_type/DetailTable/DetailTableHeader";

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
  // 드롭다운 핸들러
  const handleDropDown = (key: string) => {
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
            onClick={() => handleDropDown(header.key)}
            className={cn(
              "px-3 py-2 cursor-pointer border-b border-gray2",
              dropDownControl.dropDown[header.key]
                ? "bg-bg0"
                : "hover:bg-gray2",
              header.className
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center font-bold text-[14px] leading-5 select-none",
                dropDownControl.dropDown[header.key] ? "text-gra" : "text-gray8"
              )}
            >
              <span className="mx-auto">{header.label}</span>
              <Icon
                icon={
                  dropDownControl.dropDown[header.key]
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
