"use client";

import React from "react";
import { cn } from "@/utils";
import {
  SuggestionsTableRow,
  InquiryTableRow,
  NoticeTableRow,
  ContentTableRow,
  DetailContentTableRow,
  rowDataType,
  tableMeta,
} from "../../_type/DetailTable/DetailTableItem";
import { useRouter } from "next/navigation";
import CheckBoxIcon from "../common/CheckBoxIcon";

interface DetailTableItemProps {
  rowData: rowDataType;
  tableMeta: tableMeta;
}

const typeGuards = {
  inquiry: (row: any): row is InquiryTableRow =>
    "member" in row && "email" in row,
  notice: (row: any): row is NoticeTableRow =>
    "writer" in row && "title" in row && "content" in row,
  content: (row: any): row is ContentTableRow =>
    "isReport" in row &&
    "reportCount" in row &&
    "userStatus" in row &&
    "titleContent" in row,
  detailContent: (row: any): row is DetailContentTableRow =>
    "reportUser" in row &&
    "reportType" in row &&
    "reason" in row &&
    "reportDate" in row,
  suggestions: (row: any): row is SuggestionsTableRow =>
    "recommendations" in row && "nickname" in row && "importance" in row,
};

const DetailTableItem = ({ rowData, tableMeta }: DetailTableItemProps) => {
  const router = useRouter();

  // 타입별 cellConfig 생성
  const getCellConfig = () => {
    if (typeGuards.inquiry(rowData.row)) {
      return [
        {
          key: "status",
          value: rowData.row.status,
          className: cn(
            "font-bold w-[100px]",
            rowData.row.status === "답변대기" ? "text-warning" : "text-gray8"
          ),
        },
        {
          key: "member",
          value: rowData.row.member,
          className: "w-[160px]",
        },
        {
          key: "email",
          value: rowData.row.email,
          className: "w-[160px]",
        },
        {
          key: "content",
          value: rowData.row.content,
          className: !tableMeta.isList
            ? "max-w-[103px] truncate"
            : "flex-1 truncate",
        },
        {
          key: "date",
          value: rowData.row.date,
          className: "w-[160px]",
        },
      ];
    } else if (typeGuards.notice(rowData.row)) {
      return [
        {
          key: "date",
          value: rowData.row.date,
          className: "w-[160px]",
        },
        {
          key: "writer",
          value: rowData.row.writer,
          className: "w-[160px]",
        },
        {
          key: "title",
          value: rowData.row.title,
          className: !tableMeta.isList ? "min-w-[103px]" : "flex-1",
        },
        {
          key: "content",
          value: rowData.row.content,
          className: !tableMeta.isList ? "max-w-[103px]" : "flex-1",
        },
      ];
    } else if (typeGuards.content(rowData.row)) {
      return [
        {
          key: "status",
          value: rowData.row.status,
          className: cn(
            "w-[100px]",
            rowData.row.status === "숨김" && "text-gra"
          ),
        },
        {
          key: "isReport",
          value: rowData.row.isReport,
          className: cn(
            "w-[100px] font-bold",
            rowData.row.isReport === "신고" && "text-warning"
          ),
        },
        {
          key: "reportCount",
          value: rowData.row.reportCount,
          className: "w-[80px]",
        },
        {
          key: "userStatus",
          value: rowData.row.userStatus,
          className: cn(
            "w-[100px]",
            rowData.row.userStatus === "경고" && "text-[#FF7300]"
          ),
        },
        {
          key: "writer",
          value: rowData.row.writer,
          className: "w-[120px]",
        },
        {
          key: "type",
          value: rowData.row.type,
          className: "w-[80px]",
        },
        {
          key: "titleContent",
          value: rowData.row.titleContent,
          className: !tableMeta.isList
            ? "max-w-[872px]"
            : "truncate flex-1 text-center",
        },
        {
          key: "date",
          value: rowData.row.date,
          className: "w-[120px]",
        },
      ];
    } else if (typeGuards.suggestions(rowData.row)) {
      return [
        {
          key: "status",
          value: rowData.row.status,
          className: cn(
            "font-bold w-[100px]",
            rowData.row.status === "접수"
              ? "text-warning"
              : rowData.row.status === "완료"
              ? "text-gra"
              : "text-gray8"
          ),
        },
        {
          key: "importance",
          value: rowData.row.importance,
          className: cn(
            "font-bold w-[100px]",
            rowData.row.importance === "높음" && "text-warning"
          ),
        },
        {
          key: "recommendations",
          value: rowData.row.recommendations,
          className: !tableMeta.isList ? "w-[100px]" : "w-[100px]",
        },
        {
          key: "nickname",
          value: rowData.row.nickname,
          className: !tableMeta.isList ? "w-[160px]" : "w-[160px]",
        },
        {
          key: "title",
          value: rowData.row.title,
          className: !tableMeta.isList
            ? "min-w-[103px] truncate"
            : "flex-1 truncate",
        },
        {
          key: "content",
          value: rowData.row.content,
          className: !tableMeta.isList
            ? "min-w-[103px] truncate"
            : "flex-1 truncate",
        },
        {
          key: "date",
          value: rowData.row.date,
          className: !tableMeta.isList ? "w-[160px]" : "w-[160px]",
        },
      ];
    } else if (typeGuards.detailContent(rowData.row)) {
      return [
        {
          key: "reportUser",
          value: rowData.row.reportUser,
          className: "w-[160px]",
        },
        {
          key: "reportType",
          value: rowData.row.reportType,
          className: "w-[160px]",
        },
        {
          key: "reason",
          value: rowData.row.reason,
          className: !tableMeta.isList
            ? "min-w-[103px] truncate"
            : "flex-1 truncate",
        },
        {
          key: "reportDate",
          value: rowData.row.reportDate,
          className: !tableMeta.isList ? "w-[160px]" : "w-[160px]",
        },
      ];
    }

    return [];
  };

  const cellConfig = getCellConfig();

  const getLinkPath = () => {
    switch (rowData.type) {
      case "inquiry":
        return `/dashBoard/inquiries/${tableMeta.idx}`;
      case "suggestions":
        return `/dashBoard/suggestions/${tableMeta.idx}`;
      case "content":
        if (typeGuards.content(rowData.row)) {
          return rowData.row.type === "게시글"
            ? `/dashBoard/content/post/${tableMeta.idx}`
            : rowData.row.type === "댓글"
            ? `/dashBoard/content/comment/${tableMeta.idx}`
            : rowData.row.type === "채팅"
            ? `/dashBoard/content/chat/${tableMeta.idx}`
            : "/dashBoard";
        }
        return "#";
      case "notice":
        return `/dashBoard/notices/${tableMeta.idx}`;
      default:
        return "#";
    }
  };

  const handleRoute = () => {
    if (
      tableMeta.isList &&
      ((rowData.type === "inquiry" && typeGuards.inquiry(rowData.row)) ||
        (rowData.type === "suggestions" &&
          typeGuards.suggestions(rowData.row)) ||
        (rowData.type === "content" && typeGuards.content(rowData.row)))
    ) {
      router.push(getLinkPath());
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
