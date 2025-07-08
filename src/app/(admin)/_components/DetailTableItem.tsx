import React from "react";
import { cn } from "@/utils";

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
}

const DetailTableItem = ({ row, idx }: DetailTableItemProps) => {
  const cellConfig = [
    {
      key: "status",
      value: row.status,
      className: cn(
        "font-bold",
        row.status === "답변대기" ? "text-warning" : "text-gray8"
      ),
    },
    {
      key: "member",
      value: row.member,
    },
    {
      key: "email",
      value: row.email,
    },
    {
      key: "content",
      value: row.content,
      className: "truncate max-w-[1112px]",
    },
    {
      key: "date",
      value: row.date,
    },
  ];

  return (
    <tr
      key={idx}
      className="border-t hover:bg-gray1 px-4 py-2 text-[14px] leading-5 cursor-pointer"
    >
      {cellConfig.map((cell) => (
        <td key={cell.key} className={cn("px-4 py-2", cell.className)}>
          {cell.value}
        </td>
      ))}
    </tr>
  );
};

export default DetailTableItem;
