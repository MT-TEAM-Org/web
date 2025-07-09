import React from "react";
import { cn } from "@/utils";
import Link from "next/link";

interface DetailTableItemProps {
  // 임시
  row: {
    status: string;
    member: string;
    email: string;
    content: string;
    date: string;
  };
  idx: number;
  type: "list" | "detail";
}

const DetailTableItem = ({ row, idx, type }: DetailTableItemProps) => {
  const cellConfig = [
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
      className:
        type === "detail" ? "truncate max-w-[246px]" : "truncate flex-1",
    },
    {
      key: "date",
      value: row.date,
      className: "160px",
    },
  ];

  return (
    <tr
      key={idx}
      className="border-t hover:bg-gray1 px-4 py-2 text-[14px] leading-5 cursor-pointer"
    >
      {cellConfig.map((cell) => (
        <td
          key={cell.key}
          className={cn("px-4 py-2 text-center", cell.className)}
        >
          {type === "list" ? (
            <Link href={`/admin-inquiries/${idx}`}>{cell.value}</Link>
          ) : (
            cell.value
          )}
        </td>
      ))}
    </tr>
  );
};

export default DetailTableItem;
