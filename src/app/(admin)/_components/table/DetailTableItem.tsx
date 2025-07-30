"use client";

import React from "react";
import { cn } from "@/utils";
import CheckBoxIcon from "../common/CheckBoxIcon";
import { useRouter } from "next/navigation";
import { typeGuards } from "../../_utils/tableItemTypeGuards";
import { getCellConfig } from "../../_constants/tableItemConfig";
import { getLinkPath } from "../../_utils/tableItemPath";
import {
  rowDataType,
  tableMeta,
} from "../../_type/DetailTable/DetailTableItem";

interface DetailTableItemProps {
  rowData: rowDataType;
  tableMeta: tableMeta;
}

const DetailTableItem = ({ rowData, tableMeta }: DetailTableItemProps) => {
  const router = useRouter();
  const cellConfig = getCellConfig(rowData, tableMeta);

  const handleRoute = () => {
    if (!tableMeta.isList) return;

    const canNavigate =
      (rowData.type === "inquiry" && typeGuards.inquiry(rowData.row)) ||
      (rowData.type === "suggestions" && typeGuards.suggestions(rowData.row)) ||
      (rowData.type === "content" && typeGuards.content(rowData.row)) ||
      (rowData.type === "user" && typeGuards.user(rowData.row)) ||
      (rowData.type === "userDetail" && typeGuards.userDetail(rowData.row));

    if (canNavigate) {
      router.push(getLinkPath(rowData, tableMeta));
    }
  };

  return (
    <tr
      key={tableMeta.idx}
      onClick={handleRoute}
      className={cn("border-b border-gray-200 hover:bg-gray-50 cursor-pointer")}
    >
      {rowData.type === "notice" && (
        <td className="text-center w-[48px] h-[36px]">
          <CheckBoxIcon />
        </td>
      )}
      {cellConfig.map((cell) => (
        <td
          key={cell.key}
          className={cn(
            "px-4 py-2 text-center h-[36px] font-medium text-[14px] leading-5 text-gray8",
            cell.className
          )}
        >
          {cell.value}
        </td>
      ))}
    </tr>
  );
};

export default DetailTableItem;
