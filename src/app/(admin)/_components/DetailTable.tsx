import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React from "react";
import DetailTableItem from "./DetailTableItem";
import Pagination from "./Pagination";

const DetailTable = () => {
  const tableConfig = {
    title: "문의 내역",
    totalCount: 165,
    headers: [
      {
        key: "status",
        label: "처리 상태",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      },
      {
        key: "member",
        label: "회원 여부",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      },
      {
        key: "email",
        label: "닉네임/이메일",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      },
      {
        key: "content",
        label: "내용",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      },
      {
        key: "date",
        label: "작성일자",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      },
    ],
    // 목업 데이터
    data: [
      {
        status: "답변대기",
        member: "비회원",
        email: "hvie12@gmail.com",
        content: "문의하려고하는데요 로그인...",
        date: "25.05.29",
      },
      {
        status: "답변완료",
        member: "회원",
        email: "하이브짱",
        content: "문의하려고하는데요 로그인...",
        date: "25.05.29",
      },
    ],
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h3 className="font-bold text-[20px] leading-[36px] tracking-[-0.02em] text-black">
          {tableConfig.title}
        </h3>
        <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
          검색결과 총 {tableConfig.totalCount}건
        </p>
      </div>
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray1">
            <tr>
              {tableConfig.headers.map((header) => (
                <th key={header.key} className="px-4 py-3 border-b">
                  <div className="flex items-center gap-1 font-bold text-[14px] leading-5 text-gray8 cursor-pointer">
                    {header.label} {header.icons}
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
