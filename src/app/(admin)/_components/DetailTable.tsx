import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React from "react";
import DetailTableItem from "./DetailTableItem";
import Pagination from "./Pagination";

interface DetailTableProps {
  type: "list" | "detail";
}

const DetailTable = ({ type }: DetailTableProps) => {
  const tableConfig = {
    title: "문의 내역",
    totalCount: 165,
    headers: [
      {
        key: "status",
        label: "처리 상태",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[100px]",
      },
      {
        key: "member",
        label: "회원 여부",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[160px]",
      },
      {
        key: "email",
        label: "닉네임/이메일",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[160px]",
      },
      {
        key: "content",
        label: "내용",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: type === "detail" ? "w-[246px]" : "flex-1",
      },
      {
        key: "date",
        label: "작성일자",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[160px]",
      },
    ],
    // 목업 데이터
    data: [
      {
        status: "답변대기",
        member: "비회원",
        email: "hvie12@gmail.com",
        content:
          "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
        date: "25.05.29",
      },
      {
        status: "답변완료",
        member: "회원",
        email: "하이브짱",
        content:
          "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
        date: "25.05.29",
      },
    ],
  };
  return (
    <div className="w-full flex flex-col gap-4">
      {type === "list" && (
        <div className="flex gap-2 items-center">
          <h3 className="font-bold text-[20px] leading-[36px] tracking-[-0.02em] text-black">
            {tableConfig.title}
          </h3>
          <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
            검색결과 총 {tableConfig.totalCount}건
          </p>
        </div>
      )}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full h-[36px] text-left border-collapse text-nowrap">
          <thead className="bg-gray1">
            <tr>
              {tableConfig.headers.map((header) => (
                <th
                  key={header.key}
                  className={cn("px-3 py-2", header.className)}
                >
                  <div className="flex justify-between items-center font-bold text-[14px] leading-5 text-gray8 cursor-pointer select-none ">
                    <span className="mx-auto">{header.label}</span>
                    <span>{header.icons}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray8">
            {/* {tableConfig.data.map((row, idx) => (
              <DetailTableItem key={idx} row={row} idx={idx} />
            ))} */}
            {/* 목업 데이터 */}
            {Array.from({ length: 10 }, (_, idx) => (
              <DetailTableItem
                key={idx}
                row={tableConfig.data[idx % tableConfig.data.length]}
                idx={idx}
                type={type}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default DetailTable;
