"use client";

import React from "react";
import { cn } from "@/utils";
import Link from "next/link";
import {
  ImprovementTableRow,
  InquiryTableRow,
} from "../_type/DetailTableType/DetailTableItem";
import { useRouter } from "next/navigation";

type DetailTableItemProps = {
  row: InquiryTableRow | ImprovementTableRow;
  idx: number;
  type: "inquiry" | "improvement";
  isList: boolean;
};

// 타입 가드 함수
const isInquiry = (
  row: InquiryTableRow | ImprovementTableRow
): row is InquiryTableRow => {
  return "member" in row && "email" in row;
};

const DetailTableItem = ({ row, idx, isList, type }: DetailTableItemProps) => {
  const router = useRouter();

  // 타입별 cellConfig 생성
  const getCellConfig = () => {
    if (isInquiry(row)) {
      // Inquiry 타입인 경우
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
          className: !isList ? "truncate max-w-[246px]" : "truncate flex-1",
        },
        {
          key: "date",
          value: row.date,
          className: "w-[160px]",
        },
      ];
    } else {
      // Improvement 타입인 경우
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
          className: "w-[100px]",
        },
        {
          key: "nickname",
          value: row.nickname,
          className: "w-[160px]",
        },
        {
          key: "title",
          value: row.title,
          className: "w-[200px]",
        },
        {
          key: "content",
          value: row.content,
          className: !isList ? "truncate max-w-[246px]" : "truncate flex-1",
        },
        {
          key: "date",
          value: row.date,
          className: "w-[160px]",
        },
      ];
    }
  };

  const cellConfig = getCellConfig();

  const getLinkPath = () => {
    return type === "inquiry"
      ? `/admin-inquiries/${idx}`
      : `/admin-improvement/${idx}`;
  };

  const handleRoute = () => {
    router.push(getLinkPath());
  };

  return (
    <tr
      key={idx}
      onClick={handleRoute}
      className="border-t hover:bg-gray1 px-4 py-2 text-[14px] leading-5 cursor-pointer"
    >
      {cellConfig.map((cell) => (
        <td
          key={cell.key}
          className={cn("px-4 py-2 text-center", cell.className)}
        >
          {cell.value}
        </td>
      ))}
    </tr>
  );
};

export default DetailTableItem;
