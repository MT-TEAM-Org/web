"use client";

import React from "react";
import { cn } from "@/utils";
import {
  SuggestionsTableRow,
  InquiryTableRow,
  NoticeTableRow,
  ContentTableRow,
} from "../../_type/DetailTableType/DetailTableItem";
import { useRouter } from "next/navigation";
import CheckBoxIcon from "../common/CheckBoxIcon";

type DetailTableItemProps = {
  row: InquiryTableRow | SuggestionsTableRow | NoticeTableRow | ContentTableRow;
  idx: number;
  type: "inquiry" | "suggestions" | "notice" | "content";
  isList: boolean;
};

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
  suggestions: (row: any): row is SuggestionsTableRow =>
    "recommendations" in row && "nickname" in row && "importance" in row,
};

const DetailTableItem = ({ row, idx, isList, type }: DetailTableItemProps) => {
  const router = useRouter();

  // 타입별 cellConfig 생성
  const getCellConfig = () => {
    if (typeGuards.inquiry(row)) {
      return [
        {
          key: "status",
          value: row.status,
          className: cn(
            "font-bold w-[100px]",
            row.status === "답변대기" ? "text-warning" : "text-gray8"
          ),
        },
        {
          key: "member",
          value: row.member,
          className: "w-[160px]",
        },
        {
          key: "email",
          value: row.email,
          className: "w-[160px]",
        },
        {
          key: "content",
          value: row.content,
          className: !isList ? "max-w-[103px] truncate" : "flex-1 truncate",
        },
        {
          key: "date",
          value: row.date,
          className: "w-[160px]",
        },
      ];
    } else if (typeGuards.notice(row)) {
      return [
        {
          key: "date",
          value: row.date,
          className: "w-[160px]",
        },
        {
          key: "writer",
          value: row.writer,
          className: "w-[160px]",
        },
        {
          key: "title",
          value: row.title,
          className: !isList ? "min-w-[103px]" : "flex-1",
        },
        {
          key: "content",
          value: row.content,
          className: !isList ? "max-w-[103px]" : "flex-1",
        },
      ];
    } else if (typeGuards.content(row)) {
      return [
        {
          key: "status",
          value: row.status,
          className: cn("w-[100px]", row.status === "숨김" && "text-gra"),
        },
        {
          key: "isReport",
          value: row.isReport,
          className: cn(
            "w-[100px] font-bold",
            row.isReport === "신고" && "text-warning"
          ),
        },
        {
          key: "reportCount",
          value: row.reportCount,
          className: "w-[80px]",
        },
        {
          key: "userStatus",
          value: row.userStatus,
          className: cn(
            "w-[100px]",
            row.userStatus === "경고" && "text-[#FF7300]"
          ),
        },
        {
          key: "writer",
          value: row.writer,
          className: "w-[120px]",
        },
        {
          key: "type",
          value: row.type,
          className: "w-[80px]",
        },
        {
          key: "titleContent",
          value: row.titleContent,
          className: !isList ? "max-w-[872px]" : "truncate flex-1 text-center",
        },
        {
          key: "date",
          value: row.date,
          className: "w-[120px]",
        },
      ];
    } else if (typeGuards.suggestions(row)) {
      return [
        {
          key: "status",
          value: row.status,
          className: cn(
            "font-bold w-[100px]",
            row.status === "접수"
              ? "text-warning"
              : row.status === "완료"
              ? "text-gra"
              : "text-gray8"
          ),
        },
        {
          key: "importance",
          value: row.importance,
          className: cn(
            "font-bold w-[100px]",
            row.importance === "높음" && "text-warning"
          ),
        },
        {
          key: "recommendations",
          value: row.recommendations,
          className: !isList ? "w-[100px]" : "w-[100px]",
        },
        {
          key: "nickname",
          value: row.nickname,
          className: !isList ? "w-[160px]" : "w-[160px]",
        },
        {
          key: "title",
          value: row.title,
          className: !isList ? "min-w-[103px] truncate" : "flex-1 truncate",
        },
        {
          key: "content",
          value: row.content,
          className: !isList ? "min-w-[103px] truncate" : "flex-1 truncate",
        },
        {
          key: "date",
          value: row.date,
          className: !isList ? "w-[160px]" : "w-[160px]",
        },
      ];
    }

    return [];
  };

  const cellConfig = getCellConfig();

  const getLinkPath = () => {
    switch (type) {
      case "inquiry":
        return `/dashBoard/inquiries/${idx}`;
      case "suggestions":
        return `/dashBoard/suggestions/${idx}`;
      case "content":
        return `/dashBoard/content/${idx}`;
      case "notice":
        return `/dashBoard/notices/${idx}`;
      default:
        return "#";
    }
  };

  const handleRoute = () => {
    if (
      isList &&
      ((type === "inquiry" && typeGuards.inquiry(row)) ||
        (type === "notice" && typeGuards.notice(row)) ||
        (type === "suggestions" && typeGuards.suggestions(row)) ||
        (type === "content" && typeGuards.content(row)))
    ) {
      router.push(getLinkPath());
    }
  };

  return (
    <tr
      key={idx}
      onClick={handleRoute}
      className={cn("border-b border-gray-200 hover:bg-gray-50 cursor-pointer")}
    >
      {type === "notice" && (
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
